import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  city: string;
  country: string;
  phone: string;
  employees: number;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema<ILocation>(
  {
    name: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: 'United States' },
    phone: { type: String, default: '+1-555-0100' },
    employees: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const LocationModel = mongoose.model<ILocation>('Location', LocationSchema);
