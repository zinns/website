import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['Company', 'Padawan', 'Personal', 'Service'],
    },
    questions: [
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
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

SurveySchema.method('toJSON', function () {
  const { _id, ...object }: { [key: string]: string } = this.toObject();

  object.id = _id;

  return object;
});

export default mongoose.models.Survey || mongoose.model('Survey', SurveySchema);
