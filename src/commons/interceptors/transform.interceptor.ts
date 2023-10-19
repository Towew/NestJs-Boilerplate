import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  interceptedErrorResponse,
  interceptedResponse,
} from '@commons/interfaces/common-interceptor';
import { errorCodeEnum, errorMessageEnum } from '../constants/error-code.enum';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, interceptedResponse<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<interceptedResponse<T>> {
    //# Get Response Status Code
    let statusCode: number = context.switchToHttp().getResponse().statusCode;
    const getUrl: string = context.switchToHttp().getResponse().req.route.path;

    return next.handle().pipe(
      map((data) => {
        //# Compose Return Data
        const message = typeof data == 'string' ? data : 'success';
        const returnData = typeof data == 'string' ? true : data;

        const responseData: interceptedResponse<T> = {
          statusCode,
          message,
          data: returnData,
          service: getUrl.split('/')[2] + '-module',
          timestamp: new Date().toISOString(),
        };

        return responseData;
      }),
      catchError((err: HttpException) => {
        //# Compose Error Data
        statusCode =
          (err?.getStatus && err?.getStatus()) ??
          HttpStatus.INTERNAL_SERVER_ERROR;
        const errorResponse: any = err?.getResponse && err?.getResponse();
        const errorCode =
          [...Object.values(errorCodeEnum)].find((errorCode) => {
            return errorCode == errorResponse.message;
          }) ?? errorCodeEnum.INTERNAL_SERVER_ERROR;
        const message =
          errorMessageEnum[errorCode] ??
          (typeof errorResponse == 'string'
            ? errorResponse
            : errorResponse?.message);

        const errorData: interceptedErrorResponse = {
          statusCode,
          errorCode,
          message,
          data: errorResponse?.data ?? false,
          service: getUrl.split('/')[2] + '-module',
          timestamp: new Date().toISOString(),
        };

        throw new HttpException(errorData, statusCode);
      }),
    );
  }
}
