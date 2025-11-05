# การติดตั้งระบบ Thai Hajj Health บน Plesk Hosting

## ภาพรวม (Overview)

Repository นี้พร้อมใช้งานบน Plesk Hosting ที่มีระบบ Git แล้ว ไฟล์ทั้งหมดที่จำเป็นสำหรับการ deploy ได้ถูกเตรียมไว้ให้แล้ว

This repository is ready for deployment on Plesk Hosting with Git support. All necessary deployment files are included.

## 📦 ไฟล์สำหรับ Plesk Deployment

| ไฟล์ | คำอธิบาย |
|------|----------|
| `.deployment` | Plesk Git deployment configuration |
| `.htaccess` | Apache proxy configuration และ security headers |
| `ecosystem.config.js` | PM2 process manager configuration |
| `plesk-deploy.sh` | Automated deployment script |
| `PLESK_QUICKSTART.md` | 🚀 เริ่มต้นใช้งานด่วน (Quick Start Guide) |
| `DEPLOYMENT.md` | 📚 คู่มือการติดตั้งแบบละเอียด (Complete Guide) |
| `logs/` | Directory สำหรับเก็บ application logs |

## 🚀 เริ่มต้นใช้งาน (Quick Start)

### ขั้นตอนสั้นๆ ใน 3 ขั้นตอน:

#### 1️⃣ ตั้งค่า Git ใน Plesk Panel
```
Repository URL: https://github.com/Aumrin13/ThaiHajjHealth.git
Branch: main (or your branch)
Path: /httpdocs
```

#### 2️⃣ ตั้งค่า Node.js
- เลือก Node.js version 20.x
- เพิ่ม Environment Variables:
  ```
  NODE_ENV=production
  PORT=3000
  ```

#### 3️⃣ Deploy ผ่าน SSH
```bash
ssh username@yourdomain.com
cd /var/www/vhosts/yourdomain.com/httpdocs
chmod +x plesk-deploy.sh
./plesk-deploy.sh
```

✅ **เสร็จสิ้น!** เว็บไซต์พร้อมใช้งาน

## 📖 เอกสารแนะนำ (Documentation)

### สำหรับผู้ใช้งานทั่วไป:
👉 **[PLESK_QUICKSTART.md](./PLESK_QUICKSTART.md)** - เริ่มต้นใช้งานด่วน (ภาษาไทย)

### สำหรับผู้ดูแลระบบ:
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)** - คู่มือการติดตั้งแบบละเอียด (ไทย/English)

## 🔧 ระบบต้องการ (Requirements)

### Plesk Hosting ต้องรองรับ:
- ✅ Node.js 18.x หรือสูงกว่า (แนะนำ 20.x)
- ✅ Git Integration
- ✅ SSH Access
- ✅ Apache/Nginx Web Server
- ✅ PM2 Process Manager

### ความรู้พื้นฐานที่ต้องมี:
- การใช้งาน Git
- การใช้งาน SSH
- การตั้งค่า Environment Variables

## 📋 คำสั่งที่ใช้บ่อย (Common Commands)

### Deploy / Re-deploy
```bash
./plesk-deploy.sh
```

### Check Status
```bash
pm2 status
```

### Restart Application
```bash
pm2 restart thai-hajj-health
```

### View Logs
```bash
pm2 logs thai-hajj-health
```

### Update from Git
```bash
git pull origin main
npm install
npm run build
pm2 restart thai-hajj-health
```

## 🔐 ความปลอดภัย (Security)

ไฟล์ `.htaccess` รวมการตั้งค่า security headers:
- ✅ HTTPS redirect
- ✅ X-Content-Type-Options
- ✅ X-Frame-Options
- ✅ X-XSS-Protection
- ✅ Protected sensitive files (.env, package.json, etc.)

## 🐛 การแก้ไขปัญหา (Troubleshooting)

### ปัญหาที่พบบ่อย:

**1. ไม่สามารถเข้าเว็บไซต์**
```bash
pm2 status
pm2 logs thai-hajj-health
```

**2. Build Error**
```bash
rm -rf .next node_modules
npm install
npm run build
pm2 restart thai-hajj-health
```

**3. Port 3000 ถูกใช้งาน**
```bash
lsof -i :3000
kill -9 <PID>
pm2 restart thai-hajj-health
```

**4. PM2 ไม่ start อัตโนมัติ**
```bash
pm2 startup
pm2 save
```

ดูเพิ่มเติมใน [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📞 การติดต่อ (Support)

มีปัญหาหรือคำถาม? ติดต่อ:
- Thai Hajj Health Development Team
- GitHub Issues: https://github.com/Aumrin13/ThaiHajjHealth/issues

## 📝 การอัพเดทต่อไป (Future Updates)

เมื่อมีการอัพเดท code ใน GitHub:

1. **ผ่าน Plesk Panel**: Git → "Pull Updates"
2. **ผ่าน SSH**: `git pull && ./plesk-deploy.sh`
3. **ด้วยตนเอง**: `git pull && npm install && npm run build && pm2 restart thai-hajj-health`

## ✨ Features

- 🔄 Automatic restart on crash (PM2)
- 📊 Built-in logging system
- 🚀 One-command deployment
- 🔐 Security headers included
- 📝 Comprehensive documentation in Thai and English
- ⚡ Optimized for production

## 🎯 Next Steps After Deployment

1. ตรวจสอบว่าเว็บไซต์ทำงาน: `https://yourdomain.com`
2. ตั้งค่า SSL Certificate (ถ้ายังไม่มี)
3. ตั้งค่า Database connection (ถ้ามี)
4. ทดสอบ features ต่างๆ
5. Monitor logs: `pm2 logs thai-hajj-health`

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**License:** Private  
**Maintained by:** Thai Hajj Health Development Team

**🎉 ขอบคุณที่ใช้งาน Thai Hajj Health System!**
