# ไฟล์ที่ต้องอัพโหลดขึ้น Host สำหรับ Thai Hajj Health System

## 📁 Frontend Files (Next.js Application)
```
THH/
├── app.js                          # Entry point สำหรับ hosting
├── package.json                    # Dependencies และ scripts
├── package-lock.json              # Lock file สำหรับ dependencies
├── next.config.ts                 # Next.js configuration
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.js              # PostCSS configuration
├── eslint.config.mjs              # ESLint configuration
├── middleware.ts                  # Next.js middleware
└── .env.production                # Production environment variables
```

## 📁 Source Code Directories
```
src/
├── app/                           # App Router pages
├── components/                    # React components
├── context/                       # React contexts
├── hooks/                         # Custom hooks
├── icons/                         # SVG icons
├── layout/                        # Layout components
├── services/                      # API services
└── types/                         # TypeScript types
```

## 📁 Static Assets
```
public/
└── images/                        # Static images
    ├── brand/
    ├── icons/
    ├── logo/
    └── ...
```

## 📁 Backend API (Express.js)
```
BackEnd_API/
├── app.js                         # Express.js entry point
├── package.json                   # Backend dependencies
├── routes/                        # API routes
│   ├── auth.js
│   ├── users.js
│   └── health.js
├── middleware/                    # Express middleware
│   ├── auth.js
│   ├── cors.js
│   └── security.js
├── config/                        # Configuration files
│   └── database.js
├── models/                        # Database models
└── utils/                         # Utility functions
```

## 🔧 Configuration Files ที่สำคัญ

### 1. Environment Variables (.env.production)
```env
# Database Configuration
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=thai_hajj_health

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=24h

# ThaiD OAuth Configuration
THAID_CLIENT_ID=your-thaid-client-id
THAID_CLIENT_SECRET=your-thaid-client-secret
THAID_REDIRECT_URI=https://yourdomain.com/auth/thaid/callback

# API Configuration
API_BASE_URL=https://yourdomain.com/api
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-nextauth-secret

# Application Settings
NODE_ENV=production
PORT=3000
```

### 2. app.js (Root Entry Point)
```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

## 📦 ขั้นตอนการ Deploy

### 1. อัพโหลดไฟล์ทั้งหมด
- อัพโหลด folder `THH/` ทั้งหมด
- อัพโหลด folder `BackEnd_API/` ทั้งหมด

### 2. Install Dependencies บน Server
```bash
# Frontend
cd THH
npm install --production

# Backend
cd BackEnd_API
npm install --production
```

### 3. Build Production
```bash
cd THH
npm run build
```

### 4. Start Application
```bash
# Option 1: ใช้ app.js
node app.js

# Option 2: ใช้ npm script
npm start

# Option 3: ใช้ PM2 (แนะนำ)
pm2 start app.js --name "thai-hajj-health"
```

## 🗂️ โครงสร้างไฟล์บน Host
```
/var/www/thai-hajj-health/
├── THH/                           # Frontend Application
│   ├── app.js
│   ├── package.json
│   ├── .next/                     # Built files (สร้างหลัง build)
│   ├── src/
│   └── public/
├── BackEnd_API/                   # Backend API
│   ├── app.js
│   ├── package.json
│   ├── routes/
│   ├── middleware/
│   └── config/
└── .env.production                # Environment variables
```

## 🔒 Database Setup
```sql
-- สร้าง Database
CREATE DATABASE thai_hajj_health;

-- สร้าง Tables (ตัวอย่าง)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    thaid_id VARCHAR(255) UNIQUE,
    email VARCHAR(255),
    role ENUM('admin', 'executive', 'staff'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE health_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    medical_data JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
```

## 🌐 Web Server Configuration (Nginx/Apache)

### Nginx Configuration
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Frontend (Next.js)
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## ✅ Checklist การ Deploy

- [ ] อัพโหลด source code ทั้งหมด
- [ ] ติดตั้ง Node.js และ npm บน server
- [ ] สร้าง database และ tables
- [ ] ตั้งค่า environment variables
- [ ] รัน `npm install` ใน THH และ BackEnd_API
- [ ] รัน `npm run build` ใน THH
- [ ] ตั้งค่า web server (Nginx/Apache)
- [ ] เริ่มต้น application ด้วย PM2 หรือ systemd
- [ ] ทดสอบการทำงานของระบบ

## 🚀 คำสั่งสำหรับการ Deploy อัตโนมัติ

```bash
#!/bin/bash
# deploy.sh

# ไปยัง project directory
cd /var/www/thai-hajj-health/THH

# Pull latest code (ถ้าใช้ Git)
git pull origin main

# Install dependencies
npm install --production

# Build application
npm run build

# Restart application
pm2 restart thai-hajj-health

echo "✅ Deployment completed successfully!"
```

**หมายเหตุ:** ไฟล์ที่สำคัญที่สุดคือ `app.js`, `package.json`, folder `src/`, `public/`, `BackEnd_API/` และไฟล์ configuration ต่างๆ