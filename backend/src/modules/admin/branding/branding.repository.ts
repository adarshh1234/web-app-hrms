import { BrandingModel, IBranding } from './branding.model';

export class BrandingRepository {
  async getBranding(): Promise<IBranding> {
    let branding = await BrandingModel.findOne();
    if (!branding) {
      branding = await BrandingModel.create({
        primaryColor: '#004848',
        secondaryColor: '#f1f5f9',
        primaryFontColor: '#ffffff',
        secondaryFontColor: '#1e293b',
        gradient1: '#002222',
        gradient2: '#007878',
        socialMediaToggled: true,
      });
    }
    return branding;
  }

  async updateBranding(data: Partial<IBranding>): Promise<IBranding> {
    const branding = await this.getBranding();
    Object.assign(branding, data);
    return await branding.save();
  }
}

export const brandingRepository = new BrandingRepository();
