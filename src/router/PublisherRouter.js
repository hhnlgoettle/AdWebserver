import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import App from '../models/App';
import DisplayBlock from '../models/DisplayBlock';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import onSaveErrorHandler from '../util/onSaveErrorHandler';
import resolveDisplayBlock from '../logic/adRequest/resolveDisplayBlock.middleware';

const myLogger = logger.child({ moduleName: 'PublisherRouter' });

export default class PublisherRouter extends BaseRouter {
  constructor() {
    super('/publisher', myLogger);
    this.getRouter().post('/app', auth(customerAuth), this.createApp);
    this.getRouter().patch('/app/:appId', auth(customerAuth), resolveApp, this.updateApp);
    this.getRouter().get('/app/:appId', auth(customerAuth), resolveApp, this.getAppById);
    this.getRouter().get('/app', auth(customerAuth), this.getApps);
    this.getRouter().post('/app/:appId/displayblock', auth(customerAuth), resolveApp, this.createDisplayBlock);
    this.getRouter().patch('/app/:appId/displayblock/:displayBlockId', auth(customerAuth), resolveApp, resolveDisplayBlock, this.updateDisplayBlock);
  }

  async createApp(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;
      const { tags = [], blocked = [], maxLength = -1 } = req.body;

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

  async updateApp(req, res, next) {
    try {
      const app = req.app;
      const {
        name = req.app.name,
        tags = req.app.tags,
        blocked = req.app.blocked,
        maxLength = req.app.maxLength,
      } = req.body;

      app.name = name;
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

  async updateDisplayBlock(req, res, next) {
    try {
      const app = req.app;
      const displayBlock = req.displayBlock;
      const {
        name = displayBlock.name,
      } = req.body;
      displayBlock.name = name;
      const index = app.displayBlocks.findIndex(((b) => b._id === displayBlock._id));
      app.displayBlocks[index] = displayBlock;
      await app.save().catch((err) => { onSaveErrorHandler(err); });
      res.status(BaseRouter.code.created).send({ app });
    } catch (err) {
      next(err);
    }
  }
}
