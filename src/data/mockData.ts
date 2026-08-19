// TypeScript interfaces for our HR system

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

export interface LeaveRequest {
  id: string;
  employeeName: string;
  department: string;
  leaveType: string;
  fromDate: string;
  toDate: string;
  numberOfDays: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  comments: string;
  dateRequested: string;
}

export interface LeaveBalance {
  leaveType: string;
  entitled: number;
  pending: number;
  scheduled: number;
  taken: number;
  balance: number;
}

export interface AttendanceRecord {
  id: string;
  employeeName: string;
  date: string;
  punchIn: string;
  punchInNote: string;
  punchOut: string;
  punchOutNote: string;
  durationHours: number;
  status: 'Completed' | 'Pending' | 'Missing Out';
}

export interface FinanceRequest {
  id: string;
  employeeName: string;
  employeeId: string;
  requestType: string;
  department: string;
  dateRequested: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  description: string;
}

export interface CompanyEvent {
  id: string;
  title: string;
  type: 'Training Session' | 'Team Meeting' | 'Holiday' | 'Interview' | 'Support Event';
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  status: 'Planning' | 'In Progress' | 'Upcoming' | 'Completed';
  participants: string[];
  tasks: { id: string; name: string; assignee: string; dueDate: string; status: 'Not Started' | 'In Progress' | 'Completed' }[];
}

export interface PerformanceReview {
  id: string;
  employeeName: string;
  reviewer: string;
  jobTitle: string;
  reviewPeriod: string;
  dueDate: string;
  status: 'Pending Self Review' | 'Pending Supervisor Review' | 'Completed';
  rating?: number;
}

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  resolvedDate?: string;
  category: 'System Error' | 'Access Issue' | 'Hardware' | 'Other';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Resolved';
}

export interface AssociationRequest {
  id: string;
  employeeName: string;
  dateRequested: string;
  requestDetails: string;
  status: 'Pending' | 'Accepted' | 'Cancelled';
}

export interface MessageLog {
  id: string;
  channel: 'WhatsApp' | 'SMS' | 'Email' | 'Employee App';
  subject: string;
  recipients: string;
  message: string;
  dateSent: string;
  status: 'Sent' | 'Draft';
  replies?: number;
}

// Initial Data Sets
const initialEmployees: Employee[] = [
  {
    id: "EMP329556",
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    phone: "+1-415-555-0199",
    department: "Marketing",
    jobTitle: "Senior Product Designer",
    subUnit: "Marketing",
    location: "Kochi",
    supervisor: "Amal Benny",
    employmentStatus: "Full-Time",
    attendanceStatus: "Present",
    otherId: "OTH-9082",
    licenseNumber: "DL-CA98218",
    licenseExpiry: "2028-12-31",
    nationality: "Canadian",
    maritalStatus: "Single",
    dob: "1994-06-15",
    gender: "Female",
    bloodType: "O+",
    customField: "Premium Member"
  },
  {
    id: "EMP329557",
    name: "Michael Chen",
    email: "michael.c@company.com",
    phone: "+1-415-555-0182",
    department: "Engineering",
    jobTitle: "Software Engineer",
    subUnit: "Texas R&D",
    location: "Texas",
    supervisor: "Amal Benny",
    employmentStatus: "Full-Time",
    attendanceStatus: "Present",
    nationality: "American",
    maritalStatus: "Married",
    dob: "1988-11-20",
    gender: "Male",
    bloodType: "A-"
  },
  {
    id: "EMP329558",
    name: "James Wilson",
    email: "james.w@company.com",
    phone: "+1-415-555-0144",
    department: "Sales",
    jobTitle: "Account Manager",
    subUnit: "Sales",
    location: "Canadian Regional HQ",
    supervisor: "Alexa",
    employmentStatus: "Full-Time",
    attendanceStatus: "Present",
    nationality: "Canadian",
    maritalStatus: "Married",
    dob: "1985-04-03",
    gender: "Male"
  },
  {
    id: "EMP329559",
    name: "Lisa Anderson",
    email: "lisa.a@company.com",
    phone: "+1-415-555-0121",
    department: "Marketing",
    jobTitle: "Content Manager",
    subUnit: "Marketing",
    location: "Kochi",
    supervisor: "Sarah Johnson",
    employmentStatus: "Full-Time",
    attendanceStatus: "On-Leave",
    nationality: "Indian",
    maritalStatus: "Single",
    dob: "1996-09-12",
    gender: "Female",
    bloodType: "B+"
  },
  {
    id: "EMP329560",
    name: "Amal Benny",
    email: "amal.b@company.com",
    phone: "+1-415-555-0133",
    department: "Engineering",
    jobTitle: "Engineering Lead",
    subUnit: "Texas R&D",
    location: "Texas",
    supervisor: "HUREMASO CEO",
    employmentStatus: "Full-Time",
    attendanceStatus: "Present",
    nationality: "Indian",
    maritalStatus: "Married"
  },
  {
    id: "EMP329561",
    name: "Karthika Balan",
    email: "karthika.b@company.com",
    phone: "+1-415-555-0155",
    department: "IT",
    jobTitle: "System Analyst",
    subUnit: "Administration",
    location: "Kochi",
    supervisor: "Amal Benny",
    employmentStatus: "Full-Time",
    attendanceStatus: "Late",
    nationality: "Indian",
    maritalStatus: "Single"
  },
  {
    id: "EMP329562",
    name: "Sarah Joseph",
    email: "sarah.joseph@company.com",
    phone: "+1-415-555-0167",
    department: "Human Resources",
    jobTitle: "HR Manager",
    subUnit: "Human Resources",
    location: "Kochi",
    supervisor: "Alexa",
    employmentStatus: "Full-Time",
    attendanceStatus: "Present",
    nationality: "Indian",
    maritalStatus: "Married"
  }
];

