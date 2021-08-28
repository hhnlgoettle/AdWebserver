import { Router } from 'express';

/**
 * @module
 * @class BaseRouter
 * @desc BaseRouter class for other routers
 * @property {String} prefix the routers prefix
 * @property {Router} routerM the router
 * @property {Logger} logger the logger
 * @property {Object} code [static] common http status codes
 */
class BaseRouter {
  /**
   * @constructor
   * @param prefix
   * @param logger
   */
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
    noContent: 204,
    okay: 200,
    internalServerError: 500,
    badRequest: 400,
    unauthorized: 401,
    notFound: 404,
  };
}

export default BaseRouter;
