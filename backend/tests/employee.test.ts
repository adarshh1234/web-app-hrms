import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { app } from '../src/app';
import { DepartmentModel } from '../src/modules/admin/jobConfig/department.model';
import { JobTitleModel } from '../src/modules/admin/jobTitle/jobTitle.model';
import { LocationModel } from '../src/modules/admin/jobConfig/location.model';

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

describe('Employee Management Backend API Integration Tests', () => {
  let createdDepartmentId: string;
  let createdJobTitleId: string;
  let createdLocationId: string;
  let createdEmployeeMongoId: string;
  let createdEmployeeCustomId: string;

  beforeAll(async () => {
    // Seed admin master-data dependencies
    const dept = await DepartmentModel.create({
      name: 'Software Engineering',
      code: 'SE-01',
      head: 'Alex Smith',
      employeeCount: 5,
    });
    createdDepartmentId = dept._id.toString();

    const job = await JobTitleModel.create({
      title: 'Full Stack Engineer',
      description: 'Core developer',
      status: 'Active',
    });
    createdJobTitleId = job._id.toString();

    const loc = await LocationModel.create({
      name: 'Kochi Development Center',
      city: 'Kochi',
      country: 'India',
      phone: '+91-484-2000000',
      employees: 50,
    });
    createdLocationId = loc._id.toString();
  });

  // 1. CREATE EMPLOYEE
  describe('POST /api/v1/employees', () => {
    it('should create an employee with full valid payload, avatar and reference IDs', async () => {
      const avatarDataUri = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          employeeId: 'EMP100001',
          firstName: 'Sarah',
          middleName: 'Jane',
          lastName: 'Johnson',
          email: 'sarah.johnson@company.com',
          phone: '+1-555-0101',
          department: 'Software Engineering',
          departmentId: createdDepartmentId,
          jobTitle: 'Full Stack Engineer',
          jobTitleId: createdJobTitleId,
          subUnit: 'Frontend Dev',
          location: 'Kochi Development Center',
          locationId: createdLocationId,
          supervisor: 'Amal Benny',
          employmentStatus: 'Full-Time Permanent',
          attendanceStatus: 'Present',
          category: 'staff',
          avatar: avatarDataUri,
          otherId: 'OTH-101',
          licenseNumber: 'DL-90823A',
          nationality: 'Canadian',
          maritalStatus: 'Single',
          dob: '1994-08-12',
          gender: 'Female',
          bloodType: 'O+',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data).toBeDefined();
      expect(res.body.data.employeeId).toBe('EMP100001');
      expect(res.body.data.name).toBe('Sarah Jane Johnson');
      expect(res.body.data.email).toBe('sarah.johnson@company.com');
      expect(res.body.data.department).toBe('Software Engineering');
      expect(res.body.data.employmentStatus).toBe('Full-Time Permanent');
      expect(res.body.data.avatar).toBe(avatarDataUri);

      createdEmployeeMongoId = res.body.data._id;
      createdEmployeeCustomId = res.body.data.employeeId;
    });

    it('should create an employee with exact canonical employment status: Freelance', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Freelancer John',
          email: 'freelancer.john@company.com',
          employmentStatus: 'Freelance',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.employmentStatus).toBe('Freelance');
    });

    it('should create an employee with exact canonical employment status: Part-Time Internship', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Intern Maya',
          email: 'intern.maya@company.com',
          employmentStatus: 'Part-Time Internship',
          category: 'interns',
        });

      expect(res.status).toBe(201);
      expect(res.body.data.employmentStatus).toBe('Part-Time Internship');
    });

    it('should create an employee with name-only and auto-generated employeeId', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Michael Chen',
          email: 'michael.chen@company.com',
          department: 'Engineering',
          jobTitle: 'Software Engineer',
          location: 'Texas',
        });

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.employeeId).toMatch(/^EMP\d+$/);
      expect(res.body.data.firstName).toBe('Michael');
      expect(res.body.data.lastName).toBe('Chen');
      expect(res.body.data.email).toBe('michael.chen@company.com');
    });

    it('should reject creation with missing required fields (missing name and email)', async () => {
      const res = await request(app).post('/api/v1/employees').send({});

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject creation with invalid email format', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Invalid Email User',
          email: 'not-an-email',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
    });

    it('should reject duplicate email', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Duplicate Sarah',
          email: 'sarah.johnson@company.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/already exists/i);
    });

    it('should reject duplicate employeeId', async () => {
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          employeeId: 'EMP100001',
          name: 'Different Sarah',
          email: 'different.sarah@company.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/already exists/i);
    });

    it('should reject non-existent departmentId', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Fake Dept User',
          email: 'fake.dept@company.com',
          departmentId: fakeId,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/Department does not exist/i);
    });

    it('should reject non-existent jobTitleId', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Fake Job User',
          email: 'fake.job@company.com',
          jobTitleId: fakeId,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/Job Title does not exist/i);
    });

    it('should reject non-existent locationId', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const res = await request(app)
        .post('/api/v1/employees')
        .send({
          name: 'Fake Loc User',
          email: 'fake.loc@company.com',
          locationId: fakeId,
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/Location does not exist/i);
    });
  });

  // 2. LIST EMPLOYEES & FILTERS
  describe('GET /api/v1/employees', () => {
    beforeAll(async () => {
      // Add extra employees for filtering
      await request(app).post('/api/v1/employees').send({
        employeeId: 'EMP200001',
        name: 'Alice Probationer',
        email: 'alice.p@company.com',
        category: 'probation',
        employmentStatus: 'Full-Time Probation',
        attendanceStatus: 'Late',
        location: 'California',
        supervisor: 'Sarah Jane Johnson',
      });

      await request(app).post('/api/v1/employees').send({
        employeeId: 'EMP200002',
        name: 'Bob Intern',
        email: 'bob.i@company.com',
        category: 'interns',
        employmentStatus: 'Part-Time Internship',
        attendanceStatus: 'On-Leave',
        location: 'Kochi Development Center',
        supervisor: 'Sarah Jane Johnson',
      });

      await request(app).post('/api/v1/employees').send({
        employeeId: 'EMP200003',
        name: 'Charlie Terminated',
        email: 'charlie.t@company.com',
        employmentStatus: 'Full-Time Contract',
        isTerminated: true,
      });
    });

    it('should list all active employees by default (excluding terminated)', async () => {
      const res = await request(app).get('/api/v1/employees');

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.pagination).toBeDefined();

      const emails = res.body.data.map((e: any) => e.email);
      expect(emails).toContain('sarah.johnson@company.com');
      expect(emails).toContain('michael.chen@company.com');
      expect(emails).toContain('alice.p@company.com');
      expect(emails).not.toContain('charlie.t@company.com');
    });

    it('should include terminated when includeTerminated=true', async () => {
      const res = await request(app).get('/api/v1/employees?includeTerminated=true');

      expect(res.status).toBe(200);
      const emails = res.body.data.map((e: any) => e.email);
      expect(emails).toContain('charlie.t@company.com');
    });

    it('should filter by canonical employment status', async () => {
      const res = await request(app).get('/api/v1/employees?employmentStatus=Freelance');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Freelancer John');
    });

    it('should filter by category (e.g. interns)', async () => {
      const res = await request(app).get('/api/v1/employees?category=interns');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThanOrEqual(1);
    });

    it('should filter by employee name specifically', async () => {
      const res = await request(app).get('/api/v1/employees?name=Sarah');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0].name).toBe('Sarah Jane Johnson');
    });

    it('should search across all fields (name, supervisor, etc.) with general search query', async () => {
      const res = await request(app).get('/api/v1/employees?search=Sarah');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(3); // Sarah herself + 2 employees whose supervisor is Sarah
    });

    it('should filter by supervisor', async () => {
      const res = await request(app).get('/api/v1/employees?supervisor=Sarah Jane Johnson');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
    });

    it('should paginate results properly', async () => {
      const res = await request(app).get('/api/v1/employees?page=1&limit=2');

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBe(2);
      expect(res.body.pagination.page).toBe(1);
      expect(res.body.pagination.limit).toBe(2);
      expect(res.body.pagination.total).toBeGreaterThanOrEqual(4);
    });
  });

  // 3. GET EMPLOYEE BY ID
  describe('GET /api/v1/employees/:id', () => {
    it('should get employee by MongoDB _id and include avatar', async () => {
      const res = await request(app).get(`/api/v1/employees/${createdEmployeeMongoId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('sarah.johnson@company.com');
      expect(res.body.data.avatar).toContain('data:image/png;base64');
    });

    it('should get employee by custom employeeId (EMP100001)', async () => {
      const res = await request(app).get(`/api/v1/employees/${createdEmployeeCustomId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.email).toBe('sarah.johnson@company.com');
    });

    it('should return 404 for non-existent employee ID', async () => {
      const nonExistent = 'EMP999999';
      const res = await request(app).get(`/api/v1/employees/${nonExistent}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // 4. UPDATE EMPLOYEE
  describe('PATCH & PUT /api/v1/employees/:id', () => {
    it('should update employee details and avatar via PATCH', async () => {
      const updatedAvatar = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP...';
      const res = await request(app)
        .patch(`/api/v1/employees/${createdEmployeeCustomId}`)
        .send({
          jobTitle: 'Lead Software Architect',
          subUnit: 'Architecture & Core Systems',
          location: 'Kochi Development Center',
          employmentStatus: 'Full-Time Contract',
          maritalStatus: 'Married',
          avatar: updatedAvatar,
        });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.jobTitle).toBe('Lead Software Architect');
      expect(res.body.data.subUnit).toBe('Architecture & Core Systems');
      expect(res.body.data.employmentStatus).toBe('Full-Time Contract');
      expect(res.body.data.maritalStatus).toBe('Married');
      expect(res.body.data.avatar).toBe(updatedAvatar);
    });

    it('should update employee name and keep parts in sync', async () => {
      const res = await request(app)
        .put(`/api/v1/employees/${createdEmployeeMongoId}`)
        .send({
          firstName: 'Sarah',
          middleName: 'Elizabeth',
          lastName: 'Johnson-Smith',
        });

      expect(res.status).toBe(200);
      expect(res.body.data.name).toBe('Sarah Elizabeth Johnson-Smith');
      expect(res.body.data.lastName).toBe('Johnson-Smith');
    });

    it('should reject email update if already taken by another employee', async () => {
      const res = await request(app)
        .patch(`/api/v1/employees/${createdEmployeeCustomId}`)
        .send({
          email: 'michael.chen@company.com',
        });

      expect(res.status).toBe(400);
      expect(res.body.success).toBe(false);
      const errMsg = res.body.error?.message || res.body.message;
      expect(errMsg).toMatch(/already in use/i);
    });

    it('should return 404 when updating non-existent employee', async () => {
      const res = await request(app)
        .patch('/api/v1/employees/EMP999999')
        .send({ jobTitle: 'Ghost' });

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });

  // 5. DELETE EMPLOYEE
  describe('DELETE /api/v1/employees/:id', () => {
    it('should delete employee by custom employeeId or mongo _id', async () => {
      const res = await request(app).delete(`/api/v1/employees/${createdEmployeeCustomId}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toMatch(/deleted successfully/i);

      // Verify it no longer exists
      const checkRes = await request(app).get(`/api/v1/employees/${createdEmployeeCustomId}`);
      expect(checkRes.status).toBe(404);
    });

    it('should return 404 when deleting an already deleted or non-existent employee', async () => {
      const res = await request(app).delete(`/api/v1/employees/${createdEmployeeCustomId}`);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
    });
  });
});
