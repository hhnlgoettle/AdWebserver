import mongoose from 'mongoose';
import HttpError from '../error/HttpError';

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

// pre saving check
Schema.pre('save', async function save(next) {
  try {
    const model = this;

    // if name is modified check if it conflicts with other names
    if (model.isModified('name')) {
      const filter = { name: model.name, owner: model.owner };
      if (model._id) filter._id = { $ne: null };
      const existing = await this.constructor.findOne(filter);
      if (existing) throw HttpError.Conflict(`App with name ${model.name} already exists`);
    }

    // displayBlocks is modified, check if name exists elsewhere
    if (model.isModified('displayBlocks')) {
      const { displayBlocks } = model;
      const countPerField = {};
      displayBlocks.forEach((block) => {
        countPerField[block.name] = countPerField[block.name] == null
          ? 1 : 1 + countPerField[block.name];
        if (countPerField[block.name] > 1) throw HttpError.Conflict(`DisplayBlock with name ${block.name} already exists`);
      });
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

const Campaign = mongoose.model('Campaign', Schema);
export default Campaign;
