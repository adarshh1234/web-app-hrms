import mongoose from 'mongoose';
import { EmployeeModel } from './employee.model';
import { IEmployee } from './employee.types';

export class EmployeeRepository {
  async create(data: Partial<IEmployee>): Promise<IEmployee> {
    const employee = new EmployeeModel(data);
    return await employee.save();
  }

  async findById(id: string): Promise<IEmployee | null> {
    if (mongoose.Types.ObjectId.isValid(id)) {
      const doc = await EmployeeModel.findById(id);
      if (doc) return doc;
    }
    return await EmployeeModel.findOne({ employeeId: id });
  }

  async findByEmployeeId(employeeId: string): Promise<IEmployee | null> {
    return await EmployeeModel.findOne({ employeeId });
  }

  async findByEmail(email: string): Promise<IEmployee | null> {
    return await EmployeeModel.findOne({ email: email.toLowerCase().trim() });
  }

  async find(
    filter: Record<string, any>,
    options: { skip: number; limit: number; sort: Record<string, 1 | -1> }
  ): Promise<IEmployee[]> {
    return await EmployeeModel.find(filter)
      .sort(options.sort)
      .skip(options.skip)
      .limit(options.limit);
  }

  async count(filter: Record<string, any>): Promise<number> {
    return await EmployeeModel.countDocuments(filter);
  }

  async update(id: string, data: Partial<IEmployee>): Promise<IEmployee | null> {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { employeeId: id };

    return await EmployeeModel.findOneAndUpdate(query, { $set: data }, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IEmployee | null> {
    const query = mongoose.Types.ObjectId.isValid(id)
      ? { _id: id }
      : { employeeId: id };

    return await EmployeeModel.findOneAndDelete(query);
  }
}

export const employeeRepository = new EmployeeRepository();
