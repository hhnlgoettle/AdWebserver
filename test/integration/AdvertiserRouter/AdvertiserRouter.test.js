import '../../../src/config/dotenv.config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';

import Application from '../../../src/backend';
import Customer from '../../../src/models/Customer';
import generateToken from '../../../src/logic/login/generateToken';
import createCustomer from '../../util/createCustomer';
import Campaign from '../../../src/models/Campaign';
import createCampaign from '../../util/createCampaign';
import CreativePath from '../../../src/util/CreativePath';
import fsPromise from '../../../src/util/fsPromise';

const serverApp = new Application();
const server = serverApp.serverM;
chai.use(chaiHttp);
const expect = chai.expect;
const username = 'CustomerUser';
const password = 'CustomerPassword';
const campaignName = 'MyCampaignName';

let customer = null;
let token = null;

describe('AdvertiserRouter.js', () => {
  before(async () => {
    await Promise.all([
      serverApp.start(),
      new Promise((resolve) => {
        Customer.deleteMany({}).then(() => {
          createCustomer(username, password)
            .then((mCustomer) => {
              customer = mCustomer;
              generateToken(customer.toObject()).then((mToken) => {
                token = mToken;
                resolve();
              });
            });
        });
      }),
    ]);
  });
  after((done) => {
    serverApp.close().then(() => done()).catch(() => { done(); });
  });
  beforeEach(async () => Promise.all([
    Campaign.deleteMany({}),
  ]));

  it('creates a campaign', async () => new Promise((resolve) => {
    chai.request(server).post('/advertiser/campaign')
      .send({ name: campaignName })
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(res.body.campaign).to.be.an('object');
        expect(res.body.campaign.name).to.equal(campaignName);
        resolve();
      });
  }));

  it('retrieve single campaign', async () => {
    const campaign = await createCampaign(campaignName, customer.id);
    return new Promise((resolve) => {
      chai.request(server).get(`/advertiser/campaign/${campaign.id}`)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.body.campaign).to.be.an('object');
          expect(res.body.campaign.name).to.equal(campaignName);
          resolve();
        });
    });
  });

  it('retrieve multiple campaigns', async () => {
    const otherCustomer = await createCustomer('otherCustomer', 'otherCustomerPassword');
    await Promise.all([
      createCampaign(`${campaignName}0`, customer.id),
      createCampaign(`${campaignName}1`, customer.id),
      createCampaign(`${campaignName}2`, customer.id),
      createCampaign(`${campaignName}3`, customer.id),
      createCampaign(`${campaignName}4`, customer.id),
      createCampaign(`${campaignName}5`, otherCustomer.id),
      createCampaign(`${campaignName}6`, otherCustomer.id),
    ]);
    return new Promise((resolve) => {
      chai.request(server).get('/advertiser/campaign')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.body.campaigns).to.be.an('array');
          expect(res.body.campaigns.length).to.equal(5);
          resolve();
        });
    });
  });

  describe('upload creatives', () => {
    before(async () => {
      const basePath = CreativePath.fsBasePath();
      await fsPromise.rmdir(basePath, { recursive: true });
    });
    it('upload creative', async () => {
      const campaign = await createCampaign(campaignName, customer.id);
      return new Promise((resolve) => {
        chai.request(server).post(`/advertiser/campaign/${campaign.id}/creative/upload`)
          .auth(token, { type: 'bearer' })
          .set('Content-Type', 'multipart/form-data')
          .attach('creative', './test/spec/creative/index.html', 'index.html')
          .attach('creative', './test/spec/creative/test.svg', 'test.svg')
          .attach('creative', './test/spec/creative/test.js', 'test.js')
          .end((err, res) => {
            expect(res.body.campaign).to.be.an('object');
            expect(res.body.campaign.name).to.equal(campaignName);
            expect(res.body.campaign.url).to.equal(`${CreativePath.path(res.body.campaign)}`);
            resolve();
          });
      });
    });
  });
});
