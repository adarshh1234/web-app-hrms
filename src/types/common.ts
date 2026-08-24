export type StatusType = 'success' | 'error' | 'warning' | 'info';

export interface BaseEntity {
  id: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
