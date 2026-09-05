import { PayGradeModel, IPayGrade } from './payGrade.model';
import { EmpStatusModel, IEmpStatus } from './empStatus.model';
import { JobCategoryModel, IJobCategory } from './jobCategory.model';
import { WorkShiftModel, IWorkShift } from './workShift.model';
import { LocationModel, ILocation } from './location.model';
import { DepartmentModel, IDepartment } from './department.model';
import { AppError } from '../../../common/errors/AppError';

export class JobConfigService {
  // Pay Grades
  async getPayGrades(): Promise<IPayGrade[]> {
    return await PayGradeModel.find().sort({ createdAt: -1 });
  }

  async createPayGrade(data: Partial<IPayGrade>): Promise<IPayGrade> {
    const item = new PayGradeModel(data);
    return await item.save();
  }

  async updatePayGrade(id: string, data: Partial<IPayGrade>): Promise<IPayGrade> {
    const updated = await PayGradeModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Pay Grade '${id}' not found`);
    return updated;
  }

  async deletePayGrade(id: string): Promise<void> {
    const res = await PayGradeModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Pay Grade '${id}' not found`);
  }

  // Employment Statuses
  async getEmpStatuses(): Promise<IEmpStatus[]> {
    return await EmpStatusModel.find().sort({ createdAt: -1 });
  }

  async createEmpStatus(data: Partial<IEmpStatus>): Promise<IEmpStatus> {
    const item = new EmpStatusModel(data);
    return await item.save();
  }

  async updateEmpStatus(id: string, data: Partial<IEmpStatus>): Promise<IEmpStatus> {
    const updated = await EmpStatusModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Employment Status '${id}' not found`);
    return updated;
  }

  async deleteEmpStatus(id: string): Promise<void> {
    const res = await EmpStatusModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Employment Status '${id}' not found`);
  }

  // Job Categories
  async getJobCategories(): Promise<IJobCategory[]> {
    return await JobCategoryModel.find().sort({ createdAt: -1 });
  }

  async createJobCategory(data: Partial<IJobCategory>): Promise<IJobCategory> {
    const item = new JobCategoryModel(data);
    return await item.save();
  }

  async updateJobCategory(id: string, data: Partial<IJobCategory>): Promise<IJobCategory> {
    const updated = await JobCategoryModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Job Category '${id}' not found`);
    return updated;
  }

  async deleteJobCategory(id: string): Promise<void> {
    const res = await JobCategoryModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Job Category '${id}' not found`);
  }

  // Work Shifts
  async getWorkShifts(): Promise<IWorkShift[]> {
    return await WorkShiftModel.find().sort({ createdAt: -1 });
  }

  async createWorkShift(data: Partial<IWorkShift>): Promise<IWorkShift> {
    const item = new WorkShiftModel(data);
    return await item.save();
  }

  async updateWorkShift(id: string, data: Partial<IWorkShift>): Promise<IWorkShift> {
    const updated = await WorkShiftModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Work Shift '${id}' not found`);
    return updated;
  }

  async deleteWorkShift(id: string): Promise<void> {
    const res = await WorkShiftModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Work Shift '${id}' not found`);
  }

  // Locations
  async getLocations(): Promise<ILocation[]> {
    return await LocationModel.find().sort({ createdAt: -1 });
  }

  async createLocation(data: Partial<ILocation>): Promise<ILocation> {
    const item = new LocationModel(data);
    return await item.save();
  }

  async updateLocation(id: string, data: Partial<ILocation>): Promise<ILocation> {
    const updated = await LocationModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Location '${id}' not found`);
    return updated;
  }

  async deleteLocation(id: string): Promise<void> {
    const res = await LocationModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Location '${id}' not found`);
  }

  // Departments
  async getDepartments(): Promise<IDepartment[]> {
    return await DepartmentModel.find().sort({ createdAt: -1 });
  }

  async createDepartment(data: Partial<IDepartment>): Promise<IDepartment> {
    const item = new DepartmentModel(data);
    return await item.save();
  }

  async updateDepartment(id: string, data: Partial<IDepartment>): Promise<IDepartment> {
    const updated = await DepartmentModel.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!updated) throw AppError.notFound(`Department '${id}' not found`);
    return updated;
  }

  async deleteDepartment(id: string): Promise<void> {
    const res = await DepartmentModel.findByIdAndDelete(id);
    if (!res) throw AppError.notFound(`Department '${id}' not found`);
  }
}

export const jobConfigService = new JobConfigService();
