import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, NextFunction } from 'express';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';
import { Response } from '../../common/consts/express';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly npm_package_name;
  private readonly npm_package_version;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }

  use(req: Request, res: Response, next: NextFunction): void {
    const timeOfStart = moment();

    res.on('finish', () => {
      if (res.statusCode < 400) {
        const { npm_package_name, npm_package_version } = this;
        const { method, originalUrl, headers, body: reqBody, params } = req;
        const { statusCode, body: resBody } = res;
        this.logger.log({
          message: {
            npm_package_name,
            npm_package_version,
            req: {
              method,
              url: originalUrl,
              headers,
              body: reqBody,
              params,
            },
            res: {
              statusCode,
              body: resBody,
            },
            duration: moment().diff(timeOfStart),
          },
        });
      }
    });

    next();
  }
}
