import { z } from 'zod';
import mongoose from 'mongoose';

export const mongoIdSchema = z.string().refine(
  (val) => mongoose.Types.ObjectId.isValid(val),
  { message: 'Invalid MongoDB ObjectId format' }
);

export const employeeIdParamSchema = z.object({
  id: z.string().min(1, 'Employee ID is required'),
});

const WorkExperienceSchema = z.object({
  company: z.string().min(1, 'Company is required'),
  title: z.string().min(1, 'Title is required'),
  from: z.string().min(1, 'From date is required'),
  to: z.string().min(1, 'To date is required'),
  comment: z.string().optional().default(''),
});

const EducationSchema = z.object({
  level: z.string().min(1, 'Education level is required'),
  year: z.string().min(1, 'Year is required'),
  gpa: z.string().optional().default(''),
  addedDate: z.string().optional().default(''),
  addedBy: z.string().optional().default(''),
});

const SkillSchema = z.object({
  skill: z.string().min(1, 'Skill is required'),
  expYears: z.string().optional().default(''),
});

const LanguageSchema = z.object({
  language: z.string().min(1, 'Language is required'),
  fluency: z.string().optional().default(''),
  competency: z.string().optional().default(''),
  comments: z.string().optional().default(''),
});

const LicenseSchema = z.object({
  type: z.string().min(1, 'License type is required'),
  issuedDate: z.string().optional().default(''),
  expiryDate: z.string().optional().default(''),
});

const MembershipSchema = z.object({
  membership: z.string().min(1, 'Membership is required'),
  paidBy: z.string().optional().default(''),
  amount: z.string().optional().default(''),
  currency: z.string().optional().default(''),
  commenceDate: z.string().optional().default(''),
});

export const createEmployeeBaseSchema = z.object({
  employeeId: z.string().optional(),
  id: z.string().optional(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().optional().default('+1-555-0199'),
  department: z.string().optional().default('Software'),
  departmentId: mongoIdSchema.optional(),
  jobTitle: z.string().optional().default('Engineering'),
  jobTitleId: mongoIdSchema.optional(),
  subUnit: z.string().optional().default('Software'),
  location: z.string().optional().default('Kochi'),
  locationId: mongoIdSchema.optional(),
  supervisor: z.string().optional().default(''),
  supervisorId: mongoIdSchema.optional(),
  employmentStatus: z.string().optional().default('Full-Time'),
  attendanceStatus: z.string().optional().default('Present'),
  category: z.enum(['staff', 'probation', 'training', 'interns']).optional().default('staff'),
  isTerminated: z.boolean().optional().default(false),
  otherId: z.string().optional().default(''),
  licenseNumber: z.string().optional().default(''),
  licenseExpiry: z.string().optional().default(''),
  nationality: z.string().optional().default(''),
  maritalStatus: z.string().optional().default('Single'),
  dob: z.string().optional().default(''),
  gender: z.string().optional().default('Female'),
  bloodType: z.string().optional().default(''),
  customField: z.string().optional().default(''),
  avatar: z.string().optional(),
  workExperience: z.array(WorkExperienceSchema).optional().default([]),
  education: z.array(EducationSchema).optional().default([]),
  skills: z.array(SkillSchema).optional().default([]),
  languages: z.array(LanguageSchema).optional().default([]),
  licenses: z.array(LicenseSchema).optional().default([]),
  memberships: z.array(MembershipSchema).optional().default([]),
});

export const createEmployeeSchema = createEmployeeBaseSchema.refine(
  (data) => Boolean(data.name?.trim() || (data.firstName?.trim() && data.lastName?.trim())),
  {
    message: 'Either full name or first and last name must be provided',
    path: ['name'],
  }
);

export const updateEmployeeSchema = createEmployeeBaseSchema.partial();

export const queryEmployeeSchema = z.object({
  search: z.string().optional(),
  name: z.string().optional(),
  employeeId: z.string().optional(),
  id: z.string().optional(),
  department: z.string().optional(),
  jobTitle: z.string().optional(),
  subUnit: z.string().optional(),
  location: z.string().optional(),
  supervisor: z.string().optional(),
  employmentStatus: z.string().optional(),
  attendanceStatus: z.string().optional(),
  category: z.string().optional(),
  includeTerminated: z
    .union([z.boolean(), z.string()])
    .optional()
    .transform((val) => {
      if (val === undefined) return false;
      if (typeof val === 'boolean') return val;
      return val.toLowerCase() === 'true' || val === '1' || val.toLowerCase().includes('terminated');
    }),
  page: z
    .union([z.number(), z.string()])
    .optional()
    .default(1)
    .transform((val) => Math.max(1, Number(val) || 1)),
  limit: z
    .union([z.number(), z.string()])
    .optional()
    .default(50)
    .transform((val) => Math.max(1, Math.min(100, Number(val) || 50))),
  sortBy: z.string().optional().default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;
export type UpdateEmployeeInput = z.infer<typeof updateEmployeeSchema>;
export type QueryEmployeeInput = z.infer<typeof queryEmployeeSchema>;
