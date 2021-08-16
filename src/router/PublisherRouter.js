import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import App from '../models/App';
import HttpError from '../error/HttpError';
import DisplayBlock from '../models/DisplayBlock';
import Tags from '../constants/Tags';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import onSaveErrorHandler from '../util/onSaveErrorHandler';

const myLogger = logger.child({ moduleName: 'PublisherRouter' });

export default class PublisherRouter extends BaseRouter {
  constructor() {
    super('/publisher', myLogger);
    this.getRouter().post('/app', auth(customerAuth), this.createApp);
    this.getRouter().get('/app/:appId', auth(customerAuth), resolveApp, this.getAppById);
    this.getRouter().get('/app', auth(customerAuth), this.getApps);
    this.getRouter().post('/app/:appId/displayblock', auth(customerAuth), resolveApp, this.createDisplayBlock);
  }

  async createApp(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;
      const { tags = [], blocked = [], maxLength = -1 } = req.body;
      await Promise.all([
        Tags.filterInput(tags),
        Tags.filterInput(blocked),
      ]).catch((err) => { throw HttpError.BadRequest(err.message); });

      const app = new App();
      app.name = name;
      app.owner = user.id;
      app.tags = tags;
      app.blocked = blocked;
      app.maxLength = maxLength;
      await app.save()
        .then((mApp) => {
          res.status(BaseRouter.code.created).send({ app: mApp.toObject() });
        })
        .catch((err) => { onSaveErrorHandler(err); });
    } catch (err) {
      next(err);
    }
  }

  async getAppById(req, res, next) {
    try {
      res.status(BaseRouter.code.okay).send({ app: req.app.toObject() });
    } catch (err) {
      next(err);
    }
  }

  async getApps(req, res, next) {
    try {
      const { user } = req;

      const apps = await App.find({ owner: user.id });
      apps.map((a) => a.toObject());
      res.status(BaseRouter.code.okay).send({ apps });
    } catch (err) {
      next(err);
    }
  }

  async createDisplayBlock(req, res, next) {
    try {
      const { name } = req.body;

      const app = req.app;

      const block = new DisplayBlock();
      block.name = name;
      app.displayBlocks.push(block);
      await app.save().catch((err) => { onSaveErrorHandler(err); });
      res.status(BaseRouter.code.created).send({ app });
    } catch (err) {
      next(err);
    }
  }
}
