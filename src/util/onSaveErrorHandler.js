import HttpError from '../error/HttpError';

/**
 * @function onSaveErrorHandler
 * @desc used for mongoose models #save
 * <p> maps Mongoose Errors to BadRequests
 * @param {mongoose.Error} err
 */
export default function onSaveErrorHandler(err) {
  if (err && err.isHttpError) {
    throw err;
  }
  throw HttpError.BadRequest(err.message);
}
