import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';

const myLogger = logger.child({ moduleName: 'LoginRouter' });

export default class LoginRouter extends BaseRouter {
  constructor() {
    super('/login', myLogger);
    this.getRouter().get('', this.login);
  }

  login(req, res, next) {
    res.send('Hello');
  }
}
