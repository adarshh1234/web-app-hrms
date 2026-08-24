import {
  LeaveRequest,
  LeaveBalance,
  AddEntitlementPayload,
  LeaveEntitlementRecord,
  EmployeeEntitlementFilter,
  LeaveUsageReportRecord,
  LeaveListRecord,
  AssignLeavePayload,
  LeavePeriodConfig,
  LeaveTypeConfig,
  WorkWeekConfig,
  HolidayRecord,
} from '../types';
import {
  getLeaveRequests,
  saveLeaveRequests,
  getLeaveBalances,
  saveLeaveBalances,
  getLeaveEntitlements,
  saveLeaveEntitlements,
  getLeavePeriodConfig as getStorageLeavePeriodConfig,
  saveLeavePeriodConfig as saveStorageLeavePeriodConfig,
  getLeaveTypeConfigs as getStorageLeaveTypeConfigs,
  saveLeaveTypeConfigs as saveStorageLeaveTypeConfigs,
  getWorkWeekConfig as getStorageWorkWeekConfig,
  saveWorkWeekConfig as saveStorageWorkWeekConfig,
  getHolidays as getStorageHolidays,
  saveHolidays as saveStorageHolidays,
} from '../data/mockData';

export const leaveService = {
  async getRequests(): Promise<LeaveRequest[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getLeaveRequests()), 100);
    });
  },

  async getBalances(): Promise<LeaveBalance[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getLeaveBalances()), 100);
    });
  },

  async createRequest(data: Omit<LeaveRequest, 'id' | 'dateRequested' | 'status'>): Promise<LeaveRequest> {
    const list = getLeaveRequests();
    const newReq: LeaveRequest = {
      ...data,
      id: `LV-${Math.floor(100 + Math.random() * 900)}`,
      dateRequested: new Date().toISOString().split('T')[0],
      status: 'Pending',
    };
    const updated = [newReq, ...list];
    saveLeaveRequests(updated);
    return newReq;
  },

  async updateRequestStatus(id: string, status: 'Approved' | 'Rejected'): Promise<LeaveRequest> {
    const list = getLeaveRequests();
    const index = list.findIndex((req) => req.id === id);
    if (index === -1) throw new Error('Leave request not found');

    list[index] = { ...list[index], status };
    saveLeaveRequests(list);
    return list[index];
  },

  async saveBalances(balances: LeaveBalance[]): Promise<void> {
    saveLeaveBalances(balances);
  },

  // --- Entitlement methods ---

  async addEntitlement(payload: AddEntitlementPayload): Promise<LeaveEntitlementRecord> {
    const list = getLeaveEntitlements();
    const [validFrom, validTo] = payload.leavePeriod.includes(' - ')
      ? payload.leavePeriod.split(' - ')
      : [payload.leavePeriod, payload.leavePeriod];

    const newRecord: LeaveEntitlementRecord = {
      id: `ENT-${Date.now()}`,
      leaveType: payload.leaveType,
      entitlementType: payload.targetType === 'individual' ? 'Added' : 'Bulk',
      validFrom,
      validTo,
      days: payload.entitlement,
    };
    const updated = [newRecord, ...list];
    saveLeaveEntitlements(updated);
    return newRecord;
  },

  async getEmployeeEntitlements(filter: EmployeeEntitlementFilter): Promise<LeaveEntitlementRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = getLeaveEntitlements();
        const filtered = all.filter((rec) => {
          if (filter.leaveType && rec.leaveType !== filter.leaveType) return false;
          return true;
        });
        resolve(filtered);
      }, 100);
    });
  },

  async getMyEntitlements(leaveType?: string, leavePeriod?: string): Promise<LeaveEntitlementRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const all = getLeaveEntitlements();
        const filtered = all.filter((rec) => {
          if (leaveType && rec.leaveType !== leaveType) return false;
          if (leavePeriod && leavePeriod !== 'all') {
            const [periodStart] = leavePeriod.includes(' - ')
              ? leavePeriod.split(' - ')
              : [leavePeriod];
            if (rec.validFrom !== periodStart) return false;
          }
          return true;
        });
        resolve(filtered);
      }, 100);
    });
  },

  // --- Report methods ---

  async getLeaveUsageReport(leaveType?: string): Promise<LeaveUsageReportRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const balances = getLeaveBalances();
        const filtered = leaveType
          ? balances.filter((b) => b.leaveType === leaveType)
          : balances;
        const records: LeaveUsageReportRecord[] = filtered.map((b, idx) => ({
          id: `RPT-${idx + 1}`,
          leaveType: b.leaveType,
          leaveEntitlementDays: b.entitled,
          leavePendingApprovals: b.pending,
          leaveScheduledDays: b.scheduled,
          leaveTakenDays: b.taken,
          leaveBalanceDays: b.balance,
        }));
        resolve(records);
      }, 150);
    });
  },

  // --- Leave List methods ---

  async getLeaveList(filter?: { leaveType?: string; status?: string; employeeName?: string }): Promise<LeaveListRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const requests = getLeaveRequests();
        const balances = getLeaveBalances();
        let filtered = requests;
        if (filter?.leaveType) {
          filtered = filtered.filter((r) => r.leaveType === filter.leaveType);
        }
        if (filter?.status && filter.status !== 'All') {
          filtered = filtered.filter((r) => r.status === filter.status);
        }
        if (filter?.employeeName) {
          filtered = filtered.filter((r) =>
            r.employeeName.toLowerCase().includes(filter.employeeName!.toLowerCase())
          );
        }
        const records: LeaveListRecord[] = filtered.map((r) => {
          const bal = balances.find((b) => b.leaveType === r.leaveType);
          return {
            id: r.id,
            date: r.fromDate,
            employeeName: r.employeeName,
            leaveType: r.leaveType,
            leaveBalance: bal?.balance ?? 0,
            numberOfDays: r.numberOfDays,
            status: r.status,
            comments: r.comments,
          };
        });
        resolve(records);
      }, 150);
    });
  },

  // --- Assign Leave methods ---

  async assignLeave(payload: AssignLeavePayload): Promise<LeaveRequest> {
    const list = getLeaveRequests();
    const from = new Date(payload.fromDate);
    const to = new Date(payload.toDate);
    const diffDays = Math.max(1, Math.ceil((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)) + 1);

    const newReq: LeaveRequest = {
      id: `LV-${Math.floor(100 + Math.random() * 900)}`,
      employeeName: payload.employeeName,
      department: '',
      leaveType: payload.leaveType,
      fromDate: payload.fromDate,
      toDate: payload.toDate,
      numberOfDays: diffDays,
      status: 'Approved',
      comments: payload.comment,
      dateRequested: new Date().toISOString().split('T')[0],
    };
    const updated = [newReq, ...list];
    saveLeaveRequests(updated);
    return newReq;
  },

  // --- Configuration methods ---

  async getLeavePeriodConfig(): Promise<LeavePeriodConfig> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStorageLeavePeriodConfig()), 100);
    });
  },

  async saveLeavePeriodConfig(data: LeavePeriodConfig): Promise<void> {
    return new Promise((resolve) => {
      saveStorageLeavePeriodConfig(data);
      setTimeout(() => resolve(), 100);
    });
  },

  async getLeaveTypeConfigs(): Promise<LeaveTypeConfig[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStorageLeaveTypeConfigs()), 100);
    });
  },

  async addLeaveTypeConfig(name: string): Promise<LeaveTypeConfig> {
    const list = getStorageLeaveTypeConfigs();
    const newItem: LeaveTypeConfig = {
      id: `LT-${Date.now()}`,
      name,
    };
    const updated = [newItem, ...list];
    saveStorageLeaveTypeConfigs(updated);
    return newItem;
  },

  async updateLeaveTypeConfig(id: string, name: string): Promise<LeaveTypeConfig> {
    const list = getStorageLeaveTypeConfigs();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Leave type not found');
    list[index] = { ...list[index], name };
    saveStorageLeaveTypeConfigs(list);
    return list[index];
  },

  async deleteLeaveTypeConfig(id: string): Promise<void> {
    const list = getStorageLeaveTypeConfigs();
    const updated = list.filter((item) => item.id !== id);
    saveStorageLeaveTypeConfigs(updated);
  },

  async getWorkWeekConfig(): Promise<WorkWeekConfig> {
    return new Promise((resolve) => {
      setTimeout(() => resolve(getStorageWorkWeekConfig()), 100);
    });
  },

  async saveWorkWeekConfig(data: WorkWeekConfig): Promise<void> {
    return new Promise((resolve) => {
      saveStorageWorkWeekConfig(data);
      setTimeout(() => resolve(), 100);
    });
  },

  async getHolidays(fromDate?: string, toDate?: string): Promise<HolidayRecord[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let all = getStorageHolidays();
        if (fromDate) {
          all = all.filter((h) => h.date >= fromDate);
        }
        if (toDate) {
          all = all.filter((h) => h.date <= toDate);
        }
        resolve(all);
      }, 100);
    });
  },

  async addHoliday(holiday: Omit<HolidayRecord, 'id'>): Promise<HolidayRecord> {
    const list = getStorageHolidays();
    const newItem: HolidayRecord = {
      ...holiday,
      id: `HOL-${Date.now()}`,
    };
    const updated = [newItem, ...list];
    saveStorageHolidays(updated);
    return newItem;
  },

  async updateHoliday(id: string, holiday: Omit<HolidayRecord, 'id'>): Promise<HolidayRecord> {
    const list = getStorageHolidays();
    const index = list.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Holiday not found');
    list[index] = { ...holiday, id };
    saveStorageHolidays(list);
    return list[index];
  },

  async deleteHoliday(id: string): Promise<void> {
    const list = getStorageHolidays();
    const updated = list.filter((item) => item.id !== id);
    saveStorageHolidays(updated);
  },
};

export default leaveService;

