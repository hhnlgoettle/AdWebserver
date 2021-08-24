import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcrypt';
import sequence from 'mongoose-sequence';

const AutoIncrement = sequence(mongoose);

const Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
    min: 3,
    max: 15,
  },
  role: {
    type: String,
    default: 'admin',
    select: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  confirmed: {
    type: Boolean,
    select: true,
    default: false,
  },
});

Schema.set('autoIndex', false);
Schema.set('toJSON', { virtuals: true,
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  } });

Schema.plugin(uniqueValidator);
Schema.plugin(AutoIncrement, { inc_field: 'userId' });

Schema.pre('save', async function save(next) {
  const user = this;

  // if password is not modified we can save
  if (!user.isModified('password')) {
    return next();
  }

  // otherwise hash the new set password
  try {
    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);
    return next();
  } catch (e) {
    return next(e);
  }
});

const Admin = mongoose.model('Admin', Schema);
export default Admin;
