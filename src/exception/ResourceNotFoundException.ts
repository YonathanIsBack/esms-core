import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotFoundException extends HttpException {
  constructor(resourceName: string) {
    super(`${resourceName} does not exist or available`, HttpStatus.NOT_FOUND);
  }
}
