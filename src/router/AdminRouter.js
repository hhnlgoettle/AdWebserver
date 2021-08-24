import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import decodeBasicAuth from '../util/decodeBasicAuth';
import Admin from '../models/Admin';
import HttpError from '../error/HttpError';
import verifyHash from '../logic/login/verifyHash';
import generateToken from '../logic/login/generateToken';

const myLogger = logger.child({ moduleName: 'AdminRouter' });

export default class AdminRouter extends BaseRouter {
  constructor() {
    super('/admin', myLogger);
    this.getRouter().get('/login', this.login);
    this.getRouter().get('/register', this.register);
  }

  async login(req, res, next) {
    try {
      const { username, password } = decodeBasicAuth(req.headers);
      const admin = await Admin.findOne({ username }).select('+password');
      if (!admin) throw new HttpError.Unauthorized('Email or password is wrong');

      if (admin.confirmed !== true) throw (new HttpError.Unauthorized('account not confirmed'));
      const correctPassword = await verifyHash(password, admin.password);
      if (correctPassword !== true) throw HttpError.Unauthorized('Email or username is wrong');

      const token = await generateToken(admin.toObject());
      res.status(BaseRouter.code.okay).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const { username, password } = decodeBasicAuth(req.headers);
      const existing = await Admin.findOne({ username });
      if (existing) throw HttpError.Conflict('username is taken');

      const admin = new Admin();
      admin.username = username;
      admin.password = password;

      await admin.save().catch((err) => { throw HttpError.BadRequest(err.message); });
      const createdUser = await Admin.findOne({ username });
      res.status(BaseRouter.code.created).json({ user: createdUser });
    } catch (err) {
      next(err);
    }
  }
}
