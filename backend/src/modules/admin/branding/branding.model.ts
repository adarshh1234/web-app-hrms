import mongoose, { Schema, Document } from 'mongoose';

export interface IBranding extends Document {
  primaryColor: string;
  secondaryColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
  gradient1: string;
  gradient2: string;
  logoUrl?: string;
  bannerUrl?: string;
  loginBannerUrl?: string;
  socialMediaToggled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BrandingSchema = new Schema<IBranding>(
  {
    primaryColor: { type: String, default: '#004848', trim: true },
    secondaryColor: { type: String, default: '#f1f5f9', trim: true },
    primaryFontColor: { type: String, default: '#ffffff', trim: true },
    secondaryFontColor: { type: String, default: '#1e293b', trim: true },
    gradient1: { type: String, default: '#002222', trim: true },
    gradient2: { type: String, default: '#007878', trim: true },
    logoUrl: { type: String, default: '', trim: true },
    bannerUrl: { type: String, default: '', trim: true },
    loginBannerUrl: { type: String, default: '', trim: true },
    socialMediaToggled: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

export const BrandingModel = mongoose.model<IBranding>('Branding', BrandingSchema);
