import { EmployeeRepository, employeeRepository } from './employee.repository';
import { CreateEmployeeDTO, IEmployee, QueryEmployeeDTO, UpdateEmployeeDTO } from './employee.types';
import { AppError } from '../../common/errors/AppError';
import { DepartmentModel } from '../admin/jobConfig/department.model';
import { JobTitleModel } from '../admin/jobTitle/jobTitle.model';
import { LocationModel } from '../admin/jobConfig/location.model';
import mongoose from 'mongoose';

export class EmployeeService {
  constructor(private repo: EmployeeRepository = employeeRepository) {}

  private async generateUniqueEmployeeId(): Promise<string> {
    for (let i = 0; i < 10; i++) {
      const randomDigits = Math.floor(100000 + Math.random() * 900000);
      const candidateId = `EMP${randomDigits}`;
      const existing = await this.repo.findByEmployeeId(candidateId);
      if (!existing) {
        return candidateId;
      }
    }
    return `EMP${Date.now().toString().slice(-6)}`;
  }

  private parseNames(dto: { name?: string; firstName?: string; middleName?: string; lastName?: string }) {
    let firstName = dto.firstName?.trim() || '';
    let middleName = dto.middleName?.trim() || '';
    let lastName = dto.lastName?.trim() || '';
    let fullName = dto.name?.trim() || '';

    if (!fullName && (firstName || lastName)) {
      fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
    } else if (fullName && (!firstName || !lastName)) {
      const parts = fullName.split(/\s+/);
      firstName = parts[0] || 'Unknown';
      if (parts.length === 2) {
        lastName = parts[1] || '';
      } else if (parts.length > 2) {
        middleName = parts.slice(1, -1).join(' ');
        lastName = parts[parts.length - 1] || '';
      } else {
        lastName = parts[0] || '';
      }
    }

    return { firstName, middleName, lastName, fullName };
  }

  private async validateReferences(dto: {
    departmentId?: string | null;
    jobTitleId?: string | null;
    locationId?: string | null;
  }) {
    if (dto.departmentId) {
      if (!mongoose.Types.ObjectId.isValid(dto.departmentId)) {
        throw AppError.badRequest('Invalid departmentId format');
      }
      const deptExists = await DepartmentModel.findById(dto.departmentId);
      if (!deptExists) {
        throw AppError.badRequest('Referenced Department does not exist');
      }
    }

    if (dto.jobTitleId) {
      if (!mongoose.Types.ObjectId.isValid(dto.jobTitleId)) {
        throw AppError.badRequest('Invalid jobTitleId format');
      }
      const jobExists = await JobTitleModel.findById(dto.jobTitleId);
      if (!jobExists) {
        throw AppError.badRequest('Referenced Job Title does not exist');
      }
    }

    if (dto.locationId) {
      if (!mongoose.Types.ObjectId.isValid(dto.locationId)) {
        throw AppError.badRequest('Invalid locationId format');
      }
      const locExists = await LocationModel.findById(dto.locationId);
      if (!locExists) {
        throw AppError.badRequest('Referenced Location does not exist');
      }
    }
  }

  async createEmployee(dto: CreateEmployeeDTO): Promise<IEmployee> {
    let employeeId = dto.employeeId?.trim() || dto.id?.trim();
    if (employeeId) {
      const existingById = await this.repo.findByEmployeeId(employeeId);
      if (existingById) {
        throw AppError.badRequest(`Employee ID '${employeeId}' already exists`);
      }
    } else {
      employeeId = await this.generateUniqueEmployeeId();
    }

    const { firstName, middleName, lastName, fullName } = this.parseNames(dto);

    const email = (
      dto.email ||
      `${(firstName || 'employee').toLowerCase().replace(/[^a-z0-9]/g, '')}.${(lastName || 'user').toLowerCase().replace(/[^a-z0-9]/g, '')}${employeeId.replace(/\D/g, '')}@company.com`
    ).toLowerCase().trim();

    const existingByEmail = await this.repo.findByEmail(email);
    if (existingByEmail) {
      throw AppError.badRequest(`Employee with email '${email}' already exists`);
    }

    await this.validateReferences({
      departmentId: dto.departmentId,
      jobTitleId: dto.jobTitleId,
      locationId: dto.locationId,
    });

    const createPayload: any = {
      ...dto,
      employeeId,
      firstName,
      middleName,
      lastName,
      name: fullName,
      email,
      department: dto.department || 'Software',
      departmentId: dto.departmentId ? new mongoose.Types.ObjectId(dto.departmentId) : undefined,
      jobTitle: dto.jobTitle || 'Engineering',
      jobTitleId: dto.jobTitleId ? new mongoose.Types.ObjectId(dto.jobTitleId) : undefined,
      subUnit: dto.subUnit || dto.department || 'Software',
      location: dto.location || 'Kochi',
      locationId: dto.locationId ? new mongoose.Types.ObjectId(dto.locationId) : undefined,
      supervisor: dto.supervisor || '',
      supervisorId: dto.supervisorId ? new mongoose.Types.ObjectId(dto.supervisorId) : undefined,
      employmentStatus: dto.employmentStatus || 'Full-Time',
      attendanceStatus: dto.attendanceStatus || 'Present',
      category: dto.category || 'staff',
      isTerminated: dto.isTerminated || false,
    };

    return await this.repo.create(createPayload);
  }

