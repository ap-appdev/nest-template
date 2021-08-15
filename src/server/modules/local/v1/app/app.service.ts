import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  private readonly npm_package_name: string;
  private readonly npm_package_version: string;

  constructor(private readonly configService: ConfigService) {
    console.log(`PORT ${configService.get('PORT')}`);
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }

  getApp(): Record<string, any> {
    console.log(process.env);
    return {
      name: this.npm_package_name,
      version: this.npm_package_version,
    };
  }
}
