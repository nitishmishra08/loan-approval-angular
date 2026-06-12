import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { LoanDecisionDto, LoanRequestDto } from './loan.dto';
import { LoanEvaluationEngine } from './loan-evaluation.engine';

/**
 * LoanService coordinates loan-related operations and delegates decision logic
 * to the LoanEvaluationEngine.
 */
@Injectable()
export class LoanService {
  private readonly logger = new Logger(LoanService.name);

  constructor(private readonly evaluationEngine: LoanEvaluationEngine) {}

  /**
   * Evaluates a loan request by delegating to the evaluation engine.
   * @param request - The loan request containing applicant details
   * @returns LoanDecisionDto with the evaluation result
   * @throws HttpException if evaluation fails unexpectedly
   */
  evaluate(request: LoanRequestDto): LoanDecisionDto {
    try {
      this.logger.log(`Processing loan evaluation for applicant: ${request.applicantId}`);
      const decision = this.evaluationEngine.evaluate(request);
      this.logger.log(`Loan evaluation complete for applicant: ${request.applicantId} - Status: ${decision.status}`);
      return decision;
    } catch (error) {
      this.logger.error(`Error during loan evaluation for applicant: ${request.applicantId}`, error);
      throw new HttpException('Loan evaluation failed', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}