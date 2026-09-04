# Screen Map - HR Module Demo

Below is the mapping of static Figma PDF filenames to their respective router path, module, and functional purpose in this React application.

| Figma Screen (PDF name) | Application Route | Module | Purpose | Previous Page | Next Page |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `Dashboard.pdf` | `/dashboard` | Dashboard | Main overview, Presents count, absences, work times, Quick Actions | `/login` | Sidebar items |
| `Employee List.pdf` | `/employees` | Employees | Employee list with filters (Sub Unit, Status, Location) & Actions | `/dashboard` | View/Edit/Delete modals |
| `Candidate.pdf` | `/recruitment` (Candidates) | Recruitment | Recruitment candidate pipeline board | `/dashboard` | Status modals |
| `Vacancy.pdf` | `/recruitment` (Vacancies) | Recruitment | Table of job openings with "Add Vacancy" | `/recruitment` | Add Vacancy modal |
| `Post a Job in Linkdin.pdf` | `/recruitment` (Post Job) | Recruitment | LinkedIn job post creator and live preview board | `/recruitment` | Post to LinkedIn |
| `AI Cv parser.pdf` | `/recruitment` (CV Parser) | Recruitment | Resumes uploader and AI data extract simulation | `/recruitment` | Parse action |
| `Employee Onboarding.pdf` | `/recruitment` (Onboarding) | Recruitment | New employee onboarding checklist task list | `/recruitment` | Steps sidebar |
| `Employee Offboarding.pdf` | `/recruitment` (Offboarding) | Recruitment | Employee separation checklists | `/recruitment` | Steps sidebar |
| `Feedback and Interview form.pdf` | `/recruitment` (Feedback) | Recruitment | Rating scale feedback composer for candidate evaluations | `/recruitment` | Submit feedback |
| `Leave.pdf` | `/leave` (Apply) | Leave | Leave application form | `/dashboard` | My Leave tab |
| `Leave List.pdf` | `/leave` (My Leave) | Leave | List of applied leaves and pending approval logs | `/leave` | Approve/Reject actions |
| `Leave Entitlements...pdf` | `/leave` (Entitlements) | Leave | Employee leave balance entitlements grid | `/leave` | Add Entitlements |
| `Attendance My Records.pdf` | `/time` (Attendance) | Time | Personal punch logs history | `/dashboard` | Punch In/Out form |
| `Attendance Puch in\Out.pdf` | `/time` (Punch) | Time | Attendance Punch In/Out button toggles | `/time` | Punch log created |
| `Overttime Pool.pdf` | `/time` (Overtime) | Time | Daily overtime hours sheet | `/time` | Filter lists |
| `payroll.pdf` | `/payroll` | Payroll | Payroll disburser tap grid | `/dashboard` | Disbursals |
| `All Events.pdf` | `/events` (All) | Events | List of upcoming and training event cards with task counters | `/dashboard` | Add Event |
| `Events Calendar.pdf` | `/events` (Calendar) | Events | Monthly interactive calendar indicating schedule items | `/events` | Quick list details |
| `Performance Manage...pdf` | `/performance` | Performance | Reviews logs and trackers | `/dashboard` | Appraisal actions |
| `My Info Personal...pdf` | `/my-info` | My Info | ESS profile tabs (Personal details, nationality, gender, etc.) | `/dashboard` | Save profiles |
| `Whats APP.pdf` | `/messaging` (WhatsApp) | Messaging | Multi-channel messaging composer and sent logs history | `/dashboard` | Send broadcast |
| `Company Doc-Center.pdf` | `/documents` | Documents | Folder grids view for Policies, legal, travel, records templates | `/dashboard` | Upload dialogs |
| `Corporate Branding.pdf` | `/admin` (Branding) | Admin | Dynamic app shell custom styles variables configurator | `/dashboard` | Publish branding |
| `User Management.pdf` | `/admin` (Users) | Admin | Table of registered login users | `/admin` | Add user modal |
| `Structure.pdf` | `/admin` (Structure) | Admin | Organization hierarchical chart tree | `/admin` | Edit structure |
| `Maintenance.pdf` | `/support` | Maintenance | Maintenance ticket log | `/dashboard` | Create Ticket |
| `association request.pdf` | `/association` | Association | Inhouse department collaboration request boards | `/dashboard` | Accept/Reject |
| `n/a` | `/login` | Auth | Demo entry portal | None | `/dashboard` |
