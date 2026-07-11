import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import RsaManager from './config/RsaManager';

async function bootstrap() {
  RsaManager.initialize();

  const app = await NestFactory.create(AppModule, { cors: true });

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
