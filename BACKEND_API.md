# Thai Hajj Health System - Backend API Documentation

## 🏗️ Backend Architecture

### Express.js API Server
- **Deployment URL**: `api.domain.com`
- **Framework**: Express.js + Node.js
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT + bcrypt
- **API Documentation**: Swagger/OpenAPI 3.0

---

## 📂 Backend Project Structure

```
hajj-health-api/
├── src/
│   ├── controllers/           # API Controllers
│   │   ├── auth.controller.js
│   │   ├── user.controller.js
│   │   ├── pilgrim.controller.js
│   │   ├── health.controller.js
│   │   ├── hospital.controller.js
│   │   ├── certificate.controller.js
│   │   ├── surveillance.controller.js
│   │   ├── alert.controller.js
│   │   └── report.controller.js
│   ├── models/               # Database Models
│   │   ├── User.js
│   │   ├── Pilgrim.js
│   │   ├── HealthRecord.js
│   │   ├── Hospital.js
│   │   ├── Certificate.js
│   │   ├── Surveillance.js
│   │   └── Alert.js
│   ├── routes/               # API Routes
│   │   ├── auth.routes.js
│   │   ├── user.routes.js
│   │   ├── pilgrim.routes.js
│   │   ├── health.routes.js
│   │   ├── hospital.routes.js
│   │   ├── certificate.routes.js
│   │   ├── surveillance.routes.js
│   │   ├── alert.routes.js
│   │   └── report.routes.js
│   ├── middleware/           # Middleware
│   │   ├── auth.middleware.js
│   │   ├── validation.middleware.js
│   │   ├── error.middleware.js
│   │   └── cors.middleware.js
│   ├── services/            # Business Logic
│   │   ├── auth.service.js
│   │   ├── user.service.js
│   │   ├── health.service.js
│   │   ├── certificate.service.js
│   │   ├── surveillance.service.js
│   │   ├── alert.service.js
│   │   └── integration.service.js
│   ├── utils/              # Utilities
│   │   ├── database.js
│   │   ├── jwt.utils.js
│   │   ├── bcrypt.utils.js
│   │   ├── validation.js
│   │   └── pdf.generator.js
│   ├── config/             # Configuration
│   │   ├── database.config.js
│   │   ├── auth.config.js
│   │   └── app.config.js
│   └── app.js              # Express App
├── migrations/             # Database Migrations
├── seeders/               # Database Seeders
├── tests/                 # API Tests
├── docs/                  # API Documentation
│   └── swagger.yaml
├── docker-compose.yml     # Docker Configuration
├── Dockerfile
├── package.json
└── README.md
```

---

## 🔐 API Endpoints

### Base URL: `https://api.domain.com`

### 🔑 Authentication & Authorization
```
POST /auth/login           → ล็อกอิน (admin/staff/executive)
POST /auth/logout          → ล็อกเอ้าท์
POST /auth/refresh         → รีเฟรช JWT token
GET  /auth/me              → ข้อมูลผู้ใช้ปัจจุบัน
POST /auth/forgot-password → ลืมรหัสผ่าน
POST /auth/reset-password  → รีเซ็ตรหัสผ่าน
```

### 👥 User Management
```
GET    /users             → รายชื่อผู้ใช้ (Admin only)
POST   /users             → สร้างผู้ใช้ใหม่ (Admin only)
GET    /users/:id         → ข้อมูลผู้ใช้
PUT    /users/:id         → แก้ไขข้อมูลผู้ใช้
DELETE /users/:id         → ลบผู้ใช้ (Admin only)
PUT    /users/:id/status  → เปลี่ยนสถานะผู้ใช้
```

### 🕋 Pilgrim Management (ผู้ประกอบพิธีฮัจญ์)
```
GET    /pilgrims                    → รายชื่อผู้ประกอบพิธีฮัจญ์
POST   /pilgrims                    → ลงทะเบียนผู้ประกอบพิธีฮัจญ์ใหม่
GET    /pilgrims/:id                → ข้อมูลผู้ประกอบพิธีฮัจญ์
PUT    /pilgrims/:id                → แก้ไขข้อมูล
DELETE /pilgrims/:id                → ลบข้อมูล
GET    /pilgrims/citizen/:citizenId → ค้นหาด้วยเลขประชาชน
GET    /pilgrims/:id/health         → บันทึกสุขภาพ
POST   /pilgrims/:id/health         → เพิ่มบันทึกสุขภาพ
```

