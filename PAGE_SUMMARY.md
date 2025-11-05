# สรุประบบ Thai Hajj Health System - รายละเอียดหน้าเพจ

## �️ สถาปัตยกรรมระบบ (System Architecture)

### Frontend (Next.js)
- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS V4
- **Deployment**: Vercel หรือ domain หลัก

### Backend API (Express.js)
- **Framework**: Express.js + Node.js
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT + bcrypt
- **API Documentation**: Swagger/OpenAPI
- **Deployment**: Subdomain `api.domain.com`

### API Endpoints Structure
```
api.domain.com/
├── /auth                    → Authentication & Authorization
│   ├── POST /login         → ล็อกอิน (admin/staff/executive)
│   ├── POST /logout        → ล็อกเอ้าท์
│   ├── POST /refresh       → รีเฟรช token
│   └── GET  /me            → ข้อมูลผู้ใช้ปัจจุบัน
├── /users                   → จัดการผู้ใช้
│   ├── GET    /            → รายชื่อผู้ใช้
│   ├── POST   /            → สร้างผู้ใช้ใหม่
│   ├── GET    /:id         → ข้อมูลผู้ใช้
│   ├── PUT    /:id         → แก้ไขข้อมูลผู้ใช้
│   └── DELETE /:id         → ลบผู้ใช้
├── /pilgrims                → จัดการข้อมูลผู้ประกอบพิธีฮัจญ์
│   ├── GET    /            → รายชื่อผู้ประกอบพิธีฮัจญ์
│   ├── POST   /            → ลงทะเบียนผู้ประกอบพิธีฮัจญ์
│   ├── GET    /:id         → ข้อมูลผู้ประกอบพิธีฮัจญ์
│   ├── PUT    /:id         → แก้ไขข้อมูล
│   └── GET    /:id/health  → บันทึกสุขภาพ
├── /health-records          → บันทึกสุขภาพ (One ID System)
│   ├── GET    /            → รายการบันทึกสุขภาพ
│   ├── POST   /            → สร้างบันทึกใหม่
│   ├── GET    /:id         → บันทึกสุขภาพรายบุคคล
│   ├── PUT    /:id         → แก้ไขบันทึก
│   └── GET    /citizen/:citizenId → ค้นหาด้วยเลขประชาชน
├── /hospitals               → จัดการหน่วยบริการ
│   ├── GET    /            → รายชื่อโรงพยาบาล/รพ.สต.
│   ├── POST   /            → เพิ่มหน่วยบริการ
│   ├── GET    /:hcode      → ข้อมูลหน่วยบริการ (HCODE)
│   └── PUT    /:hcode      → แก้ไขข้อมูลหน่วยบริการ
├── /certificates            → ใบรับรองสุขภาพ
│   ├── GET    /            → รายการใบรับรอง
│   ├── POST   /generate    → สร้างใบรับรองใหม่
│   ├── GET    /:id         → ดาวน์โหลดใบรับรอง
│   └── GET    /verify/:certificateId → ตรวจสอบใบรับรอง
├── /surveillance            → เฝ้าระวังโรค 14 วัน
│   ├── GET    /            → รายการเฝ้าระวัง
│   ├── POST   /            → เพิ่มรายการเฝ้าระวัง
│   ├── GET    /:id         → ข้อมูลการเฝ้าระวัง
│   └── PUT    /:id/status  → อัพเดทสถานะ
├── /alerts                  → ระบบแจ้งเตือน (Mr. Hajj)
│   ├── GET    /            → รายการแจ้งเตือน
│   ├── POST   /            → สร้างแจ้งเตือนใหม่
│   ├── PUT    /:id/read    → อ่านแจ้งเตือนแล้ว
│   └── GET    /unread      → แจ้งเตือนที่ยังไม่อ่าน
├── /reports                 → รายงานและสถิติ
│   ├── GET    /dashboard   → ข้อมูล dashboard
│   ├── GET    /statistics  → สถิติต่างๆ
│   ├── GET    /export      → ส่งออกรายงาน
│   └── GET    /analytics   → การวิเคราะห์ข้อมูล
└── /integration             → API Integration หน่วยงานอื่น
    ├── POST /moph          → เชื่อมต่อกระทรวงสาธารณสุข
    ├── POST /nhso          → เชื่อมต่อ สปสช.
    └── POST /hajj-office   → เชื่อมต่อสำนักงานฮัจญ์
```

---

## �🏠 หน้าหลักและการนำทาง

### `/` - หน้าแรก (Root Page)
- **ไฟล์**: `src/app/page.tsx`
- **หน้าที่**: หน้าแรกของระบบ แสดงข้อมูลภาพรวม
- **เข้าถึง**: ทุกคน (Public)

---

## 🔐 ระบบ Authentication

