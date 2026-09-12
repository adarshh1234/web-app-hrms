import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid ID format' }
);

// 1. Pay Grades
export const createPayGradeSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  currency: z.string().trim().optional().default('United States Dollar'),
  minSalary: z.number().nonnegative().optional(),
  maxSalary: z.number().nonnegative().optional(),
});
export const updatePayGradeSchema = createPayGradeSchema.partial();

// 2. Employment Statuses
export const createEmpStatusSchema = z.object({
  status: z.string().trim().min(1, 'Status is required'),
});
export const updateEmpStatusSchema = createEmpStatusSchema.partial();

// 3. Job Categories
export const createJobCategorySchema = z.object({
  category: z.string().trim().min(1, 'Category is required'),
});
export const updateJobCategorySchema = createJobCategorySchema.partial();

// 4. Work Shifts
export const createWorkShiftSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  from: z.string().trim().optional().default('08:00 AM'),
  to: z.string().trim().optional().default('05:00 PM'),
  hours: z.string().trim().optional().default('9.00'),
});
export const updateWorkShiftSchema = createWorkShiftSchema.partial();

// 5. Locations (JobConfig Standalone)
export const createLocationSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  city: z.string().trim().min(1, 'City is required'),
  country: z.string().trim().min(1, 'Country is required').optional().default('United States'),
  phone: z.string().trim().optional().default('+1-555-0100'),
  employees: z.number().nonnegative().optional().default(0),
});
export const updateLocationSchema = createLocationSchema.partial();

// 6. Departments
export const createDepartmentSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  code: z.string().trim().optional().default('DEPT'),
  head: z.string().trim().optional().default('Unassigned'),
  employeeCount: z.number().nonnegative().optional().default(0),
});
export const updateDepartmentSchema = createDepartmentSchema.partial();
