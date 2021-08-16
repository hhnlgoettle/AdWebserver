import mongoose from 'mongoose';
import HttpError from '../error/HttpError';
import Tags from '../constants/Tags';

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
      if (existing) throw HttpError.Conflict(`Campaign with name ${model.name} already exists`);
    }

    // if tags are modified, check if those are valid
    if (model.isModified('tags')) {
      await Tags.filterInput(model.tags)
        .catch((err) => { throw HttpError.BadRequest(err.message); });
    }

    // if tags are modified, check if those are valid
    if (model.isModified('blocked')) {
      await Tags.filterInput(model.blocked)
        .catch((err) => { throw HttpError.BadRequest(err.message); });
    }

    return next();
  } catch (e) {
    return next(e);
  }
});

const Campaign = mongoose.model('Campaign', Schema);
export default Campaign;
