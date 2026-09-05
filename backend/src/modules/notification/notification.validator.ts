import { z } from 'zod';
import mongoose from 'mongoose';
import { NotificationChannel, RecipientType, NotificationStatus } from './notification.types';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid notification ID format' }
);

export const createNotificationSchema = z.object({
  channel: z.nativeEnum(NotificationChannel, {
    errorMap: () => ({ message: 'Invalid channel. Allowed: EMAIL, SMS, WHATSAPP, EMPLOYEE_APP, HUREMASO' }),
  }),
  subject: z.string().optional().default(''),
  message: z.string().min(1, 'Message text cannot be empty').max(2000, 'Message text exceeds maximum length of 2000 characters'),
  recipients: z.string().min(1, 'Recipients label is required'),
  recipientType: z.nativeEnum(RecipientType).optional().default(RecipientType.ALL_EMPLOYEES),
  departmentIds: z.array(z.string()).optional().default([]),
  employeeIds: z.array(z.string()).optional().default([]),
  status: z.nativeEnum(NotificationStatus).optional().default(NotificationStatus.DRAFT),
  createdBy: z.string().optional(),
});

export const updateNotificationSchema = createNotificationSchema.partial();

export const queryNotificationSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 10)),
  search: z.string().optional(),
  channel: z.nativeEnum(NotificationChannel).optional(),
  status: z.nativeEnum(NotificationStatus).optional(),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export const notificationIdParamSchema = z.object({
  id: mongoIdSchema,
});
