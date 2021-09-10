import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import HttpError from '../error/HttpError';
import Campaign from '../models/Campaign';
import MultiFileUploadController from '../logic/upload/MultiFileUploadController';
import deleteDirContent from '../util/deleteCreative';
import CreativePath from '../util/CreativePath';
import onSaveErrorHandler from '../util/onSaveErrorHandler';
import resolveCampaign from '../logic/adRequest/resolveCampaign.middleware';

const myLogger = logger.child({ moduleName: 'AdvertiserRouter' });

export default class AdvertiserRouter extends BaseRouter {
  constructor() {
    super('/advertiser', myLogger);
    this.getRouter().post('/campaign', auth(customerAuth), this.createCampaign);
    this.getRouter().patch('/campaign/:campaignId', auth(customerAuth), resolveCampaign, this.updateCampaign);
    this.getRouter().get('/campaign/:campaignId', auth(customerAuth), resolveCampaign, this.getCampaignById);
    this.getRouter().post('/campaign/:campaignId/creative/upload', auth(customerAuth), resolveCampaign, this.uploadCreative);
    this.getRouter().delete('/campaign/:campaignId/creative/delete', auth(customerAuth), resolveCampaign, this.deleteCreative);
    this.getRouter().get('/campaign', auth(customerAuth), this.getCampaigns);
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {POST} /advertiser/campaign
   * @apiName Create a campaign
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam (Request Body) {String} name the campaigns name
   * @apiParam (Request Body) {String[]} tags tags for the campaign
   * @apiParam (Request Body) {String[]} blocked which tags this campaign blocks
   * @apiParam (Request Body) {Number} length the length of the ad in seconds
   *
   * @apiSuccess {Object} campaign
   * @apiSuccess {String} campaign._id the campaigns id
   * @apiSuccess {String} campaign.name
   * @apiSuccess {String} campaign.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaign.length length in seconds of campaign
   * @apiSuccess {String} campaign.url url from which creative can be downloaded.
   * @apiSuccess {String} campaign.creativeTimestamp timestamp when creative was uploaded.
   * @apiSuccess {String[]} campaign.tags tags to describe this campaign
   * @apiSuccess {String[]} campaign.blocked blocked tags by this campaign
   */
  async createCampaign(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;
      const { tags = [], blocked = [], length = 30 } = req.body;

      const campaign = new Campaign();
      campaign.name = name;
      campaign.owner = user.id;
      campaign.tags = tags;
      campaign.blocked = blocked;
      campaign.length = length;
      await campaign.save()
        .then((mCampaign) => {
          res.status(BaseRouter.code.created).send({ campaign: mCampaign.toObject() });
        }).catch((err) => onSaveErrorHandler(err));
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {PATCH} /advertiser/campaign/:campaignId
   * @apiName Update a campaign
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} campaignId the campaign to update
   *
   * @apiParam (Request Body) {String} name the campaigns name
   * @apiParam (Request Body) {String[]} tags tags for the campaign
   * @apiParam (Request Body) {String[]} blocked which tags this campaign blocks
   * @apiParam (Request Body) {Number} length the length of the ad in seconds
   *
   * @apiSuccess {Object} campaign
   * @apiSuccess {String} campaign._id the campaigns id
   * @apiSuccess {String} campaign.name
   * @apiSuccess {String} campaign.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaign.length length in seconds of campaign
   * @apiSuccess {String} campaign.url url from which creative can be downloaded.
   * @apiSuccess {String} campaign.creativeTimestamp timestamp when creative was uploaded.
   * @apiSuccess {String[]} campaign.tags tags to describe this campaign
   * @apiSuccess {String[]} campaign.blocked blocked tags by this campaign
   */
  async updateCampaign(req, res, next) {
    try {
      const campaign = req.campaign;
      const {
        name = req.campaign.name,
        tags = req.campaign.tags,
        blocked = req.campaign.blocked,
        length = req.campaign.length,
      } = req.body;

      campaign.name = name;
      campaign.tags = tags;
      campaign.blocked = blocked;
      campaign.length = length;
      await campaign.save()
        .then((mCampaign) => {
          res.status(BaseRouter.code.okay).send({ campaign: mCampaign.toObject() });
        }).catch((err) => onSaveErrorHandler(err));
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {GET} /advertiser/campaign/:campaignId
   * @apiName Create a campaign
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiParam {String} campaignId the campaign to update
   *
   * @apiSuccess {Object[]} campaign
   * @apiSuccess {String} campaign._id the campaigns id
   * @apiSuccess {String} campaign.name
   * @apiSuccess {String} campaign.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaign.length length in seconds of campaign
   * @apiSuccess {String} campaign.url url from which creative can be downloaded.
   * @apiSuccess {String} campaign.creativeTimestamp timestamp when creative was uploaded.
   * @apiSuccess {String[]} campaign.tags tags to describe this campaign
   * @apiSuccess {String[]} campaign.blocked blocked tags by this campaign
   */
  async getCampaignById(req, res, next) {
    try {
      res.status(BaseRouter.code.okay).send({ campaign: req.campaign.toObject() });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {GET} /advertiser/campaign
   * @apiName get all campaigns from a customer
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiSuccess {Object[]} campaigns
   * @apiSuccess {String} campaigns._id the campaigns id
   * @apiSuccess {String} campaigns.name
   * @apiSuccess {String} campaigns.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaigns.length length in seconds of campaign
   * @apiSuccess {String} campaigns.url url from which creative can be downloaded.
   * only set if creative is uploaded
   * @apiSuccess {String} campaigns.creativeTimestamp timestamp when creative was uploaded.
   * only set when creative is uploaded
   * @apiSuccess {String[]} campaigns.tags tags to describe this campaign
   * @apiSuccess {String[]} campaigns.blocked blocked tags by this campaign
   */
  async getCampaigns(req, res, next) {
    try {
      const { user } = req;

      const campaigns = await Campaign.find({ owner: user.id });
      campaigns.map((a) => a.toObject());
      res.status(BaseRouter.code.okay).send({ campaigns });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {POST} /advertiser/campaign/:campaignId/creative/upload
   * @apiName Upload creative for campaign
   *
   * @apiDescription
   * <p> content-type has to be multipart/formdata</p>
   * <p>each file's key in form-data has to be "creative"</p>
   *
   * @apiHeader {String} authorization JWT_Token
   * @apiHeader {String} content-type=multipart/form-data;
   *
   * @apiParam (Request Body form-data) {Object[]} files the creative
   * @apiParam (Request Body form-data) {String} files.key=creative
   * @apiParam (Request Body form-data) {Object[]} files.value path to file
   *
   * @apiSuccess {Object} campaign
   * @apiSuccess {String} campaign._id the campaigns id
   * @apiSuccess {String} campaign.name
   * @apiSuccess {String} campaign.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaign.length length in seconds of campaign
   * @apiSuccess {String} campaign.url url from which creative can be downloaded.
   * @apiSuccess {String} campaign.creativeTimestamp timestamp when creative was uploaded.
   * @apiSuccess {String[]} campaign.tags tags to describe this campaign
   * @apiSuccess {String[]} campaign.blocked blocked tags by this campaign
   */
  async uploadCreative(req, res, next) {
    try {
      const campaign = req.campaign;
      campaign.creativeTimestamp = null;
      campaign.url = null;
      await deleteDirContent(CreativePath.fsPath(campaign));
      await campaign.save();
      const controller = new MultiFileUploadController();
      await controller.upload(req)
        .catch((err) => {
          throw (err);
        });
      if (controller.filesCount === 0) {
        throw HttpError.BadRequest('no files uploaded');
      }
      campaign.url = CreativePath.path(req.campaign);

      await campaign.save();
      res.status(BaseRouter.code.created).send({ campaign });
    } catch (err) {
      next(err);
    }
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup Advertiser
   * @api {DELETE} /advertiser/campaign/:campaignId/creative/delete
   * @apiName delete creative for campaign
   *
   *
   * @apiHeader {String} authorization JWT_Token
   *
   * @apiSuccess {Number} deletedFiles Number of files deleted
   * @apiSuccess {Object} campaign
   * @apiSuccess {String} campaign._id the campaigns id
   * @apiSuccess {String} campaign.name
   * @apiSuccess {String} campaign.owner id of customer who owns this campaign
   * @apiSuccess {Number} campaign.length length in seconds of campaign
   * @apiSuccess {String} campaign.url=null url from which creative can be downloaded.
   * @apiSuccess {String} campaign.creativeTimestamp=null timestamp when creative was uploaded.
   * @apiSuccess {String[]} campaign.tags tags to describe this campaign
   * @apiSuccess {String[]} campaign.blocked blocked tags by this campaign
   */
  async deleteCreative(req, res, next) {
    try {
      const campaign = req.campaign;

      const deletedFiles = await deleteDirContent(CreativePath.fsPath(campaign));
      campaign.url = null;
      campaign.creativeTimestamp = null;
      await campaign.save();
      res.status(BaseRouter.code.okay).send({ campaign, deletedFiles });
    } catch (err) {
      next(err);
    }
  }
}
