import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import onSaveErrorHandler from '../util/onSaveErrorHandler';
import resolveImpression from '../logic/adRequest/resolveImpression.middleware';
import HttpError from '../error/HttpError';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import resolveCampaign from '../logic/adRequest/resolveCampaign.middleware';
import Impression from '../models/Impression';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import resolveDisplayBlock from '../logic/adRequest/resolveDisplayBlock.middleware';

const myLogger = logger.child({ moduleName: 'AdminRouter' });

export default class AdminRouter extends BaseRouter {
  constructor() {
    super('/impression', myLogger);
    this.getRouter().post('/:impressionId', resolveImpression, this.postImpression);
    this.getRouter().get('/campaign/:campaignId', auth(customerAuth), resolveCampaign, this.getStatsForCampaign);
    this.getRouter().get('/app/:appId', auth(customerAuth), resolveApp, this.getStatsForApp);
    this.getRouter().get('/app/:appId/displayBlock/:displayBlockId', auth(customerAuth), resolveApp, resolveDisplayBlock, this.getStatsForDisplayBlock);
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

  async getStatsForCampaign(req, res, next) {
    try {
      const campaign = req.campaign;

      const impressions = await Impression.find({ campaignId: campaign._id });
      res.status(BaseRouter.code.okay).json({ impressions });
    } catch (err) {
      next(err);
    }
  }

  async getStatsForApp(req, res, next) {
    try {
      const app = req.app;

      const impressions = await Impression.find({ appId: app._id });
      res.status(BaseRouter.code.okay).json({ impressions });
    } catch (err) {
      next(err);
    }
  }

  async getStatsForDisplayBlock(req, res, next) {
    try {
      const displayBlock = req.displayBlock;

      const impressions = await Impression.find({ displayBlockId: displayBlock._id });
      res.status(BaseRouter.code.okay).json({ impressions });
    } catch (err) {
      next(err);
    }
  }
}
