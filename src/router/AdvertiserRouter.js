import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import HttpError from '../error/HttpError';
import Campaign from '../models/Campaign';
import MultiFileUploadController from '../logic/upload/MultiFileUploadController';

const myLogger = logger.child({ moduleName: 'AdvertiserRouter' });

export default class AdvertiserRouter extends BaseRouter {
  constructor() {
    super('/advertiser', myLogger);
    this.getRouter().post('/campaign', auth(customerAuth), this.createCampaign);
    this.getRouter().get('/campaign/:id', auth(customerAuth), this.getCampaignById);
    this.getRouter().post('/campaign/:id/upload', auth(customerAuth), this.uploadCreative);
    this.getRouter().get('/campaign', auth(customerAuth), this.getCampaigns);
  }

  async createCampaign(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;

      const campaign = new Campaign();
      campaign.name = name;
      campaign.owner = user.id;
      campaign.save()
        .then((mCampaign) => {
          res.status(BaseRouter.code.created).send({ campaign: mCampaign.toObject() });
        }).catch((err) => next(HttpError.BadRequest(err.message)));
    } catch (err) {
      next(err);
    }
  }

  async getCampaignById(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const campaign = await Campaign.findById(id);
      if (String(campaign.owner) !== String(user.id)) throw HttpError.Forbidden('you are not owner of this campaign');

      res.status(BaseRouter.code.okay).send({ campaign: campaign.toObject() });
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
      const { user } = req;
      const { id } = req.params;

      console.log(req.body);

      const campaign = await Campaign.findById(id)
        .catch((err) => next(HttpError.BadRequest(err.message)));
      if (String(campaign.owner) !== String(user.id)) throw HttpError.Forbidden('you are not owner of this campaign');
      req.campaign = campaign.toObject();

      const controller = new MultiFileUploadController();
      await controller.upload(req)
        .then(() => {
          res.status(BaseRouter.code.created).send({ campaign });
        })
        .catch((err) => {
          next(err);
        });
    } catch (err) {
      next(err);
    }
  }
}
