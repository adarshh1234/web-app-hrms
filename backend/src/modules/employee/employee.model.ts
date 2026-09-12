import mongoose, { Schema } from 'mongoose';
import {
  IEmployee,
  IWorkExperience,
  IEducation,
  ISkill,
  ILanguage,
  ILicense,
  IMembership,
} from './employee.types';

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    company: { type: String, required: true, trim: true },
    title: { type: String, required: true, trim: true },
    from: { type: String, required: true, trim: true },
    to: { type: String, required: true, trim: true },
    comment: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const EducationSchema = new Schema<IEducation>(
  {
    level: { type: String, required: true, trim: true },
    year: { type: String, required: true, trim: true },
    gpa: { type: String, default: '', trim: true },
    addedDate: { type: String, default: '', trim: true },
    addedBy: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const SkillSchema = new Schema<ISkill>(
  {
    skill: { type: String, required: true, trim: true },
    expYears: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const LanguageSchema = new Schema<ILanguage>(
  {
    language: { type: String, required: true, trim: true },
    fluency: { type: String, default: '', trim: true },
    competency: { type: String, default: '', trim: true },
    comments: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const LicenseSchema = new Schema<ILicense>(
  {
    type: { type: String, required: true, trim: true },
    issuedDate: { type: String, default: '', trim: true },
    expiryDate: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const MembershipSchema = new Schema<IMembership>(
  {
    membership: { type: String, required: true, trim: true },
    paidBy: { type: String, default: '', trim: true },
    amount: { type: String, default: '', trim: true },
    currency: { type: String, default: '', trim: true },
    commenceDate: { type: String, default: '', trim: true },
  },
  { _id: false }
);

const EmployeeSchema = new Schema<IEmployee>(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    middleName: {
      type: String,
      default: '',
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      default: '+1-555-0199',
      trim: true,
    },
    department: {
      type: String,
      default: 'Software',
      trim: true,
      index: true,
    },
    departmentId: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
    },
    jobTitle: {
      type: String,
      default: 'Engineering',
      trim: true,
      index: true,
    },
    jobTitleId: {
      type: Schema.Types.ObjectId,
      ref: 'JobTitle',
    },
    subUnit: {
      type: String,
      default: 'Software',
      trim: true,
      index: true,
    },
    location: {
      type: String,
      default: 'Kochi',
      trim: true,
      index: true,
    },
    locationId: {
      type: Schema.Types.ObjectId,
      ref: 'Location',
    },
    supervisor: {
      type: String,
      default: '',
      trim: true,
      index: true,
    },
    supervisorId: {
      type: Schema.Types.ObjectId,
      ref: 'Employee',
    },
    employmentStatus: {
      type: String,
      default: 'Full-Time',
      trim: true,
      index: true,
    },
    attendanceStatus: {
      type: String,
      default: 'Present',
      trim: true,
      index: true,
    },
    category: {
      type: String,
      enum: ['staff', 'probation', 'training', 'interns'],
      default: 'staff',
      index: true,
    },
    isTerminated: {
      type: Boolean,
      default: false,
      index: true,
    },
    otherId: {
      type: String,
      default: '',
      trim: true,
    },
    licenseNumber: {
      type: String,
      default: '',
      trim: true,
    },
    licenseExpiry: {
      type: String,
      default: '',
      trim: true,
    },
    nationality: {
      type: String,
      default: '',
      trim: true,
    },
    maritalStatus: {
      type: String,
      default: 'Single',
      trim: true,
    },
    dob: {
      type: String,
      default: '',
      trim: true,
    },
    gender: {
      type: String,
      default: 'Female',
      trim: true,
    },
    bloodType: {
      type: String,
      default: '',
      trim: true,
    },
    customField: {
      type: String,
      default: '',
      trim: true,
    },
    avatar: {
      type: String,
      default: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    workExperience: {
      type: [WorkExperienceSchema],
      default: [],
    },
    education: {
      type: [EducationSchema],
      default: [],
    },
    skills: {
      type: [SkillSchema],
      default: [],
    },
    languages: {
      type: [LanguageSchema],
      default: [],
    },
    licenses: {
      type: [LicenseSchema],
      default: [],
    },
    memberships: {
      type: [MembershipSchema],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (_doc, ret: any) {
        ret.id = ret.employeeId || ret._id.toString();
        return ret;
      },
    },
  }
);

export const EmployeeModel = mongoose.model<IEmployee>('Employee', EmployeeSchema);
