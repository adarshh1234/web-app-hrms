import { CorporateBranding, AssociationRequest } from '../types/admin';

const VITE_API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');
const ADMIN_API_BASE = `${VITE_API_URL}/admin`;

export interface UserRecord {
  id?: string;
  _id?: string;
  username: string;
  role: 'Admin' | 'ESS';
  empName: string;
  status: 'Enabled' | 'Disabled';
  email?: string;
}

export interface JobTitleRecord {
  id?: string;
  _id?: string;
  title: string;
  description?: string;
  status?: 'Active' | 'Inactive';
}

export interface OrganizationData {
  name: string;
  regNumber?: string;
  taxId?: string;
  phone?: string;
  fax?: string;
  email?: string;
  addressStreet1?: string;
  addressStreet2?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  notes?: string;
  locations: Array<{ id?: string; _id?: string; name: string; city: string; country: string; phone?: string; employees?: number }>;
  structureTree?: any;
}

export interface QualificationRecord {
  id?: string;
  _id?: string;
  category: 'education' | 'licenses' | 'skills' | 'languages' | 'memberships';
  name: string;
  subtitle?: string;
  details?: Record<string, any>;
}

export interface NationalityRecord {
  id?: string;
  _id?: string;
  name: string;
  status?: 'Active' | 'Inactive';
}

export interface ConfigurationData {
  emailConfig: Record<string, any>;
  emailSubscriptions: Record<string, any>;
  localization: Record<string, any>;
  modules: Record<string, any>;
  socialAuth: Record<string, any>;
  oauthClients: Record<string, any>;
  ldapAuth: Record<string, any>;
}

const DEFAULT_BRANDING: CorporateBranding = {
  primaryColor: '#004848',
  primaryHoverColor: '#003333',
  primaryFontColor: '#ffffff',
  secondaryColor: '#f1f5f9',
  secondaryFontColor: '#1e293b',
  primaryGradientColor1: '#002222',
  primaryGradientColor2: '#007878',
};

let memoryAssociationRequests: AssociationRequest[] = [
  { id: '1', employeeName: 'Abdelrahman 3535', dateRequested: '2026-08-15', requestDetails: 'Association with Huremaso Global Tech', status: 'Pending' },
  { id: '2', companyName: 'Acme Solutions Inc', employeeName: 'John Doe', dateRequested: '2026-08-20', requestDetails: 'Existing Association Request', status: 'Accepted' } as any,
];

