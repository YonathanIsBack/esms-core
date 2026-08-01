import { HttpException, HttpStatus } from '@nestjs/common';

export class OperationConditionUnsatisfied extends HttpException {
  constructor(operationName: String) {
    super(
      `Cannot process operation. Cause : ${operationName}`,
      HttpStatus.BAD_REQUEST,
    );
  }
}
