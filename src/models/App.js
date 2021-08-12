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
  displayBlocks: { type: [DisplayBlock.schema], index: true, default: [] },
});

Schema.set('autoIndex', true);

const App = mongoose.model('App', Schema);
export default App;
