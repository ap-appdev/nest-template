import { Module } from '@nestjs/common';
import { ConfigModule as _ConfigModule } from '@nestjs/config';
import { validate } from './validations/env.validation';

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [],
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate,
    }),
  ],
})
export class ConfigModule {}
