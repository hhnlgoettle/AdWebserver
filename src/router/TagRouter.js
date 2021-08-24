import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import Tags from '../constants/Tags';

const myLogger = logger.child({ moduleName: 'AdRequestRouter' });

export default class TagRouter extends BaseRouter {
  constructor() {
    super('/tags', myLogger);
    this.getRouter().get('', this.getTags);
  }

  async getTags(req, res, next) {
    try {
      res.send({ tags: Tags.getTags() });
    } catch (err) {
      next(err);
    }
  }
}
