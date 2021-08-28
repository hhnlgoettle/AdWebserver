import BaseRouter from '../core/BaseRouter';
import logger from '../core/logger';
import resolveApp from '../logic/adRequest/resolveApp.middleware';
import resolveDisplayBlock from '../logic/adRequest/resolveDisplayBlock.middleware';
import AdMatchFinder from '../logic/adRequest/AdMatchFinder';
import getCreativeDownloadUrls from '../logic/adRequest/getCreativeDownloadUrls';
import createEmptyImpression from '../util/createEmptyImpression';
import addGuestUser from '../logic/adRequest/addGuestUser.middleware';
import isAdCachedByUser from '../util/isAdCachedByUser';

const myLogger = logger.child({ moduleName: 'AdRequestRouter' });

export default class AdRequestRouter extends BaseRouter {
  constructor() {
    super('/adrequest', myLogger);
    this.getRouter().post('/:appId/:displayBlockId', addGuestUser, resolveApp, resolveDisplayBlock, this.getAd);
  }

  /**
   * @apiVersion 1.0.1
   * @apiGroup AdRequest
   * @api {POST} /adrequest/:appId/:displayBlockId
   * @apiName Request an Ad
   * @apiParam {String} appId the AppId for which ad is requested
   * @apiParam {String} displayBlockId the DisplayBlockId for which ad is requested
   * @apiParam (Request Body) {Object[]} cachedCreatives cached Creatives by the
   * entity requesting the ad
   * @apiParam (Request Body) {String} cachedCreatives.id id of cached creative
   * @apiParam (Request Body) {String} cachedCreatives.timestamp  timestamp of cached creative
   *
   * @apiSuccess {String} appId id of the app
   * @apiSuccess {String} displayBlockId id of the display block
   * @apiSuccess {String} campaignId id of campaign
   * @apiSuccess {String} impressionId id of impression. used later to post data
   * @apiSuccess {Boolean} cached indicates if creative is cached by user
   * @apiSuccess {String} creativeTimestamp timestamp of the creative
   * @apiSuccess {Object[]} downloadUrls all files to be downloaded
   * @apiSuccess {String} downloadUrls.url one file's url
   * @apiSuccess {String} downloadUrls.filename one file's filename
   */
  async getAd(req, res, next) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { cachedCreatives } = req.body || [];
      const appId = req.app._id;
      const displayBlockId = req.displayBlock._id;
      const ad = await new AdMatchFinder().findAdForDisplayBlock({ app: req.app });
      if (ad == null || ad.campaign == null) {
        this.logger.info(`no ad found for request (appId:${req.app.id}, displayBlockId: ${req.displayBlock.id})`);
        res.status(BaseRouter.code.noContent).send();
        return;
      }
      const campaignId = ad.campaign._id;
      const downloadUrls = await getCreativeDownloadUrls(ad.campaign.url);
      const impression = await createEmptyImpression(
        { appId, displayBlockId, campaignId },
      );
      const cached = isAdCachedByUser(cachedCreatives, ad.campaign);
      res.status(BaseRouter.code.okay).json(
        {
          appId,
          displayBlockId,
          campaignId,
          impressionId: impression._id,
          cached,
          creativeTimestamp: ad.campaign.creativeTimestamp,
          downloadUrls },
      );
    } catch (err) {
      next(err);
    }
  }
}
