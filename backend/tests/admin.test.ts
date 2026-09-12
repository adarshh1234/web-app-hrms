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
  // 0. PURGE DATA ENDPOINT TESTS
  describe('Purge Admin Data Endpoint (/api/v1/admin/purge-admin-data)', () => {
    it('should reject GET request on purge endpoint (not allowed/not found)', async () => {
      const res = await request(app).get('/api/v1/admin/purge-admin-data');
      expect(res.status).toBe(404);
    });

    it('should reject POST request on purge endpoint (not allowed/not found)', async () => {
      const res = await request(app).post('/api/v1/admin/purge-admin-data').send({});
      expect(res.status).toBe(404);
    });

    it('should allow DELETE request on purge endpoint and purge data', async () => {
      const res = await request(app).delete('/api/v1/admin/purge-admin-data');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });

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

    it('should safely escape regex characters in search', async () => {
      const res = await request(app).get('/api/v1/admin/users?username=.*&empName=+');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
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

    it('should update an existing organization location', async () => {
      const res = await request(app)
        .patch(`/api/v1/admin/organizations/locations/${locationId}`)
        .send({
          name: 'Toronto Innovation Hub',
          city: 'Toronto',
          country: 'Canada',
          employees: 25,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      const locs = res.body.data.locations;
      const updatedLoc = locs.find((l: any) => (l._id || l.id).toString() === locationId.toString());
      expect(updatedLoc).toBeDefined();
      expect(updatedLoc.name).toBe('Toronto Innovation Hub');
      expect(updatedLoc.employees).toBe(25);
    });

    it('should reject location update with invalid ObjectId', async () => {
      const res = await request(app)
        .patch('/api/v1/admin/organizations/locations/invalid-id')
        .send({ name: 'Invalid Location' });
      expect(res.status).toBe(400);
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
    it('should get branding configuration with contract fields', async () => {
      const res = await request(app).get('/api/v1/admin/branding');
      expect(res.status).toBe(200);
      expect(res.body.data.primaryColor).toBeDefined();
      expect(res.body.data.gradient1).toBeDefined();
      expect(res.body.data.gradient2).toBeDefined();
    });

    it('should update branding configuration with canonical contract fields', async () => {
      const res = await request(app).put('/api/v1/admin/branding').send({
        primaryColor: '#006666',
        secondaryColor: '#e2e8f0',
        primaryFontColor: '#ffffff',
        secondaryFontColor: '#1e293b',
        gradient1: '#001111',
        gradient2: '#008888',
        logoUrl: 'https://example.com/logo.png',
        bannerUrl: 'https://example.com/banner.png',
        loginBannerUrl: 'https://example.com/login.png',
        socialMediaToggled: true,
      });

      expect(res.status).toBe(200);
      expect(res.body.data.primaryColor).toBe('#006666');
      expect(res.body.data.gradient1).toBe('#001111');
      expect(res.body.data.gradient2).toBe('#008888');
      expect(res.body.data.logoUrl).toBe('https://example.com/logo.png');
      expect(res.body.data.socialMediaToggled).toBe(true);
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

  // 8. JOB SUBMODULES TESTS
  describe('Job Submodules APIs (Validation & Response Consistency)', () => {
    let payGradeId: string;
    let locationId: string;

    it('should list and create pay grades with validation', async () => {
      const res = await request(app).get('/api/v1/admin/pay-grades');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBeGreaterThanOrEqual(0);

      const createRes = await request(app).post('/api/v1/admin/pay-grades').send({
        name: 'Executive Band A',
        currency: 'EUR',
        minSalary: 50000,
        maxSalary: 120000,
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.name).toBe('Executive Band A');
      payGradeId = createRes.body.data._id || createRes.body.data.id;
    });

    it('should reject invalid pay grade payload (missing name)', async () => {
      const res = await request(app).post('/api/v1/admin/pay-grades').send({
        currency: 'USD',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject pay grade update with invalid ObjectId format', async () => {
      const res = await request(app).patch('/api/v1/admin/pay-grades/not-a-valid-id').send({
        name: 'Updated Band',
      });
      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should update pay grade with valid ID and payload', async () => {
      const res = await request(app).patch(`/api/v1/admin/pay-grades/${payGradeId}`).send({
        name: 'Executive Band A Updated',
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.name).toBe('Executive Band A Updated');
    });

    it('should delete pay grade and return consistent response', async () => {
      const res = await request(app).delete(`/api/v1/admin/pay-grades/${payGradeId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('should list and create employment statuses', async () => {
      const res = await request(app).get('/api/v1/admin/employment-statuses');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const createRes = await request(app).post('/api/v1/admin/employment-statuses').send({
        status: 'Freelance Contractor',
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.status).toBe('Freelance Contractor');
    });

    it('should list and create job categories', async () => {
      const res = await request(app).get('/api/v1/admin/job-categories');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const createRes = await request(app).post('/api/v1/admin/job-categories').send({
        category: 'Executive Leadership',
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.category).toBe('Executive Leadership');
    });

    it('should list and create work shifts', async () => {
      const res = await request(app).get('/api/v1/admin/work-shifts');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const createRes = await request(app).post('/api/v1/admin/work-shifts').send({
        name: 'Flexi Shift',
        from: '10:00 AM',
        to: '07:00 PM',
        hours: '9.00',
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.name).toBe('Flexi Shift');
    });

    it('should list and create standalone locations (JobConfig)', async () => {
      const res = await request(app).get('/api/v1/admin/locations');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const createRes = await request(app).post('/api/v1/admin/locations').send({
        name: 'Berlin Tech Center',
        city: 'Berlin',
        country: 'Germany',
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.name).toBe('Berlin Tech Center');
      locationId = createRes.body.data._id || createRes.body.data.id;
    });

    it('should update standalone location', async () => {
      const res = await request(app).patch(`/api/v1/admin/locations/${locationId}`).send({
        city: 'Berlin Central',
      });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.city).toBe('Berlin Central');
    });

    it('should list and create departments', async () => {
      const res = await request(app).get('/api/v1/admin/departments');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);

      const createRes = await request(app).post('/api/v1/admin/departments').send({
        name: 'Artificial Intelligence Research',
        code: 'AIR',
        head: 'Dr. Alan Turing',
      });
      expect(createRes.status).toBe(201);
      expect(createRes.body.success).toBe(true);
      expect(createRes.body.data.name).toBe('Artificial Intelligence Research');
    });
  });
});
