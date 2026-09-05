import { z } from 'zod';

export const updateOrganizationSchema = z.object({
  name: z.string().min(1, 'Organization name is required').optional(),
  regNumber: z.string().optional(),
  taxId: z.string().optional(),
  phone: z.string().optional(),
  fax: z.string().optional(),
  email: z.string().email('Invalid email format').optional().or(z.literal('')),
  addressStreet1: z.string().optional(),
  addressStreet2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.string().optional(),
  country: z.string().optional(),
  notes: z.string().optional(),
  structureTree: z.any().optional(),
});

export const addLocationSchema = z.object({
  name: z.string().min(1, 'Location name is required'),
  city: z.string().min(1, 'City is required'),
  country: z.string().min(1, 'Country is required'),
  phone: z.string().optional().default(''),
  employees: z.number().optional().default(1),
});
