import passport from 'passport';
import HttpError from '../../error/HttpError';

/**
 * @function auth
 * @desc authenticates using passport and a Bearer Token
 * @param {function} authModule the authModule to use for authentication
 * @return {function} middleware to use in requests
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
