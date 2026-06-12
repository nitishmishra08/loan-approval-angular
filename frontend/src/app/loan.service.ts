import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoanDecision, LoanHistory, LoanRequest } from './loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  /**
   * Evaluates a loan request and returns the decision.
   * @param request - The loan request containing applicant details
   * @returns Observable<LoanDecision> with the evaluation result
   */
  evaluate(request: LoanRequest): Observable<LoanDecision> {
    return this.http.post<LoanDecision>(`${this.apiUrl}/evaluate`, request).pipe(
      catchError((error) => {
        return throwError(() => new Error('Loan evaluation failed. Please try again.'));
      })
    );
  }

  /**
   * Fetches the loan history for a given applicant.
   * @param applicantId - The ID of the applicant
   * @returns Observable<LoanHistory> containing the applicant's loan history
   */
  getHistory(applicantId: string): Observable<LoanHistory> {
    return this.http.get<LoanHistory>(`${this.apiUrl}/history/${applicantId}`).pipe(
      catchError((error) => {
        return throwError(() => new Error('Failed to fetch loan history. Please try again.'));
      })
    );
  }
}