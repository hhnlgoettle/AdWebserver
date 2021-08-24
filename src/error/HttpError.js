const errorCode = {
  BadRequest: 400,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  Conflict: 409,
  TooManyRequest: 429,
  InternalServerError: 500,
  proprietary: {
    auth_token_expired: 901,
  },
};

export default class HttpError extends Error {
  static errorCode = errorCode;

  constructor(code, message) {
    super();
    this.message = message; // an error message
    this.code = code; // the http error code
    this.isHttpError = true;
  }

  getMessage() {
    return this.message;
  }

  getCode() {
    return this.code;
  }

  static BadRequest(message) {
    return new HttpError(errorCode.BadRequest, message);
  }

  static Unauthorized(message) {
    return new HttpError(errorCode.Unauthorized, message);
  }

  static Forbidden(message) {
    return new HttpError(errorCode.Forbidden, message);
  }

  static NotFound(message) {
    return new HttpError(errorCode.NotFound, message);
  }

  static MethodNotAllowed(message) {
    return new HttpError(errorCode.MethodNotAllowed, message);
  }

  static NotAcceptable(message) {
    return new HttpError(errorCode.NotAcceptable, message);
  }

  static Conflict(message) {
    return new HttpError(errorCode.Conflict, message);
  }

  static TooManyRequest(message) {
    return new HttpError(errorCode.TooManyRequest, message);
  }

  static InternalServerError(message) {
    return new HttpError(errorCode.InternalServerError, message);
  }
}
