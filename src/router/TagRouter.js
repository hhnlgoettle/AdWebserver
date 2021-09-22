import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import Tags from '../constants/Tags';

const myLogger = logger.child({ moduleName: 'AdRequestRouter' });

export default class TagRouter extends BaseRouter {
  constructor() {
    super('/tags', myLogger);
    this.getRouter().get('', this.getTags);
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Tags
   * @api {GET} /tags Get Tag list
   * @apiName Receive List of known tags
   * @apiSuccess {Object[]} tags
   * @apiSuccess {String} tags.name the tag name
   * @apiSuccess {String} tags.description the tag's description
   *
   * @apiDescription returns a list of all tags
   *
   */
  async getTags(req, res, next) {
    try {
      res.send({ tags: Tags.getTags() });
    } catch (err) {
      next(err);
    }
  }
}
