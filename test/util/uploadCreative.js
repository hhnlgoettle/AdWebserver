import chai from 'chai';

export default function uploadCreative({ server, campaign, token }) {
  return new Promise((resolve, reject) => {
    chai.request(server).post(`/advertiser/campaign/${campaign.id}/creative/upload`)
      .auth(token, { type: 'bearer' })
      .set('Content-Type', 'multipart/form-data')
      .attach('creative', './test/spec/creative/index.html', 'index.html')
      .attach('creative', './test/spec/creative/test.svg', 'test.svg')
      .attach('creative', './test/spec/creative/test.js', 'test.js')
      .end((err, res) => {
        if (err) reject(err);
        resolve(res.body);
      });
  });
}
