import mongoose from 'mongoose';

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
  url: {
    type: String,
    default: null,
  },
});

Schema.set('autoIndex', true);

const Campaign = mongoose.model('Campaign', Schema);
export default Campaign;
