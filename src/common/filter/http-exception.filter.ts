import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { jsonSafeParse } from '@common/utils/utils';
import { BasicResponse } from '@common/typings/types';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errInfo = jsonSafeParse(exception.message, {} as BasicResponse<any>);

    console.log(exception.message, exception.stack, 'error');

    // @todo 记录日志
    console.log(
      '%s %s error: %s',
      request.method,
      request.url,
      errInfo.message || exception.message,
    );
    // 发送响应
    response.status(status).json({
      status,
      code: errInfo.code,
      message: errInfo.message,
      exceptionMsg: exception.message,
      exceptionStack: exception.stack,
      path: request.url,
    });
  }
}
