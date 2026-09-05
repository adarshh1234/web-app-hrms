import mongoose, { Schema, Document } from 'mongoose';
import { NotificationChannel, RecipientType, NotificationStatus, INotification } from './notification.types';

export interface INotificationDocument extends Omit<INotification, '_id'>, Document {}

const NotificationSchema = new Schema<INotificationDocument>(
  {
    channel: {
      type: String,
      enum: Object.values(NotificationChannel),
      required: [true, 'Channel is required'],
    },
    subject: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    recipients: {
      type: String,
      required: [true, 'Recipients display description is required'],
      trim: true,
    },
    recipientType: {
      type: String,
      enum: Object.values(RecipientType),
      required: [true, 'Recipient type is required'],
      default: RecipientType.ALL_EMPLOYEES,
    },
    departmentIds: {
      type: [String],
      default: [],
    },
    employeeIds: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: Object.values(NotificationStatus),
      required: [true, 'Status is required'],
      default: NotificationStatus.DRAFT,
    },
    createdBy: {
      type: String,
      default: 'System User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id.toString();
        delete (ret as any)._id;
        delete (ret as any).__v;
        return ret;
      },
    },
  }
);

// Indexes specified in prompt requirements: status, channel, createdAt, createdBy
NotificationSchema.index({ status: 1 });
NotificationSchema.index({ channel: 1 });
NotificationSchema.index({ createdAt: -1 });
NotificationSchema.index({ createdBy: 1 });
// Compound index for history query efficiency
NotificationSchema.index({ channel: 1, status: 1, createdAt: -1 });

export const NotificationModel = mongoose.model<INotificationDocument>('Notification', NotificationSchema);
