import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    answerType: {
      type: String,
      required: true,
      enum: ['Multiple Choice', 'Text', 'Option', 'Scale'],
    },
    options: {
      type: [String],
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

QuestionSchema.method('toJSON', function () {
  const { _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);
