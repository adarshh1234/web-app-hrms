# Notification Backend Microservice

Production-grade Node.js + Express + TypeScript + Mongoose backend service for managing HR notification broadcasts across multiple channels (`EMAIL`, `SMS`, `WHATSAPP`, `EMPLOYEE_APP`, `HUREMASO`).

---

## 🏗 Architecture & Design Patterns

The service follows strict layered separation of concerns:
`Route -> Controller -> Service -> Repository -> Model`

- **Route Layer**: Express router definition with validation middleware & rate limiting.
- **Controller Layer**: Light HTTP handler parsing request inputs with Zod and returning standard JSON envelopes.
- **Service Layer**: Business logic, provider dispatch abstraction (Provider Pattern), status flow validation.
- **Repository Layer**: Data access layer encapsulating Mongoose queries & indexing strategies.
- **Model Layer**: Mongoose schemas with indexed fields (`status`, `channel`, `createdAt`, `createdBy`).

---

## 🛠 Features

- **Multi-channel Support**: EMAIL, SMS, WHATSAPP, EMPLOYEE_APP, HUREMASO.
- **Notification Lifecycle**: Save Draft, Send Notification, Edit Draft, Delete Draft, Get by ID.
- **History & Filtering**: Search in subject/message/recipients, channel filter, status filter, pagination, newest-first sorting.
- **Production Readiness**:
  - Centralized error handling (`AppError`, Zod, CastError)
  - Consistent API response structure (`{ success, data, pagination, error }`)
  - Request ID tracing (`X-Request-Id`)
  - Helmet security headers & CORS control
  - Rate limiting on `POST /api/v1/notifications/:id/send`
  - Graceful process shutdown (`SIGINT`, `SIGTERM`)
  - MongoDB Mongoose connection management

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` root directory based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hr_module_notifications
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🚀 Commands

Navigate to `backend/` directory:

```bash
# Install dependencies
npm install

# Run in Development Mode (Live reload)
npm run dev

# Run Tests (Supertest + MongoDB Memory Server)
npm test

# Check Types / Lint
npm run lint

# Build Production Bundle
npm run build

# Start Production Server
npm start
```

---

## 📑 API Reference

### Health Check
- **`GET /health`**
  - Response: `{ status: "UP", timestamp, uptime, database: { isConnected: true } }`

### Notification Endpoints

#### 1. Create Notification
- **`POST /api/v1/notifications`**
- **Body**:
  ```json
  {
    "channel": "EMAIL",
    "subject": "Q3 All-Hands Meeting",
    "message": "Please join us at 3:00 PM EST.",
    "recipients": "All Employees",
    "recipientType": "ALL_EMPLOYEES",
    "status": "DRAFT"
  }
  ```

#### 2. Send Existing Notification
- **`POST /api/v1/notifications/:id/send`**
- Updates status to `SENT` and triggers channel provider dispatch. Protected by rate limiting.

#### 3. Get History & Filter Notifications
- **`GET /api/v1/notifications`**
- **Query Parameters**:
  - `page`: Page number (default: `1`)
  - `limit`: Page size (default: `10`)
  - `search`: Search query string
  - `channel`: `EMAIL` | `SMS` | `WHATSAPP` | `EMPLOYEE_APP` | `HUREMASO`
  - `status`: `DRAFT` | `SENT`
  - `sortBy`: Field name (default: `createdAt`)
  - `sortOrder`: `asc` | `desc` (default: `desc`)

#### 4. Get Notification by ID
- **`GET /api/v1/notifications/:id`**

#### 5. Update Draft Notification
- **`PATCH /api/v1/notifications/:id`**
- **Body**: Partial notification object. (Sent notifications cannot be edited).

#### 6. Delete Draft Notification
- **`DELETE /api/v1/notifications/:id`**

---

## 🧪 Database & Indexes

Indexes defined on `Notification` schema:
- `{ status: 1 }`
- `{ channel: 1 }`
- `{ createdAt: -1 }`
- `{ createdBy: 1 }`
- `{ channel: 1, status: 1, createdAt: -1 }`
