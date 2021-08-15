import App from '../../models/App';
import HttpError from '../../error/HttpError';

export default async function resolveApp(req, res, next) {
  try {
    const { appId } = req.params;
    const app = await App.findById(appId)
      .catch((err) => { throw HttpError.BadRequest(err.message); });
    if (app == null) throw HttpError.NotFound('App not found');
    req.app = app;
    next();
  } catch (e) {
    next(e);
  }
}
