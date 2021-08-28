import Campaign from '../../models/Campaign';

/**
 * @module
 * @class AdMatchFinder
 * @desc Class to find matching ad campaign for an app
 * @type {AdMatchFinder}
 */
const AdMatchFinder = class AdMatchFinder {
  /**
   * @desc return an array of Campaigns that match the app
   * @param {Array<String>}appBlocked array of blocked tags by app
   * @param {Array<String>} appTags tags of the app
   * @return {Promise<Array<Campaign>>}
   */
  async findNotBlockedCampaigns(appBlocked, appTags = []) {
    return Campaign.find({
      // ignore where url is not set -> no creative
      url: { $ne: null },
      // ignore where campaign has tags that app blocks
      tags: { $nin: appBlocked },
      // ignore when app has tags that campaign forbids
      blocked: { $nin: appTags },
    });
  }

  /**
   * @desc find a matching ad for a creative
   * @param {App} app
   * @param {DisplayBlock} displayBlock
   */
  async findAdForDisplayBlock({ app }) {
    const campaigns = await this.findNotBlockedCampaigns(app.blocked, app.tags);
    if (campaigns.length === 0) return { campaign: null };
    const candidateLength = campaigns.length;
    // level of randomness is suffice
    const randomIndex = Math.floor(Math.random() * candidateLength);
    return { campaign: campaigns[randomIndex] };
  }
};

export default AdMatchFinder;
