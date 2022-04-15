import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppInterface } from './interfaces/app.interface';
import { ConfigService } from '@nestjs/config';

const config: Record<string, any> = {
  npm_package_name: 'app',
  npm_package_version: '1',
};

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              return config[key] || null;
            }),
          },
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    configService = moduleRef.get<ConfigService>(ConfigService);
  });

  describe('get', () => {
    it('should return app info', async () => {
      const result: AppInterface = {
        name: configService.get('npm_package_name'),
        version: configService.get('npm_package_version'),
      };

      expect(await appController.get()).toStrictEqual(result);
    });
  });
});
