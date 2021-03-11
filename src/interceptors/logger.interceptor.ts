import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    private logger = new Logger('Response');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { statusCode } = context.switchToHttp().getResponse();
        const { originalUrl, method, params, query, body } = req;
        const message: string = `${new Date().toISOString()} - ${method} - ${originalUrl} - ${statusCode} - body: ${JSON.stringify(body)} - params: ${JSON.stringify(params)} - query: ${JSON.stringify(query)}`;
        return next
            .handle()
            .pipe(
                tap(() => this.logger.log(message)),
            );
    }
}