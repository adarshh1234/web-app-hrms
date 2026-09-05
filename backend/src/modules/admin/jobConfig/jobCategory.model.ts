import mongoose, { Schema, Document } from 'mongoose';

export interface IJobCategory extends Document {
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobCategorySchema = new Schema<IJobCategory>(
  {
    category: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const JobCategoryModel = mongoose.model<IJobCategory>('JobCategory', JobCategorySchema);
