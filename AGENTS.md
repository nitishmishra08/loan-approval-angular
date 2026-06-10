# AGENTS.md — loan-approval-angular

## Service Overview
Full-stack loan approval application.
Backend: NestJS REST API (port 3000)
Frontend: Angular 17 standalone components with reactive forms.
Both in TypeScript. Both in the same monorepo.

## Build Commands
  cd backend && npm run build   # compile NestJS
  cd frontend && ng build       # compile Angular
  cd frontend && ng test        # run Jasmine tests

## Architecture Rules — Backend (NestJS)
- Controllers: route handling only. No business logic.
- Services: injectable, stateless. All logic lives here.
- DTOs: plain TypeScript interfaces or class-validator decorated classes.
- NEVER use console.log — use NestJS Logger from @nestjs/common.

## Architecture Rules — Frontend (Angular)
- Components: standalone components only (no NgModule).
- State: Angular Signals preferred over RxJS BehaviorSubject for local state.
- HTTP: always typed — HttpClient<T> calls only. NEVER untyped `any` return.
- NEVER use raw fetch() in Angular — use HttpClient from @angular/common/http.
- Error handling: catchError from rxjs/operators on all HTTP calls.
- All public methods in services must have JSDoc comments.

## TypeScript Standards (both projects)
- strict: true in tsconfig. No `any` unless absolutely unavoidable.
- Prefer interfaces over type aliases for object shapes.
- Use readonly where applicable on interface properties.
- NEVER disable eslint rules inline without a comment explaining why.

## Domain
- LoanRequest: applicantId, requestedAmount, creditScore, annualIncome, employmentStatus
- LoanDecision: applicantId, status (APPROVED|REJECTED), interestRate (nullable), reason
- Employment Status: SALARIED | SELF_EMPLOYED | UNEMPLOYED | RETIRED