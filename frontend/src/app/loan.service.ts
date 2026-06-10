import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoanDecision, LoanRequest } from './loan.model';

@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly apiUrl = 'http://localhost:3000/api/loans';

  constructor(private http: HttpClient) {}

  evaluate(request: LoanRequest): Observable<LoanDecision> {
    return this.http.post<LoanDecision>(`${this.apiUrl}/evaluate`, request).pipe(
      catchError((error) => {
        return throwError(() => new Error('Loan evaluation failed. Please try again.'));
      })
    );
  }
}