import App from '../../models/App';
import HttpError from '../../error/HttpError';

/**
 * resolves an app for a given request
 * populates req.app with found app
 * note that this app is a mongoose model
 *
 * needs req.params.appId to be set and valid
 * needs req.user to be set. call auth() middleware beforehand to populate req.user
 * @param req
 * @param res
 * @param next
 * @return {Promise<void>}
 */
export default async function resolveApp(req, res, next) {
  try {
    const { appId } = req.params;
    const app = await App.findById(appId)
      .catch((err) => { throw HttpError.BadRequest(err.message); });
    if (app == null) throw HttpError.NotFound('App not found');

    if (req.user == null) throw HttpError.Unauthorized('no user found to check access rights');
    switch (req.user.role) {
      case 'admin': break;
      case 'guest': break;
      case 'customer': if (String(req.user.id) !== String(app.owner)) {
        throw HttpError.Forbidden('you are not owner of this app');
      } break;
      default: throw HttpError.Forbidden('you are not owner of this app');
    }
    req.app = app;
    next();
  } catch (e) {
    next(e);
  }
}
