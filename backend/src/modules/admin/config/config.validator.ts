import { z } from 'zod';

export const updateConfigurationSchema = z.object({
  emailConfig: z.record(z.any()).optional(),
  emailSubscriptions: z.record(z.any()).optional(),
  localization: z.record(z.any()).optional(),
  modules: z.record(z.any()).optional(),
  socialAuth: z.record(z.any()).optional(),
  oauthClients: z.any().optional(),
  ldapAuth: z.record(z.any()).optional(),
});
