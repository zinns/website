import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  lastName: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['master jedi', 'jedi', 'apprentice', 'chancellor'],
  },
  status: {
    type: String,
    required: true,
    default: 'inactive',
    enum: ['active', 'inactive', 'deleted'],
  },
  verificationCode: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);
