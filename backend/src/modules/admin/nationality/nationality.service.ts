import { nationalityRepository, NationalityRepository } from './nationality.repository';
import { INationality } from './nationality.model';
import { AppError } from '../../../common/errors/AppError';

export class NationalityService {
  constructor(private repo: NationalityRepository = nationalityRepository) {}

  async createNationality(data: Partial<INationality>): Promise<INationality> {
    if (data.name) {
      const existing = await this.repo.findByName(data.name.trim());
      if (existing) {
        throw AppError.badRequest(`Nationality '${data.name}' already exists`);
      }
    }
    return await this.repo.create(data);
  }

  async getNationalities(query: any): Promise<{ data: INationality[]; pagination: any }> {
    const page = query.page || 1;
    const limit = query.limit || 50;

    const filter: any = {};
    if (query.search) {
      filter.name = { $regex: query.search, $options: 'i' };
    }
    if (query.status) {
      filter.status = query.status;
    }

    const { items, total } = await this.repo.findAll(filter, { page, limit });
    return {
      data: items,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit) || 1,
        pageSize: limit,
      },
    };
  }

  async getNationalityById(id: string): Promise<INationality> {
    const item = await this.repo.findById(id);
    if (!item) {
      throw AppError.notFound(`Nationality with ID '${id}' not found`);
    }
    return item;
  }

  async updateNationality(id: string, data: Partial<INationality>): Promise<INationality> {
    await this.getNationalityById(id);
    if (data.name) {
      const existing = await this.repo.findByName(data.name.trim());
      if (existing && existing._id.toString() !== id) {
        throw AppError.badRequest(`Nationality '${data.name}' already exists`);
      }
    }
    const updated = await this.repo.update(id, data);
    return updated!;
  }

  async deleteNationality(id: string): Promise<void> {
    await this.getNationalityById(id);
    await this.repo.delete(id);
  }
}

export const nationalityService = new NationalityService();
