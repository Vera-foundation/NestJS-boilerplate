import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
    data: T;
    statusCode: number;
}


@Injectable()
export class TransformResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        const ctx = context.switchToHttp();
        const response = ctx.getResponse();
        const statusCode = response.statusCode;

        return next.handle().pipe(map(data => ({ data: data, statusCode: statusCode })));
    }
}