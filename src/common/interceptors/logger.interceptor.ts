import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  LoggerService,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import * as moment from 'moment';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  private readonly npm_package_name;
  private readonly npm_package_version;

  constructor(
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.npm_package_name = configService.get<string>('npm_package_name');
    this.npm_package_version = configService.get<string>('npm_package_version');
  }

  intercept(execContext: ExecutionContext, next: CallHandler): Observable<any> {
    const timeOfStart = moment();
    const ctx = execContext.switchToHttp();
    const req = ctx.getRequest();
    const res = ctx.getResponse();
    return next.handle().pipe(
      tap((data) => {
        const { npm_package_name, npm_package_version } = this;
        const { method, originalUrl, headers, body: reqBody, params } = req;
        const { statusCode } = res;
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
              body: data,
            },
            duration: moment().diff(timeOfStart),
          },
        });
      }),
    );
  }
}
