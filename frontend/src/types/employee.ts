export interface WorkExperience {
  company: string;
  title: string;
  from: string;
  to: string;
  comment?: string;
}

export interface Education {
  level: string;
  year: string;
  gpa?: string;
  addedDate?: string;
  addedBy?: string;
}

export interface Skill {
  skill: string;
  expYears?: string;
}

export interface Language {
  language: string;
  fluency?: string;
  competency?: string;
  comments?: string;
}

export interface License {
  type: string;
  issuedDate?: string;
  expiryDate?: string;
}

export interface Membership {
  membership: string;
  paidBy?: string;
  amount?: string;
  currency?: string;
  commenceDate?: string;
}

export interface Employee {
  id: string;
  employeeId?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  departmentId?: string;
  jobTitle?: string;
  jobTitleId?: string;
  subUnit?: string;
  location?: string;
  locationId?: string;
  supervisor?: string;
  supervisorId?: string;
  employmentStatus:
    | 'Freelance'
    | 'Full-Time Contract'
    | 'Full-Time Permanent'
    | 'Full-Time Probation'
    | 'Part-Time Contract'
    | 'Part-Time Internship'
    | 'Full-Time'
    | 'Part-Time'
    | 'Contract'
    | 'Onboarding'
    | string;
  attendanceStatus: 'Present' | 'Late' | 'On-Leave' | string;
  category?: 'probation' | 'training' | 'interns' | 'staff' | string;
  avatar?: string;
  isTerminated?: boolean;
  // ESS details
  otherId?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  nationality?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Other' | string;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other' | string;
  bloodType?: string;
  customField?: string;
  workExperience?: WorkExperience[];
  education?: Education[];
  skills?: Skill[];
  languages?: Language[];
  licenses?: License[];
  memberships?: Membership[];
  createdAt?: string;
  updatedAt?: string;
}
