import Campaign from '../../src/models/Campaign';

function createCampaign(name, owner, opts = {}) {
  const { tags = [], blocked = [] } = opts;
  const campaign = new Campaign();
  campaign.name = name;
  campaign.owner = owner;
  campaign.tags = tags;
  campaign.blocked = blocked;
  return new Promise((resolve, reject) => {
    campaign.save()
      .then(() => {
        resolve(campaign);
      }).catch((err) => {
        reject(err);
      });
  });
}

export default createCampaign;
