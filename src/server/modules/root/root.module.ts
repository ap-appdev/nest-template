import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigurationModule } from '../global/configuration/configuration.module';
import { V1Module } from '../local/v1/v1.module';
import { RequestLoggerMiddleware } from '../../middlewares/global/request-logger.middleware';
import { AllExceptionsFilter } from '../../exception-filters/global/all-exception.filter';
import { ChangeResObjectInterceptor } from '../../interceptors/global/change-res-object.interceptor';
import { WinstonLoggerModule } from '../global/logger/winston-logger.module';

@Module({
  imports: [WinstonLoggerModule, ConfigurationModule, V1Module],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ChangeResObjectInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class RootModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*');
  }
}
