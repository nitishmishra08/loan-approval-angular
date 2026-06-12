import { z } from 'zod';

export interface LoanAmendmentRequest {
  applicationId: string;
  newRequestedAmount: number;
  reason: string;
}

export const LoanAmendmentSchema = z.object({
  applicationId: z.string().uuid("Must be a valid UUID"),
  newRequestedAmount: z.number().min(10000).max(5000000),
  reason: z.string(),
});

export type ValidatedLoanAmendmentRequest = z.infer<typeof LoanAmendmentSchema>;