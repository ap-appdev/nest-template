import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class ChangeResObjectInterceptor implements NestInterceptor {
  intercept(execContext: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = execContext.switchToHttp();
    const res = ctx.getResponse();
    return next.handle().pipe(tap((data) => (res.body = data)));
  }
}
