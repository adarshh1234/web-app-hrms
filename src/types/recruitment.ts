export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  vacancy: string;
  hiringManager: string;
  dateApplied: string;
  status: 'Applied' | 'Shortlisted' | 'Interview' | 'Selected' | 'Onboarding' | 'Rejected';
  experienceYears: number;
  skills: string[];
}

export interface Vacancy {
  id: string;
  jobTitle: string;
  hiringManager: string;
  datePosted: string;
  status: 'Available' | 'Closed';
  noOfOpenings: number;
  department: string;
  description: string;
  minSalary?: number;
  maxSalary?: number;
  experienceLevel?: string;
  requiredQualifications?: string;
}
