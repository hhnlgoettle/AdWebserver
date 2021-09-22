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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Impression
   * @api {POST} /impression/:impressionId
   * @apiName Post Impression Data
   * @apiParam {String} impressionId the id of the impression
   *
   * @apiParam (Request Body) {Object} data all impression data under this key
   *
   * @apiSuccess {Object} impression the impression
   * @apiSuccess {String} impression.displayBlockId id of the display block
   * @apiSuccess {String} impression.campaignId id of campaign
   * @apiSuccess {String} impression._id id of impression. used later to post data
   * @apiSuccess {Object} impression.data data collected during impression
   */
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

  /**
   * @apiVersion 1.0.1
   * @apiGroup Impression
   * @api {GET} /impression/campaign/:campaignId
   * @apiHeader {String} authorization JWT_Token
   * @apiName Get Impressions for campaign
   * @apiParam {String} campaignId the id of the campaign
   *
   * @apiSuccess {Object[]} impressions array of impressions
   * @apiSuccess {String} impressions.displayBlockId id of the display block
   * @apiSuccess {String} impressions.campaignId id of campaign
   * @apiSuccess {String} impressions._id id of impression. used later to post data
   * @apiSuccess {Object} impressions.data data collected during impression
   */
  async getStatsForCampaign(req, res, next) {
    try {
      const campaign = req.campaign;

      const impressions = await Impression.find({ campaignId: campaign._id });
      res.status(BaseRouter.code.okay).json({ impressions });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Impression
   * @api {GET} /impression/app/:appId
   * @apiHeader {String} authorization JWT_Token
   * @apiName Get Impressions for app
   * @apiParam {String} appId the id of the app
   *
   * @apiSuccess {Object[]} impressions array of impressions
   * @apiSuccess {String} impressions.displayBlockId id of the display block
   * @apiSuccess {String} impressions.campaignId id of campaign
   * @apiSuccess {String} impressions._id id of impression. used later to post data
   * @apiSuccess {Object} impressions.data data collected during impression
   */
  async getStatsForApp(req, res, next) {
    try {
      const app = req.app;

      const impressions = await Impression.find({ appId: app._id });
      res.status(BaseRouter.code.okay).json({ impressions });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Impression
   * @api {GET} /impression/app/:appId/displayBlock/:displayBlockId
   * @apiHeader {String} authorization JWT_Token
   * @apiName Get Impressions for a single displayBlock
   * @apiParam {String} appId the id of the app
   * @apiParam {String} displayBlockId the id of the displayBlock
   *
   * @apiSuccess {Object[]} impressions array of impressions
   * @apiSuccess {String} impressions.displayBlockId id of the display block
   * @apiSuccess {String} impressions.campaignId id of campaign
   * @apiSuccess {String} impressions._id id of impression. used later to post data
   * @apiSuccess {Object} impressions.data data collected during impression
   */
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
