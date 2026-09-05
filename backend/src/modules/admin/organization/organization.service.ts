import { organizationRepository, OrganizationRepository } from './organization.repository';
import { IOrganization } from './organization.model';

export class OrganizationService {
  constructor(private repo: OrganizationRepository = organizationRepository) {}

  async getOrganization(): Promise<IOrganization> {
    return await this.repo.getOrganization();
  }

  async updateOrganization(data: Partial<IOrganization>): Promise<IOrganization> {
    return await this.repo.updateOrganization(data);
  }

  async addLocation(locationData: any): Promise<IOrganization> {
    return await this.repo.addLocation(locationData);
  }

  async removeLocation(locationId: string): Promise<IOrganization> {
    return await this.repo.removeLocation(locationId);
  }
}

export const organizationService = new OrganizationService();
