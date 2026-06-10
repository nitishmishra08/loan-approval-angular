import { Injectable } from '@nestjs/common';
import { LoanDecisionDto, LoanRequestDto } from './loan.dto';

@Injectable()
export class LoanService {

  // TODO: this service has problems for Lab 1 to fix

  evaluate(request: LoanRequestDto): LoanDecisionDto {
    console.log('Evaluating loan for:', request.applicantId); // bad practice

    if (!request.creditScore) {
      return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score missing' };
    }
    if (request.creditScore >= 750) {
      return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 7.5, reason: 'Excellent profile' };
    }
    if (request.creditScore >= 600) {
      return { applicantId: request.applicantId, status: 'APPROVED', interestRate: 12.0, reason: 'Standard profile' };
    }
    return { applicantId: request.applicantId, status: 'REJECTED', interestRate: null, reason: 'Credit score too low' };
  }
}