export const adminService = {
  // 1. USER MANAGEMENT
  async getUsers(params?: { username?: string; role?: string; empName?: string; status?: string }): Promise<{ data: UserRecord[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.username) query.append('username', params.username);
      if (params?.role) query.append('role', params.role);
      if (params?.empName) query.append('empName', params.empName);
      if (params?.status) query.append('status', params.status);

      const res = await fetch(`${ADMIN_API_BASE}/users?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch users`);
      const json = await res.json();
      return {
        data: (json.data || []).map((u: any) => ({ ...u, id: u._id || u.id })),
        total: json.pagination?.totalItems || json.data?.length || 0,
      };
    } catch (err) {
      console.error('[adminService] getUsers failed:', err);
      throw err;
    }
  },

  async createUser(payload: Partial<UserRecord>): Promise<UserRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${res.status}: Failed to create user`);
    }
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async updateUser(id: string, payload: Partial<UserRecord>): Promise<UserRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update user`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async updateUserStatus(id: string, status: 'Enabled' | 'Disabled'): Promise<UserRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/users/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update user status`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async deleteUser(id: string): Promise<void> {
    const res = await fetch(`${ADMIN_API_BASE}/users/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to delete user`);
  },

  // 2. JOB TITLES
  async getJobTitles(params?: { search?: string; status?: string }): Promise<JobTitleRecord[]> {
    try {
      const query = new URLSearchParams();
      if (params?.search) query.append('search', params.search);
      if (params?.status) query.append('status', params.status);

      const res = await fetch(`${ADMIN_API_BASE}/job-titles?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch job titles`);
      const json = await res.json();
      return (json.data || []).map((j: any) => ({ ...j, id: j._id || j.id }));
    } catch (err) {
      console.error('[adminService] getJobTitles failed:', err);
      throw err;
    }
  },

  async createJobTitle(payload: Partial<JobTitleRecord>): Promise<JobTitleRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/job-titles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${res.status}: Failed to create job title`);
    }
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async updateJobTitle(id: string, payload: Partial<JobTitleRecord>): Promise<JobTitleRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/job-titles/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update job title`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async deleteJobTitle(id: string): Promise<void> {
    const res = await fetch(`${ADMIN_API_BASE}/job-titles/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to delete job title`);
  },

  // 3. ORGANIZATION
  async getOrganization(): Promise<OrganizationData> {
    try {
      const res = await fetch(`${ADMIN_API_BASE}/organizations`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch organization profile`);
      const json = await res.json();
      const org = json.data;
      if (org?.locations) {
        org.locations = org.locations.map((l: any) => ({ ...l, id: l._id || l.id }));
      }
      return org;
    } catch (err) {
      console.error('[adminService] getOrganization failed:', err);
      throw err;
    }
  },

  async updateOrganization(payload: Partial<OrganizationData>): Promise<OrganizationData> {
    const res = await fetch(`${ADMIN_API_BASE}/organizations`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update organization`);
    const json = await res.json();
    return json.data;
  },

  async addOrganizationLocation(locationData: any): Promise<OrganizationData> {
    const res = await fetch(`${ADMIN_API_BASE}/organizations/locations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(locationData),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to add location`);
    const json = await res.json();
    return json.data;
  },

  async removeOrganizationLocation(locationId: string): Promise<OrganizationData> {
    const res = await fetch(`${ADMIN_API_BASE}/organizations/locations/${locationId}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to remove location`);
    const json = await res.json();
    return json.data;
  },

  // 4. QUALIFICATIONS
  async getQualifications(params?: { category?: string; search?: string }): Promise<QualificationRecord[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category) query.append('category', params.category);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${ADMIN_API_BASE}/qualifications?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch qualifications`);
      const json = await res.json();
      return (json.data || []).map((q: any) => ({ ...q, id: q._id || q.id }));
    } catch (err) {
      console.error('[adminService] getQualifications failed:', err);
      throw err;
    }
  },

  async createQualification(payload: Partial<QualificationRecord>): Promise<QualificationRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/qualifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to create qualification`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async updateQualification(id: string, payload: Partial<QualificationRecord>): Promise<QualificationRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/qualifications/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update qualification`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async deleteQualification(id: string): Promise<void> {
    const res = await fetch(`${ADMIN_API_BASE}/qualifications/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to delete qualification`);
  },

  // 5. NATIONALITIES
  async getNationalities(params?: { search?: string; status?: string; page?: number; limit?: number }): Promise<{ data: NationalityRecord[]; total: number }> {
    try {
      const query = new URLSearchParams();
      if (params?.search) query.append('search', params.search);
      if (params?.status) query.append('status', params.status);
      if (params?.page) query.append('page', String(params.page));
      if (params?.limit) query.append('limit', String(params.limit || 50));

      const res = await fetch(`${ADMIN_API_BASE}/nationalities?${query.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch nationalities`);
      const json = await res.json();
      return {
        data: (json.data || []).map((n: any) => ({ ...n, id: n._id || n.id })),
        total: json.pagination?.totalItems || json.data?.length || 0,
      };
    } catch (err) {
      console.error('[adminService] getNationalities failed:', err);
      throw err;
    }
  },

  async createNationality(payload: Partial<NationalityRecord>): Promise<NationalityRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/nationalities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errJson = await res.json().catch(() => ({}));
      throw new Error(errJson.error?.message || `HTTP ${res.status}: Failed to create nationality`);
    }
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async updateNationality(id: string, payload: Partial<NationalityRecord>): Promise<NationalityRecord> {
    const res = await fetch(`${ADMIN_API_BASE}/nationalities/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update nationality`);
    const json = await res.json();
    return { ...json.data, id: json.data._id || json.data.id };
  },

  async deleteNationality(id: string): Promise<void> {
    const res = await fetch(`${ADMIN_API_BASE}/nationalities/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to delete nationality`);
  },

  // 6. CORPORATE BRANDING
  async getBranding(): Promise<CorporateBranding> {
    try {
      const res = await fetch(`${ADMIN_API_BASE}/branding`);
      if (!res.ok) return DEFAULT_BRANDING;
      const json = await res.json();
      return {
        ...DEFAULT_BRANDING,
        ...json.data,
        primaryHoverColor: json.data?.primaryHoverColor || DEFAULT_BRANDING.primaryHoverColor,
        primaryGradientColor1: json.data?.gradient1 || DEFAULT_BRANDING.primaryGradientColor1,
        primaryGradientColor2: json.data?.gradient2 || DEFAULT_BRANDING.primaryGradientColor2,
      };
    } catch (err) {
      return DEFAULT_BRANDING;
    }
  },

  async updateBranding(payload: Partial<CorporateBranding>): Promise<CorporateBranding> {
    this.applyBrandingToDOM(payload);
    try {
      const res = await fetch(`${ADMIN_API_BASE}/branding`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return { ...DEFAULT_BRANDING, ...payload };
      const json = await res.json();
      return { ...DEFAULT_BRANDING, ...json.data };
    } catch (err) {
      return { ...DEFAULT_BRANDING, ...payload };
    }
  },

  applyBrandingToDOM(branding?: Partial<CorporateBranding>): void {
    if (!branding) return;
    const root = document.documentElement;
    if (branding.primaryColor) root.style.setProperty('--primary-color', branding.primaryColor);
    if (branding.secondaryColor) root.style.setProperty('--secondary-color', branding.secondaryColor);
    if (branding.primaryFontColor) root.style.setProperty('--primary-font-color', branding.primaryFontColor);
    if (branding.secondaryFontColor) root.style.setProperty('--secondary-font-color', branding.secondaryFontColor);
  },

  // 7. SYSTEM CONFIGURATION
  async getConfiguration(): Promise<ConfigurationData> {
    try {
      const res = await fetch(`${ADMIN_API_BASE}/configuration`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to fetch configuration`);
      const json = await res.json();
      return json.data;
    } catch (err) {
      console.error('[adminService] getConfiguration failed:', err);
      throw err;
    }
  },

  async updateConfiguration(payload: Partial<ConfigurationData>): Promise<ConfigurationData> {
    const res = await fetch(`${ADMIN_API_BASE}/configuration`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to update configuration`);
    const json = await res.json();
    return json.data;
  },

  // 8. ASSOCIATION REQUESTS
  async getAssociationRequests(): Promise<AssociationRequest[]> {
    return memoryAssociationRequests;
  },

  async updateAssociationStatus(id: string, status: 'Accepted' | 'Cancelled'): Promise<AssociationRequest> {
    memoryAssociationRequests = memoryAssociationRequests.map(r => r.id === id ? { ...r, status } : r);
    const target = memoryAssociationRequests.find(r => r.id === id);
    return target!;
  },
};

export default adminService;
