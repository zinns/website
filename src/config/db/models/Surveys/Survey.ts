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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
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
