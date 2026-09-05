import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';

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

describe('Admin Module Backend API Integration Tests', () => {
  // 1. USER MANAGEMENT TESTS
  describe('User Management APIs (/api/v1/admin/users)', () => {
    let createdUserId: string;

    it('should create a new user', async () => {
      const res = await request(app).post('/api/v1/admin/users').send({
        username: 'john_doe',
        role: 'Admin',
        empName: 'John Doe',
        status: 'Enabled',
        email: 'john@example.com',
      });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.id || res.body.data._id).toBeDefined();
      createdUserId = res.body.data.id || res.body.data._id;
    });

    it('should reject duplicate username', async () => {
      const res = await request(app).post('/api/v1/admin/users').send({
        username: 'john_doe',
        role: 'ESS',
        empName: 'Duplicate John',
      });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should list users with pagination', async () => {
      const res = await request(app).get('/api/v1/admin/users?page=1&limit=10');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should get user by ID', async () => {
      const res = await request(app).get(`/api/v1/admin/users/${createdUserId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.username).toBe('john_doe');
    });

    it('should update user status', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/users/${createdUserId}/status`)
        .send({ status: 'Disabled' });
      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('Disabled');
    });

    it('should delete user', async () => {
      const res = await request(app).delete(`/api/v1/admin/users/${createdUserId}`);
      expect(res.status).toBe(200);

      const getRes = await request(app).get(`/api/v1/admin/users/${createdUserId}`);
      expect(getRes.status).toBe(404);
    });
  });

  // 2. JOB TITLES TESTS
  describe('Job Titles APIs (/api/v1/admin/job-titles)', () => {
    let createdJobId: string;

    it('should create a new job title', async () => {
      const res = await request(app).post('/api/v1/admin/job-titles').send({
        title: 'Senior Software Engineer',
        description: 'Builds scalable web applications',
      });

      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe('Senior Software Engineer');
      createdJobId = res.body.data.id || res.body.data._id;
    });

    it('should reject duplicate job title', async () => {
      const res = await request(app).post('/api/v1/admin/job-titles').send({
        title: 'Senior Software Engineer',
      });

      expect(res.status).toBe(400);
    });

    it('should list all job titles', async () => {
      const res = await request(app).get('/api/v1/admin/job-titles');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should update job title', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/job-titles/${createdJobId}`)
        .send({ description: 'Updated job description' });

      expect(res.status).toBe(200);
      expect(res.body.data.description).toBe('Updated job description');
    });

    it('should delete job title', async () => {
      const res = await request(app).delete(`/api/v1/admin/job-titles/${createdJobId}`);
      expect(res.status).toBe(200);
    });
  });

  // 3. ORGANIZATION TESTS
  describe('Organization APIs (/api/v1/admin/organizations)', () => {
    let locationId: string;

    it('should fetch organization details', async () => {
      const res = await request(app).get('/api/v1/admin/organizations');
      expect(res.status).toBe(200);
      expect(res.body.data.name).toBeDefined();
    });

    it('should update organization profile', async () => {
      const res = await request(app).put('/api/v1/admin/organizations').send({
        name: 'HUREMASO Corp',
        city: 'Vancouver',
      });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('HUREMASO Corp');
    });

    it('should add a location to organization', async () => {
      const res = await request(app).post('/api/v1/admin/organizations/locations').send({
        name: 'Toronto Tech Hub',
        city: 'Toronto',
        country: 'Canada',
        employees: 10,
      });

      expect(res.status).toBe(201);
      const locs = res.body.data.locations;
      expect(locs.length).toBeGreaterThan(0);
      locationId = locs[locs.length - 1]._id || locs[locs.length - 1].id;
    });

    it('should remove a location', async () => {
      const res = await request(app).delete(`/api/v1/admin/organizations/locations/${locationId}`);
      expect(res.status).toBe(200);
    });
  });

  // 4. QUALIFICATIONS TESTS
  describe('Qualification APIs (/api/v1/admin/qualifications)', () => {
    let createdQualId: string;

    it('should create a qualification record', async () => {
      const res = await request(app).post('/api/v1/admin/qualifications').send({
        category: 'education',
        name: "Bachelor's Degree",
        subtitle: 'MIT',
        details: { major: 'Computer Science', year: '2023' },
      });

      expect(res.status).toBe(201);
      expect(res.body.data.category).toBe('education');
      createdQualId = res.body.data.id || res.body.data._id;
    });

    it('should filter qualifications by category', async () => {
      const res = await request(app).get('/api/v1/admin/qualifications?category=education');
      expect(res.status).toBe(200);
      expect(res.body.data.every((item: any) => item.category === 'education')).toBe(true);
    });

    it('should update qualification', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/qualifications/${createdQualId}`)
        .send({ subtitle: 'Harvard University' });

      expect(res.status).toBe(200);
      expect(res.body.data.subtitle).toBe('Harvard University');
    });

    it('should delete qualification', async () => {
      const res = await request(app).delete(`/api/v1/admin/qualifications/${createdQualId}`);
      expect(res.status).toBe(200);
    });
  });

  // 5. NATIONALITIES TESTS
  describe('Nationalities APIs (/api/v1/admin/nationalities)', () => {
    let createdNatId: string;

    it('should create a nationality record', async () => {
      const res = await request(app).post('/api/v1/admin/nationalities').send({
        name: 'Canadian',
      });

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe('Canadian');
      createdNatId = res.body.data.id || res.body.data._id;
    });

    it('should list nationalities', async () => {
      const res = await request(app).get('/api/v1/admin/nationalities');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it('should update nationality', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/nationalities/${createdNatId}`)
        .send({ status: 'Inactive' });

      expect(res.status).toBe(200);
      expect(res.body.data.status).toBe('Inactive');
    });

    it('should delete nationality', async () => {
      const res = await request(app).delete(`/api/v1/admin/nationalities/${createdNatId}`);
      expect(res.status).toBe(200);
    });
  });

  // 6. CORPORATE BRANDING TESTS
  describe('Corporate Branding APIs (/api/v1/admin/branding)', () => {
    it('should get branding configuration', async () => {
      const res = await request(app).get('/api/v1/admin/branding');
      expect(res.status).toBe(200);
      expect(res.body.data.primaryColor).toBeDefined();
    });

    it('should update branding configuration', async () => {
      const res = await request(app).put('/api/v1/admin/branding').send({
        primaryColor: '#006666',
        secondaryColor: '#e2e8f0',
      });

      expect(res.status).toBe(200);
      expect(res.body.data.primaryColor).toBe('#006666');
    });
  });

  // 7. SYSTEM CONFIGURATION TESTS
  describe('System Configuration APIs (/api/v1/admin/configuration)', () => {
    it('should get system configuration settings', async () => {
      const res = await request(app).get('/api/v1/admin/configuration');
      expect(res.status).toBe(200);
      expect(res.body.data.emailConfig).toBeDefined();
    });

    it('should update system configuration', async () => {
      const res = await request(app).put('/api/v1/admin/configuration').send({
        localization: { language: 'en_CA', dateFormat: 'DD/MM/YYYY' },
      });

      expect(res.status).toBe(200);
      expect(res.body.data.localization.language).toBe('en_CA');
    });
  });
});
