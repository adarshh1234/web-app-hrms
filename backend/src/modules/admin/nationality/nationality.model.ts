import mongoose, { Schema, Document } from 'mongoose';

export interface INationality extends Document {
  name: string;
  status: 'Active' | 'Inactive';
  createdAt: Date;
  updatedAt: Date;
}

const NationalitySchema = new Schema<INationality>(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    status: { type: String, required: true, enum: ['Active', 'Inactive'], default: 'Active', index: true },
  },
  {
    timestamps: true,
  }
);

export const NationalityModel = mongoose.model<INationality>('Nationality', NationalitySchema);
