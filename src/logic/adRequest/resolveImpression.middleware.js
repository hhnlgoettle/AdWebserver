import mongoose from 'mongoose';
import HttpError from '../../error/HttpError';
import Impression from '../../models/Impression';

/**
 * @function resolveImpression
 * @desc
 * <p>resolves a Impression for a given request
 * <p>populates req.impression with found impression
 * <p>note that this impression is a mongoose model
 *
 * <p>needs req.params.impressionId to be set and valid
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
export default async function resolveImpression(req, res, next) {
  try {
    const { impressionId } = req.params;
    if (mongoose.isValidObjectId(impressionId) === false) {
      throw HttpError.BadRequest('impressionId is invalid');
    }
    const impression = await Impression.findById(impressionId);
    if (impression == null) throw HttpError.NotFound(`impression with id ${impressionId} not found`);

    req.impression = impression;
    next();
  } catch (e) {
    next(e);
  }
}
