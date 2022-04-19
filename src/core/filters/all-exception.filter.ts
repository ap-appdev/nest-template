import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as moment from 'moment';
import { Environment } from '../../common/enums/environment';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly npm_package_name: string;
  private readonly npm_package_version: string;
  private readonly node_env: Environment;

  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
    this.node_env = configService.get<Environment>('NODE_ENV');
  }

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();
    const req = ctx.getRequest();

    const timeOfStart = moment();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      response: string | Record<any, any>;

    const { name, message, stack } = exception;
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      response = exception.getResponse();
    }

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
          res: response || {
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

    res.status(statusCode).json(
      response || {
        statusCode,
        timestamp: timeOfStart,
        path: req.originalUrl,
        error:
          this.node_env !== Environment.Production
            ? {
                name,
                message,
                stack,
              }
            : { name, message },
      },
    );
  }
}
