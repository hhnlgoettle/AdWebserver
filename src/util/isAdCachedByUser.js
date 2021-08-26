import Logger from '../core/logger';

const myLogger = Logger.child({ childModule: 'isAdCachedByUser' });
/**
 * checks if a campaign / its creative is cached by the requesting entity
 * @param {[{id: String, timestamp: String}]}cached
 * @param {Campaign}campaign
 */
export default function isAdCachedByUser(cached = [], campaign) {
  try {
    const campaignId = campaign._id;
    const found = cached.find((item) => String(item.id) === String(campaignId));

    // if cachedCreative is not found, return false
    if (found == null) return false;

    // compare timestamps
    const tsCached = new Date(found.timestamp);
    const tsCreative = campaign.creativeTimestamp instanceof Date
      ? campaign.creativeTimestamp : new Date(campaign.creativeTimestamp);

    // check if we received valid cached timestamp
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(tsCached.getTime()) === true) return false;

    // only if timestamps match exactly, it is cached
    // if timestamps differ, consider cache invalid
    return ((tsCached.getTime() - tsCreative.getTime()) === 0);
  } catch (e) {
    myLogger.error(e.stack);
    return false;
  }
}
