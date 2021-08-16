import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  displayBlockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App.displayBlocks',
    required: true,
    index: true,
  },
  appId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true,
    index: true,
  },
  campaignId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true,
    index: true,
  },
  data: {
    type: Object,
    default: null,
  },
}, { timestamps: true });

Schema.set('autoIndex', true);

const Impression = mongoose.model('Impression', Schema);
export default Impression;
