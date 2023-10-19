import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, Observable, throwError, timeout } from 'rxjs';
import { errorCodeEnum } from '@commons/constants/error-code.enum';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //# Define Max Timeout (in ms)
    const maxTimeout: number = !isNaN(this.configService.get('http.maxTimeout'))
      ? this.configService.get<number>('http.maxTimeout')
      : 15000;

    return next.handle().pipe(
      timeout(maxTimeout),
      catchError(() => {
        return throwError(
          () => new RequestTimeoutException(errorCodeEnum.REQUEST_TIMEOUT),
        );
      }),
    );
  }
}
