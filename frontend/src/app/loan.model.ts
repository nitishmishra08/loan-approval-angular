export interface LoanRequest {
  applicantId: string;
  requestedAmount: number;
  creditScore: number;
  annualIncome: number;
  employmentStatus: string;
}

export interface LoanDecision {
  applicantId: string;
  status: 'APPROVED' | 'REJECTED';
  interestRate: number | null;
  reason: string;
}

export interface LoanHistory {
  readonly applicantId: string;
  readonly decisions: LoanDecision[];
}