### `/signin` - เลือกประเภทผู้ใช้
- **ไฟล์**: `src/app/(full-width-pages)/(auth)/signin/page.tsx`  
- **หน้าที่**: 
  - หน้าเลือกประเภทผู้ใช้งาน (Admin, Staff, Executive)
  - แสดงการ์ดสำหรับแต่ละระดับผู้ใช้
  - อธิบายสิทธิ์การใช้งานของแต่ละประเภท
- **เข้าถึง**: ทุกคน (Public)
- **Icons ที่ใช้**: `UserIcon`, `GroupIcon`, `PieChartIcon`

### `/signin/admin` - Login ผู้ดูแลระบบ
- **ไฟล์**: `src/app/(full-width-pages)/(auth)/signin/admin/page.tsx`
- **Component**: `AdminLoginForm`
- **หน้าที่**:
  - ฟอร์ม login สำหรับผู้ดูแลระบบ
  - ช่องกรอก: username, password
  - ไม่ต้องระบุ HCODE
- **เข้าถึง**: Admin เท่านั้น

### `/signin/staff` - Login เจ้าหน้าที่
- **ไฟล์**: `src/app/(full-width-pages)/(auth)/signin/staff/page.tsx`
- **Component**: `StaffLoginForm`
- **หน้าที่**:
  - ฟอร์ม login สำหรับเจ้าหน้าที่โรงพยาบาล/รพ.สต.
  - ช่องกรอ: HCODE (5/8 หลัก), username, password
  - Validation รูปแบบ HCODE
  - แสดงข้อมูลหน่วยบริการเมื่อกรอก HCODE ถูกต้อง
- **เข้าถึง**: Staff เท่านั้น

### `/signin/executive` - Login ผู้บริหาร  
- **ไฟล์**: `src/app/(full-width-pages)/(auth)/signin/executive/page.tsx`
- **Component**: `ExecutiveLoginForm`
- **หน้าที่**:
  - ฟอร์ม login สำหรับผู้บริหาร
  - ช่องกรอก: username, password
  - แสดงสิทธิ์การเข้าถึงข้อมูล
- **เข้าถึง**: Executive เท่านั้น

### `/signup` - สมัครสมาชิก
- **ไฟล์**: `src/app/(full-width-pages)/(auth)/signup/page.tsx`
- **หน้าที่**: ฟอร์มลงทะเบียนผู้ใช้ใหม่ (ถ้ามี)
- **เข้าถึง**: ทุกคน (Public)

---

## 👨‍💼 Admin Dashboard (ผู้ดูแลระบบ)

### `/admin` - แดชบอร์ดหลัก Admin
- **ไฟล์**: `src/app/(admin)/admin/page.tsx`
- **Layout**: `src/app/(admin)/layout.tsx` (มี `AdminGuard`)
- **หน้าที่**:
  - ภาพรวมระบบทั้งหมด
  - สถิติ: ผู้ใช้ทั้งหมด (1,234), หน่วยบริการ (89), รายงานรายวัน (45), แจ้งเตือน (12)
  - ฟังก์ชันการจัดการ: จัดการผู้ใช้, หน่วยบริการ, ตั้งค่าระบบ
  - กิจกรรมล่าสุดของระบบ
- **สิทธิ์**: Admin เท่านั้น
- **Icons**: `UserIcon`, `GroupIcon`, `DocsIcon`, `AlertIcon`

### `/admin/users` - จัดการผู้ใช้
- **หน้าที่**: จัดการข้อมูลผู้ใช้ทั้งหมด (CRUD)
- **สิทธิ์**: Admin เท่านั้น

### `/admin/hospitals` - จัดการหน่วยบริการ
- **หน้าที่**: จัดการข้อมูลโรงพยาบาลและ รพ.สต. 
- **สิทธิ์**: Admin เท่านั้น

### `/admin/settings` - ตั้งค่าระบบ
- **หน้าที่**: กำหนดค่าต่างๆ ของระบบ
- **สิทธิ์**: Admin เท่านั้น

---

## 👩‍⚕️ Staff Dashboard (เจ้าหน้าที่)

### `/staff` - แดชบอร์ดหลัก Staff
- **ไฟล์**: `src/app/(staff)/staff/page.tsx`
- **Layout**: `src/app/(staff)/layout.tsx` (มี `StaffGuard`)
- **หน้าที่**:
  - ภาพรวมการทำงานของเจ้าหน้าที่
  - สถิติ: ผู้ป่วยวันนี้ (23), รายงานรอส่ง (5), นัดหมายถัดไป (8)
  - ฟังก์ชันการทำงาน: บันทึกข้อมูลผู้ป่วย, จัดการใบรับรองสุขภาพ, ส่งรายงาน, ข้อมูลหน่วยบริการ
  - รายการผู้ป่วยล่าสุดพร้อมสถานะ
  - แสดงข้อมูล HCODE ของหน่วยบริการ
