import '../../src/config/dotenv.config';
import chai from 'chai';
import { describe, it, before, beforeEach } from 'mocha';
import connectToDB from '../../src/config/mongoose.config';
import Campaign from '../../src/models/Campaign';
import App from '../../src/models/App';
import createCampaign from '../util/createCampaign';
import createCustomer from '../util/createCustomer';
import createApp from '../util/createApp';
import createDisplayBlock from '../util/createDisplayBlock';
import AdMatchFinder from '../../src/logic/adRequest/AdMatchFinder';
import Customer from '../../src/models/Customer';

const expect = chai.expect;

const appName = 'MyAppName';

let app = null;
let displayBlock = null;
let campaign = null;
let customer = null;
describe('AdMatchFinder.js', () => {
  before(async () => {
    await connectToDB();
    await Promise.all([
      Customer.deleteMany({}),
      Campaign.deleteMany({}),
      App.deleteMany({}),
    ]);
    customer = await createCustomer('myCustomer', 'myCustomerPassword');
    app = await createApp(appName, customer._id, { tags: ['game', 'casual-game'], blocked: ['nudity', 'violence'], preferred: [] });
    displayBlock = await createDisplayBlock(app._id, 'My Display Block');
  });

  beforeEach(async () => {
    await Campaign.deleteMany({});
    campaign = await createCampaign('My Campaign', customer._id, { blocked: ['nudity', 'violence'] });
    campaign.url = 'setToSthSoItSeemsItHasACreative';
    await campaign.save();
    return new Promise((resolve) => { resolve(); });
  });

  describe('findAdForDisplayBlock', () => {
    it('#find match with one campaign', async () => {
      const matcher = new AdMatchFinder();
      const result = await matcher.findAdForDisplayBlock({ app, displayBlock });
      expect(result.campaign).to.be.an('object');
      expect(result.campaign.name).to.equal(campaign.name);
      expect(result.campaign.id).to.equal(campaign.id);
    });
  });

  describe('#findNotBlockedCampaigns', () => {
    it('campaign blocked by campaigns tags through app`s blocked', async () => {
      const otherCampaign = await createCampaign('AnotherCampaign', customer.id, { tags: ['nudity'] });
      const matcher = new AdMatchFinder();
      const result = await matcher.findNotBlockedCampaigns(app.blocked, app.tags);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].id).to.not.equal(otherCampaign.id);
    });

    it('campaign blocked by apps tags through campaign`s blocked', async () => {
      const otherCampaign = await createCampaign('AnotherCampaign', customer.id, { blocked: ['game'] });
      const matcher = new AdMatchFinder();
      const result = await matcher.findNotBlockedCampaigns(app.blocked, app.tags);
      expect(result).to.be.an('array');
      expect(result.length).to.equal(1);
      expect(result[0].id).to.not.equal(otherCampaign.id);
    });
  });
});
