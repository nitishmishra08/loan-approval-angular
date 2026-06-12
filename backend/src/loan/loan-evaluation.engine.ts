import { Injectable, Logger } from '@nestjs/common';
import { LoanDecisionDto, LoanRequestDto } from './loan.dto';

/**
 * LoanEvaluationEngine handles all loan decision logic based on credit score
 * and other applicant criteria. This is the sole engine for credit evaluation.
 */
@Injectable()
export class LoanEvaluationEngine {
  private readonly logger = new Logger(LoanEvaluationEngine.name);

  /**
   * Evaluates a loan request and determines approval status and interest rate.
   * @param request - The loan request containing applicant details
   * @returns LoanDecisionDto with approval status, interest rate, and reason
   */
  evaluate(request: LoanRequestDto): LoanDecisionDto {
    this.logger.log(`Evaluating loan for applicant: ${request.applicantId}`);

    if (!request.creditScore) {
      this.logger.warn(`No credit score provided for applicant: ${request.applicantId}`);
      return {
        applicantId: request.applicantId,
        status: 'REJECTED',
        interestRate: null,
        reason: 'Credit score missing',
      };
    }

    if (request.creditScore >= 750) {
      this.logger.log(`Excellent credit score (${request.creditScore}) - APPROVED for applicant: ${request.applicantId}`);
      return {
        applicantId: request.applicantId,
        status: 'APPROVED',
        interestRate: 7.5,
        reason: 'Excellent profile',
      };
    }

    if (request.creditScore >= 600) {
      this.logger.log(`Standard credit score (${request.creditScore}) - APPROVED for applicant: ${request.applicantId}`);
      return {
        applicantId: request.applicantId,
        status: 'APPROVED',
        interestRate: 12.0,
        reason: 'Standard profile',
      };
    }

    this.logger.warn(`Low credit score (${request.creditScore}) - REJECTED for applicant: ${request.applicantId}`);
    return {
      applicantId: request.applicantId,
      status: 'REJECTED',
      interestRate: null,
      reason: 'Credit score too low',
    };
  }
}
