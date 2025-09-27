import { HttpStatus, Injectable, UseInterceptors } from '@nestjs/common';

export class GenericResponse {
  constructor(
    public statusCode: number,
    public message: string,
    public data: any,
  ) {}

  static ok(): GenericResponse {
    return new GenericResponse(HttpStatus.OK, 'OK', undefined);
  }

  static okWithBody(body): GenericResponse {
    return new GenericResponse(HttpStatus.OK, 'OK', body);
  }
}
