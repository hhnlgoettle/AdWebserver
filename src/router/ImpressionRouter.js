import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import onSaveErrorHandler from '../util/onSaveErrorHandler';
import resolveImpression from '../logic/adRequest/resolveImpression.middleware';
import HttpError from '../error/HttpError';

const myLogger = logger.child({ moduleName: 'AdminRouter' });

export default class AdminRouter extends BaseRouter {
  constructor() {
    super('/impression', myLogger);
    this.getRouter().post('/:impressionId', resolveImpression, this.postImpression);
  }

  async postImpression(req, res, next) {
    try {
      const impression = req.impression;

      if (impression.data) throw HttpError.Conflict(`impression with id ${impression.id} has already stats set`);

      const { data } = req.body;
      impression.data = data;
      await impression.save().catch((err) => onSaveErrorHandler(err));
      res.status(BaseRouter.code.okay).json({ impression: req.impression });
    } catch (err) {
      next(err);
    }
  }
}
