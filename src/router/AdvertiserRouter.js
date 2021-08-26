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

  async getCampaignById(req, res, next) {
    try {
      res.status(BaseRouter.code.okay).send({ campaign: req.campaign.toObject() });
    } catch (err) {
      next(err);
    }
  }

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

  async uploadCreative(req, res, next) {
    try {
      const campaign = req.campaign;
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

  async deleteCreative(req, res, next) {
    try {
      const campaign = req.campaign;

      if (campaign.url == null || campaign.url.length === 0) throw (HttpError.BadRequest('campaign has no creative'));
      const deletedFiles = await deleteDirContent(`.${campaign.url}`);
      campaign.url = null;
      campaign.creativeTimestamp = null;
      await campaign.save();
      res.status(BaseRouter.code.okay).send({ campaign, deletedFiles });
    } catch (err) {
      next(err);
    }
  }
}
