import { Injectable, effect } from '@angular/core';
import { signal, computed } from '@angular/core';
import { LoanService } from './loan.service';
import { LoanRequest, LoanDecision } from './loan.model';

/**
 * LoanStateService manages the state of loan evaluations using Angular signals.
 * It coordinates with LoanService for API communication and maintains local state
 * for decision results, loading status, and error handling.
 */
@Injectable({ providedIn: 'root' })
export class LoanStateService {
  // Private signals for internal state
  private readonly decision = signal<LoanDecision | null>(null);
  private readonly loading = signal<boolean>(false);
  private readonly error = signal<string | null>(null);

  // Public computed signals for read-only access to state
  readonly decision$ = computed(() => this.decision());
  readonly loading$ = computed(() => this.loading());
  readonly error$ = computed(() => this.error());

  constructor(private loanService: LoanService) {}

  /**
   * Evaluates a loan request. Sets loading state, calls the LoanService,
   * and updates decision or error state based on the result.
   * @param request - The loan request to evaluate
   */
  evaluate(request: LoanRequest): void {
    this.loading.set(true);
    this.error.set(null);

    this.loanService.evaluate(request).subscribe({
      next: (decision: LoanDecision) => {
        this.decision.set(decision);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
