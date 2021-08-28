import mongoose from 'mongoose';
import HttpError from '../../error/HttpError';
import Campaign from '../../models/Campaign';

/**
 * @function resolveCampaign
 * @desc
 * <p>resolves a campaign for a given request
 * <p>populates req.campaign with found campaign
 * <p>note that this campaign is a mongoose model
 *
 * <p>needs req.params.campaignId to be set and valid
 * <p>needs req.user to be set. call auth() middleware beforehand to populate req.user
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
export default async function resolveCampaign(req, res, next) {
  try {
    const { campaignId } = req.params;
    if (mongoose.isValidObjectId(campaignId) === false) {
      throw HttpError.BadRequest('campaignId is invalid');
    }
    const campaign = await Campaign.findById(campaignId);
    if (campaign == null) throw HttpError.NotFound('campaign not found');

    if (req.user == null) throw HttpError.Unauthorized('no user found to check access rights');
    switch (req.user.role) {
      case 'admin': break;
      case 'guest': break;
      case 'customer': if (String(req.user.id) !== String(campaign.owner)) {
        throw HttpError.Forbidden('you are not owner of this campaign');
      } break;
      default: throw HttpError.Forbidden('you are not owner of this campaign');
    }

    req.campaign = campaign;
    next();
  } catch (e) {
    next(e);
  }
}
