import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

export const createJobTitleSchema = z.object({
  title: z.string().min(1, 'Job title is required').max(100),
  description: z.string().optional().default(''),
  status: z.enum(['Active', 'Inactive']).optional().default('Active'),
});

export const updateJobTitleSchema = createJobTitleSchema.partial();

export const queryJobTitleSchema = z.object({
  search: z.string().optional(),
  status: z.enum(['Active', 'Inactive']).optional(),
  sortBy: z.enum(['title', 'createdAt']).optional().default('title'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('asc'),
});
