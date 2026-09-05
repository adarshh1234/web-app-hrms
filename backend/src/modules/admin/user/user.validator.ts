import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

export const createUserSchema = z.object({
  username: z.string().min(2, 'Username must be at least 2 characters').max(50),
  role: z.enum(['Admin', 'ESS']).default('Admin'),
  empName: z.string().min(1, 'Employee name is required'),
  status: z.enum(['Enabled', 'Disabled']).default('Enabled'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
});

export const updateUserSchema = createUserSchema.partial();

export const updateUserStatusSchema = z.object({
  status: z.enum(['Enabled', 'Disabled']),
});

export const queryUserSchema = z.object({
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 50)),
  username: z.string().optional(),
  role: z.string().optional(),
  empName: z.string().optional(),
  status: z.string().optional(),
});
