import HttpError from '../error/HttpError';

export default function onSaveErrorHandler(err) {
  if (err && err.isHttpError) {
    throw err;
  }
  throw HttpError.BadRequest(err.message);
}
