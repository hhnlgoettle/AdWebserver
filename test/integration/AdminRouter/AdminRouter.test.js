import '../../../src/config/dotenv.config';
import chai from 'chai';
import chaiHttp from 'chai-http';
import { describe, it, before, after, beforeEach } from 'mocha';

import Application from '../../../src/backend';
import Admin from '../../../src/models/Admin';
import createAdmin from '../../util/createAdmin';
import generateToken from '../../../src/logic/login/generateToken';

const app = new Application();
const server = app.serverM;
chai.use(chaiHttp);
const expect = chai.expect;
const username = 'AdminUser';
const password = 'AdminPassword';

describe('AdminRouter.js', () => {
  before((done) => {
    app.start().then(() => done());
  });
  after((done) => {
    app.close().then(() => done()).catch(() => { done(); });
  });
  beforeEach((done) => {
    Admin.deleteMany({}).then(() => done());
  });

  it('creates an admin', (done) => {
    chai.request(server).get('/admin/register')
      .auth(username, password, { type: 'basic' })
      .end((err, res) => {
        expect(res.body.user.role).to.equal('admin');
        expect(res.body.user.username).to.equal(username);
        done();
      });
  });

  it('login an admin', (done) => {
    createAdmin(username, password).then(() => {
      chai.request(server).get('/admin/login')
        .auth(username, password, { type: 'basic' })
        .end((err, res) => {
          if (err) throw err;
          expect(res.body.token).to.be.a('String');
          done();
        });
    });
  });

  it('auth an admin', (done) => {
    createAdmin(username, password).then((admin) => {
      generateToken(admin.toObject()).then((token) => {
        chai.request(server).get('/test/auth/admin')
          .auth(token, { type: 'bearer' })
          .end((err, res) => {
            if (err) throw err;
            expect(res.body.user.role).to.equal('admin');
            expect(res.body.user.id).to.equal(admin.id);
            done();
          });
      });
    });
  });
});
