import mongoose from 'mongoose';
import DisplayBlockTypes from '../constants/DisplayBlockTypes';

const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true,
    min: 1,
    max: 64,
  },
  type: {
    type: String,
    required: true,
    default: DisplayBlockTypes.interactionRewardingAd,
  },
});

const DisplayBlock = mongoose.model('DisplayBlock', Schema);

export default DisplayBlock;
