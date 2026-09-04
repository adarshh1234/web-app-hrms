# HUREMASO - HR Module Frontend Demo

This is a high-fidelity, working, and navigable frontend demo of an HR module dashboard system built from exported Figma design screens/assets.

## Tech Stack
* **Framework**: React 18 (with TypeScript)
* **Build Tool**: Vite
* **Styling**: Tailwind CSS v4
* **Routing**: React Router DOM
* **Icons**: Lucide React
* **State Management**: React hooks synced with `localStorage` to simulate database persistence.

## Project Structure
```text
src/
├── components/
│   ├── layout/
│   │   ├── AppLayout.tsx   # Reusable application shell wrapper
│   │   ├── Sidebar.tsx     # Navigation sidebar listing all modules
│   │   └── Header.tsx      # Punch In/Out button, search, and user details
│   └── common/
│       └── Modal.tsx       # Reusable modal popups
├── data/
│   └── mockData.ts         # Persistent localStorage mock database models
├── modules/
│   ├── login/              # LoginPage view
│   ├── dashboard/          # DashboardPage with stats, action lists, and widgets
│   ├── employees/          # EmployeePage with full list/add/edit/delete flows
│   ├── recruitment/        # RecruitmentPage containing 8 sub-tabs
│   ├── leave/              # LeavePage with apply forms, entitlements, configuration
│   ├── time/               # TimePage for timesheets, attendance punching, overtime
│   ├── payroll/            # PayrollPage for finance requests, pay check disbursals
│   ├── events/             # EventsPage for calendar grid and orientation lists
│   ├── performance/        # PerformancePage review tracker
│   ├── my-info/            # MyInfoPage tabbed personal employee profile details
│   ├── messaging/          # MessagingPage WhatsApp/SMS/Email composer
│   ├── documents/          # DocumentsPage file vault
│   ├── admin/              # AdminPage for shifts, structure, and theme branding
│   ├── support/            # SupportPage support tickets logs
│   └── association/        # AssociationPage inhouse collaboration requests
└── App.tsx                 # Routing mapping of modules
```

## Demo Credentials
Since there is a mock login page, you can enter the application using these credentials (pre-filled by default):
* **Username**: `admin`
* **Password**: `admin123`

## Running the Application
1. **Extract** the files if compressed.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm run dev
   ```
4. **Build production bundle**:
   ```bash
   npm run build
   ```
