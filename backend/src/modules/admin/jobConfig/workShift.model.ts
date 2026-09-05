import mongoose, { Schema, Document } from 'mongoose';

export interface IWorkShift extends Document {
  name: string;
  from: string;
  to: string;
  hours: string;
  createdAt: Date;
  updatedAt: Date;
}

const WorkShiftSchema = new Schema<IWorkShift>(
  {
    name: { type: String, required: true, trim: true },
    from: { type: String, required: true, default: '08:00 AM' },
    to: { type: String, required: true, default: '05:00 PM' },
    hours: { type: String, required: true, default: '9.00' },
  },
  { timestamps: true }
);

export const WorkShiftModel = mongoose.model<IWorkShift>('WorkShift', WorkShiftSchema);
