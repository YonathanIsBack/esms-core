import { HttpException, HttpStatus } from '@nestjs/common';

export class NoOperationFound extends HttpException {
  constructor(operationName: String) {
    super(`Operation ${operationName} does not exist or available`, HttpStatus.BAD_REQUEST);
  }
}
