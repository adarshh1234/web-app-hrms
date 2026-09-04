# Flow Assumptions - HR Module Demo

This file documents the structural navigation flow and assumptions made where Figma prototype links were missing in the static screen exports.

### 1. Employee List &rarr; Employee Details &rarr; Edit Employee
* **Assumption**: Clicking the "View" action button next to an employee in the main table opens a detailed view modal displaying personal demographic elements. Clicking the "Edit" action button opens a prefilled edit modal.
* **Reason**: The Figma designs contain explicit modals for view details and edit panels, but not as full separate pages.
* **Confidence**: High

### 2. Candidates &rarr; Status Transitions
* **Assumption**: Drag-and-drop or select statuses (Applied, Shortlisted, Interview, Selected, Onboarding, Rejected) will update the candidate's status badge in the local table dynamically.
* **Reason**: Static Figma screens show different candidates in different status bands, indicating a recruitment pipeline flow.
* **Confidence**: High

### 3. Onboarding / Offboarding Actions &rarr; Checklist Drawer
* **Assumption**: Clicking an onboarding action (like "Offer Letter") in the list will load a detail panel showing onboarding steps checklist with "Mark as Done" or "Complete" triggers.
* **Reason**: Onboarding steps are shown in detail sidebars in the designs.
* **Confidence**: High

### 4. Admin Branding &rarr; App Shell Theme Colors
* **Assumption**: The primary and secondary colors set in the Corporate Branding form will dynamically apply to the header, sidebar buttons, and interactive widgets using CSS variables.
* **Reason**: Corporate Branding is a configuration tool, making it interactive is a great value-add for the frontend demo.
* **Confidence**: Medium
