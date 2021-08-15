import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import resolveDisplayBlock from '../logic/adRequest/resolveDisplayBlock.middleware';
import AdMatchFinder from '../logic/adRequest/AdMatchFinder';
import getCreativeDownloadUrls from '../logic/adRequest/getCreativeDownloadUrls';

const myLogger = logger.child({ moduleName: 'AdRequestRouter' });

export default class AdRequestRouter extends BaseRouter {
  constructor() {
    super('/adrequest', myLogger);
    this.getRouter().post('/:appId/:displayBlockId', resolveApp, resolveDisplayBlock, this.getAd);
  }

  async getAd(req, res, next) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { cachedCreatives } = req.body || [];
      // TODO use cachedCreatives
      const ad = await new AdMatchFinder().findAdForDisplayBlock({ app: req.app });
      if (ad == null || ad.campaign == null) {
        this.logger.info(`no ad found for request (appId:${req.app.id}, displayBlockId: ${req.displayblock.id})`);
        res.status(BaseRouter.code.noContent).send();
        return;
      }
      // TODO download urls
      const downloadUrls = await getCreativeDownloadUrls(ad.campaign.url);
      // TODO check if ad is cached and if yes when
      // TODO create impression ID
      res.status(BaseRouter.code.okay).json({ ad, downloadUrls, cached: false });
    } catch (err) {
      next(err);
    }
  }
}
