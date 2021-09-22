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

/**
 * @class HttpError
 * @desc Maps Errors to HttpErrors with error codes
 * @property {String} message the error message
 * @property {Number} code the HttpErrorCode
 * @property {Boolean} isHttpError
 */
const HttpError = class HttpError extends Error {
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

  /**
   * @function
   * @desc BadRequest
   * @param message
   * @return {HttpError}
   */
  static BadRequest(message) {
    return new HttpError(errorCode.BadRequest, message);
  }

  /**
   * @desc Unauthorized
   * @param message
   * @return {HttpError}
   */
  static Unauthorized(message) {
    return new HttpError(errorCode.Unauthorized, message);
  }

  /**
   * @desc Forbidden
   * @param message
   * @return {HttpError}
   */
  static Forbidden(message) {
    return new HttpError(errorCode.Forbidden, message);
  }

  /**
   * @desc NotFound
   * @param message
   * @return {HttpError}
   */
  static NotFound(message) {
    return new HttpError(errorCode.NotFound, message);
  }

  /**
   * @desc MethodNotAllowed
   * @param message
   * @return {HttpError}
   */
  static MethodNotAllowed(message) {
    return new HttpError(errorCode.MethodNotAllowed, message);
  }

  /**
   * @desc NotAcceptable
   * @param message
   * @return {HttpError}
   */
  static NotAcceptable(message) {
    return new HttpError(errorCode.NotAcceptable, message);
  }

  /**
   * @desc Conflict
   * @param message
   * @return {HttpError}
   */
  static Conflict(message) {
    return new HttpError(errorCode.Conflict, message);
  }

  /**
   * @desc TooManyRequest
   * @param message
   * @return {HttpError}
   */
  static TooManyRequest(message) {
    return new HttpError(errorCode.TooManyRequest, message);
  }

  /**
   * @desc InternalServerError
   * @param message
   * @return {HttpError}
   */
  static InternalServerError(message) {
    return new HttpError(errorCode.InternalServerError, message);
  }
};

export default HttpError;
