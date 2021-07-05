import { HttpStatusCode, ErrorType } from '@typesProject/http';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  errors: any;
  status: any;
  isPublic: boolean;
  isOperational: boolean;

  constructor({ message, errors, status, isPublic, stack }: Partial<ErrorType>) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.errors = errors;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    this.stack = stack;
    // Error.captureStackTrace(this, this.constructor.name);
    console.error(stack);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */

export default class APIError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor({
    message,
    errors,
    stack,
    status = HttpStatusCode.INTERNAL_SERVER_ERROR,
    isPublic = false
  }: Partial<ErrorType>) {
    super({
      message,
      errors,
      status,
      isPublic,
      stack
    });
  }
}
