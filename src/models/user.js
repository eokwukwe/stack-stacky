import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
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
});

export default mongoose.model('User', userSchema);
