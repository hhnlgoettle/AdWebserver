import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import decodeBasicAuth from '../util/decodeBasicAuth';
import Customer from '../models/Customer';
import HttpError from '../error/HttpError';
import verifyHash from '../logic/login/verifyHash';
import generateToken from '../logic/login/generateToken';

const myLogger = logger.child({ moduleName: 'CustomerRouter' });

export default class CustomerRouter extends BaseRouter {
  constructor() {
    super('/customer', myLogger);
    this.getRouter().get('/login', this.login);
    this.getRouter().get('/register', this.register);
  }

  async login(req, res, next) {
    try {
      const { username, password } = decodeBasicAuth(req.headers);
      const customer = await Customer.findOne({ username }).select('+password');
      if (!customer) throw new HttpError.Unauthorized('Email or password is wrong');

      if (customer.confirmed !== true) throw (new HttpError.Unauthorized('account not confirmed'));
      const correctPassword = await verifyHash(password, customer.password);
      if (correctPassword !== true) throw HttpError.Unauthorized('Email or username is wrong');

      const token = await generateToken(customer.toObject());
      res.status(BaseRouter.code.okay).json({ token });
    } catch (err) {
      next(err);
    }
  }

  async register(req, res, next) {
    try {
      const { username, password } = decodeBasicAuth(req.headers);
      const existing = await Customer.findOne({ username });
      if (existing) throw HttpError.Conflict('username is taken');

      const customer = new Customer();
      customer.username = username;
      customer.password = password;

      await customer.save().catch((err) => { throw HttpError.BadRequest(err.message); });
      const createdUser = await Customer.findOne({ username });
      res.status(BaseRouter.code.created).json({ user: createdUser });
    } catch (err) {
      next(err);
    }
  }
}
