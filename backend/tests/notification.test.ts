import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';
import { NotificationModel } from '../src/modules/notification/notification.model';
import { NotificationChannel, NotificationStatus, RecipientType } from '../src/modules/notification/notification.types';
import { providerRegistry } from '../src/modules/notification/providers/index';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  if (mongoServer) {
    await mongoServer.stop();
  }
});

beforeEach(async () => {
  await NotificationModel.deleteMany({});
  jest.restoreAllMocks();
});

describe('Notification Backend API Integration Tests', () => {
  describe('GET /health', () => {
    it('should return 200 UP and database connected status', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('UP');
      expect(res.body.database.isConnected).toBe(true);
    });
  });

  describe('POST /api/v1/notifications (Create)', () => {
    it('should create a DRAFT notification with valid payload', async () => {
      const payload = {
        channel: NotificationChannel.EMAIL,
        subject: 'Monthly Newsletter',
        message: 'Welcome to the new month!',
        recipients: 'All Employees',
        recipientType: RecipientType.ALL_EMPLOYEES,
      };

      const res = await request(app).post('/api/v1/notifications').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.subject).toBe(payload.subject);
      expect(res.body.data.status).toBe(NotificationStatus.DRAFT);
    });

    it('should ALWAYS create status DRAFT even if client sends status: SENT', async () => {
      const provider = providerRegistry.getProvider(NotificationChannel.EMAIL);
      const sendSpy = jest.spyOn(provider, 'send');

      const res = await request(app).post('/api/v1/notifications').send({
        channel: NotificationChannel.EMAIL,
        subject: 'Forced Sent Creation',
        message: 'Should still be draft',
        recipients: 'All Employees',
        status: NotificationStatus.SENT,
      });

      expect(res.status).toBe(201);
      expect(res.body.data.status).toBe(NotificationStatus.DRAFT);
      // Provider send MUST NOT be called during creation
      expect(sendSpy).not.toHaveBeenCalled();
    });

    it('should persist employee recipient IDs correctly', async () => {
      const payload = {
        channel: NotificationChannel.SMS,
        message: 'Direct message to employees',
        recipients: '2 Selected Employee(s)',
        recipientType: RecipientType.EMPLOYEES,
        employeeIds: ['EMP001', 'EMP002'],
      };

      const res = await request(app).post('/api/v1/notifications').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.recipientType).toBe(RecipientType.EMPLOYEES);
      expect(res.body.data.employeeIds).toEqual(['EMP001', 'EMP002']);
    });

    it('should persist department recipient IDs correctly', async () => {
      const payload = {
        channel: NotificationChannel.WHATSAPP,
        message: 'Department announcement',
        recipients: 'Engineering, Marketing',
        recipientType: RecipientType.DEPARTMENT,
        departmentIds: ['DEPT-ENG', 'DEPT-MKT'],
      };

      const res = await request(app).post('/api/v1/notifications').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.data.recipientType).toBe(RecipientType.DEPARTMENT);
      expect(res.body.data.departmentIds).toEqual(['DEPT-ENG', 'DEPT-MKT']);
    });

    it('should fail with 400 when required fields are missing', async () => {
      const res = await request(app).post('/api/v1/notifications').send({
        channel: NotificationChannel.SMS,
        // message is missing
        recipients: 'IT Dept',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should fail with 400 when invalid channel is provided', async () => {
      const res = await request(app).post('/api/v1/notifications').send({
        channel: 'INVALID_CHANNEL',
        message: 'Test message',
        recipients: 'All',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/notifications (History, Pagination & Search/Filter)', () => {
    beforeEach(async () => {
      await NotificationModel.create([
        {
          channel: NotificationChannel.EMAIL,
          subject: 'Engineering Meeting',
          message: 'Discuss backend architecture',
          recipients: 'Engineering Team (8)',
          recipientType: RecipientType.DEPARTMENT,
          status: NotificationStatus.SENT,
          createdAt: new Date('2025-07-20T10:00:00Z'),
        },
        {
          channel: NotificationChannel.EMAIL,
          subject: 'Policy Update Draft',
          message: 'Drafting new HR policy',
          recipients: 'All Employees',
          recipientType: RecipientType.ALL_EMPLOYEES,
          status: NotificationStatus.DRAFT,
          createdAt: new Date('2025-07-21T10:00:00Z'),
        },
        {
          channel: NotificationChannel.SMS,
          subject: 'SMS Urgent Alert',
          message: 'Server maintenance scheduled tonight',
          recipients: 'IT Dept',
          recipientType: RecipientType.DEPARTMENT,
          status: NotificationStatus.SENT,
          createdAt: new Date('2025-07-22T10:00:00Z'),
        },
      ]);
    });

    it('should retrieve history sorted newest first with pagination', async () => {
      const res = await request(app).get('/api/v1/notifications?limit=2&page=1');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(2);
      expect(res.body.pagination.totalItems).toBe(3);
      expect(res.body.pagination.totalPages).toBe(2);
      expect(res.body.data[0].subject).toBe('SMS Urgent Alert');
    });

    it('should filter by channel', async () => {
      const res = await request(app).get('/api/v1/notifications?channel=SMS');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].channel).toBe(NotificationChannel.SMS);
    });

    it('should filter by status (DRAFT vs SENT)', async () => {
      const res = await request(app).get('/api/v1/notifications?status=DRAFT');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].status).toBe(NotificationStatus.DRAFT);
    });

    it('should search notifications by keyword safely escaping regex characters', async () => {
      const res = await request(app).get('/api/v1/notifications?search=.*');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should reject invalid sortBy field', async () => {
      const res = await request(app).get('/api/v1/notifications?sortBy=invalidNonExistentField');

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/v1/notifications/:id', () => {
    it('should return 400 for invalid mongo ID format', async () => {
      const res = await request(app).get('/api/v1/notifications/invalid-id-123');

      expect(res.status).toBe(400);
      expect(res.body.error.code).toBe('VALIDATION_ERROR');
    });

    it('should return 404 if notification ID does not exist', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).get(`/api/v1/notifications/${nonExistentId}`);

      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });

    it('should return notification details for valid ID', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.WHATSAPP,
        message: 'WhatsApp Broadcast Message',
        recipients: 'Marketing Team',
        recipientType: RecipientType.DEPARTMENT,
        status: NotificationStatus.DRAFT,
      });

      const res = await request(app).get(`/api/v1/notifications/${doc.id}`);

      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(doc.id);
      expect(res.body.data.message).toBe('WhatsApp Broadcast Message');
    });
  });

  describe('POST /api/v1/notifications/:id/send', () => {
    it('should update DRAFT status to SENT upon sending and dispatch provider', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Weekly Digest',
        message: 'Weekly digest body content',
        recipients: 'All Employees',
        recipientType: RecipientType.ALL_EMPLOYEES,
        status: NotificationStatus.DRAFT,
      });

      const provider = providerRegistry.getProvider(NotificationChannel.EMAIL);
      const sendSpy = jest.spyOn(provider, 'send');

      const res = await request(app).post(`/api/v1/notifications/${doc.id}/send`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(NotificationStatus.SENT);
      expect(sendSpy).toHaveBeenCalledTimes(1);

      const dbDoc = await NotificationModel.findById(doc.id);
      expect(dbDoc?.status).toBe(NotificationStatus.SENT);
    });

    it('should prevent duplicate notification sending when called multiple times on an already SENT notification', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Idempotency Test',
        message: 'Idempotency message content',
        recipients: 'All Employees',
        recipientType: RecipientType.ALL_EMPLOYEES,
        status: NotificationStatus.DRAFT,
      });

      const provider = providerRegistry.getProvider(NotificationChannel.EMAIL);
      const sendSpy = jest.spyOn(provider, 'send');

      // First send call
      const res1 = await request(app).post(`/api/v1/notifications/${doc.id}/send`);
      expect(res1.status).toBe(200);
      expect(res1.body.data.status).toBe(NotificationStatus.SENT);
      expect(sendSpy).toHaveBeenCalledTimes(1);

      // Second send call on already SENT notification
      const res2 = await request(app).post(`/api/v1/notifications/${doc.id}/send`);
      expect(res2.status).toBe(200);
      expect(res2.body.data.status).toBe(NotificationStatus.SENT);
      // Provider send MUST NOT be called again
      expect(sendSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('PATCH /api/v1/notifications/:id (Update Draft)', () => {
    it('should update draft content successfully', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Original Subject',
        message: 'Original Message',
        recipients: 'HR Team',
        status: NotificationStatus.DRAFT,
      });

      const res = await request(app)
        .patch(`/api/v1/notifications/${doc.id}`)
        .send({
          subject: 'Updated Subject',
          message: 'Updated Message Content',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.subject).toBe('Updated Subject');
      expect(res.body.data.message).toBe('Updated Message Content');
    });

    it('should return 400 when attempting to update an already SENT notification', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Sent Subject',
        message: 'Sent Message Content',
        recipients: 'HR Team',
        status: NotificationStatus.SENT,
      });

      const res = await request(app)
        .patch(`/api/v1/notifications/${doc.id}`)
        .send({ subject: 'Attempted Change' });

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain('already been sent');
    });

    it('should reject PATCH request attempting to set status to SENT and NOT dispatch provider', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Draft Notification',
        message: 'Message Body',
        recipients: 'All',
        status: NotificationStatus.DRAFT,
      });

      const provider = providerRegistry.getProvider(NotificationChannel.EMAIL);
      const sendSpy = jest.spyOn(provider, 'send');

      const res = await request(app)
        .patch(`/api/v1/notifications/${doc.id}`)
        .send({ status: NotificationStatus.SENT });

      expect(res.status).toBe(400);
      expect(sendSpy).not.toHaveBeenCalled();

      const check = await NotificationModel.findById(doc.id);
      expect(check?.status).toBe(NotificationStatus.DRAFT);
    });
  });

  describe('DELETE /api/v1/notifications/:id (Delete Draft)', () => {
    it('should delete a notification draft', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Draft to delete',
        message: 'Delete me',
        recipients: 'All',
        status: NotificationStatus.DRAFT,
      });

      const res = await request(app).delete(`/api/v1/notifications/${doc.id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const check = await NotificationModel.findById(doc.id);
      expect(check).toBeNull();
    });

    it('should return 400 when attempting to delete a SENT notification', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Sent Notification',
        message: 'Cannot delete me',
        recipients: 'All',
        status: NotificationStatus.SENT,
      });

      const res = await request(app).delete(`/api/v1/notifications/${doc.id}`);

      expect(res.status).toBe(400);
      expect(res.body.error.message).toContain('already been sent');

      const check = await NotificationModel.findById(doc.id);
      expect(check).not.toBeNull();
    });

    it('should return 404 when deleting a non-existent ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(`/api/v1/notifications/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });
});
