import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';


@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
    private logger = new Logger('Request');

    use(request: Request, res: Response, next: NextFunction): void {
        const { method, originalUrl, body } = request;
        this.logger.log(
            `${new Date().toISOString()} - ${method} - ${originalUrl} - ${JSON.stringify(body)}`
        )
        next();
    }
}