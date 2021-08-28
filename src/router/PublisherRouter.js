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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {POST} /publisher/app
   * @apiName Create an app
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam (Request Body) {String} name the app's name
   * @apiParam (Request Body) {String[]} tags tags for the app
   * @apiParam (Request Body) {String[]} blocked which tags this app blocks
   * @apiParam (Request Body) {Number} maxLength maximum Length of Creatives
   *
   * @apiSuccess {Object} app
   * @apiSuccess {String} app._id the campaigns id
   * @apiSuccess {String} app.name
   * @apiSuccess {String} app.owner id of customer who owns this app
   * @apiSuccess {Number} app.maxLength length in seconds of app
   * @apiSuccess {Object[]} app.displayBlocks displayBlocks of this app
   * @apiSuccess {String} app.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} app.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} app.displayBlocks.name name of this display block
   * @apiSuccess {String[]} app.tags tags to describe this app
   * @apiSuccess {String[]} app.blocked blocked tags by this app
   */
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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {PATCH} /publisher/app:/appId
   * @apiName Update an app
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} appId the app's id
   * @apiParam (Request Body) {String} name the app's name
   * @apiParam (Request Body) {String[]} tags tags for the app
   * @apiParam (Request Body) {String[]} blocked which tags this app blocks
   * @apiParam (Request Body) {Number} maxLength maximum Length of Creatives
   *
   * @apiSuccess {Object} app
   * @apiSuccess {String} app._id the campaigns id
   * @apiSuccess {String} app.name
   * @apiSuccess {String} app.owner id of customer who owns this app
   * @apiSuccess {Number} app.maxLength length in seconds of app
   * @apiSuccess {Object[]} app.displayBlocks displayBlocks of this app
   * @apiSuccess {String} app.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} app.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} app.displayBlocks.name name of this display block
   * @apiSuccess {String[]} app.tags tags to describe this app
   * @apiSuccess {String[]} app.blocked blocked tags by this app
   */
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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {GET} /publisher/app:/appId
   * @apiName Get an app by its id
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} appId the app's id
   *
   * @apiSuccess {Object} app
   * @apiSuccess {String} app._id the campaigns id
   * @apiSuccess {String} app.name
   * @apiSuccess {String} app.owner id of customer who owns this app
   * @apiSuccess {Number} app.maxLength length in seconds of app
   * @apiSuccess {Object[]} app.displayBlocks displayBlocks of this app
   * @apiSuccess {String} app.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} app.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} app.displayBlocks.name name of this display block
   * @apiSuccess {String[]} app.tags tags to describe this app
   * @apiSuccess {String[]} app.blocked blocked tags by this app
   */
  async getAppById(req, res, next) {
    try {
      res.status(BaseRouter.code.okay).send({ app: req.app.toObject() });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {GET} /publisher/app
   * @apiName Get all apps
   * @apiHeader {String} authorization JWT_Token
   *
   *
   * @apiSuccess {Object[]} apps
   * @apiSuccess {String} apps._id the campaigns id
   * @apiSuccess {String} apps.name
   * @apiSuccess {String} apps.owner id of customer who owns this app
   * @apiSuccess {Number} apps.maxLength length in seconds of app
   * @apiSuccess {Object[]} apps.displayBlocks displayBlocks of this app
   * @apiSuccess {String} apps.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} apps.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} apps.displayBlocks.name name of this display block
   * @apiSuccess {String[]} apps.tags tags to describe this app
   * @apiSuccess {String[]} apps.blocked blocked tags by this app
   */
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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {POST} /publisher/app/:appId/displayblock
   * @apiName Create an app
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} appId the app's id
   *
   * @apiParam (Request Body) {String} name the displayBlock's name
   *
   * @apiSuccess {Object} app
   * @apiSuccess {String} app._id the campaigns id
   * @apiSuccess {String} app.name
   * @apiSuccess {String} app.owner id of customer who owns this app
   * @apiSuccess {Number} app.maxLength length in seconds of app
   * @apiSuccess {Object[]} app.displayBlocks displayBlocks of this app
   * @apiSuccess {String} app.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} app.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} app.displayBlocks.name name of this display block
   * @apiSuccess {String[]} app.tags tags to describe this app
   * @apiSuccess {String[]} app.blocked blocked tags by this app
   */
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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Publisher
   * @api {PATCH} /publisher/app/:appId/displayblock/:displayBlockId
   * @apiName Create an app
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} appId the app's id
   * @apiParam {String} displayBlockId the app's id
   *
   * @apiParam (Request Body) {String} name the displayBlock's name
   *
   * @apiSuccess {Object} app
   * @apiSuccess {String} app._id the campaigns id
   * @apiSuccess {String} app.name
   * @apiSuccess {String} app.owner id of customer who owns this app
   * @apiSuccess {Number} app.maxLength length in seconds of app
   * @apiSuccess {Object[]} app.displayBlocks displayBlocks of this app
   * @apiSuccess {String} app.displayBlocks.type=interactionRewardingAd type of this displayBlock
   * @apiSuccess {String} app.displayBlocks._id id of this displayBlock
   * @apiSuccess {String} app.displayBlocks.name name of this display block
   * @apiSuccess {String[]} app.tags tags to describe this app
   * @apiSuccess {String[]} app.blocked blocked tags by this app
   */
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
