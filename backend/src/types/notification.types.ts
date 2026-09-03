export enum NotificationChannel {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  WHATSAPP = 'WHATSAPP',
  EMPLOYEE_APP = 'EMPLOYEE_APP',
  HUREMASO = 'HUREMASO',
}

export enum RecipientType {
  ALL_EMPLOYEES = 'ALL_EMPLOYEES',
  DEPARTMENT = 'DEPARTMENT',
  EMPLOYEES = 'EMPLOYEES',
}

export enum NotificationStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
}

export interface INotification {
  _id?: any;
  channel: NotificationChannel;
  subject?: string;
  message: string;
  recipients: string;
  recipientType: RecipientType;
  departmentIds?: string[];
  employeeIds?: string[];
  status: NotificationStatus;
  createdBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INotificationQuery {
  page?: number;
  limit?: number;
  search?: string;
  channel?: NotificationChannel;
  status?: NotificationStatus;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface IPaginatedResult<T> {
  data: T[];
  pagination: {
    totalItems: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}
