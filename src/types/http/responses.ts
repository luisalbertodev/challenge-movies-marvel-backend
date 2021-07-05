import { HttpResponse, HttpStatusCode } from '@typesProject/http';

export const ok = (data?: any): HttpResponse => ({
  statusCode: HttpStatusCode.OK,
  body: data
});

export const serverError = (data?: any): HttpResponse => ({
  statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR,
  body: data
});
