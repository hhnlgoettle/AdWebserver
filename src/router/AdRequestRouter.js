import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import resolveDisplayBlock from '../logic/adRequest/resolveDisplayBlock.middleware';
import AdMatchFinder from '../logic/adRequest/AdMatchFinder';
import getCreativeDownloadUrls from '../logic/adRequest/getCreativeDownloadUrls';
import createEmptyImpression from '../util/createEmptyImpression';
import addGuestUser from '../logic/adRequest/addGuestUser.middleware';

const myLogger = logger.child({ moduleName: 'AdRequestRouter' });

export default class AdRequestRouter extends BaseRouter {
  constructor() {
    super('/adrequest', myLogger);
    this.getRouter().post('/:appId/:displayBlockId', addGuestUser, resolveApp, resolveDisplayBlock, this.getAd);
  }

  async getAd(req, res, next) {
    try {
      console.log({ req });
      // eslint-disable-next-line no-unused-vars
      const { cachedCreatives } = req.body || [];
      const appId = req.app._id;
      const displayBlockId = req.displayBlock._id;
      // TODO use cachedCreatives
      const ad = await new AdMatchFinder().findAdForDisplayBlock({ app: req.app });
      if (ad == null || ad.campaign == null) {
        this.logger.info(`no ad found for request (appId:${req.app.id}, displayBlockId: ${req.displayBlock.id})`);
        res.status(BaseRouter.code.noContent).send();
        return;
      }
      const campaignId = ad.campaign._id;
      const downloadUrls = await getCreativeDownloadUrls(ad.campaign.url);
      // TODO check if ad is cached and if yes when
      const impression = await createEmptyImpression(
        { appId, displayBlockId, campaignId },
      );
      res.status(BaseRouter.code.okay).json(
        {
          appId,
          displayBlockId,
          campaignId,
          impressionId: impression._id,
          cached: false,
          downloadUrls },
      );
    } catch (err) {
      next(err);
    }
  }
}
