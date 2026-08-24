export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  department: string;
  jobTitle: string;
  subUnit: string;
  location: string;
  supervisor: string;
  employmentStatus: 'Full-Time' | 'Part-Time' | 'Contract' | 'Onboarding';
  attendanceStatus: 'Present' | 'Late' | 'On-Leave';
  // ESS details
  otherId?: string;
  licenseNumber?: string;
  licenseExpiry?: string;
  nationality?: string;
  maritalStatus?: 'Single' | 'Married' | 'Divorced' | 'Other';
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodType?: string;
  customField?: string;
}

export interface WorkExperience {
  company: string;
  title: string;
  from: string;
  to: string;
  comment: string;
}

export interface Education {
  level: string;
  year: string;
  gpa: string;
  addedDate: string;
  addedBy: string;
}

export interface Skill {
  skill: string;
  expYears: string;
}

export interface Language {
  language: string;
  fluency: string;
  competency: string;
  comments: string;
}

export interface License {
  type: string;
  issuedDate: string;
  expiryDate: string;
}

export interface Membership {
  membership: string;
  paidBy: string;
  amount: string;
  currency: string;
  commenceDate: string;
}
