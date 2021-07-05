export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500
}

export type HttpRequest<T = any> = {
  body?: T;
};

export type HttpResponse<T = any> = {
  statusCode: HttpStatusCode;
  body?: T;
};

export type ErrorType = {
  name: string;
  errors: any;
  status: number | any;
  message: string | any;
  isPublic?: boolean | any;
  isOperational?: boolean | any;
  stack: any;
};
