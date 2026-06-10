---
applyTo: "backend/**/*.ts"
---
# NestJS TypeScript Standards

- Injectable services with constructor injection only.
- Logger from @nestjs/common — never console.log.
- class-validator decorators on DTO classes (@IsString, @IsNumber, @IsEnum).
- ValidationPipe enabled globally in main.ts.
- HTTP exceptions via HttpException or NestJS built-ins (BadRequestException etc.).
- NEVER throw raw Error — always throw a typed NestJS exception.