import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoreModule } from '../../../src/core/core.module';
import { AppModule } from '../../../src/modules/v1/app/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CoreModule, AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/app (GET)', () => {
    return request(app.getHttpServer()).get('/app').expect(200);
  });

  afterAll(async () => {
    await app.close();
  });
});
