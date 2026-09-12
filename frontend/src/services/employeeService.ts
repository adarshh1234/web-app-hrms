import { Employee } from '../types';

const VITE_API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1').replace(/\/$/, '');
const EMPLOYEE_API_BASE = `${VITE_API_URL}/employees`;

export interface EmployeeQueryParams {
  search?: string;
  name?: string;
  employeeId?: string;
  id?: string;
  department?: string;
  jobTitle?: string;
  subUnit?: string;
  location?: string;
  supervisor?: string;
  employmentStatus?: string;
  attendanceStatus?: string;
  category?: string;
  includeTerminated?: boolean | string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const mapEmployeeResponse = (item: any): Employee => {
  return {
    ...item,
    id: item.employeeId || item.id || item._id || '',
  };
};

export const employeeService = {
  async getAll(params?: EmployeeQueryParams): Promise<Employee[]> {
    try {
      const searchParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== '') {
            searchParams.append(key, String(value));
          }
        });
      }

      const queryString = searchParams.toString();
      const url = queryString ? `${EMPLOYEE_API_BASE}?${queryString}` : EMPLOYEE_API_BASE;

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error(`Failed to fetch employees: HTTP ${res.status}`);
      }

      const json = await res.json();
      const data = Array.isArray(json.data) ? json.data : Array.isArray(json) ? json : [];
      return data.map(mapEmployeeResponse);
    } catch (err) {
      console.error('[EmployeeService] getAll error:', err);
      throw err;
    }
  },

  async getById(id: string): Promise<Employee | undefined> {
    try {
      const res = await fetch(`${EMPLOYEE_API_BASE}/${encodeURIComponent(id)}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.status === 404) {
        return undefined;
      }

      if (!res.ok) {
        throw new Error(`Failed to fetch employee: HTTP ${res.status}`);
      }

      const json = await res.json();
      const data = json.data || json;
      return mapEmployeeResponse(data);
    } catch (err) {
      console.error('[EmployeeService] getById error:', err);
      throw err;
    }
  },

  async create(employeeData: Partial<Employee>): Promise<Employee> {
    try {
      const res = await fetch(EMPLOYEE_API_BASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const message = errorJson.error?.message || errorJson.message || `Failed to create employee (HTTP ${res.status})`;
        throw new Error(message);
      }

      const json = await res.json();
      return mapEmployeeResponse(json.data || json);
    } catch (err) {
      console.error('[EmployeeService] create error:', err);
      throw err;
    }
  },

  async update(id: string, updates: Partial<Employee>): Promise<Employee> {
    try {
      const res = await fetch(`${EMPLOYEE_API_BASE}/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const message = errorJson.error?.message || errorJson.message || `Failed to update employee (HTTP ${res.status})`;
        throw new Error(message);
      }

      const json = await res.json();
      return mapEmployeeResponse(json.data || json);
    } catch (err) {
      console.error('[EmployeeService] update error:', err);
      throw err;
    }
  },

  async delete(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${EMPLOYEE_API_BASE}/${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        const message = errorJson.error?.message || errorJson.message || `Failed to delete employee (HTTP ${res.status})`;
        throw new Error(message);
      }

      return true;
    } catch (err) {
      console.error('[EmployeeService] delete error:', err);
      throw err;
    }
  },
};

export default employeeService;
