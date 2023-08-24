import { HttpStatus } from '@nestjs/common';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { AppError } from 'src/constants/app-error.class';

export function formatError(
  formattedError: GraphQLFormattedError,
  error: unknown,
) {
  const originalError = (error as GraphQLError).originalError;

  if (originalError instanceof AppError) {
    return {
      statusCode: originalError.statusCode,
      error: originalError.name,
      message: originalError.message,
    };
  }

  return {
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    error: 'Internal Server Error',
    message: formattedError.message,
  };
}
