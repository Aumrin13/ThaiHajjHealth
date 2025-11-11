# Thai Hajj Health System - Production Deployment Guide

## 📋 Pre-Deployment Checklist

### 1. Environment Configuration
- [ ] Update `.env.production` with actual production values
- [ ] Set `NEXT_PUBLIC_THAID_CLIENT_ID` และ `THAID_CLIENT_SECRET`
- [ ] ตรวจสอบ `NEXT_PUBLIC_API_URL` ว่าชี้ไปที่ production API
- [ ] ตรวจสอบ redirect URIs ใน ThaiD console

### 2. Code Quality
- [x] ✅ ผ่าน TypeScript compilation
- [x] ✅ ผ่าน ESLint checks
- [x] ✅ แก้ไข unused variables
- [x] ✅ แก้ไข React hooks dependencies
- [x] ✅ แก้ไข block-scoped variable errors
- [ ] Run `npm run build` เพื่อทดสอบ production build (กำลังทดสอบ...)

### 3. Security
- [ ] ✅ Security headers configured in `next.config.ts`
- [ ] ✅ CORS settings ใน backend API
- [ ] ตรวจสอบ environment variables ไม่ expose sensitive data
- [ ] ใช้ HTTPS สำหรับ production

## 🚀 Deployment Steps

### Option 1: Vercel Deployment (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Login to Vercel**
```bash
vercel login
```

3. **Deploy to Production**
```bash
vercel --prod
```

4. **Set Environment Variables**
- ไปที่ Vercel Dashboard → Project → Settings → Environment Variables
- เพิ่มทุก variables จาก `.env.production`

### Option 2: Docker Deployment

1. **Build Docker Image**
```bash
docker build -t thai-hajj-health:latest .
```

2. **Run Container**
```bash
docker run -p 3000:3000 \
  --env-file .env.production \
  thai-hajj-health:latest
```

### Option 3: Self-Hosted (PM2)

1. **Build for Production**
```bash
npm run build
```

2. **Install PM2**
```bash
npm install -g pm2
```

3. **Start with PM2**
```bash
pm2 start npm --name "thai-hajj-health" -- start
pm2 save
pm2 startup
```

## 🔧 Post-Deployment

### 1. Verify Deployment
- [ ] เข้าถึง `https://thh.samilasoft.com` ได้
- [ ] ทดสอบ login ผ่าน ThaiD
- [ ] ทดสอบ login สำหรับ Admin/Staff/Executive
- [ ] ตรวจสอบ dashboard แสดงข้อมูลถูกต้อง

### 2. Monitoring
- [ ] ตั้งค่า error tracking (Sentry หรือ alternatives)
- [ ] ตั้งค่า analytics (Google Analytics)
- [ ] Monitor server resources

### 3. Backup
- [ ] Backup database
- [ ] Backup environment variables
- [ ] Backup uploaded files (ถ้ามี)

## 📦 Build Output

Production build จะสร้างไฟล์ใน `.next` directory:
- Static files: `.next/static/`
- Server files: `.next/server/`
- Standalone output: `.next/standalone/`

## 🔄 Update Process

1. Pull latest changes
```bash
git pull origin main
```

2. Install dependencies
```bash
npm install
```

3. Build
```bash
npm run build
```

4. Restart application
```bash
pm2 restart thai-hajj-health
# or
vercel --prod
```

## 🐛 Troubleshooting

### Build Errors
- ตรวจสอบ Node.js version (ควรใช้ 18.17 ขึ้นไป)
- ลบ `node_modules` และ `.next` แล้ว install ใหม่
- ตรวจสอบ environment variables

### Runtime Errors
- ตรวจสอบ logs: `pm2 logs thai-hajj-health`
- ตรวจสอบ API connection
- ตรวจสอบ database connection

## 📞 Support
- GitHub Issues: [ThaiHajjHealth](https://github.com/Aumrin13/ThaiHajjHealth)
- Developer: Aumrin13

## 📝 Notes
- ระบบใช้ Next.js 15 + React 19
- รองรับ Thai language
- ใช้ ThaiD OAuth สำหรับ authentication
- รองรับ role-based access control (Admin, Staff, Executive)
