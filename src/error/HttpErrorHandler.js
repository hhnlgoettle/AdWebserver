import Logger from '../core/logger';

const logger = Logger.child({ moduleName: 'HttpErrorHandler' });

/**
 * handles http errors, sets status etc
 */
export default class HttpErrorHandler {
  static middleware(err, req, res, next) {
    try {
      if (err.isHttpError) {
        res.status(err.getCode()).send({ message: err.getMessage() });
        next();
        return;
      }
      logger.error(err);
      logger.error(err.stack);
      res.status(500).send({ message: 'Internal Server Error' });
    } catch (e) {
      logger.error(JSON.stringify(e));
      next(err);
    }
  }
}
