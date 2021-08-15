import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly npm_package_name;
  private readonly npm_package_version;

  constructor(
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const timeOfStart = moment();

    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const { name, message, stack } = exception;
    res.on('finish', () => {
      const { npm_package_name, npm_package_version } = this;
      const { method, originalUrl, headers, body, params } = req;
      this.logger.error({
        message: {
          npm_package_name,
          npm_package_version,
          req: {
            method,
            url: originalUrl,
            headers,
            body,
            params,
          },
          res: {
            statusCode,
            error: {
              name,
              message,
              stack,
            },
          },
          duration: moment().diff(timeOfStart),
        },
      });
    });

    res.status(statusCode).json({
      statusCode,
      timestamp: timeOfStart,
      path: req.originalUrl,
      errorMessage: message,
    });
  }
}