  async getEmployees(query: QueryEmployeeDTO): Promise<{
    data: IEmployee[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }> {
    const filter: Record<string, any> = {};

    if (!query.includeTerminated) {
      filter.isTerminated = { $ne: true };
    }

    if (query.category && query.category !== 'all' && query.category !== 'staff') {
      filter.category = query.category;
    }

    if (query.search) {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { employeeId: searchRegex },
        { department: searchRegex },
        { jobTitle: searchRegex },
        { location: searchRegex },
        { subUnit: searchRegex },
        { supervisor: searchRegex },
      ];
    }

    if (query.name) {
      filter.name = new RegExp(query.name.trim(), 'i');
    }

    const idSearch = query.employeeId || query.id;
    if (idSearch) {
      filter.employeeId = new RegExp(idSearch.trim(), 'i');
    }

    if (query.department) {
      filter.department = new RegExp(query.department.trim(), 'i');
    }

    if (query.jobTitle) {
      filter.jobTitle = new RegExp(query.jobTitle.trim(), 'i');
    }

    if (query.subUnit) {
      filter.subUnit = new RegExp(query.subUnit.trim(), 'i');
    }

    if (query.location) {
      filter.location = new RegExp(query.location.trim(), 'i');
    }

    if (query.supervisor) {
      filter.supervisor = new RegExp(query.supervisor.trim(), 'i');
    }

    if (query.employmentStatus) {
      filter.employmentStatus = new RegExp(query.employmentStatus.trim(), 'i');
    }

    if (query.attendanceStatus) {
      filter.attendanceStatus = query.attendanceStatus.trim();
    }

    const page = query.page || 1;
    const limit = query.limit || 50;
    const skip = (page - 1) * limit;

    const sortBy = query.sortBy || 'createdAt';
    const sortOrder: 1 | -1 = query.sortOrder === 'asc' ? 1 : -1;
    const sort = { [sortBy]: sortOrder };

    const [data, total] = await Promise.all([
      this.repo.find(filter, { skip, limit, sort }),
      this.repo.count(filter),
    ]);

    return {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  async getEmployeeById(id: string): Promise<IEmployee> {
    const employee = await this.repo.findById(id);
    if (!employee) {
      throw AppError.notFound(`Employee not found with id '${id}'`);
    }
    return employee;
  }

  async updateEmployee(id: string, dto: UpdateEmployeeDTO): Promise<IEmployee> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw AppError.notFound(`Employee not found with id '${id}'`);
    }

    if (dto.email && dto.email.toLowerCase().trim() !== existing.email.toLowerCase().trim()) {
      const email = dto.email.toLowerCase().trim();
      const existingWithEmail = await this.repo.findByEmail(email);
      if (existingWithEmail && existingWithEmail._id.toString() !== existing._id.toString()) {
        throw AppError.badRequest(`Email '${email}' is already in use by another employee`);
      }
    }

    await this.validateReferences({
      departmentId: dto.departmentId,
      jobTitleId: dto.jobTitleId,
      locationId: dto.locationId,
    });

    const updatePayload: any = { ...dto };

    if (dto.departmentId !== undefined) {
      updatePayload.departmentId = dto.departmentId ? new mongoose.Types.ObjectId(dto.departmentId) : null;
    }
    if (dto.jobTitleId !== undefined) {
      updatePayload.jobTitleId = dto.jobTitleId ? new mongoose.Types.ObjectId(dto.jobTitleId) : null;
    }
    if (dto.locationId !== undefined) {
      updatePayload.locationId = dto.locationId ? new mongoose.Types.ObjectId(dto.locationId) : null;
    }
    if (dto.supervisorId !== undefined) {
      updatePayload.supervisorId = dto.supervisorId ? new mongoose.Types.ObjectId(dto.supervisorId) : null;
    }

    if (dto.name) {
      const { firstName, middleName, lastName, fullName } = this.parseNames({ name: dto.name });
      updatePayload.firstName = firstName;
      updatePayload.middleName = middleName;
      updatePayload.lastName = lastName;
      updatePayload.name = fullName;
    } else if (dto.firstName || dto.lastName || dto.middleName !== undefined) {
      const firstName = dto.firstName !== undefined ? dto.firstName.trim() : existing.firstName;
      const middleName = dto.middleName !== undefined ? dto.middleName.trim() : existing.middleName;
      const lastName = dto.lastName !== undefined ? dto.lastName.trim() : existing.lastName;
      const fullName = [firstName, middleName, lastName].filter(Boolean).join(' ');
      updatePayload.firstName = firstName;
      updatePayload.middleName = middleName;
      updatePayload.lastName = lastName;
      updatePayload.name = fullName;
    }

    if (dto.email) {
      updatePayload.email = dto.email.toLowerCase().trim();
    }

    const updated = await this.repo.update(id, updatePayload);
    if (!updated) {
      throw AppError.notFound(`Employee not found with id '${id}'`);
    }
    return updated;
  }

  async deleteEmployee(id: string): Promise<void> {
    const deleted = await this.repo.delete(id);
    if (!deleted) {
      throw AppError.notFound(`Employee not found with id '${id}'`);
    }
  }
}

export const employeeService = new EmployeeService();
