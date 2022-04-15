import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppInterface } from './interfaces/app.interface';

@Injectable()
export class AppService {
  private readonly npm_package_name: string;
  private readonly npm_package_version: string;

  constructor(private readonly configService: ConfigService) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }

  get(): AppInterface {
    return {
      name: this.npm_package_name,
      version: this.npm_package_version,
    };
  }
}
