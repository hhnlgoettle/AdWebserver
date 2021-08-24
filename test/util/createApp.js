import App from '../../src/models/App';

function createApp(name, owner, opts = {}) {
  const { tags = [], blocked = [] } = opts;
  const app = new App();
  app.name = name;
  app.owner = owner;
  app.tags = tags;
  app.blocked = blocked;
  return new Promise((resolve, reject) => {
    app.save()
      .then(() => {
        resolve(app);
      }).catch((err) => {
        reject(err);
      });
  });
}

export default createApp;
