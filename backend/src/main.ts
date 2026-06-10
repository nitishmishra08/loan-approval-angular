import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoanModule } from './loan/loan.module';

async function bootstrap() {
  const app = await NestFactory.create(LoanModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
