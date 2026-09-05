import { PayGradeModel, IPayGrade } from './payGrade.model';
import { EmpStatusModel, IEmpStatus } from './empStatus.model';
import { JobCategoryModel, IJobCategory } from './jobCategory.model';
import { WorkShiftModel, IWorkShift } from './workShift.model';
import { LocationModel, ILocation } from './location.model';
import { DepartmentModel, IDepartment } from './department.model';
import { AppError } from '../../../common/errors/AppError';

const DEFAULT_PAY_GRADES = [
  { name: 'Grade 1 - Junior Executive', currency: 'United States Dollar' },
  { name: 'Grade 2 - Senior Associate', currency: 'United States Dollar' },
  { name: 'Grade 3 - Lead / Specialist', currency: 'United States Dollar' },
  { name: 'Grade 4 - Executive / Director', currency: 'United States Dollar' },
];

const DEFAULT_EMP_STATUSES = [
  { status: 'Full-Time Permanent' },
  { status: 'Full-Time Contract' },
  { status: 'Part-Time' },
  { status: 'Internship' },
];

const DEFAULT_JOB_CATEGORIES = [
  { category: 'Craft Workers' },
  { category: 'Laborers and Helpers' },
  { category: 'Office and Clerical Workers' },
  { category: 'Officials and Managers' },
  { category: 'Professionals' },
  { category: 'Sales Workers' },
  { category: 'Technicians' },
];

const DEFAULT_WORK_SHIFTS = [
  { name: 'General Shift', from: '08:00 AM', to: '05:00 PM', hours: '9.00' },
  { name: 'Morning Shift', from: '06:00 AM', to: '02:00 PM', hours: '8.00' },
  { name: 'Evening Shift', from: '02:00 PM', to: '10:00 PM', hours: '8.00' },
  { name: 'Night Shift', from: '10:00 PM', to: '06:00 AM', hours: '8.00' },
];

const DEFAULT_LOCATIONS = [
  { name: 'Canadian Regional HQ', city: 'Ottawa', country: 'Canada', phone: '1-876-267-6999', employees: 12 },
  { name: 'Kochi Development Center', city: 'Kochi', country: 'India', phone: '91-484-259110', employees: 45 },
  { name: 'London Regional Office', city: 'London', country: 'United Kingdom', phone: '44-20-7946-0912', employees: 18 },
];

const DEFAULT_DEPARTMENTS = [
  { name: 'Engineering & Technology', code: 'ENG', head: 'Sarah Joseph', employeeCount: 24 },
  { name: 'Human Resources', code: 'HR', head: 'Alex Morgan', employeeCount: 8 },
  { name: 'Sales & Marketing', code: 'MKT', head: 'David Lee', employeeCount: 15 },
  { name: 'Finance & Operations', code: 'FIN', head: 'Rachel Green', employeeCount: 10 },
];

export class JobConfigService {
  // Pay Grades
  async getPayGrades(): Promise<IPayGrade[]> {
    const count = await PayGradeModel.countDocuments();
    if (count === 0) {
      await PayGradeModel.insertMany(DEFAULT_PAY_GRADES);
    }
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
    const count = await EmpStatusModel.countDocuments();
    if (count === 0) {
      await EmpStatusModel.insertMany(DEFAULT_EMP_STATUSES);
    }
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
    const count = await JobCategoryModel.countDocuments();
    if (count === 0) {
      await JobCategoryModel.insertMany(DEFAULT_JOB_CATEGORIES);
    }
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
    const count = await WorkShiftModel.countDocuments();
    if (count === 0) {
      await WorkShiftModel.insertMany(DEFAULT_WORK_SHIFTS);
    }
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
    const count = await LocationModel.countDocuments();
    if (count === 0) {
      await LocationModel.insertMany(DEFAULT_LOCATIONS);
    }
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
    const count = await DepartmentModel.countDocuments();
    if (count === 0) {
      await DepartmentModel.insertMany(DEFAULT_DEPARTMENTS);
    }
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
