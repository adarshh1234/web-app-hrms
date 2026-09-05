import { OrganizationModel, IOrganization } from './organization.model';

export class OrganizationRepository {
  async getOrganization(): Promise<IOrganization> {
    let org = await OrganizationModel.findOne();
    if (!org) {
      org = await OrganizationModel.create({
        name: 'HUREMASO',
        regNumber: 'TX-90823812C',
        taxId: 'TAX-884920',
        phone: '1-876-267-6999',
        fax: '1-876-267-7000',
        email: 'info@huremaso.org',
        addressStreet1: '324 Kochi Development Zone',
        addressStreet2: 'Suite 400',
        city: 'Kochi',
        state: 'Kerala',
        zipCode: '682030',
        country: 'India',
        notes: 'Primary corporate headquarters and offshore software engineering development center.',
        locations: [
          { name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 1 },
          { name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 5 },
        ],
      });
    }
    return org;
  }

  async updateOrganization(data: Partial<IOrganization>): Promise<IOrganization> {
    const org = await this.getOrganization();
    Object.assign(org, data);
    return await org.save();
  }

  async addLocation(locationData: any): Promise<IOrganization> {
    const org = await this.getOrganization();
    org.locations.push(locationData);
    return await org.save();
  }

  async removeLocation(locationId: string): Promise<IOrganization> {
    const org = await this.getOrganization();
    org.locations = org.locations.filter((loc: any) => loc._id?.toString() !== locationId && loc.id !== locationId);
    return await org.save();
  }
}

export const organizationRepository = new OrganizationRepository();
