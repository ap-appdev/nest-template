import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getConfiguration } from './utils';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [getConfiguration],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class ConfigurationModule {}
