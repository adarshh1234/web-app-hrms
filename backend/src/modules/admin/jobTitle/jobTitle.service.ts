import { jobTitleRepository, JobTitleRepository } from './jobTitle.repository';
import { IJobTitle } from './jobTitle.model';
import { AppError } from '../../../common/errors/AppError';

export class JobTitleService {
  constructor(private repo: JobTitleRepository = jobTitleRepository) {}

  async createJobTitle(data: Partial<IJobTitle>): Promise<IJobTitle> {
    if (data.title) {
      const existing = await this.repo.findByTitle(data.title.trim());
      if (existing) {
        throw AppError.badRequest(`Job Title '${data.title}' already exists`);
      }
    }
    return await this.repo.create(data);
  }

  async getJobTitles(query: any): Promise<IJobTitle[]> {
    const filter: any = {};
    if (query.search) {
      filter.title = { $regex: query.search, $options: 'i' };
    }
    if (query.status) {
      filter.status = query.status;
    }
    const sortField = query.sortBy || 'title';
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    return await this.repo.findAll(filter, { [sortField]: sortOrder });
  }

  async getJobTitleById(id: string): Promise<IJobTitle> {
    const item = await this.repo.findById(id);
    if (!item) {
      throw AppError.notFound(`Job Title with ID '${id}' not found`);
    }
    return item;
  }

  async updateJobTitle(id: string, data: Partial<IJobTitle>): Promise<IJobTitle> {
    await this.getJobTitleById(id);
    if (data.title) {
      const existing = await this.repo.findByTitle(data.title.trim());
      if (existing && existing._id.toString() !== id) {
        throw AppError.badRequest(`Job Title '${data.title}' already exists`);
      }
    }
    const updated = await this.repo.update(id, data);
    return updated!;
  }

  async deleteJobTitle(id: string): Promise<void> {
    await this.getJobTitleById(id);
    await this.repo.delete(id);
  }
}

export const jobTitleService = new JobTitleService();
