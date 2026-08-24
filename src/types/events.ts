export interface EventTask {
  id: string;
  name: string;
  assignee: string;
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Completed';
}

export interface CompanyEvent {
  id: string;
  title: string;
  type: 'Training Session' | 'Team Meeting' | 'Holiday' | 'Interview' | 'Support Event';
  description: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  location: string;
  venue: string;
  status: 'Planning' | 'In Progress' | 'Upcoming' | 'Completed';
  participants: string[];
  tasks: EventTask[];
}
