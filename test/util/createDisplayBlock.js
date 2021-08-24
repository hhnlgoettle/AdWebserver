import App from '../../src/models/App';
import DisplayBlock from '../../src/models/DisplayBlock';

async function createDisplayBlock(appId, name) {
  const app = await App.findById(appId);

  const block = new DisplayBlock();
  block.name = name;
  app.displayBlocks.push(block);
  return new Promise((resolve, reject) => {
    app.save()
      .then(() => {
        resolve(app);
      }).catch((err) => {
        reject(err);
      });
  });
}

export default createDisplayBlock;
