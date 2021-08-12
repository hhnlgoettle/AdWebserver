import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import customerAuth from '../logic/login/customerAuth';
import auth from '../logic/login/auth';
import App from '../models/App';
import HttpError from '../error/HttpError';

const myLogger = logger.child({ moduleName: 'PublisherRouter' });

export default class PublisherRouter extends BaseRouter {
  constructor() {
    super('/publisher', myLogger);
    this.getRouter().post('/app', auth(customerAuth), this.createApp);
    this.getRouter().get('/app/:id', auth(customerAuth), this.getAppById);
    this.getRouter().get('/app', auth(customerAuth), this.getApps);
  }

  async createApp(req, res, next) {
    try {
      const { user } = req;
      const { name } = req.body;

      const app = new App();
      app.name = name;
      app.owner = user.id;
      app.save()
        .then((mApp) => {
          res.status(BaseRouter.code.created).send({ app: mApp.toObject() });
        }).catch((err) => next(err));
    } catch (err) {
      next(err);
    }
  }

  async getAppById(req, res, next) {
    try {
      const { user } = req;
      const { id } = req.params;

      const app = await App.findById(id);
      if (String(app.owner) !== String(user.id)) throw HttpError.Forbidden('you are not owner of this app');

      res.status(BaseRouter.code.okay).send({ app: app.toObject() });
    } catch (err) {
      next(err);
    }
  }

  async getApps(req, res, next) {
    try {
      const { user } = req;

      const apps = await App.find({ owner: user.id });
      apps.map((a) => a.toObject());
      res.status(BaseRouter.code.okay).send({ apps });
    } catch (err) {
      next(err);
    }
  }
}
