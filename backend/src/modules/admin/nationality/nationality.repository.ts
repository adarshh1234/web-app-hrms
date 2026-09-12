import { NationalityModel, INationality } from './nationality.model';
import { escapeRegex } from '../../../common/utils/regex';

export class NationalityRepository {
  async create(data: Partial<INationality>): Promise<INationality> {
    const item = new NationalityModel(data);
    return await item.save();
  }

  async findById(id: string): Promise<INationality | null> {
    return await NationalityModel.findById(id);
  }

  async findByName(name: string): Promise<INationality | null> {
    return await NationalityModel.findOne({ name: { $regex: `^${escapeRegex(name)}$`, $options: 'i' } });
  }

  async findAll(filter: any = {}, options: { page: number; limit: number } = { page: 1, limit: 50 }): Promise<{ items: INationality[]; total: number }> {
    const skip = (options.page - 1) * options.limit;
    const [items, total] = await Promise.all([
      NationalityModel.find(filter).sort({ name: 1 }).skip(skip).limit(options.limit),
      NationalityModel.countDocuments(filter),
    ]);
    return { items, total };
  }

  async update(id: string, data: Partial<INationality>): Promise<INationality | null> {
    return await NationalityModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await NationalityModel.findByIdAndDelete(id);
    return !!res;
  }
}

export const nationalityRepository = new NationalityRepository();
