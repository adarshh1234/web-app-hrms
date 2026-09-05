import mongoose, { Schema, Document } from 'mongoose';

export type QualificationCategory = 'education' | 'licenses' | 'skills' | 'languages' | 'memberships';

export interface IQualification extends Document {
  category: QualificationCategory;
  name: string;
  subtitle?: string;
  details?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const QualificationSchema = new Schema<IQualification>(
  {
    category: {
      type: String,
      required: true,
      enum: ['education', 'licenses', 'skills', 'languages', 'memberships'],
      index: true,
    },
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, default: '', trim: true },
    details: { type: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const QualificationModel = mongoose.model<IQualification>('Qualification', QualificationSchema);
