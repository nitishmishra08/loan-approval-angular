import { Body, Controller, Post } from '@nestjs/common';
import { LoanRequestDto, LoanDecisionDto } from './loan.dto';
import { LoanService } from './loan.service';

@Controller('api/loans')
export class LoanController {
  constructor(private readonly loanService: LoanService) {}

  @Post('evaluate')
  evaluate(@Body() request: LoanRequestDto): LoanDecisionDto {
    return this.loanService.evaluate(request);
  }
}