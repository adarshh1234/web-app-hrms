import { UserModel, IUser } from './user.model';

export class UserRepository {
  async create(data: Partial<IUser>): Promise<IUser> {
    const user = new UserModel(data);
    return await user.save();
  }

  async findById(id: string): Promise<IUser | null> {
    return await UserModel.findById(id);
  }

  async findByUsername(username: string): Promise<IUser | null> {
    return await UserModel.findOne({ username });
  }

  async findAll(filter: any = {}, options: { page: number; limit: number } = { page: 1, limit: 50 }): Promise<{ users: IUser[]; total: number }> {
    const skip = (options.page - 1) * options.limit;
    const [users, total] = await Promise.all([
      UserModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(options.limit),
      UserModel.countDocuments(filter),
    ]);
    return { users, total };
  }

  async update(id: string, data: Partial<IUser>): Promise<IUser | null> {
    return await UserModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<boolean> {
    const res = await UserModel.findByIdAndDelete(id);
    return !!res;
  }
}

export const userRepository = new UserRepository();
