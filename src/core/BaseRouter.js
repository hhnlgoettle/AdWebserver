import { Router } from 'express';

class BaseRouter {
  constructor(prefix, logger) {
    this.prefixM = prefix;
    this.routerM = Router();
    this.logger = logger;
  }

  getRouter() {
    return this.routerM;
  }

  getPrefix() {
    return this.prefixM;
  }

  static code = {
    created: 201,
    okay: 200,
    internalServerError: 500,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
  };
}

export default BaseRouter;
