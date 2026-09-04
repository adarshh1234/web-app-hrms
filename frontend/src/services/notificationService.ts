import { MessageLog } from '../types';

export interface BackendNotification {
  id: string;
  channel: 'EMAIL' | 'SMS' | 'WHATSAPP' | 'EMPLOYEE_APP' | 'HUREMASO';
  subject?: string;
  message: string;
  recipients: string;
  recipientType?: string;
  departmentIds?: string[];
  employeeIds?: string[];
  status: 'DRAFT' | 'SENT';
  createdAt?: string;
  updatedAt?: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
const STORAGE_KEY = 'hr_module_notifications_fallback_v1';

// Helper for localStorage fallback if server is offline
const getLocalFallback = (): BackendNotification[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const saveLocalFallback = (list: BackendNotification[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // ignore storage error
  }
};

export const notificationService = {
  /**
   * Channel mapping helper between frontend route strings and backend NotificationChannel enum
   */
  mapChannelToBackend(channelStr: string): 'EMAIL' | 'SMS' | 'WHATSAPP' | 'EMPLOYEE_APP' | 'HUREMASO' {
    const upper = channelStr.toUpperCase().replace(/\s+/g, '_').replace(/[']/g, '');
    if (upper.includes('SMS')) return 'SMS';
    if (upper.includes('WHATSAPP') || upper.includes('WHATS_APP')) return 'WHATSAPP';
    if (upper.includes('EMPLOYEE_APP') || upper.includes('EMPLOYEE')) return 'EMPLOYEE_APP';
    if (upper.includes('HUREMASO')) return 'HUREMASO';
    return 'EMAIL';
  },

  /**
   * Fetch notifications from backend API with optional filtering
   */
  async getNotifications(params?: {
    channel?: string;
    status?: 'DRAFT' | 'SENT';
    search?: string;
    page?: number;
    limit?: number;
  }): Promise<{ data: BackendNotification[]; total: number }> {
    try {
      const queryParams = new URLSearchParams();
      if (params?.channel) {
        queryParams.append('channel', this.mapChannelToBackend(params.channel));
      }
      if (params?.status) {
        queryParams.append('status', params.status);
      }
      if (params?.search) {
        queryParams.append('search', params.search);
      }
      queryParams.append('page', String(params?.page || 1));
      queryParams.append('limit', String(params?.limit || 50));

      const res = await fetch(`${API_BASE_URL}/notifications?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch notifications`);
      }
      const json = await res.json();
      return {
        data: json.data || [],
        total: json.pagination?.totalItems || json.data?.length || 0,
      };
    } catch (err) {
      console.warn('[notificationService] Backend request failed, utilizing fallback cache:', err);
      let list = getLocalFallback();
      if (params?.channel) {
        const mapped = this.mapChannelToBackend(params.channel);
        list = list.filter((item) => item.channel === mapped);
      }
      if (params?.status) {
        list = list.filter((item) => item.status === params.status);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        list = list.filter(
          (item) =>
            item.message?.toLowerCase().includes(q) ||
            item.subject?.toLowerCase().includes(q) ||
            item.recipients?.toLowerCase().includes(q)
        );
      }
      return { data: list, total: list.length };
    }
  },

  /**
   * Create a new notification (Draft or Sent) in backend
   */
  async createNotification(payload: {
    channel: string;
    subject?: string;
    message: string;
    recipients: string;
    recipientType?: 'ALL_EMPLOYEES' | 'DEPARTMENT' | 'EMPLOYEES';
    status?: 'DRAFT' | 'SENT';
  }): Promise<BackendNotification> {
    const backendChannel = this.mapChannelToBackend(payload.channel);
    const body = {
      channel: backendChannel,
      subject: payload.subject || 'No Subject',
      message: payload.message,
      recipients: payload.recipients || 'All Employees',
      recipientType: payload.recipientType || 'ALL_EMPLOYEES',
      status: payload.status || 'SENT',
    };

    try {
      const res = await fetch(`${API_BASE_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error?.message || `HTTP ${res.status}: Failed to create notification`);
      }

      const json = await res.json();
      const createdItem: BackendNotification = json.data;

      // Keep local fallback updated
      const currentList = getLocalFallback();
      saveLocalFallback([createdItem, ...currentList]);

      return createdItem;
    } catch (err) {
      console.warn('[notificationService] Backend post failed, storing in fallback storage:', err);
      const fallbackItem: BackendNotification = {
        id: `LOCAL-${Date.now()}`,
        channel: backendChannel,
        subject: body.subject,
        message: body.message,
        recipients: body.recipients,
        status: body.status,
        createdAt: new Date().toISOString(),
      };
      const currentList = getLocalFallback();
      saveLocalFallback([fallbackItem, ...currentList]);
      return fallbackItem;
    }
  },

  /**
   * Send a draft notification
   */
  async sendNotification(id: string): Promise<BackendNotification> {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/${id}/send`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to send draft`);
      }
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.warn('[notificationService] Send draft API call failed:', err);
      throw err;
    }
  },

  /**
   * Delete a draft notification
   */
  async deleteNotification(id: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.warn('[notificationService] Delete draft API call failed:', err);
    }
    // Also remove from fallback local cache
    const current = getLocalFallback();
    saveLocalFallback(current.filter((item) => item.id !== id));
  },
};

export default notificationService;
