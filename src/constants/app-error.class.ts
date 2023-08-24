import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {
  statusCode: number;

  constructor(
    name: string,
    message: string,
    statusCode = HttpStatus.BAD_REQUEST,
  ) {
    super(message);
    this.name = name;
    this.statusCode = statusCode;
  }
}
