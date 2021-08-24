import Campaign from '../../models/Campaign';

export default class AdMatchFinder {
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
   * find a matching ad for a creative
   * @param {App.js} app
   * @param {DisplayBlock.js} displayBlock
   */
  async findAdForDisplayBlock({ app }) {
    const campaigns = await this.findNotBlockedCampaigns(app.blocked, app.tags);
    if (campaigns.length === 0) return { campaign: null };
    const candidateLength = campaigns.length;
    // level of randomness is suffice
    const randomIndex = Math.floor(Math.random() * candidateLength);
    return { campaign: campaigns[randomIndex] };
  }
}
