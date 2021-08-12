import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import adminAuth from '../logic/login/adminAuth';
import auth from '../logic/login/auth';

const myLogger = logger.child({ moduleName: 'TestRouter' });

export default class TestRouter extends BaseRouter {
  constructor() {
    super('/test', myLogger);
    this.getRouter().get('/auth/admin', auth(adminAuth), this.authAdmin);
  }

  async authAdmin(req, res, next) {
    try {
      res.send({ user: req.user });
    } catch (err) {
      next(err);
    }
  }
}