const initialVacancies: Vacancy[] = [
  {
    id: "VAC001",
    jobTitle: "Nodejs developer",
    hiringManager: "Amal Benny",
    datePosted: "2024-29-03",
    status: "Available",
    noOfOpenings: 2,
    department: "Engineering",
    description: "Looking for an experienced Node.js backend developer to design robust microservices.",
    minSalary: 80000,
    maxSalary: 110000,
    experienceLevel: "Mid-Senior Level",
    requiredQualifications: "BTech in Computer Science or equivalent, 3+ years experience with Node.js and SQL."
  },
  {
    id: "VAC002",
    jobTitle: "Next js Engineer",
    hiringManager: "Amal Benny",
    datePosted: "2024-29-03",
    status: "Available",
    noOfOpenings: 1,
    department: "Engineering",
    description: "Frontend developer specialized in React, Next.js and Tailwind CSS.",
    minSalary: 90000,
    maxSalary: 130000,
    experienceLevel: "Senior Level"
  },
  {
    id: "VAC003",
    jobTitle: "Senior Product Designer",
    hiringManager: "Sarah Johnson",
    datePosted: "2024-29-03",
    status: "Available",
    noOfOpenings: 1,
    department: "Marketing",
    description: "Lead design decisions across HR web dashboard modules."
  }
];

const initialCandidates: Candidate[] = [
  {
    id: "CAN001",
    name: "Karthika",
    email: "karthika@example.com",
    phone: "+91 9876543210",
    vacancy: "Next js",
    hiringManager: "Amal Benny",
    dateApplied: "2024-29-03",
    status: "Shortlisted",
    experienceYears: 3,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
  },
  {
    id: "CAN002",
    name: "Amal Benny",
    email: "amal.b.candidate@example.com",
    phone: "+91 9446293812",
    vacancy: "Nodejs developer",
    hiringManager: "Amal Benny",
    dateApplied: "2024-29-03",
    status: "Shortlisted",
    experienceYears: 4,
    skills: ["Node.js", "Express", "PostgreSQL", "Docker"]
  },
  {
    id: "CAN003",
    name: "Sarah Johnson",
    email: "sarah.j.design@example.com",
    phone: "+1 650 908 1123",
    vacancy: "Senior Product Designer",
    hiringManager: "Sarah Johnson",
    dateApplied: "2024-29-03",
    status: "Interview",
    experienceYears: 6,
    skills: ["Figma", "UI/UX", "Prototyping", "Design Systems"]
  }
];

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: "LR001",
    employeeName: "Michael Chen",
    department: "Engineering",
    leaveType: "CAN-Vacation",
    fromDate: "2026-06-25",
    toDate: "2026-06-28",
    numberOfDays: 3,
    status: "Pending",
    comments: "Family vacation trip.",
    dateRequested: "2026-06-20"
  },
  {
    id: "LR002",
    employeeName: "Lisa Anderson",
    department: "Marketing",
    leaveType: "CAN-Personal",
    fromDate: "2026-06-18",
    toDate: "2026-06-19",
    numberOfDays: 1.5,
    status: "Approved",
    comments: "Personal urgent work.",
    dateRequested: "2026-06-15"
  }
];

