import { Request, Response, NextFunction } from 'express';
import * as expressValidation from 'express-validation';
import { HttpStatusCode, ErrorType } from '@typesProject/http';
import APIError from '@api/utils/APIError';
import env from '@env';

/**
 * Error handler. Send stacktrace only during development
 * @public
 */
export const handler = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  const response = {
    code: err.status,
    message: err.message || err.status, // httpStatus[err.status],   (// FIX: TYPE)
    errors: err.errors,
    stack: err.stack
  };

  if (env.mode !== 'development') {
    delete response.stack;
  }

  res.status(err.status);
  res.json(response);
};

/**
 * If error is not an instanceOf APIError, convert it.
 * @public
 */
export const converter = (err: ErrorType, req: Request, res: Response, next: NextFunction) => {
  let convertedError: ErrorType | any = err;

  if ((err instanceof expressValidation.ValidationError) as any) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status,
      stack: err.stack
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status,
      stack: err.stack
    });
  }

  return handler(convertedError as ErrorType, req, res, next);
};

/**
 * Catch 404 and forward to error handler
 * @public
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError({
    message: 'Not found',
    status: HttpStatusCode.NOT_FOUND
  });
  return handler(err as ErrorType, req, res, next);
};
