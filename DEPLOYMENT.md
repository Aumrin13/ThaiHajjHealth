# คู่มือการติดตั้งบน Plesk Hosting
# Deployment Guide for Plesk Hosting

[ภาษาไทย](#คำแนะนำภาษาไทย) | [English](#english-guide)

---

## คำแนะนำภาษาไทย

### ข้อกำหนดเบื้องต้น (Prerequisites)

1. **Plesk Hosting Account** ที่รองรับ:
   - Node.js 18.x หรือสูงกว่า (แนะนำ 20.x)
   - Git Integration
   - SSH Access
   - PM2 (Process Manager)

2. **ความรู้พื้นฐาน**:
   - การใช้งาน Git
   - การใช้งาน SSH
   - การตั้งค่า Environment Variables

### ขั้นตอนการติดตั้ง

#### 1. เตรียม Plesk Hosting

**1.1 เปิดใช้งาน Node.js**
- เข้า Plesk Panel
- ไปที่ Domains → เลือก domain ของคุณ
- คลิก "Node.js"
- เลือก Node.js version 20.x
- เปิดใช้งาน Node.js

**1.2 ตั้งค่า Git Repository**
- ไปที่ "Git" ใน Plesk Panel
- คลิก "Add Repository"
- ใส่ URL ของ Repository: `https://github.com/Aumrin13/ThaiHajjHealth.git`
- เลือก branch: `main` หรือ branch ที่ต้องการ deploy
- ตั้งค่า Deployment path: `/httpdocs` หรือ `/public_html`

#### 2. ตั้งค่า Environment Variables

**2.1 ใน Plesk Panel**
- ไปที่ Node.js settings
- เพิ่ม Environment Variables ต่อไปนี้:

```bash
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Thai Hajj Health System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**2.2 สร้างไฟล์ .env.local** (ผ่าน SSH)
```bash
# สร้างไฟล์ .env.local จาก .env.example
cp .env.example .env.local

# แก้ไขค่าต่างๆ ให้ตรงกับ production
nano .env.local
```

#### 3. Deploy ผ่าน Git

**3.1 การ Deploy ครั้งแรก**

ใน Plesk Panel → Git:
1. คลิก "Pull Updates"
2. รอให้ Plesk ดึงไฟล์จาก Git
3. ระบบจะแสดง "Up to date" เมื่อเสร็จสิ้น

**3.2 เชื่อมต่อผ่าน SSH และติดตั้ง**

```bash
# เชื่อมต่อ SSH
ssh username@yourdomain.com

# ไปที่ directory ของ project
cd /var/www/vhosts/yourdomain.com/httpdocs

# ติดตั้ง dependencies
npm install

# Build application
npm run build

# ติดตั้ง PM2 (ถ้ายังไม่มี)
npm install -g pm2

# ให้สิทธิ์ execute script
chmod +x plesk-deploy.sh

# รัน deployment script
./plesk-deploy.sh
```

#### 4. ตั้งค่า PM2 Auto-restart

```bash
# บันทึก process list
pm2 save

# ตั้งค่าให้ PM2 เริ่มต้นอัตโนมัติเมื่อ server restart
pm2 startup

# ทำตามคำสั่งที่ PM2 แสดง (จะต้องใช้ sudo)
# ตัวอย่าง:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u username --hp /home/username
```

#### 5. ตั้งค่า Apache/Nginx Proxy

**5.1 ถ้าใช้ Apache (มี .htaccess แล้ว)**
- ตรวจสอบว่า mod_rewrite และ mod_proxy เปิดใช้งาน
- ไฟล์ `.htaccess` ถูกสร้างไว้แล้วใน root directory

**5.2 ถ้าใช้ Nginx**

เพิ่ม configuration นี้ใน Plesk → Apache & Nginx Settings:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

#### 6. ตรวจสอบการทำงาน

```bash
# ตรวจสอบสถานะ PM2
pm2 status

# ดู logs
pm2 logs thai-hajj-health

# Monitor real-time
pm2 monit

# ทดสอบเว็บไซต์
curl http://localhost:3000
```

#### 7. การอัพเดท (Update) ในอนาคต

**วิธีที่ 1: ผ่าน Plesk Panel**
1. ไปที่ Git ใน Plesk
2. คลิก "Pull Updates"
3. เชื่อมต่อ SSH และรัน:
```bash
npm install
npm run build
pm2 restart thai-hajj-health
```

**วิธีที่ 2: ผ่าน SSH**
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
git pull origin main
npm install
npm run build
pm2 restart thai-hajj-health
```

**วิธีที่ 3: ใช้ Script อัตโนมัติ**
```bash
./plesk-deploy.sh
```

### คำสั่ง PM2 ที่ใช้บ่อย

```bash
# ดูสถานะ
pm2 status

# เริ่มแอพพลิเคชั่น
pm2 start ecosystem.config.js --env production

# รีสตาร์ท
pm2 restart thai-hajj-health

# หยุด
pm2 stop thai-hajj-health

# ลบ process
pm2 delete thai-hajj-health

# ดู logs
pm2 logs thai-hajj-health

# ดู logs real-time
pm2 logs thai-hajj-health --lines 100

# ล้าง logs
pm2 flush

# Monitor
pm2 monit
```

### การแก้ไขปัญหาที่พบบ่อย

**1. Port 3000 ถูกใช้งานอยู่แล้ว**
```bash
# หา process ที่ใช้ port 3000
lsof -i :3000

# หรือ
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>
```

**2. PM2 ไม่เริ่มต้นอัตโนมัติหลัง reboot**
```bash
pm2 unstartup
pm2 startup
# ทำตามคำสั่งที่แสดง
pm2 save
```

**3. Build Error**
```bash
# ลบ cache และ build ใหม่
rm -rf .next node_modules
npm install
npm run build
```

**4. ไม่สามารถเข้าถึงเว็บไซต์**
- ตรวจสอบว่า PM2 กำลังทำงาน: `pm2 status`
- ตรวจสอบ logs: `pm2 logs thai-hajj-health`
- ตรวจสอบ firewall และ port settings
- ตรวจสอบว่า .htaccess หรือ Nginx config ถูกต้อง

**5. Environment Variables ไม่ทำงาน**
- ตรวจสอบไฟล์ `.env.local`
- Restart PM2: `pm2 restart thai-hajj-health`
- ตรวจสอบว่าตั้งค่าใน Plesk Panel ถูกต้อง

### การตรวจสอบ Security

```bash
# ตรวจสอบว่าไฟล์สำคัญถูกป้องกัน
curl https://yourdomain.com/.env.local  # ควรได้ 403 Forbidden
curl https://yourdomain.com/package.json  # ควรได้ 403 Forbidden

# ตรวจสอบ HTTPS
curl -I https://yourdomain.com  # ควรได้ 200 OK

# ตรวจสอบ HTTP redirect to HTTPS
curl -I http://yourdomain.com  # ควรได้ 301 redirect
```

---

## English Guide

### Prerequisites

1. **Plesk Hosting Account** with:
   - Node.js 18.x or higher (20.x recommended)
   - Git Integration
   - SSH Access
   - PM2 (Process Manager)

2. **Basic Knowledge**:
   - Git usage
   - SSH usage
   - Environment Variables setup

### Installation Steps

#### 1. Prepare Plesk Hosting

**1.1 Enable Node.js**
- Go to Plesk Panel
- Navigate to Domains → Select your domain
- Click "Node.js"
- Select Node.js version 20.x
- Enable Node.js

**1.2 Setup Git Repository**
- Go to "Git" in Plesk Panel
- Click "Add Repository"
- Enter Repository URL: `https://github.com/Aumrin13/ThaiHajjHealth.git`
- Select branch: `main` or your desired branch
- Set Deployment path: `/httpdocs` or `/public_html`

#### 2. Configure Environment Variables

**2.1 In Plesk Panel**
- Go to Node.js settings
- Add the following Environment Variables:

```bash
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
NEXT_PUBLIC_APP_NAME=Thai Hajj Health System
NEXT_PUBLIC_APP_VERSION=1.0.0
```

**2.2 Create .env.local file** (via SSH)
```bash
# Create .env.local from .env.example
cp .env.example .env.local

# Edit values for production
nano .env.local
```

#### 3. Deploy via Git

**3.1 First Deployment**

In Plesk Panel → Git:
1. Click "Pull Updates"
2. Wait for Plesk to pull files from Git
3. System will show "Up to date" when complete

**3.2 Connect via SSH and Install**

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to project directory
cd /var/www/vhosts/yourdomain.com/httpdocs

# Install dependencies
npm install

# Build application
npm run build

# Install PM2 (if not already installed)
npm install -g pm2

# Make deployment script executable
chmod +x plesk-deploy.sh

# Run deployment script
./plesk-deploy.sh
```

#### 4. Configure PM2 Auto-restart

```bash
# Save process list
pm2 save

# Setup PM2 to start on server restart
pm2 startup

# Follow the command PM2 displays (requires sudo)
# Example:
# sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u username --hp /home/username
```

#### 5. Setup Apache/Nginx Proxy

**5.1 If using Apache (.htaccess included)**
- Verify mod_rewrite and mod_proxy are enabled
- `.htaccess` file is already created in root directory

**5.2 If using Nginx**

Add this configuration in Plesk → Apache & Nginx Settings:

```nginx
location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_cache_bypass $http_upgrade;
}
```

#### 6. Verify Deployment

```bash
# Check PM2 status
pm2 status

