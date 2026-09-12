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

const VITE_API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');

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

      const res = await fetch(`${VITE_API_URL}/notifications?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to fetch notifications`);
      }
      const json = await res.json();
      return {
        data: json.data || [],
        total: json.pagination?.totalItems || json.data?.length || 0,
      };
    } catch (err) {
      console.error('[notificationService] Backend request failed:', err);
      throw err;
    }
  },

  /**
   * Create a new notification (always creates DRAFT in backend)
   */
  async createNotification(payload: {
    channel: string;
    subject?: string;
    message: string;
    recipients: string;
    recipientType?: 'ALL_EMPLOYEES' | 'DEPARTMENT' | 'EMPLOYEES';
    departmentIds?: string[];
    employeeIds?: string[];
    status?: 'DRAFT' | 'SENT';
  }): Promise<BackendNotification> {
    const backendChannel = this.mapChannelToBackend(payload.channel);
    const body = {
      channel: backendChannel,
      subject: payload.subject || 'No Subject',
      message: payload.message,
      recipients: payload.recipients || 'All Employees',
      recipientType: payload.recipientType || 'ALL_EMPLOYEES',
      departmentIds: payload.departmentIds || [],
      employeeIds: payload.employeeIds || [],
      status: 'DRAFT',
    };

    try {
      const res = await fetch(`${VITE_API_URL}/notifications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error?.message || `HTTP ${res.status}: Failed to create notification`);
      }

      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[notificationService] Backend post failed:', err);
      throw err;
    }
  },

  /**
   * Send a draft notification
   */
  async sendNotification(id: string): Promise<BackendNotification> {
    try {
      const res = await fetch(`${VITE_API_URL}/notifications/${id}/send`, {
        method: 'POST',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to send draft`);
      }
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[notificationService] Send draft API call failed:', err);
      throw err;
    }
  },

  /**
   * Delete a draft notification
   */
  async deleteNotification(id: string): Promise<void> {
    try {
      const res = await fetch(`${VITE_API_URL}/notifications/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: Failed to delete draft`);
      }
    } catch (err) {
      console.error('[notificationService] Delete draft API call failed:', err);
      throw err;
    }
  },
};

export default notificationService;
