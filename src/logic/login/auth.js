import passport from 'passport';
import HttpError from '../../error/HttpError';

/**
 * @param {function} authModule
 * @return {function(...[*]=)}
 */
const auth = (authModule) => async (req, res, next) => {
  try {
    passport.authenticate('jwt', { session: false, failWithError: true }, (data, jwtPayload, error) => {
      if (error || !data) {
        if (error) next(HttpError.Unauthorized(error.message));
        else next(HttpError.Unauthorized('jwtPayload is null'));
      }
      req.jwtPayload = data;
      authModule(data).then((usr) => {
        req.user = usr;
        next();
      }).catch((err) => {
        throw err;
      });
    })(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default auth;
