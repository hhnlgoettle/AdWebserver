/**
 * @module
 * @function passportAuthStrategy
 * @description sets the auth strategy for passport npm module
 * @param {Passport} passport
 */

import { Strategy, ExtractJwt } from 'passport-jwt';

const { JWT_PUB_KEY } = process.env;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JWT_PUB_KEY,
};

const strategy = new Strategy(opts, (data, done) => done(data));

const passportAuthStrategy = (passport) => {
  passport.use(strategy);
};

export default passportAuthStrategy;
