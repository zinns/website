import mongoose from 'mongoose';

const SurveySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ['company', 'padawan', 'personal', 'service'],
    },
    questions: [
      {
        title: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
          enum: ['multiple', 'text', 'select', 'scale'],
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

export default mongoose.model('Survey', SurveySchema);
