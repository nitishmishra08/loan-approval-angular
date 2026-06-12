import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { LoanRequestDto } from './../src/loan/loan.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  describe('Loan Evaluation (POST /api/loans/evaluate)', () => {
    it('should approve loan with excellent credit score (>= 750)', () => {
      const loanRequest: LoanRequestDto = {
        applicantId: 'APP001',
        requestedAmount: 250000,
        creditScore: 800,
        annualIncome: 150000,
        employmentStatus: 'SALARIED',
      };

      return request(app.getHttpServer())
        .post('/api/loans/evaluate')
        .send(loanRequest)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toBe('APPROVED');
          expect(res.body.interestRate).toBe(7.5);
          expect(res.body.reason).toBe('Excellent profile');
          expect(res.body.applicantId).toBe('APP001');
        });
    });

    it('should approve loan with standard credit score (600-749)', () => {
      const loanRequest: LoanRequestDto = {
        applicantId: 'APP002',
        requestedAmount: 150000,
        creditScore: 675,
        annualIncome: 100000,
        employmentStatus: 'SALARIED',
      };

      return request(app.getHttpServer())
        .post('/api/loans/evaluate')
        .send(loanRequest)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toBe('APPROVED');
          expect(res.body.interestRate).toBe(12.0);
          expect(res.body.reason).toBe('Standard profile');
        });
    });

    it('should reject loan with low credit score (< 600)', () => {
      const loanRequest: LoanRequestDto = {
        applicantId: 'APP003',
        requestedAmount: 100000,
        creditScore: 550,
        annualIncome: 80000,
        employmentStatus: 'SELF_EMPLOYED',
      };

      return request(app.getHttpServer())
        .post('/api/loans/evaluate')
        .send(loanRequest)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toBe('REJECTED');
          expect(res.body.interestRate).toBeNull();
          expect(res.body.reason).toBe('Credit score too low');
        });
    });

    it('should reject loan with missing credit score', () => {
      const loanRequest: Partial<LoanRequestDto> = {
        applicantId: 'APP004',
        requestedAmount: 100000,
        creditScore: undefined,
        annualIncome: 80000,
        employmentStatus: 'SALARIED',
      };

      return request(app.getHttpServer())
        .post('/api/loans/evaluate')
        .send(loanRequest)
        .expect(201)
        .expect((res) => {
          expect(res.body.status).toBe('REJECTED');
          expect(res.body.reason).toBe('Credit score missing');
        });
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
