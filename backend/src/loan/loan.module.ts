import { Module } from '@nestjs/common';
import { LoanController } from './loan.controller';
import { LoanService } from './loan.service';
import { LoanEvaluationEngine } from './loan-evaluation.engine';

@Module({
  controllers: [LoanController],
  providers: [LoanService, LoanEvaluationEngine],
})
export class LoanModule {}