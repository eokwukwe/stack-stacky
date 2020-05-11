import mongoose from 'mongoose';
import validator from 'validator';
import BcryptHelper from '../helpers/BcryptHelper';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      validate: (value) => validator.isEmail(value),
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await BcryptHelper.hash(this.password);
  }
  next();
});

export default mongoose.model('User', userSchema);
