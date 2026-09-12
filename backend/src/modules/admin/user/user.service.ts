import { userRepository, UserRepository } from './user.repository';
import { IUser } from './user.model';
import { AppError } from '../../../common/errors/AppError';
import { escapeRegex } from '../../../common/utils/regex';

export class UserService {
  constructor(private repo: UserRepository = userRepository) {}

  async createUser(data: Partial<IUser>): Promise<IUser> {
    if (data.username) {
      const existing = await this.repo.findByUsername(data.username);
      if (existing) {
        throw AppError.badRequest(`Username '${data.username}' is already in use`);
      }
    }
    return await this.repo.create(data);
  }

  async getUsers(query: any): Promise<{ data: IUser[]; pagination: any }> {
    const page = query.page || 1;
    const limit = query.limit || 50;

    const filter: any = {};
    if (query.username) filter.username = { $regex: escapeRegex(query.username), $options: 'i' };
    if (query.empName) filter.empName = { $regex: escapeRegex(query.empName), $options: 'i' };
    if (query.role) filter.role = query.role;
    if (query.status) filter.status = query.status;

    const { users, total } = await this.repo.findAll(filter, { page, limit });
    return {
      data: users,
      pagination: {
        totalItems: total,
        currentPage: page,
        totalPages: Math.ceil(total / limit) || 1,
        pageSize: limit,
      },
    };
  }

  async getUserById(id: string): Promise<IUser> {
    const user = await this.repo.findById(id);
    if (!user) {
      throw AppError.notFound(`User with ID '${id}' not found`);
    }
    return user;
  }

  async updateUser(id: string, data: Partial<IUser>): Promise<IUser> {
    await this.getUserById(id);
    if (data.username) {
      const existing = await this.repo.findByUsername(data.username);
      if (existing && existing._id.toString() !== id) {
        throw AppError.badRequest(`Username '${data.username}' is already in use`);
      }
    }
    const updated = await this.repo.update(id, data);
    return updated!;
  }

  async updateUserStatus(id: string, status: 'Enabled' | 'Disabled'): Promise<IUser> {
    return await this.updateUser(id, { status });
  }

  async deleteUser(id: string): Promise<void> {
    await this.getUserById(id);
    await this.repo.delete(id);
  }
}

export const userService = new UserService();
