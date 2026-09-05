import mongoose, { Schema, Document } from 'mongoose';

export interface IJobTitle extends Document {
  title: string;
  description?: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

const JobTitleSchema = new Schema<IJobTitle>(
  {
    title: { type: String, required: true, unique: true, trim: true, index: true },
    description: { type: String, default: '', trim: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  },
  {
    timestamps: true,
  }
);

export const JobTitleModel = mongoose.model<IJobTitle>('JobTitle', JobTitleSchema);
