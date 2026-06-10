---
applyTo: "frontend/**/*.ts"
---
# Angular TypeScript Standards

- Angular 17 standalone components. No NgModule.
- Signals for reactive state: signal(), computed(), effect().
- HttpClient for all HTTP — typed generics required: this.http.get<Type>().
- NEVER use fetch() in Angular components or services.
- catchError from rxjs/operators on every HTTP call.
- NEVER use `any` type — use `unknown` and narrow, or define an interface.
- All service methods must have JSDoc.
- Import from @angular/core not from deep paths.