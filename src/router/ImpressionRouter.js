import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import onSaveErrorHandler from '../util/onSaveErrorHandler';
import resolveImpression from '../logic/adRequest/resolveImpression.middleware';
import HttpError from '../error/HttpError';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import resolveCampaign from '../logic/adRequest/resolveCampaign.middleware';
import Impression from '../models/Impression';

const myLogger = logger.child({ moduleName: 'AdminRouter' });

export default class AdminRouter extends BaseRouter {
  constructor() {
    super('/impression', myLogger);
    this.getRouter().post('/:impressionId', resolveImpression, this.postImpression);
    this.getRouter().get('/campaign/:campaignId', auth(customerAuth), resolveCampaign, this.getStatsForCampaign);
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
}
