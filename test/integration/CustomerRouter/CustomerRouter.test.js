import '../../../src/config/dotenv.config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';

import Application from '../../../src/backend';
import generateToken from '../../../src/logic/login/generateToken';
import Customer from '../../../src/models/Customer';
import createCustomer from '../../util/createCustomer';

const app = new Application();
const server = app.serverM;
chai.use(chaiHttp);
const expect = chai.expect;
const username = 'CustomerUser';
const password = 'CustomerPassword';

describe('CustomerRouter.js', () => {
  before((done) => {
    app.start().then(() => done());
  });
  after((done) => {
    app.close().then(() => done()).catch(() => { done(); });
  });
  beforeEach((done) => {
    Customer.deleteMany({}).then(() => done());
  });

  it('creates a customer', (done) => {
    chai.request(server).get('/customer/register')
      .auth(username, password, { type: 'basic' })
      .end((err, res) => {
        expect(res.body.user.role).to.equal('customer');
        expect(res.body.user.username).to.equal(username);
        done();
      });
  });

  it('login customer', (done) => {
    createCustomer(username, password).then(() => {
      chai.request(server).get('/customer/login')
        .auth(username, password, { type: 'basic' })
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.token).to.be.a('String');
          done();
        });
    });
  });

  it('auth an customer', (done) => {
    createCustomer(username, password).then((user) => {
      generateToken(user.toObject()).then((token) => {
        chai.request(server).get('/test/auth/customer')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.user.role).to.equal('customer');
            expect(res.body.user.id).to.equal(user.id);
            done();
          });
      });
    });
  });
});
