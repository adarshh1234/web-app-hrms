import { QualificationModel, IQualification } from './qualification.model';

export class QualificationRepository {
  async create(data: Partial<IQualification>): Promise<IQualification> {
    const item = new QualificationModel(data);
    return await item.save();
  }

  async findById(id: string): Promise<IQualification | null> {
    return await QualificationModel.findById(id);
  }

  async findAll(filter: any = {}): Promise<IQualification[]> {
    return await QualificationModel.find(filter).sort({ createdAt: -1 });
  }

  async update(id: string, data: Partial<IQualification>): Promise<IQualification | null> {
    return await QualificationModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await QualificationModel.findByIdAndDelete(id);
    return !!res;
  }
}

export const qualificationRepository = new QualificationRepository();
