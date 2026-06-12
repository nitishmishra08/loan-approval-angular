import { z } from 'zod';

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

export const LoanRequestSchema = z.object({
  applicantId: z.string().min(1, "Applicant ID is required"),
  requestedAmount: z.number().min(10000).max(5000000),
  creditScore: z.number().int().min(300).max(900),
  annualIncome: z.number().min(0),
  employmentStatus: z.string(),
});

export const LoanDecisionSchema = z.object({
  applicantId: z.string().min(1, "Applicant ID is required"),
  status: z.enum(['APPROVED', 'REJECTED']),
  interestRate: z.number().nullable(),
  reason: z.string(),
});

export const LoanHistorySchema = z.object({
  applicantId: z.string().min(1, "Applicant ID is required"),
  decisions: z.array(LoanDecisionSchema),
});

export type ValidatedLoanRequest = z.infer<typeof LoanRequestSchema>;
export type ValidatedLoanDecision = z.infer<typeof LoanDecisionSchema>;
export type ValidatedLoanHistory = z.infer<typeof LoanHistorySchema>;