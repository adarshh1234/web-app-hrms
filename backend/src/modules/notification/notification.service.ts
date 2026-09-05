import { notificationRepository, NotificationRepository } from './notification.repository';
import { providerRegistry } from './providers/index';
import { INotification, INotificationQuery, IPaginatedResult, NotificationStatus } from './notification.types';
import { AppError } from '../../common/errors/AppError';
import { INotificationDocument } from './notification.model';

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

    // 1. Idempotency Check BEFORE send logic: If already marked as SENT, do not trigger send again
    if (existing.status === NotificationStatus.SENT) {
      return existing;
    }

    if (!existing.message || existing.message.trim() === '') {
      throw AppError.badRequest('Cannot send notification without message content');
    }

    // 2. Race-condition protection: Atomically mark status as SENT before calling send logic
    const claimed = await this.repo.findAndMarkAsSent(id);
    if (!claimed) {
      // Re-query: If another concurrent call marked it as SENT, return the sent notification safely
      const reChecked = await this.repo.findById(id);
      if (reChecked && reChecked.status === NotificationStatus.SENT) {
        return reChecked;
      }
      throw AppError.internal('Failed to update notification status');
    }

    try {
      // 3. Trigger provider dispatch (guaranteed to run at most once)
      const provider = providerRegistry.getProvider(claimed.channel);
      await provider.send(claimed);
      return claimed;
    } catch (err) {
      // Revert status to DRAFT if provider dispatch fails so it can be retried
      await this.repo.updateById(id, { status: NotificationStatus.DRAFT });
      throw err;
    }
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

    // If status is being transitioned to SENT via update
    if (updateData.status === NotificationStatus.SENT && existing.status !== NotificationStatus.SENT) {
      return await this.sendNotification(id);
    }

    const updated = await this.repo.updateById(id, updateData);
    if (!updated) {
      throw AppError.internal('Failed to update notification');
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