const initialLeaveBalances: LeaveBalance[] = [
  { leaveType: "CAN-Vacation", entitled: 15, pending: 3, scheduled: 2, taken: 4, balance: 6 },
  { leaveType: "CAN-Personal", entitled: 5, pending: 0, scheduled: 1, taken: 2, balance: 2 },
  { leaveType: "CAN-Sick", entitled: 10, pending: 0, scheduled: 0, taken: 1, balance: 9 }
];

const initialAttendanceRecords: AttendanceRecord[] = [
  {
    id: "ATT001",
    employeeName: "Sarah Johnson",
    date: "2026-08-17",
    punchIn: "08:00 AM",
    punchInNote: "Arrived on time",
    punchOut: "05:00 PM",
    punchOutNote: "Finished daily tasks",
    durationHours: 9.0,
    status: "Completed"
  },
  {
    id: "ATT002",
    employeeName: "Michael Chen",
    date: "2026-08-17",
    punchIn: "08:15 AM",
    punchInNote: "Slight traffic delay",
    punchOut: "05:15 PM",
    punchOutNote: "Deployment checked",
    durationHours: 9.0,
    status: "Completed"
  },
  {
    id: "ATT003",
    employeeName: "Karthika Balan",
    date: "2026-08-17",
    punchIn: "08:35 AM",
    punchInNote: "Late arrival",
    punchOut: "05:00 PM",
    punchOutNote: "Logged out",
    durationHours: 8.42,
    status: "Completed"
  }
];

const initialFinanceRequests: FinanceRequest[] = [
  {
    id: "FIN001",
    employeeName: "Sarah Johnson",
    employeeId: "EMP329556",
    requestType: "Training Course Payment",
    department: "Marketing",
    dateRequested: "2026-02-14",
    amount: 1800,
    status: "Pending",
    description: "Advanced Product Design Bootcamp course."
  },
  {
    id: "FIN002",
    employeeName: "Michael Chen",
    employeeId: "EMP329557",
    requestType: "Training Course Payment",
    department: "Engineering",
    dateRequested: "2026-02-14",
    amount: 1200,
    status: "Approved",
    description: "AWS Solutions Architect training certification fee."
  },
  {
    id: "FIN003",
    employeeName: "Lisa Anderson",
    employeeId: "EMP329559",
    requestType: "Training Course Payment",
    department: "Marketing",
    dateRequested: "2026-02-14",
    amount: 800,
    status: "Rejected",
    description: "Creative Copywriting Seminar."
  }
];

