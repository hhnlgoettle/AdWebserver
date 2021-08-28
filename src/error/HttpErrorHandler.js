import Logger from '../core/logger';

const logger = Logger.child({ moduleName: 'HttpErrorHandler' });

/**
 * @module
 * @class HttpErrorHandler
 * @desc static class that handles HttpErrors as a middleware
 */
const HttpErrorHandler = class HttpErrorHandler {
  static middleware(err, req, res, next) {
    try {
      if (err.isHttpError) {
        res.status(err.getCode()).send({ message: err.getMessage() });
        next();
        return;
      }
      // if its not a HttpError, throw an Internal Server Error
      logger.error(err);
      logger.error(err.stack);
      res.status(500).send({ message: 'Internal Server Error' });
    } catch (e) {
      logger.error(JSON.stringify(e));
      next(err);
    }
  }
};

export default HttpErrorHandler;
