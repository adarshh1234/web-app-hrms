export interface PayrollSummary {
  period: string;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  employeeCount: number;
}

export interface BenefitAdvance {
  id: string;
  employeeName: string;
  type: string;
  amount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestDate: string;
}
