# Component Map - HR Module Demo

This file documents the major reusable components used in this application and their configurations.

### 1. AppLayout Shell (`src/components/layout/AppLayout.tsx`)
* **Purpose**: Coordinates side-navigation, top headers, branding theme loaders, and main content routing outlets.
* **Key Sub-components**:
  * `Header.tsx` (top-bar with search, alerts, user profiles, and active attendance status check).
  * `Sidebar.tsx` (sidebar menu linking to all 13 modules).

### 2. Modal Popup Dialog (`src/components/common/Modal.tsx`)
* **Purpose**: Clean overlays that restrict scroll focus, capture ESC key event triggers, and display modal headers, bodies, and footers.
* **Usage**:
  * *Employee Delete Confirmations*
  * *Adding New System Users*
  * *Adding New Work Shift records*
  * *Adding New Job Vacancy postings*
  * *Update recruitment pipeline steps status*

### 3. Dynamic Corporate Branding Pickers (`src/modules/admin/AdminPage.tsx`)
* **Purpose**: Admin branding form featuring native color pickers linked to CSS root properties.
* **Mechanism**: Sets style values directly on `document.documentElement` to allow instantaneous styling previews of header gradients and active button borders.

### 4. Timesheet Grid Logger (`src/modules/time/TimePage.tsx`)
* **Purpose**: Weekly grid input interface (Mon-Sun log values) calculating row aggregates on input changes.
