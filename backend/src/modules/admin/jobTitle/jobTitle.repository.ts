import { JobTitleModel, IJobTitle } from './jobTitle.model';

export class JobTitleRepository {
  async create(data: Partial<IJobTitle>): Promise<IJobTitle> {
    const item = new JobTitleModel(data);
    return await item.save();
  }

  async findById(id: string): Promise<IJobTitle | null> {
    return await JobTitleModel.findById(id);
  }

  async findByTitle(title: string): Promise<IJobTitle | null> {
    return await JobTitleModel.findOne({ title: { $regex: `^${title}$`, $options: 'i' } });
  }

  async findAll(filter: any = {}, sort: any = { title: 1 }): Promise<IJobTitle[]> {
    return await JobTitleModel.find(filter).sort(sort);
  }

  async update(id: string, data: Partial<IJobTitle>): Promise<IJobTitle | null> {
    return await JobTitleModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await JobTitleModel.findByIdAndDelete(id);
    return !!res;
  }
}

export const jobTitleRepository = new JobTitleRepository();
