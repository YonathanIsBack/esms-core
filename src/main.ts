import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RsaManager from './config/RsaManager';
import { HttpExceptionFilter } from './exception/HttpExceptionFilter';

async function bootstrap() {
  RsaManager.initialize();

  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
