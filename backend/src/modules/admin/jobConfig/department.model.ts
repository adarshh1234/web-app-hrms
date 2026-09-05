import mongoose, { Schema, Document } from 'mongoose';

export interface IDepartment extends Document {
  name: string;
  code: string;
  head: string;
  employeeCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const DepartmentSchema = new Schema<IDepartment>(
  {
    name: { type: String, required: true, trim: true },
    code: { type: String, required: true, trim: true, default: 'DEPT' },
    head: { type: String, default: 'Unassigned' },
    employeeCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const DepartmentModel = mongoose.model<IDepartment>('Department', DepartmentSchema);
