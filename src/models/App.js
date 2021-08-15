import mongoose from 'mongoose';
import DisplayBlock from './DisplayBlock';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    min: 1,
    max: 64,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true,
    index: true,
  },
  // which tags in campaigns will be ignored
  blocked: { type: [{ type: String, maxLength: 24 }], default: [] },
  // tags to self describe app
  tags: { type: [{ type: String, maxLength: 24 }], default: [] },
  maxLength: { type: Number, default: -1 }, // maximum length of an ad
  displayBlocks: { type: [DisplayBlock.schema], index: true, default: [] },
});

Schema.set('autoIndex', true);

const App = mongoose.model('App', Schema);
export default App;
