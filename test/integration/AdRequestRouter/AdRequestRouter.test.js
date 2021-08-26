import '../../../src/config/dotenv.config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after } from 'mocha';

import Application from '../../../src/backend';
import Customer from '../../../src/models/Customer';
import createCustomer from '../../util/createCustomer';
import createCampaign from '../../util/createCampaign';
import createApp from '../../util/createApp';
import createDisplayBlock from '../../util/createDisplayBlock';
import Campaign from '../../../src/models/Campaign';
import App from '../../../src/models/App';
import generateToken from '../../../src/logic/login/generateToken';
import uploadCreative from '../../util/uploadCreative';

const application = new Application();
const server = application.serverM;
chai.use(chaiHttp);
const expect = chai.expect;
let customer = null;
let campaign = null;
let app = null;
let token = null;

describe('AdminRouter.js', () => {
  before(async () => {
    await application.start();
    await Promise.all([
      Customer.deleteMany({}),
      Campaign.deleteMany({}),
      App.deleteMany({}),
    ]);
    customer = await createCustomer('customer', 'password');
    await generateToken(customer.toObject())
      .then((mToken) => { token = mToken; });
    campaign = await createCampaign('someCampaign', customer.id, {});
    app = await createApp('someApp', customer.id);
    app = await createDisplayBlock(app.id, 'someDisplayBlock');
    await uploadCreative({ server, campaign, token });

    // refresh model because upload creative has changed values in db
    campaign = await Campaign.findById(campaign.id);
  });

  it('requests an advertisement', async () => {
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          expect(res.body.cached).to.equal(false);
          resolve();
        });
    });
  });

  it('requests an advertisement with cache, but no match', async () => {
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .send({ cached: [{ id: 'someOtherId', timestamp: Date.now() }] })
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          expect(res.body.cached).to.equal(false);
          resolve();
        });
    });
  });

  it('requests an advertisement with valid cache', async () => {
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .send({ cachedCreatives: [{ id: campaign.id, timestamp: campaign.creativeTimestamp }] })
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          expect(res.body.cached).to.equal(true);
          resolve();
        });
    });
  });

  it('requests an advertisement with valid cache, cached timestamp is older', async () => {
    // manipulate timestamp
    const timestamp = new Date(new Date(campaign.creativeTimestamp).getTime() - 100).toISOString();
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .send({ cachedCreatives: [{ id: campaign.id, timestamp }] })
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          // shouldn't be cached because of timestamp mismatch
          expect(res.body.cached).to.equal(false);
          resolve();
        });
    });
  });

  it('requests an advertisement with valid cache, cached timestamp is older', async () => {
    // manipulate timestamp
    const timestamp = new Date(new Date(campaign.creativeTimestamp).getTime() - 100).toISOString();
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .send({ cachedCreatives: [{ id: campaign.id, timestamp }] })
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          // shouldn't be cached because of timestamp mismatch
          expect(res.body.cached).to.equal(false);
          resolve();
        });
    });
  });

  it('requests an advertisement with valid cache, cached timestamp is malformed', async () => {
    // manipulate timestamp
    const timestamp = 'someGarbledTimestamp';
    await new Promise((resolve) => {
      chai.request(server).post(`/adrequest/${app.id}/${app.displayBlocks[0].id}`)
        .send({ cachedCreatives: [{ id: campaign.id, timestamp }] })
        .end((err, res) => {
          expect(res.body.appId).to.equal(app.id);
          // shouldn't be cached because of timestamp mismatch
          expect(res.body.cached).to.equal(false);
          resolve();
        });
    });
  });

  after((done) => {
    application.close().then(() => done()).catch(() => { done(); });
  });
});
