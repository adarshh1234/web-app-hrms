import mongoose, { Schema, Document } from 'mongoose';

export interface IPayGrade extends Document {
  name: string;
  currency: string;
  minSalary?: number;
  maxSalary?: number;
  createdAt: Date;
  updatedAt: Date;
}

const PayGradeSchema = new Schema<IPayGrade>(
  {
    name: { type: String, required: true, trim: true },
    currency: { type: String, required: true, default: 'United States Dollar' },
    minSalary: { type: Number },
    maxSalary: { type: Number },
  },
  { timestamps: true }
);

export const PayGradeModel = mongoose.model<IPayGrade>('PayGrade', PayGradeSchema);