# View logs
pm2 logs thai-hajj-health

# Monitor real-time
pm2 monit

# Test website
curl http://localhost:3000
```

#### 7. Future Updates

**Method 1: Via Plesk Panel**
1. Go to Git in Plesk
2. Click "Pull Updates"
3. Connect via SSH and run:
```bash
npm install
npm run build
pm2 restart thai-hajj-health
```

**Method 2: Via SSH**
```bash
cd /var/www/vhosts/yourdomain.com/httpdocs
git pull origin main
npm install
npm run build
pm2 restart thai-hajj-health
```

**Method 3: Use Automated Script**
```bash
./plesk-deploy.sh
```

### Common PM2 Commands

```bash
# Check status
pm2 status

# Start application
pm2 start ecosystem.config.js --env production

# Restart
pm2 restart thai-hajj-health

# Stop
pm2 stop thai-hajj-health

# Delete process
pm2 delete thai-hajj-health

# View logs
pm2 logs thai-hajj-health

# View logs real-time
pm2 logs thai-hajj-health --lines 100

# Clear logs
pm2 flush

# Monitor
pm2 monit
```

### Troubleshooting

**1. Port 3000 already in use**
```bash
# Find process using port 3000
lsof -i :3000

# Or
netstat -tulpn | grep :3000

# Kill process
kill -9 <PID>
```

**2. PM2 doesn't auto-start after reboot**
```bash
pm2 unstartup
pm2 startup
# Follow displayed command
pm2 save
```

**3. Build Error**
```bash
# Remove cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

**4. Cannot access website**
- Check if PM2 is running: `pm2 status`
- Check logs: `pm2 logs thai-hajj-health`
- Check firewall and port settings
- Verify .htaccess or Nginx config is correct

**5. Environment Variables not working**
- Check `.env.local` file
- Restart PM2: `pm2 restart thai-hajj-health`
- Verify Plesk Panel settings are correct

### Security Checklist

```bash
# Verify important files are protected
curl https://yourdomain.com/.env.local  # Should return 403 Forbidden
curl https://yourdomain.com/package.json  # Should return 403 Forbidden

# Verify HTTPS
curl -I https://yourdomain.com  # Should return 200 OK

# Verify HTTP redirects to HTTPS
curl -I http://yourdomain.com  # Should return 301 redirect
```

---

## Support

สำหรับปัญหาหรือคำถาม กรุณาติดต่อ Thai Hajj Health Development Team

For issues or questions, please contact Thai Hajj Health Development Team

---

**Version:** 1.0.0  
**Last Updated:** November 2025
