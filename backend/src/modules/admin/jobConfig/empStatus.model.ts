import mongoose, { Schema, Document } from 'mongoose';

export interface IEmpStatus extends Document {
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const EmpStatusSchema = new Schema<IEmpStatus>(
  {
    status: { type: String, required: true, trim: true, unique: true },
  },
  { timestamps: true }
);

export const EmpStatusModel = mongoose.model<IEmpStatus>('EmpStatus', EmpStatusSchema);
