import '../../../src/config/dotenv.config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';

import Application from '../../../src/backend';
import App from '../../../src/models/App';
import Customer from '../../../src/models/Customer';
import generateToken from '../../../src/logic/login/generateToken';
import createCustomer from '../../util/createCustomer';
import createApp from '../../util/createApp';

const serverApp = new Application();
const server = serverApp.serverM;
chai.use(chaiHttp);
const expect = chai.expect;
const username = 'CustomerUser';
const password = 'CustomerPassword';
const appName = 'MyAppName';

let customer = null;
let token = null;

describe('PublisherRouter.js', () => {
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
    App.deleteMany({}),
  ]));

  it('creates an app', async () => new Promise((resolve) => {
    chai.request(server).post('/publisher/app')
      .send({ name: appName })
      .auth(token, { type: 'bearer' })
      .end((err, res) => {
        expect(res.body.app).to.be.an('object');
        expect(res.body.app.name).to.equal(appName);
        resolve();
      });
  }));

  it('retrieve single app', async () => {
    const app = await createApp(appName, customer.id);
    return new Promise((resolve) => {
      chai.request(server).get(`/publisher/app/${app.id}`)
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.body.app).to.be.an('object');
          expect(res.body.app.name).to.equal(appName);
          resolve();
        });
    });
  });

  it('retrieve multiple apps', async () => {
    const otherCustomer = await createCustomer('otherCustomer', 'otherCustomerPassword');
    await Promise.all([
      createApp(`${appName}0`, customer.id),
      createApp(`${appName}1`, customer.id),
      createApp(`${appName}2`, customer.id),
      createApp(`${appName}3`, customer.id),
      createApp(`${appName}4`, customer.id),
      createApp(`${appName}5`, otherCustomer.id),
      createApp(`${appName}6`, otherCustomer.id),
    ]);
    return new Promise((resolve) => {
      chai.request(server).get('/publisher/app')
        .auth(token, { type: 'bearer' })
        .end((err, res) => {
          expect(res.body.apps).to.be.an('array');
          expect(res.body.apps.length).to.equal(5);
          resolve();
        });
    });
  });
});
