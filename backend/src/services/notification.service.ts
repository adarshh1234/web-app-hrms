import { notificationRepository, NotificationRepository } from '../repositories/notification.repository';
import { providerRegistry } from './providers/index';
import { INotification, INotificationQuery, IPaginatedResult, NotificationStatus } from '../types/notification.types';
import { AppError } from '../utils/AppError';
import { INotificationDocument } from '../models/Notification';


export class NotificationService {
  constructor(private repo: NotificationRepository = notificationRepository) {}

  async createNotification(data: Partial<INotification>, user?: { id?: string; name?: string }): Promise<INotificationDocument> {
    const payload: Partial<INotification> = {
      ...data,
      createdBy: user?.name || user?.id || data.createdBy || 'System User',
    };

    const created = await this.repo.create(payload);

    // If status is SENT upon creation, trigger provider dispatch
    if (created.status === NotificationStatus.SENT) {
      const provider = providerRegistry.getProvider(created.channel);
      await provider.send(created);
    }

    return created;
  }

  async sendNotification(id: string): Promise<INotificationDocument> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw AppError.notFound(`Notification with ID '${id}' not found`);
    }

    if (!existing.message || existing.message.trim() === '') {
      throw AppError.badRequest('Cannot send notification without message content');
    }

    // Trigger provider dispatch
    const provider = providerRegistry.getProvider(existing.channel);
    await provider.send(existing);

    // Update status to SENT
    const updated = await this.repo.updateById(id, {
      status: NotificationStatus.SENT,
    });

    if (!updated) {
      throw AppError.internal('Failed to update notification status');
    }

    return updated;
  }

  async getNotificationById(id: string): Promise<INotificationDocument> {
    const notification = await this.repo.findById(id);
    if (!notification) {
      throw AppError.notFound(`Notification with ID '${id}' not found`);
    }
    return notification;
  }

  async updateNotification(id: string, updateData: Partial<INotification>): Promise<INotificationDocument> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw AppError.notFound(`Notification with ID '${id}' not found`);
    }

    if (existing.status === NotificationStatus.SENT && updateData.status !== NotificationStatus.DRAFT) {
      throw AppError.badRequest('Cannot modify a notification that has already been sent');
    }

    const updated = await this.repo.updateById(id, updateData);
    if (!updated) {
      throw AppError.internal('Failed to update notification');
    }

    // If status was changed to SENT during update
    if (updated.status === NotificationStatus.SENT && existing.status !== NotificationStatus.SENT) {
      const provider = providerRegistry.getProvider(updated.channel);
      await provider.send(updated);
    }

    return updated;
  }

  async deleteNotification(id: string): Promise<void> {
    const existing = await this.repo.findById(id);
    if (!existing) {
      throw AppError.notFound(`Notification with ID '${id}' not found`);
    }

    const deleted = await this.repo.deleteById(id);
    if (!deleted) {
      throw AppError.internal('Failed to delete notification');
    }
  }

  async getNotifications(query: INotificationQuery): Promise<IPaginatedResult<INotificationDocument>> {
    return await this.repo.findWithPagination(query);
  }
}

export const notificationService = new NotificationService();
