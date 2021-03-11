import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Response } from 'express';


@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

    private logger = new Logger('Response Error');

    catch(exception: HttpException, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
        if (exception.getStatus()) {
            status = exception.getStatus();
        }
        const timestamp: string = new Date().toISOString();
        const { originalUrl, method, params, query, body } = response.req;
        const errorMessage: string | object = exception.getResponse();

        // Send log message
        const logMessage: string = `${timestamp} - ${method} - ${originalUrl} - ${status} - body: ${JSON.stringify(body)} - params: ${JSON.stringify(params)} - query: ${JSON.stringify(query)}`;
        this.logger.error(logMessage);

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: timestamp,
                message: errorMessage
            });
    }
}