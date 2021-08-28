import Impression from '../models/Impression';

/**
 * @function createEmptyImpression
 * @desc creates an impression
 * @param {String} appId
 * @param {String} campaignId
 * @param {String} displayBlockId
 * @return {Promise<Impression>}
 */
export default async function createEmptyImpression({ appId, campaignId, displayBlockId }) {
  const impression = new Impression();
  impression.appId = appId;
  impression.campaignId = campaignId;
  impression.displayBlockId = displayBlockId;

  await impression.save();

  return impression;
}
