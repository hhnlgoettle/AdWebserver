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
  // which tags in apps will be ignored
  blocked: { type: [{ type: String, maxLength: 24 }], default: [] },
  // tags to self describe campaign
  tags: { type: [{ type: String, maxLength: 24 }], default: [] },
  length: { type: Number, default: 30 }, // length of this ad in seconds
  url: {
    type: String,
    default: null,
  },
});

Schema.set('autoIndex', true);

const Campaign = mongoose.model('Campaign', Schema);
export default Campaign;
