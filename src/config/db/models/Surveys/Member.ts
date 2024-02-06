import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema(
  {
    lastName: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      unique: true,
      required: true,
    },
    telegramUser: {
      type: String,
      unique: true,
      required: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    tShirtSize: {
      type: String,
      required: true,
      enum: ['xs', 's', 'm', 'lg', 'xl'],
    },
    memberSince: {
      type: String,
      required: true,
    },
    memberType: {
      type: String,
      default: 'member',
      enum: ['Padawan', 'Worker'],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);