- **สิทธิ์**: Staff เท่านั้น (ต้องมี HCODE)
- **Icons**: `UserIcon`, `DocsIcon`, `TimeIcon`, `PlusIcon`, `CheckCircleIcon`, `PaperPlaneIcon`, `FolderIcon`

---

## 👔 Executive Dashboard (ผู้บริหาร)

### `/executive` - แดชบอร์ดหลัก Executive  
- **ไฟล์**: `src/app/(executive)/executive/page.tsx`
- **Layout**: `src/app/(executive)/layout.tsx` (มี `ExecutiveGuard`)
- **หน้าที่**:
  - ภาพรวมและรายงานเชิงวิเคราะห์
  - KPI หลัก: ผู้เดินทางทั้งหมด (15,847), หน่วยบริการ (156), ใบรับรองออก (14,523), อัตราผ่านเกณฑ์ (94.2%)
  - กราฟสถิติการตรวจสุขภาพรายเดือน
  - ข้อมูลโรคติดต่อ (ไข้หวัดใหญ่, โควิด-19, มาลาเรีย, วัณโรค)
  - รายงานเชิงวิเคราะห์: รายงานประจำสัปดาห์, รายงานการเดินทาง, รายงานคุณภาพบริการ
  - การดำเนินการเร่งด่วน: เวชภัณฑ์ขาดแคลน, ระบบล่าช้า, ตรวจสอบคุณภาพ
  - ฟีเจอร์ดาวน์โหลด Excel/PDF
- **สิทธิ์**: Executive เท่านั้น
- **Icons**: `UserIcon`, `GroupIcon`, `CheckCircleIcon`, `ArrowUpIcon`, `PieChartIcon`, `DocsIcon`, `DownloadIcon`, `AlertIcon`, `TimeIcon`

---

## 🔧 หน้าเสริมอื่นๆ

### `/profile` - โปรไฟล์ผู้ใช้
- **ไฟล์**: `src/app/(admin)/(others-pages)/profile/page.tsx`
- **หน้าที่**: แก้ไขข้อมูลส่วนตัวของผู้ใช้
- **เข้าถึง**: ผู้ใช้ที่ล็อกอินแล้ว

### `/calendar` - ปฏิทินและนัดหมาย
- **ไฟล์**: `src/app/(admin)/(others-pages)/calendar/page.tsx` 
- **หน้าที่**: จัดการนัดหมายและกำหนดการ
- **เข้าถึง**: ตามสิทธิ์ของ role

### `/blank` - หน้าว่าง (Template)
- **ไฟล์**: `src/app/(admin)/(others-pages)/blank/page.tsx`
- **หน้าที่**: Template สำหรับสร้างหน้าใหม่

### หน้า Error และ 404
- **ไฟล์**: 
  - `src/app/not-found.tsx` - หน้า 404
  - `src/app/(full-width-pages)/(error-pages)/error-404/page.tsx` - หน้า Error 404
- **หน้าที่**: แสดงเมื่อไม่พบหน้าที่ต้องการ

---

## 🎨 UI Components และ Forms

### Charts และ Visualization
- **ไฟล์**: `src/app/(admin)/(others-pages)/(chart)/`
- **หน้าที่**: แสดงกราฟและข้อมูลเชิงสถิติ

### Forms และ Input
- **ไฟล์**: `src/app/(admin)/(others-pages)/(forms)/`
- **หน้าที่**: ฟอร์มต่างๆ สำหรับป้อนข้อมูล

### Tables และ Data
- **ไฟล์**: `src/app/(admin)/(others-pages)/(tables)/`
- **หน้าที่**: แสดงข้อมูลในรูปแบบตาราง

### UI Elements
- **ไฟล์**: `src/app/(admin)/(ui-elements)/`
- **หน้าที่**: 
  - `/alerts` - การแจ้งเตือน
  - `/avatars` - รูปโปรไฟล์
  - `/badge` - ป้ายแสดงสถานะ  
  - `/buttons` - ปุ่มต่างๆ
  - `/images` - จัดการรูปภาพ
  - `/modals` - หน้าต่างป๊อปอัพ
  - `/videos` - วิดีโอ

---

## 🔒 ระบบรักษาความปลอดภัย

### Layout Guards
- **AdminGuard**: ป้องกัน route สำหรับ admin
- **StaffGuard**: ป้องกัน route สำหรับ staff  
- **ExecutiveGuard**: ป้องกัน route สำหรับ executive

### Auto Redirect
- เมื่อ token หมดอายุ → `/signin`
- Login สำเร็จ → dashboard ตาม role
- เข้าหน้าที่ไม่มีสิทธิ์ → redirect ไป dashboard ของตนเอง

---

## 📱 Responsive Design
ทุกหน้าได้รับการออกแบบให้ responsive รองรับ:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)  
- 💻 Desktop (1024px+)
- 🖥️ Large Screen (1440px+)