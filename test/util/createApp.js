import App from '../../src/models/App';

function createApp(name, owner) {
  const app = new App();
  app.name = name;
  app.owner = owner;
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
