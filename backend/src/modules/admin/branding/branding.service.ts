import { brandingRepository, BrandingRepository } from './branding.repository';
import { IBranding } from './branding.model';

export class BrandingService {
  constructor(private repo: BrandingRepository = brandingRepository) {}

  async getBranding(): Promise<IBranding> {
    return await this.repo.getBranding();
  }

  async updateBranding(data: Partial<IBranding>): Promise<IBranding> {
    return await this.repo.updateBranding(data);
  }
}

export const brandingService = new BrandingService();