### 🏥 Health Records (One ID System)
```
GET    /health-records                    → รายการบันทึกสุขภาพ
POST   /health-records                    → สร้างบันทึกใหม่
GET    /health-records/:id                → บันทึกสุขภาพรายบุคคล
PUT    /health-records/:id                → แก้ไขบันทึก
DELETE /health-records/:id                → ลบบันทึก
GET    /health-records/citizen/:citizenId → ค้นหาด้วยเลขประชาชน 13 หลัก
GET    /health-records/:id/history        → ประวัติการรักษา
POST   /health-records/:id/vaccine        → บันทึกการฉีดวัคซีน
```

### 🏥 Hospital Management (หน่วยบริการ)
```
GET    /hospitals        → รายชื่อโรงพยาบาล/รพ.สต.
POST   /hospitals        → เพิ่มหน่วยบริการ (Admin only)
GET    /hospitals/:hcode → ข้อมูลหน่วยบริการ (HCODE)
PUT    /hospitals/:hcode → แก้ไขข้อมูลหน่วยบริการ
DELETE /hospitals/:hcode → ลบหน่วยบริการ (Admin only)
GET    /hospitals/:hcode/staff → เจ้าหน้าที่ในหน่วยบริการ
```

### 📋 Health Certificates (ใบรับรองสุขภาพ)
```
GET    /certificates                    → รายการใบรับรอง
POST   /certificates/generate           → สร้างใบรับรองใหม่
GET    /certificates/:id                → ดาวน์โหลดใบรับรอง (PDF)
GET    /certificates/:id/preview        → แสดงตัวอย่างใบรับรอง
GET    /certificates/verify/:certificateId → ตรวจสอบใบรับรอง
PUT    /certificates/:id/status         → อัพเดทสถานะใบรับรอง
```

### 🔍 Disease Surveillance (เฝ้าระวังโรค 14 วัน)
```
GET    /surveillance                → รายการเฝ้าระวัง
POST   /surveillance                → เพิ่มรายการเฝ้าระวัง
GET    /surveillance/:id            → ข้อมูลการเฝ้าระวัง
PUT    /surveillance/:id            → แก้ไขข้อมูล
PUT    /surveillance/:id/status     → อัพเดทสถานะ
GET    /surveillance/active         → รายการเฝ้าระวังที่ยังดำเนินการอยู่
GET    /surveillance/completed      → รายการเฝ้าระวังที่เสร็จสิ้น
POST   /surveillance/:id/symptom    → บันทึกอาการ
```

### 🚨 Alert System (ระบบแจ้งเตือน Mr. Hajj)
```
GET    /alerts           → รายการแจ้งเตือน
POST   /alerts           → สร้างแจ้งเตือนใหม่
GET    /alerts/:id       → ข้อมูลแจ้งเตือน
PUT    /alerts/:id/read  → อ่านแจ้งเตือนแล้ว
DELETE /alerts/:id       → ลบแจ้งเตือน
GET    /alerts/unread    → แจ้งเตือนที่ยังไม่อ่าน
GET    /alerts/priority  → แจ้งเตือนที่มีความสำคัญสูง
```

### 📊 Reports & Analytics (รายงานและสถิติ)
```
GET    /reports/dashboard      → ข้อมูล dashboard
GET    /reports/statistics     → สถิติต่างๆ
GET    /reports/pilgrims       → รายงานผู้ประกอบพิธีฮัจญ์
GET    /reports/health         → รายงานสุขภาพ
GET    /reports/surveillance   → รายงานการเฝ้าระวัง
GET    /reports/certificates   → รายงานใบรับรอง
POST   /reports/export         → ส่งออกรายงาน (Excel/PDF)
GET    /reports/analytics      → การวิเคราะห์ข้อมูล
```

### 🔗 External Integration (เชื่อมต่อหน่วยงานภายนอก)
```
POST /integration/moph          → เชื่อมต่อกระทรวงสาธารณสุข
POST /integration/nhso          → เชื่อมต่อ สปสช.
POST /integration/hajj-office   → เชื่อมต่อสำนักงานฮัจญ์
POST /integration/sync-data     → ซิงค์ข้อมูลระหว่างระบบ
GET  /integration/status        → สถานะการเชื่อมต่อ
```

---

## 🔒 Authentication & Security

### JWT Token Structure
```json
{
  "userId": "12345",
  "role": "admin|staff|executive",
  "hcode": "12345", // สำหรับ staff เท่านั้น
  "exp": 1640995200,
  "iat": 1640908800
}
```

