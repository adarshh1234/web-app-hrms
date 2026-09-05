import { z } from 'zod';

export const updateBrandingSchema = z.object({
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  primaryFontColor: z.string().optional(),
  secondaryFontColor: z.string().optional(),
  gradient1: z.string().optional(),
  gradient2: z.string().optional(),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  loginBannerUrl: z.string().optional(),
  socialMediaToggled: z.boolean().optional(),
});
