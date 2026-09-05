import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

export const createQualificationSchema = z.object({
  category: z.enum(['education', 'licenses', 'skills', 'languages', 'memberships']),
  name: z.string().min(1, 'Qualification name/title is required'),
  subtitle: z.string().optional().default(''),
  details: z.record(z.any()).optional().default({}),
});

export const updateQualificationSchema = createQualificationSchema.partial();

export const queryQualificationSchema = z.object({
  category: z.enum(['education', 'licenses', 'skills', 'languages', 'memberships']).optional(),
  search: z.string().optional(),
});
