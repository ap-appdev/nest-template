import { NestFactory } from '@nestjs/core';
import { RootModule } from './modules/root/root.module';
import { ConfigService } from '@nestjs/config';
import { VersioningType, ValidationPipe } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {
  const app = await NestFactory.create(RootModule, {
    bufferLogs: true,
    autoFlushLogs: true,
    abortOnError: false,
  });

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  app.enableVersioning({
    type: VersioningType.URI,
    prefix: 'api/v',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');

  await app.listen(PORT);

  console.log(`Service is started on port ${PORT}`);
}

bootstrap();
