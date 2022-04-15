import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { AllExceptionsFilter } from './filters/all-exception.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { WinstonLoggerModule } from './logger/winston-logger.module';

@Module({
  imports: [WinstonLoggerModule, ConfigModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class CoreModule {}
