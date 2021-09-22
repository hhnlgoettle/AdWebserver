import mongoose from 'mongoose';
import HttpError from '../../error/HttpError';

/**
 * @function resolveDisplayBlock
 * @desc
 * <p>resolves a displayBlock for a given request
 * <p>populates req.displayBlock with found displayBlock
 * <p>note that this displayBlock is a sub-schema of app
 * <p>you can find the parent app in req.app
 *
 * <p>needs req.params.displayBlockId to be set and valid
 * <p>needs req.app to be set. call resolveApp beforehand to populate req.app
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
export default async function resolveDisplayBlock(req, res, next) {
  try {
    const { displayBlockId } = req.params;
    if (mongoose.isValidObjectId(displayBlockId) === false) {
      throw HttpError.BadRequest('displayBlockId is invalid');
    }
    if (req.app.displayBlocks == null || req.app.displayBlocks.length === 0) {
      throw HttpError.NotFound('DisplayBlock not found');
    }
    const displayBlock = await req.app.displayBlocks
      .find((block) => String(block._id) === String(displayBlockId));
    if (displayBlock == null) throw HttpError.NotFound('DisplayBlock not found');
    req.displayBlock = displayBlock;
    next();
  } catch (e) {
    next(e);
  }
}