const initialEvents: CompanyEvent[] = [
  {
    id: "EVT001",
    title: "Annual Leadership Training 2024",
    type: "Training Session",
    description: "Annual leadership workshop for leads and managers.",
    startDate: "2026-07-20",
    endDate: "2026-07-20",
    startTime: "09:00 AM",
    endTime: "04:00 PM",
    location: "In-Person",
    venue: "Main Conference Room",
    status: "In Progress",
    participants: ["Sarah Johnson", "Amal Benny", "Sarah Joseph", "Michael Chen"],
    tasks: [
      { id: "T1", name: "Prepare presentation slides", assignee: "Sarah Johnson", dueDate: "2026-07-20", status: "Completed" },
      { id: "T2", name: "Review employee feedback", assignee: "Sarah Johnson", dueDate: "2026-07-21", status: "In Progress" },
      { id: "T3", name: "Update company policies", assignee: "Sarah Johnson", dueDate: "2026-07-24", status: "Not Started" },
      { id: "T4", name: "Book conference room", assignee: "Sarah Johnson", dueDate: "2026-07-28", status: "In Progress" }
    ]
  },
  {
    id: "EVT002",
    title: "Weekly Engineering Sync",
    type: "Team Meeting",
    description: "Regular sync for engineers.",
    startDate: "2026-07-25",
    endDate: "2026-07-25",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    location: "Online",
    venue: "Google Meet Link",
    status: "Upcoming",
    participants: ["Amal Benny", "Michael Chen", "Karthika Balan"],
    tasks: []
  }
];

const initialPerformanceReviews: PerformanceReview[] = [
  {
    id: "REV001",
    employeeName: "Sarah Johnson",
    reviewer: "Amal Benny",
    jobTitle: "Senior Product Designer",
    reviewPeriod: "H1 2026 Evaluation",
    dueDate: "2026-08-30",
    status: "Pending Self Review"
  },
  {
    id: "REV002",
    employeeName: "Michael Chen",
    reviewer: "Amal Benny",
    jobTitle: "Software Engineer",
    reviewPeriod: "H1 2026 Evaluation",
    dueDate: "2026-08-30",
    status: "Pending Supervisor Review"
  }
];

const initialSupportTickets: SupportTicket[] = [
  {
    id: "TCK001",
    title: "Not able to add new candidates",
    description: "System error when attempting to add new candidate profiles. Error occurs during submission.",
    createdDate: "July 24, 2025 - 6:30 PM",
    category: "System Error",
    priority: "High",
    status: "Open"
  },
  {
    id: "TCK002",
    title: "Onboarding Portal Access Issue",
    description: "New employee Sarah Joseph unable to access HR portal after onboarding.",
    createdDate: "July 24, 2025 - 2:00 PM",
    resolvedDate: "July 27, 2025 - 6:30 PM",
    category: "Access Issue",
    priority: "High",
    status: "Resolved"
  }
];

const initialAssociationRequests: AssociationRequest[] = [
  {
    id: "ASC001",
    employeeName: "Sarah Joseph",
    dateRequested: "July 20, 2025",
    requestDetails: "Requesting association with the Marketing Department for project collaboration and resource sharing. Looking forward to joining the team and contributing to upcoming campaigns.",
    status: "Pending"
  }
];

const initialMessageLogs: MessageLog[] = [
  {
    id: "MSG001",
    channel: "WhatsApp",
    subject: "Team Meeting Alert",
    recipients: "All Employees",
    message: "Team meeting scheduled for today at 2 PM. Please be present.",
    dateSent: "July 20, 2025 - 09:30 AM",
    status: "Sent",
    replies: 0
  },
  {
    id: "MSG002",
    channel: "WhatsApp",
    subject: "Design Sync Agenda",
    recipients: "Marketing Team (12)",
    message: "Discussing Kochi office rebranding strategy and dashboard variables.",
    dateSent: "July 20, 2025 - 09:30 AM",
    status: "Draft",
    replies: 8
  }
];

// Helper functions using localStorage for mock DB persistence
const getStorageItem = <T>(key: string, initialVal: T): T => {
  const stored = localStorage.getItem(key);
  if (!stored) {
    localStorage.setItem(key, JSON.stringify(initialVal));
    return initialVal;
  }
  return JSON.parse(stored);
};

const setStorageItem = <T>(key: string, val: T): void => {
  localStorage.setItem(key, JSON.stringify(val));
};

export const getEmployees = (): Employee[] => getStorageItem('hr_employees', initialEmployees);
export const saveEmployees = (data: Employee[]) => setStorageItem('hr_employees', data);

export const getVacancies = (): Vacancy[] => getStorageItem('hr_vacancies', initialVacancies);
export const saveVacancies = (data: Vacancy[]) => setStorageItem('hr_vacancies', data);

