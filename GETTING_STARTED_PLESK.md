# 🚀 เริ่มต้นใช้งาน Thai Hajj Health บน Plesk
# Getting Started with Thai Hajj Health on Plesk

---

## 👋 ยินดีต้อนรับ! (Welcome!)

คู่มือนี้จะแนะนำคุณทีละขั้นตอนในการติดตั้ง **Thai Hajj Health System** บน Plesk Hosting

This guide will walk you through deploying the **Thai Hajj Health System** on Plesk Hosting.

---

## 📚 เลือกคู่มือที่เหมาะกับคุณ (Choose Your Guide)

### 🎯 ฉันต้องการ... (I want to...)

#### ⚡ เริ่มใช้งานเร็วที่สุด (Fastest Start)
👉 **[PLESK_README.md](./PLESK_README.md)** (5 นาที)
- ภาพรวมระบบ
- ขั้นตอนสั้นๆ 3 ขั้นตอน
- เริ่มใช้งานได้ทันที

#### 🚀 คู่มือเริ่มต้นใช้งานด่วน (Quick Start)
👉 **[PLESK_QUICKSTART.md](./PLESK_QUICKSTART.md)** (10-15 นาที)
- คำสั่งที่ใช้บ่อย
- Quick troubleshooting
- ภาษาไทย

#### 📚 คู่มือแบบละเอียด (Complete Guide)
👉 **[DEPLOYMENT.md](./DEPLOYMENT.md)** (30+ นาที)
- ขั้นตอนทุกอย่างละเอียด
- Troubleshooting ครบถ้วน
- ทั้งภาษาไทยและ English

#### 📋 ดูภาพรวมสิ่งที่ได้เตรียมไว้ (See What's Included)
👉 **[SETUP_SUMMARY.md](./SETUP_SUMMARY.md)**
- สรุปไฟล์ที่เพิ่มเข้ามา
- Features ทั้งหมด
- System architecture

---

## 🎬 Quick Start (3 Steps)

### ขั้นตอนที่ 1: Plesk Panel Setup
```
1. ไปที่ Plesk Panel
2. เลือก Git → Add Repository
3. URL: https://github.com/Aumrin13/ThaiHajjHealth.git
4. Branch: main
5. Path: /httpdocs
```

### ขั้นตอนที่ 2: Node.js Configuration
```
1. ไปที่ Node.js settings
2. เลือก version 20.x
3. เพิ่ม Environment Variables:
   - NODE_ENV=production
   - PORT=3000
```

### ขั้นตอนที่ 3: Deploy via SSH
```bash
ssh username@yourdomain.com
cd /var/www/vhosts/yourdomain.com/httpdocs
chmod +x plesk-deploy.sh
./plesk-deploy.sh
```

✅ **เสร็จแล้ว!** เปิด `https://yourdomain.com`

---

## 🗺️ System Architecture

```
┌─────────────────────────────────────────┐
│        Internet Users (HTTPS)           │
│         https://yourdomain.com          │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│    Apache/Nginx Web Server              │
│    - Port 80/443                        │
│    - SSL/TLS termination                │
│    - .htaccess proxy rules              │
└────────────────┬────────────────────────┘
                 │ Reverse Proxy
                 ↓
┌─────────────────────────────────────────┐
│    Next.js Application                  │
│    - Port 3000                          │
│    - Production build                   │
│    - Server-side rendering              │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│    PM2 Process Manager                  │
│    - Auto-restart on crash              │
│    - Log management                     │
│    - Cluster mode support               │
└────────────────┬────────────────────────┘
                 │
                 ↓
┌─────────────────────────────────────────┐
│    Node.js Runtime (v20.x)              │
│    - JavaScript execution               │
│    - V8 engine                          │
└─────────────────────────────────────────┘
```

---

## 📦 ไฟล์สำคัญ (Important Files)

```
ThaiHajjHealth/
│
├── 🔧 Configuration Files
│   ├── .deployment           # Plesk deployment config
│   ├── .htaccess            # Apache proxy & security
│   ├── ecosystem.config.js  # PM2 configuration
│   └── .env.local          # Environment variables (create this)
│
├── 🚀 Deployment
│   └── plesk-deploy.sh     # Automated deployment script
│
├── 📖 Documentation
│   ├── GETTING_STARTED_PLESK.md  # This file
│   ├── PLESK_README.md           # Quick overview
│   ├── PLESK_QUICKSTART.md       # Quick start guide
│   ├── DEPLOYMENT.md             # Complete guide
│   └── SETUP_SUMMARY.md          # Setup summary
│
├── 📝 Logs
│   └── logs/                # Application logs directory
│
└── 📱 Application Files
    ├── src/                 # Source code
    ├── public/              # Static assets
    └── package.json         # Dependencies
```

---

## ✅ Pre-Deployment Checklist

ก่อนเริ่มติดตั้ง ตรวจสอบว่าคุณมี:

- [ ] Plesk Hosting account with admin access
- [ ] Node.js 18.x+ support (20.x recommended)
- [ ] Git integration enabled
- [ ] SSH access credentials
- [ ] Domain name configured
- [ ] SSL certificate (recommended)

---

## 🎯 After Deployment

หลังติดตั้งสำเร็จ ให้:

1. ✅ ทดสอบเข้าเว็บไซต์: `https://yourdomain.com`
2. ✅ ตรวจสอบ PM2 status: `pm2 status`
3. ✅ ดู logs: `pm2 logs thai-hajj-health`
4. ✅ ทดสอบ features ต่างๆ
5. ✅ Setup monitoring และ alerts

---

## 🆘 ต้องการความช่วยเหลือ? (Need Help?)

### ปัญหาทั่วไป:
👉 [PLESK_QUICKSTART.md#troubleshooting](./PLESK_QUICKSTART.md)

### ปัญหาเฉพาะ:
👉 [DEPLOYMENT.md#troubleshooting](./DEPLOYMENT.md)

### คำสั่งที่ใช้บ่อย:
```bash
# ดูสถานะ
pm2 status

# รีสตาร์ท
pm2 restart thai-hajj-health

# ดู logs
pm2 logs thai-hajj-health

# อัพเดท
git pull && ./plesk-deploy.sh
```

---

## 📞 Support

มีคำถามเพิ่มเติม?
- GitHub Issues: https://github.com/Aumrin13/ThaiHajjHealth/issues
- Documentation: All MD files in this repository

---

## 🎓 Learn More

### About the Project:
- [README.md](./README.md) - Main project documentation
- [PAGE_SUMMARY.md](./PAGE_SUMMARY.md) - Page structure
- [AUTH_README.md](./AUTH_README.md) - Authentication system

### About Technologies:
- Next.js: https://nextjs.org/docs
- PM2: https://pm2.keymetrics.io/docs/
- Plesk: https://docs.plesk.com/

---

## 🌟 Success Path

```
1. Read PLESK_README.md (5 min)
   ↓
2. Follow PLESK_QUICKSTART.md (15 min)
   ↓
3. Deploy with ./plesk-deploy.sh (5 min)
   ↓
4. Test & Verify (10 min)
   ↓
5. 🎉 Success! Your site is live!
```

---

**🚀 Ready to start? Begin with [PLESK_README.md](./PLESK_README.md)!**

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Maintained by:** Thai Hajj Health Development Team

**สำเร็จครบทุกขั้นตอนแล้ว! ขอให้โชคดี! 🎉**  
**All steps complete! Good luck! 🎉**
