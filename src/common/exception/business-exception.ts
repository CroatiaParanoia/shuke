import { HttpException, HttpStatus } from '@nestjs/common';
import {
  ResponseErrorCode,
  ResponseErrorMsgMapping,
} from '@common/constant/response-code.constant';

export class BusinessException extends HttpException {
  constructor(code: ResponseErrorCode, statusCode: number = HttpStatus.OK) {
    const message = ResponseErrorMsgMapping.get(code);

    const errorJson = JSON.stringify({ code, message });

    super(errorJson, statusCode);
  }
}
