import { qualificationRepository, QualificationRepository } from './qualification.repository';
import { IQualification } from './qualification.model';
import { AppError } from '../../../common/errors/AppError';

export class QualificationService {
  constructor(private repo: QualificationRepository = qualificationRepository) {}

  async createQualification(data: Partial<IQualification>): Promise<IQualification> {
    return await this.repo.create(data);
  }

  async getQualifications(query: any): Promise<IQualification[]> {
    const filter: any = {};
    if (query.category) filter.category = query.category;
    if (query.search) filter.name = { $regex: query.search, $options: 'i' };
    return await this.repo.findAll(filter);
  }

  async getQualificationById(id: string): Promise<IQualification> {
    const item = await this.repo.findById(id);
    if (!item) {
      throw AppError.notFound(`Qualification with ID '${id}' not found`);
    }
    return item;
  }

  async updateQualification(id: string, data: Partial<IQualification>): Promise<IQualification> {
    await this.getQualificationById(id);
    const updated = await this.repo.update(id, data);
    return updated!;
  }

  async deleteQualification(id: string): Promise<void> {
    await this.getQualificationById(id);
    await this.repo.delete(id);
  }
}

export const qualificationService = new QualificationService();