export const getCandidates = (): Candidate[] => getStorageItem('hr_candidates', initialCandidates);
export const saveCandidates = (data: Candidate[]) => setStorageItem('hr_candidates', data);

export const getLeaveRequests = (): LeaveRequest[] => getStorageItem('hr_leave_requests', initialLeaveRequests);
export const saveLeaveRequests = (data: LeaveRequest[]) => setStorageItem('hr_leave_requests', data);

export const getLeaveBalances = (): LeaveBalance[] => getStorageItem('hr_leave_balances', initialLeaveBalances);
export const saveLeaveBalances = (data: LeaveBalance[]) => setStorageItem('hr_leave_balances', data);

export const getAttendanceRecords = (): AttendanceRecord[] => getStorageItem('hr_attendance_records', initialAttendanceRecords);
export const saveAttendanceRecords = (data: AttendanceRecord[]) => setStorageItem('hr_attendance_records', data);

export const getFinanceRequests = (): FinanceRequest[] => getStorageItem('hr_finance_requests', initialFinanceRequests);
export const saveFinanceRequests = (data: FinanceRequest[]) => setStorageItem('hr_finance_requests', data);

export const getEvents = (): CompanyEvent[] => getStorageItem('hr_events', initialEvents);
export const saveEvents = (data: CompanyEvent[]) => setStorageItem('hr_events', data);

export const getPerformanceReviews = (): PerformanceReview[] => getStorageItem('hr_performance_reviews', initialPerformanceReviews);
export const savePerformanceReviews = (data: PerformanceReview[]) => setStorageItem('hr_performance_reviews', data);

export const getSupportTickets = (): SupportTicket[] => getStorageItem('hr_support_tickets', initialSupportTickets);
export const saveSupportTickets = (data: SupportTicket[]) => setStorageItem('hr_support_tickets', data);

export const getAssociationRequests = (): AssociationRequest[] => getStorageItem('hr_association_requests', initialAssociationRequests);
export const saveAssociationRequests = (data: AssociationRequest[]) => setStorageItem('hr_association_requests', data);

export const getMessageLogs = (): MessageLog[] => getStorageItem('hr_message_logs', initialMessageLogs);
export const saveMessageLogs = (data: MessageLog[]) => setStorageItem('hr_message_logs', data);

// Punched-in/out State
export const getPunchStatus = (): { punchedIn: boolean; time?: string } => 
  getStorageItem('hr_punch_status', { punchedIn: true, time: "Today at 10:43 AM (GMT 6)" });
export const savePunchStatus = (status: { punchedIn: boolean; time?: string }) => 
  setStorageItem('hr_punch_status', status);

// Corporate Branding state
export interface CorporateBranding {
  primaryColor: string;
  primaryHoverColor: string;
  primaryFontColor: string;
  secondaryColor: string;
  secondaryFontColor: string;
  primaryGradientColor1: string;
  primaryGradientColor2: string;
  clientLogo?: string;
  loginBanner?: string;
  clientBanner?: string;
}

export const getBranding = (): CorporateBranding => 
  getStorageItem('hr_branding', {
    primaryColor: "#0473b8",
    primaryHoverColor: "#03629e",
    primaryFontColor: "#ffffff",
    secondaryColor: "#f1f5f9",
    secondaryFontColor: "#1e293b",
    primaryGradientColor1: "#0473b8",
    primaryGradientColor2: "#0284c7"
  });

export const saveBranding = (branding: CorporateBranding) => {
  setStorageItem('hr_branding', branding);
  // Dynamically apply to document element
  const root = document.documentElement;
  root.style.setProperty('--primary-color', branding.primaryColor);
  root.style.setProperty('--primary-hover', branding.primaryHoverColor);
  root.style.setProperty('--primary-font-color', branding.primaryFontColor);
  root.style.setProperty('--secondary-color', branding.secondaryColor);
  root.style.setProperty('--secondary-font-color', branding.secondaryFontColor);
  root.style.setProperty('--primary-gradient-1', branding.primaryGradientColor1);
  root.style.setProperty('--primary-gradient-2', branding.primaryGradientColor2);
};
