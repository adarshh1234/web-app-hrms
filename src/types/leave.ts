export interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  comments: string;
  dateRequested: string;
}

export interface LeaveBalance {
  leaveType: string;
  entitled: number;
  pending: number;
  scheduled: number;
  taken: number;
  balance: number;
}

export type EntitlementTargetType = 'individual' | 'multiple';

export interface AddEntitlementPayload {
  targetType: EntitlementTargetType;
  employeeName: string;
  leaveType: string;
  leavePeriod: string;
  entitlement: number;
}

export interface LeaveEntitlementRecord {
  id: string;
  leaveType: string;
  entitlementType: string;
  validFrom: string;
  validTo: string;
  days: number;
}

export interface EmployeeEntitlementFilter {
  employeeName: string;
  leaveType: string;
  leavePeriod: string;
}

export type ReportFilterMode = 'leave-type' | 'employee';

export interface LeaveUsageReportFilter {
  filterMode: ReportFilterMode;
  leaveType: string;
  leavePeriod: string;
  location: string;
  jobTitle: string;
  subUnit: string;
  includePastEmployees: boolean;
}

export interface LeaveUsageReportRecord {
  id: string;
  leaveType: string;
  leaveEntitlementDays: number;
  leavePendingApprovals: number;
  leaveScheduledDays: number;
  leaveTakenDays: number;
  leaveBalanceDays: number;
}

export interface LeaveListFilter {
  fromDate: string;
  toDate: string;
  showLeaveWithStatus: string;
  employeeName: string;
  leaveType: string;
  subUnit: string;
  includePastEmployees: boolean;
}

export interface LeaveListRecord {
  id: string;
  date: string;
  employeeName: string;
  leaveType: string;
  leaveBalance: number;
  numberOfDays: number;
  status: string;
  comments: string;
}

export interface AssignLeavePayload {
  employeeName: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  comment: string;
}

export interface LeavePeriodConfig {
  startMonth: string;
  startDate: string;
  endDate: string;
  currentPeriod: string;
}

export interface LeaveTypeConfig {
  id: string;
  name: string;
}

export interface WorkWeekConfig {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface HolidayRecord {
  id: string;
  name: string;
  date: string;
  dayType: 'Full Day' | 'Half Day';
  repeatsAnnually: boolean;
}

