import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  const useMongo = configService.get<number>('USE_MONGO') ?? 'false';

  const logger = new Logger('Bootstrap');

  await app.listen(port);
  logger.log(``);
  logger.warn(`🚀 Backend listening on http://localhost:${port} `);
  logger.warn(`🍃 Using MongoDB?? ${useMongo} `);
}

bootstrap();
