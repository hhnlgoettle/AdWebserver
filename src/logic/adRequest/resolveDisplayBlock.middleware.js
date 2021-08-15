import mongoose from 'mongoose';
import HttpError from '../../error/HttpError';

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
