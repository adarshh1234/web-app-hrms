import mongoose, { Document } from 'mongoose';
import { CreateEmployeeInput, UpdateEmployeeInput, QueryEmployeeInput } from './employee.validator';

export type EmploymentStatusType = 'Full-Time' | 'Part-Time' | 'Contract' | 'Onboarding' | string;
export type AttendanceStatusType = 'Present' | 'Late' | 'On-Leave' | string;
export type EmployeeCategoryType = 'probation' | 'training' | 'interns' | 'staff' | string;
export type MaritalStatusType = 'Single' | 'Married' | 'Divorced' | 'Other' | string;
export type GenderType = 'Male' | 'Female' | 'Other' | string;

export interface IWorkExperience {
  company: string;
  title: string;
  from: string;
  to: string;
  comment?: string;
}

export interface IEducation {
  level: string;
  year: string;
  gpa?: string;
  addedDate?: string;
  addedBy?: string;
}

export interface ISkill {
  skill: string;
  expYears?: string;
}

export interface ILanguage {
  language: string;
  fluency?: string;
  competency?: string;
  comments?: string;
}

export interface ILicense {
  type: string;
  issuedDate?: string;
  expiryDate?: string;
}

export interface IMembership {
  membership: string;
  paidBy?: string;
  amount?: string;
  currency?: string;
  commenceDate?: string;
}

export interface IEmployee extends Document {
  employeeId: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  departmentId?: mongoose.Types.ObjectId;
  jobTitle?: string;
  jobTitleId?: mongoose.Types.ObjectId;
  subUnit?: string;
  location?: string;
  locationId?: mongoose.Types.ObjectId;
  supervisor?: string;
  supervisorId?: mongoose.Types.ObjectId;
  employmentStatus: EmploymentStatusType;
  attendanceStatus: AttendanceStatusType;
  category: EmployeeCategoryType;
  isTerminated: boolean;
  otherId?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  nationality?: string;
  maritalStatus?: MaritalStatusType;
  dob?: string;
  gender?: GenderType;
  bloodType?: string;
  customField?: string;
  avatar?: string;
  workExperience: IWorkExperience[];
  education: IEducation[];
  skills: ISkill[];
  languages: ILanguage[];
  licenses: ILicense[];
  memberships: IMembership[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateEmployeeDTO = CreateEmployeeInput;
export type UpdateEmployeeDTO = UpdateEmployeeInput;
export type QueryEmployeeDTO = QueryEmployeeInput;
