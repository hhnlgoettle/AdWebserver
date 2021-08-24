import Impression from '../models/Impression';

export default async function createEmptyImpression({ appId, campaignId, displayBlockId }) {
  const impression = new Impression();
  impression.appId = appId;
  impression.campaignId = campaignId;
  impression.displayBlockId = displayBlockId;

  await impression.save();

  return impression;
}
