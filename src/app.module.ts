import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from './config/config.module';
import { V1Module } from './modules/v1/v1.module';
import { AllExceptionsFilter } from './common/exception-filters/all-exception.filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { WinstonLoggerModule } from './logger/winston-logger.module';

@Module({
  imports: [WinstonLoggerModule, ConfigModule, V1Module],
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
export class AppModule {}
