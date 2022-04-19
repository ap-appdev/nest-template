import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInterface } from './interfaces/app.interface';

@Controller({
  version: '1',
  path: 'app',
})
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get(): AppInterface {
    return this.appService.get();
  }
}
