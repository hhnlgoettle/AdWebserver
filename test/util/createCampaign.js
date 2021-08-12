import Campaign from '../../src/models/Campaign';

function createCampaign(name, owner) {
  const campaign = new Campaign();
  campaign.name = name;
  campaign.owner = owner;
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
