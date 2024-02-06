import mongoose from 'mongoose';
import { AnswerSchemaType } from './types';

const AnswerSchema = new mongoose.Schema(
  {
    participant: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: isPeriodRequired,
      enum: ['1st period', '2nd period', '3rd period', '4th period', '5th period', '6th period'],
    },
    survey: {
      type: String,
      required: true,
      enum: ['Company', 'Padawan', 'Personal', 'Service'],
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

function isPeriodRequired(this: AnswerSchemaType) {
  return this.survey !== 'Service';
}

AnswerSchema.method('toJSON', function () {
  const { _id, ...object }: { [key: string]: string } = this.toObject();

  object.id = _id;

  return object;
});

export default mongoose.models.Answer || mongoose.model('Answer', AnswerSchema);
