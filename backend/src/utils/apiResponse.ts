import { Response } from 'express';

export interface ApiResponseOptions<T> {
  res: Response;
  statusCode?: number;
  message?: string;
  data?: T;
  pagination?: any;
}

export const sendResponse = <T>({
  res,
  statusCode = 200,
  message,
  data,
  pagination,
}: ApiResponseOptions<T>): Response => {
  return res.status(statusCode).json({
    success: statusCode >= 200 && statusCode < 300,
    ...(message && { message }),
    ...(data !== undefined && { data }),
    ...(pagination && { pagination }),
  });
};
