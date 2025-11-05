# 🚀 คู่มือเริ่มต้นใช้งานบน Plesk (Quick Start Guide)

## การติดตั้งแบบด่วน (Quick Installation)

### ขั้นตอนที่ 1: ตั้งค่า Git Repository ใน Plesk

1. เข้า **Plesk Panel** → **Git**
2. คลิก **"Add Repository"**
3. กรอกข้อมูล:
   ```
   Repository URL: https://github.com/Aumrin13/ThaiHajjHealth.git
   Branch: main
   Deployment path: /httpdocs
   ```
4. คลิก **"OK"** และรอ Plesk ดึงไฟล์

### ขั้นตอนที่ 2: ตั้งค่า Node.js

1. เข้า **Plesk Panel** → **Node.js**
2. เลือก **Node.js version 20.x**
3. เปิดใช้งาน Node.js
4. เพิ่ม Environment Variables:
   ```
   NODE_ENV=production
   PORT=3000
   ```

### ขั้นตอนที่ 3: Deploy ผ่าน SSH

```bash
# 1. เชื่อมต่อ SSH
ssh username@yourdomain.com

# 2. ไปที่ directory
cd /var/www/vhosts/yourdomain.com/httpdocs

# 3. สร้างไฟล์ environment
cp .env.example .env.local
nano .env.local  # แก้ไขค่าต่างๆ

# 4. รันคำสั่งเดียว - Deploy ทุกอย่าง!
chmod +x plesk-deploy.sh && ./plesk-deploy.sh
```

✅ เสร็จสิ้น! เว็บไซต์ของคุณพร้อมใช้งานที่ `https://yourdomain.com`

---

## คำสั่งที่ใช้บ่อย (Common Commands)

### ดูสถานะแอพพลิเคชั่น
```bash
pm2 status
```

### รีสตาร์ทแอพพลิเคชั่น
```bash
pm2 restart thai-hajj-health
```

### ดู Logs
```bash
pm2 logs thai-hajj-health
```

### อัพเดทเว็บไซต์
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
git pull
./plesk-deploy.sh
```

---

## การแก้ไขปัญหาเบื้องต้น (Quick Troubleshooting)

### ❌ ปัญหา: ไม่สามารถเข้าเว็บไซต์
```bash
# ตรวจสอบ PM2
pm2 status

# หาก stopped ให้ start ใหม่
pm2 restart thai-hajj-health

# ดู logs
pm2 logs thai-hajj-health --lines 50
```

### ❌ ปัญหา: Build Error
```bash
# ลบ cache และ build ใหม่
rm -rf .next node_modules
npm install
npm run build
pm2 restart thai-hajj-health
```

### ❌ ปัญหา: Port 3000 ถูกใช้แล้ว
```bash
# หา process
lsof -i :3000

# Kill process
kill -9 <PID>

# Start ใหม่
pm2 restart thai-hajj-health
```

---

## โครงสร้างไฟล์สำคัญ (Important Files)

```
ThaiHajjHealth/
├── .htaccess              → Apache proxy configuration
├── .deployment            → Plesk deployment config
├── ecosystem.config.js    → PM2 process configuration
├── plesk-deploy.sh       → Auto deployment script
├── DEPLOYMENT.md         → Full deployment guide
└── logs/                 → Application logs
```

---

## การอัพเดทครั้งต่อไป (Future Updates)

### วิธีที่ 1: ใช้ Script (แนะนำ)
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
git pull origin main
./plesk-deploy.sh
```

### วิธีที่ 2: ผ่าน Plesk Panel
1. Plesk Panel → Git → "Pull Updates"
2. SSH เข้าไป:
   ```bash
   npm install
   npm run build
   pm2 restart thai-hajj-health
   ```

---

## ต้องการความช่วยเหลือ?

📖 ดูคู่มือแบบละเอียด: [DEPLOYMENT.md](./DEPLOYMENT.md)

📧 ติดต่อทีม: Thai Hajj Health Development Team

---

**🎉 ยินดีด้วย! ระบบ Thai Hajj Health ของคุณพร้อมใช้งานบน Plesk แล้ว**
