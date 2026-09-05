import { jobTitleRepository, JobTitleRepository } from './jobTitle.repository';
import { IJobTitle } from './jobTitle.model';
import { AppError } from '../../../common/errors/AppError';

const DEFAULT_JOB_TITLES = [
  { title: 'Account Assistant', description: 'Assists with bookkeeping, invoicing, and financial reporting.' },
  { title: 'Automaton Tester', description: 'Writes and executes automated test scripts for software applications.' },
  { title: 'Chief Executive Officer', description: 'Provides strategic leadership and manages overall company operations.' },
  { title: 'Chief Financial Officer', description: 'Directs financial planning, risk management, and fiscal recordkeeping.' },
  { title: 'Chief Technical Officer', description: 'Oversees software engineering, architecture, and tech infrastructure.' },
  { title: 'Content Specialist', description: 'Creates, edits, and manages corporate marketing content.' },
  { title: 'Customer Success Manager', description: 'Ensures client satisfaction, onboarding, and account retention.' },
  { title: 'Database Administrator', description: 'Maintains database security, performance, and data integrity.' },
  { title: 'DevOps Engineer', description: 'Manages CI/CD pipelines, cloud deployment, and infrastructure.' },
  { title: 'Finance Manager', description: 'Oversees financial analysis, budgeting, and accounting operations.' },
  { title: 'HR Executive', description: 'Manages daily human resources, employee onboarding, and benefits.' },
  { title: 'HR Manager', description: 'Leads talent acquisition, performance management, and HR policies.' },
  { title: 'IT Support Specialist', description: 'Provides technical support for hardware, software, and networking.' },
  { title: 'Lead Software Engineer', description: 'Leads development teams and architects complex web applications.' },
  { title: 'Marketing Specialist', description: 'Executes digital marketing campaigns, SEO, and brand growth.' },
  { title: 'Network Engineer', description: 'Configures and maintains internal network routing and security.' },
  { title: 'Office Administrator', description: 'Coordinates administrative procedures and office inventory.' },
  { title: 'Operations Director', description: 'Supervises operational efficiency across organizational departments.' },
  { title: 'Product Manager', description: 'Defines product roadmaps, requirements, and feature releases.' },
  { title: 'Project Manager', description: 'Coordinates project timelines, resource allocation, and milestones.' },
  { title: 'QA Automation Lead', description: 'Directs quality assurance automation strategies and testing.' },
  { title: 'Quality Assurance Engineer', description: 'Conducts manual and automated testing for quality control.' },
  { title: 'Recruitment Manager', description: 'Leads candidate sourcing, interviews, and hiring pipelines.' },
  { title: 'Sales Executive', description: 'Drives business growth, client outreach, and revenue goals.' },
  { title: 'Senior Accountant', description: 'Manages tax compliance, audits, and financial statements.' },
  { title: 'Senior Full-Stack Engineer', description: 'Builds end-to-end full-stack web and cloud applications.' },
  { title: 'Solutions Architect', description: 'Designs enterprise solution architecture and cloud systems.' },
  { title: 'System Administrator', description: 'Monitors server infrastructure, backups, and user permissions.' }
];

export class JobTitleService {
  constructor(private repo: JobTitleRepository = jobTitleRepository) {}

  async createJobTitle(data: Partial<IJobTitle>): Promise<IJobTitle> {
    if (data.title) {
      const existing = await this.repo.findByTitle(data.title.trim());
      if (existing) {
        throw AppError.badRequest(`Job Title '${data.title}' already exists`);
      }
    }
    return await this.repo.create(data);
  }

  async getJobTitles(query: any): Promise<IJobTitle[]> {
    const totalCount = await this.repo.count({});
    if (totalCount === 0 && !query.search) {
      await this.repo.insertMany(DEFAULT_JOB_TITLES);
    }

    const filter: any = {};
    if (query.search) {
      filter.title = { $regex: query.search, $options: 'i' };
    }
    if (query.status) {
      filter.status = query.status;
    }
    const sortField = query.sortBy || 'title';
    const sortOrder = query.sortOrder === 'desc' ? -1 : 1;
    return await this.repo.findAll(filter, { [sortField]: sortOrder });
  }

  async getJobTitleById(id: string): Promise<IJobTitle> {
    const item = await this.repo.findById(id);
    if (!item) {
      throw AppError.notFound(`Job Title with ID '${id}' not found`);
    }
    return item;
  }

  async updateJobTitle(id: string, data: Partial<IJobTitle>): Promise<IJobTitle> {
    await this.getJobTitleById(id);
    if (data.title) {
      const existing = await this.repo.findByTitle(data.title.trim());
      if (existing && existing._id.toString() !== id) {
        throw AppError.badRequest(`Job Title '${data.title}' already exists`);
      }
    }
    const updated = await this.repo.update(id, data);
    return updated!;
  }

  async deleteJobTitle(id: string): Promise<void> {
    await this.getJobTitleById(id);
    await this.repo.delete(id);
  }
}

export const jobTitleService = new JobTitleService();
