import { UseInterceptors } from "@nestjs/common";
import { TransformResponseInterceptor } from "src/interceptors/http.interceptors";
import { LoggingInterceptor } from "src/interceptors/logger.interceptor";


@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformResponseInterceptor)
export class BaseController {
    constructor() { }
}
