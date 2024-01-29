import {ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException} from "@nestjs/common";
import { Response } from 'express';


@Catch(UnauthorizedException)
export class NotLoggedInFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();

        if (status === 401) response.status(status).redirect('/login')
    }
}