### API Security Features
- **JWT Authentication**: ทุก protected route
- **Role-based Access Control**: Admin/Staff/Executive
- **Rate Limiting**: 100 requests/minute
- **CORS**: กำหนด allowed origins
- **Input Validation**: Joi/Zod validation
- **SQL Injection Protection**: Parameterized queries
- **Password Hashing**: bcrypt
- **API Key Authentication**: สำหรับ external integration

---

## 🗄️ Database Schema

### Core Tables
```sql
-- Users (ผู้ใช้งานระบบ)
users (
  id, username, password_hash, email, role, 
  hcode, status, created_at, updated_at
)

-- Pilgrims (ผู้ประกอบพิธีฮัจญ์)
pilgrims (
  id, citizen_id, title, first_name, last_name, 
  date_of_birth, gender, phone, address, 
  passport_number, hajj_year, group_id, 
  created_at, updated_at
)

-- Health Records (บันทึกสุขภาพ One ID)
health_records (
  id, pilgrim_id, citizen_id, record_type,
  examination_date, hospital_hcode, staff_id,
  vital_signs, symptoms, diagnosis, treatment,
  vaccines, medications, notes, created_at
)

-- Hospitals (หน่วยบริการ)
hospitals (
  hcode, name, type, address, province, 
  phone, email, status, created_at, updated_at
)

-- Certificates (ใบรับรองสุขภาพ)
certificates (
  id, pilgrim_id, certificate_number, type,
  issue_date, expiry_date, hospital_hcode,
  issued_by, status, pdf_url, created_at
)

-- Surveillance (เฝ้าระวังโรค 14 วัน)
surveillance (
  id, pilgrim_id, start_date, end_date,
  status, monitoring_officer, notes,
  created_at, updated_at
)

-- Alerts (แจ้งเตือน)
alerts (
  id, type, title, message, severity,
  target_user_id, target_role, is_read,
  created_at, read_at
)
```

---

## 🚀 Deployment Configuration

### Environment Variables
```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_NAME=hajj_health
DB_USER=hajj_user
DB_PASS=secure_password

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h
JWT_REFRESH_EXPIRE=7d

# App
NODE_ENV=production
PORT=3001
API_URL=https://api.domain.com
FRONTEND_URL=https://domain.com

# External APIs
MOPH_API_KEY=moph-api-key
NHSO_API_KEY=nhso-api-key
HAJJ_OFFICE_API_KEY=hajj-office-api-key
```

### Docker Configuration
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

### PM2 Configuration
```json
{
  "apps": [{
    "name": "hajj-health-api",
    "script": "src/app.js",
    "instances": "max",
    "exec_mode": "cluster",
    "env": {
      "NODE_ENV": "production",
      "PORT": 3001
    }
  }]
}
```

---

## 📋 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": {
    // response data
  },
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 20
  }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      }
    ]
  },
  "timestamp": "2025-11-05T10:30:00Z"
}
```

---

## 🧪 Testing

### API Testing
```bash
# Unit Tests
npm run test

# Integration Tests  
npm run test:integration

# API Tests with Postman/Newman
npm run test:api

# Load Testing with Artillery
npm run test:load
```

### Test Coverage
- Controllers: 90%+
- Services: 85%+
- Utils: 95%+
- Routes: 80%+

---

## 📚 API Documentation

### Swagger UI
- **URL**: `https://api.domain.com/docs`
- **Authentication**: Basic Auth หรือ API Key
- **Features**: Interactive API testing, schema validation

### Postman Collection
- Import collection: `docs/hajj-health-api.postman_collection.json`
- Environment variables included
- Automated testing scripts

---

## 🔧 Development

### Local Development
```bash
# Clone repository
git clone https://github.com/yourorg/hajj-health-api.git
cd hajj-health-api

# Install dependencies
npm install

# Setup database
npm run db:migrate
npm run db:seed

# Start development server
npm run dev
```

### API Versioning
- **Current Version**: v1
- **URL Pattern**: `api.domain.com/v1/`
- **Backwards Compatibility**: 2 major versions

---

## 🚨 Monitoring & Logging

### Logging
- **Framework**: Winston
- **Levels**: Error, Warn, Info, Debug
- **Storage**: File rotation + Database
- **Format**: JSON structured logs

### Monitoring
- **Health Check**: `GET /health`
- **Metrics**: Prometheus + Grafana
- **Alerts**: Slack/Email notifications
- **Uptime**: 99.9% target

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**API Base URL**: `https://api.domain.com`