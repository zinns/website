import mongoose from 'mongoose';

const MigrationSchema = new mongoose.Schema(
  {
    lastMigration: {
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

MigrationSchema.method('toJSON', function () {
  const { __v, _id, ...object } = this.toObject();

  object.id = _id;

  return object;
});

export default mongoose.models.Migration || mongoose.model('Migration', MigrationSchema);
