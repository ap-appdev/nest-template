import { Module } from '@nestjs/common';
import { V1Module } from './modules/v1/v1.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [CoreModule, V1Module],
})
export class AppModule {}
