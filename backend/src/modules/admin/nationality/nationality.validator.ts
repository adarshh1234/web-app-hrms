import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

export const createNationalitySchema = z.object({
  name: z.string().min(1, 'Nationality name is required').max(100),
  status: z.enum(['Active', 'Inactive']).optional().default('Active'),
});

export const updateNationalitySchema = createNationalitySchema.partial();

export const queryNationalitySchema = z.object({
  search: z.string().optional(),
  status: z.enum(['Active', 'Inactive']).optional(),
  page: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 1)),
  limit: z.string().optional().transform((val) => (val ? parseInt(val, 10) : 50)),
});
