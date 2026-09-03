import { FilterQuery } from 'mongoose';
import { NotificationModel, INotificationDocument } from '../models/Notification';
import { INotification, INotificationQuery, IPaginatedResult } from '../types/notification.types';


export class NotificationRepository {
  async create(data: Partial<INotification>): Promise<INotificationDocument> {
    const notification = new NotificationModel(data);
    return await notification.save();
  }

  async findById(id: string): Promise<INotificationDocument | null> {
    return await NotificationModel.findById(id).exec();
  }

  async updateById(id: string, updateData: Partial<INotification>): Promise<INotificationDocument | null> {
    return await NotificationModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).exec();
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await NotificationModel.findByIdAndDelete(id).exec();
    return result !== null;
  }

  async findWithPagination(query: INotificationQuery): Promise<IPaginatedResult<INotificationDocument>> {
    const page = Math.max(1, query.page || 1);
    const limit = Math.max(1, Math.min(100, query.limit || 10));
    const skip = (page - 1) * limit;

    const filter: FilterQuery<INotificationDocument> = {};

    if (query.channel) {
      filter.channel = query.channel;
    }

    if (query.status) {
      filter.status = query.status;
    }

    if (query.search && query.search.trim() !== '') {
      const searchRegex = new RegExp(query.search.trim(), 'i');
      filter.$or = [
        { subject: searchRegex },
        { message: searchRegex },
        { recipients: searchRegex },
      ];
    }

    const sortField = query.sortBy || 'createdAt';
    const sortOrder = query.sortOrder === 'asc' ? 1 : -1;
    const sortOptions: Record<string, 1 | -1> = { [sortField]: sortOrder };

    const [data, totalItems] = await Promise.all([
      NotificationModel.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .exec(),
      NotificationModel.countDocuments(filter).exec(),
    ]);

    const totalPages = Math.ceil(totalItems / limit) || 1;

    return {
      data,
      pagination: {
        totalItems,
        currentPage: page,
        totalPages,
        pageSize: limit,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  }
}

export const notificationRepository = new NotificationRepository();
