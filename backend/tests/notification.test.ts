import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';
import { NotificationModel } from '../src/models/Notification';
import { NotificationChannel, NotificationStatus, RecipientType } from '../src/types/notification.types';

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
        status: NotificationStatus.DRAFT,
      };

      const res = await request(app).post('/api/v1/notifications').send(payload);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id).toBeDefined();
      expect(res.body.data.subject).toBe(payload.subject);
      expect(res.body.data.status).toBe(NotificationStatus.DRAFT);
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
      // Newest first (July 22 comes first)
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

    it('should search notifications by keyword', async () => {
      const res = await request(app).get('/api/v1/notifications?search=architecture');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].message).toContain('backend architecture');
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
    it('should update DRAFT status to SENT upon sending', async () => {
      const doc = await NotificationModel.create({
        channel: NotificationChannel.EMAIL,
        subject: 'Weekly Digest',
        message: 'Weekly digest body content',
        recipients: 'All Employees',
        recipientType: RecipientType.ALL_EMPLOYEES,
        status: NotificationStatus.DRAFT,
      });

      const res = await request(app).post(`/api/v1/notifications/${doc.id}/send`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe(NotificationStatus.SENT);

      const dbDoc = await NotificationModel.findById(doc.id);
      expect(dbDoc?.status).toBe(NotificationStatus.SENT);
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

    it('should return 404 when deleting a non-existent ID', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app).delete(`/api/v1/notifications/${fakeId}`);

      expect(res.status).toBe(404);
    });
  });
});
