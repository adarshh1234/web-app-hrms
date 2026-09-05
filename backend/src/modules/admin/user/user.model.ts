import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  role: 'Admin' | 'ESS';
  empName: string;
  status: 'Enabled' | 'Disabled';
  email?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true, trim: true, index: true },
    role: { type: String, required: true, enum: ['Admin', 'ESS'], default: 'Admin' },
    empName: { type: String, required: true, trim: true, index: true },
    status: { type: String, required: true, enum: ['Enabled', 'Disabled'], default: 'Enabled', index: true },
    email: { type: String, trim: true, lowercase: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
