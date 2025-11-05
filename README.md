# ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์ (Thai Hajj Health System)

ระบบจัดการสุขภาพแบบครบถ้วนสำหรับผู้เดินทางไปประกอบพิธีฮัจญ์ โดยออกแบบให้ครอบคลุม 3 ระยะ: ก่อนเดินทาง ระหว่างการเดินทาง และหลังเดินทาง พร้อมระบบเฝ้าระวัง 14 วัน และแนวคิด **One ID - One Health Record** 

สร้างด้วย **Next.js 15** และ **Tailwind CSS V4**

## 📋 สารบัญ
- [ภาพรวมระบบ](#ภาพรวมระบบ)
- [เป้าหมายของระบบ](#เป้าหมายของระบบ)
- [Technology Stack](#technology-stack)
- [ฟีเจอร์หลัก](#ฟีเจอร์หลัก)
- [การติดตั้ง](#การติดตั้ง)
- [โครงสร้างโปรเจกต์](#โครงสร้างโปรเจกต์)

## ภาพรวมระบบ

ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์ (Thai Hajj Health System) เป็นแพลตฟอร์มที่ครบถ้วนสำหรับ:

### 3 ระยะของการดูแล:
- **ระยะที่ 1: ก่อนเดินทาง** - การตรวจสุขภาพเบื้องต้น จัดส่งวัคซีน เตรียมความพร้อม
- **ระยะที่ 2: ระหว่างการเดินทางและประกอบพิธีฮัจญ์** - ติดตามสถานะสุขภาพ สนับสนุนการดูแลอย่างต่อเนื่อง
- **ระยะที่ 3: หลังเดินทาง** - เฝ้าระวังโรคติดต่อ 14 วัน หลังกลับจากต่างประเทศ

### หลักการสำคัญ:
- **One ID - One Health Record**: ใช้เลขบัตรประชาชน 13 หลัก เชื่อมข้อมูลสุขภาพจากทุกระบบ
- **Data Integration API**: เชื่อมโยงข้อมูลระหว่างหน่วยงานต่างๆ
- **Continuity of Care**: ลดความซ้ำซ้อนของข้อมูล ส่งเสริมความต่อเนื่องของการดูแล
- **14-Day Surveillance**: เฝ้าระวังโรคติดต่อตลอด 14 วันหลังเดินทาง
- **Automated Alerts**: แจ้งเตือนอัตโนมัติสำหรับกรณีเสี่ยง (Mr. Hajj System)
- **Health Certificate**: ออกใบรับรองสุขภาพ (Pilgrims' Health Status Certificate)

## เป้าหมายของระบบ

✅ **ระบบ One ID - One Health Record** - ทำให้ไม่มีข้อมูลซ้ำซ้อน เข้าถึงข้อมูลครบถ้วนผ่านเลขประชาชน  
✅ **เชื่อมโยงข้อมูลหลายหน่วยงาน** - ผ่านระบบ API Integration  
✅ **เฝ้าระวังโรคติดต่อ** - ตลอด 14 วันหลังกลับจากต่างประเทศ  
✅ **แจ้งเตือนอัตโนมัติ** - ระบบ Mr. Hajj Alert สำหรับกรณีเสี่ยง  
✅ **ออกใบรับรองสุขภาพ** - Pilgrims' Health Status Certificate  
✅ **Health Literacy Program** - สื่อประชาสัมพันธ์และสุขศึกษา  
✅ **Dashboard สำหรับผู้บริหารและประชาชน** - ติดตามข้อมูลแบบเรียลไทม์  

### Technology Stack

#### Frontend (Main Application)
- **Framework**: Next.js 15.x + React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS V4
- **Charts**: ApexCharts for data visualization
- **Calendar**: FullCalendar for scheduling
- **UI Interactions**: React DnD for Drag & Drop
- **Carousel**: Swiper for Carousel/Slider
- **Deployment**: Domain หลัก (e.g., hajjhealth.com)

#### Backend API (Express.js)
- **Framework**: Express.js + Node.js
- **Database**: PostgreSQL/MySQL
- **Authentication**: JWT + bcrypt
- **Validation**: Joi/Zod
- **Documentation**: Swagger/OpenAPI 3.0
- **Testing**: Jest + Supertest
- **Deployment**: Subdomain `api.domain.com`
- **Environment**: Docker + PM2

## ฟีเจอร์หลัก

✅ Dashboard ภาพรวมสุขภาพผู้หลี่  
✅ ระบบ One ID - One Health Record (เลข 13 หลัก)  
✅ การจัดการ 3 ระยะของการดูแล  
✅ บันทึกทางการแพทย์ (Medical Records)  
✅ เฝ้าระวังโรคติดต่อ 14 วัน  
✅ ระบบแจ้งเตือน (Mr. Hajj Alerts)  
✅ ใบรับรองสุขภาพ (Health Certificate)  
✅ API Integration สำหรับหน่วยงานต่างๆ  
✅ Health Literacy Content  
✅ Dark/Light Theme Support  
✅ Fully Responsive Design  
✅ TypeScript Support  

## การติดตั้ง

### Prerequisites
- **Frontend**: Node.js 18.x or later (recommended Node.js 20.x or later)
- **Backend**: Node.js 18.x + PostgreSQL/MySQL
- **Package Manager**: npm or yarn

### Frontend Setup (Next.js)

1. Clone the repository:
```bash
git clone https://github.com/yourusername/thai-hajj-health.git
cd thai-hajj-health/THH
```

2. Install dependencies:
```bash
npm install
```

3. Setup environment variables:
```bash
cp .env.example .env.local
# แก้ไข API_URL=https://api.domain.com
```

4. Run development server:
```bash
npm run dev
```

5. Open browser:
```
http://localhost:3000
```

### Backend API Setup (Express.js)

1. Clone backend repository:
```bash
git clone https://github.com/yourusername/hajj-health-api.git
cd hajj-health-api
```

2. Install dependencies:
```bash
npm install
```

3. Setup database:
```bash
# Create database
createdb hajj_health

# Run migrations
npm run db:migrate

# Seed initial data
npm run db:seed
```

4. Setup environment variables:
```bash
cp .env.example .env
# แก้ไขค่า database และ JWT secrets
```

5. Start API server:
```bash
npm run dev
```

6. API available at:
```
http://localhost:3001
API Docs: http://localhost:3001/docs
```

### Production Deployment

#### Plesk Hosting (Recommended)
```bash
# เริ่มต้นใช้งานง่ายๆ ใน 3 ขั้นตอน
# See PLESK_QUICKSTART.md for details

# 1. Setup Git Repository in Plesk Panel
# 2. Configure Node.js and Environment Variables
# 3. Deploy via SSH:
chmod +x plesk-deploy.sh
./plesk-deploy.sh
```

📖 **Plesk Deployment Guides:**
- 🚀 [PLESK_QUICKSTART.md](./PLESK_QUICKSTART.md) - เริ่มต้นใช้งานด่วน (Quick Start)
- 📚 [DEPLOYMENT.md](./DEPLOYMENT.md) - คู่มือแบบละเอียด (Complete Guide)

#### Frontend (Vercel/Netlify)
```bash
npm run build
npm start
```

#### Backend API (subdomain api.domain.com)
```bash
# Using PM2
npm install -g pm2
pm2 start ecosystem.config.js

# Using Docker
docker-compose up -d

# Manual deployment
npm run build
NODE_ENV=production npm start
```

## Project Structure

```
THH/
├── public/                 # Static assets (images, icons)
├── src/
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable React components
│   ├── context/           # Theme and Sidebar context
│   ├── hooks/             # Custom React hooks
│   ├── layout/            # Main layout components
│   ├── icons/             # SVG icons
│   └── svg.d.ts          # SVG type definitions
├── package.json           # Dependencies & scripts
├── tsconfig.json          # TypeScript config
├── tailwind.config.js     # Tailwind CSS config
├── next.config.ts         # Next.js config
└── README.md             # This file
```

## File Directory Guide

### 🔝 Root & Layout Files

| ไฟล์ | หน้าที่ |
|------|--------|
| `src/app/layout.tsx` | **Layout หลัก** - ห่อมทั้ง app ด้วย ThemeProvider และ SidebarProvider ระดับ global metadata |
| `src/app/globals.css` | **Global Styles** - CSS ทั่วแอปพลิเคชัน |
| `src/app/page.tsx` | **Home Page** - หน้าแรกของแอป |
| `src/app/not-found.tsx` | **404 Page** - หน้า error เมื่อไม่พบหน้า |

### 🎨 Layout Components (ส่วนประกอบโครงสร้าง)

| ไฟล์ | หน้าที่ |
|------|--------|
| `src/layout/AppHeader.tsx` | **Header บน** - Navigation bar ที่มี logo, search, notification, user menu |
| `src/layout/AppSidebar.tsx` | **Sidebar ซ้าย** - Main navigation menu (Dashboard, Hajj Schedule, Pilgrim Management, etc.) |
| `src/layout/Backdrop.tsx` | **Modal Overlay** - พื้นหลัง modal/dropdown overlay |
| `src/layout/SidebarWidget.tsx` | **Sidebar Widget** - Additional content in sidebar |

### 🧠 Context & State Management

| ไฟล์ | หน้าที่ |
|------|--------|
| `src/context/ThemeContext.tsx` | **Theme Control** - จัดการ Dark/Light mode และ localStorage persistence |
| `src/context/SidebarContext.tsx` | **Sidebar State** - จัดการ expand/collapse, mobile responsive, active items |

### 🎣 Custom Hooks

| ไฟล์ | หน้าที่ |
|------|--------|
| `src/hooks/useGoBack.ts` | **Navigation Hook** - ย้อนกลับไปหน้าก่อนหน้า |
| `src/hooks/useModal.ts` | **Modal Hook** - ควบคุม modal open/close state |

### 📦 Components Directory

#### Auth Components
```
src/components/auth/
├── SignInForm.tsx         → Login form
└── SignUpForm.tsx         → Registration form
```

#### Common Components (ใช้ทั่วไป)
```
src/components/common/
├── ChartTab.tsx           → Tab component for charts
├── ComponentCard.tsx      → Reusable card wrapper
├── GridShape.tsx          → Grid layout helper
├── PageBreadCrumb.tsx     → Breadcrumb navigation
├── ThemeToggleButton.tsx  → Theme switch button
└── ThemeTogglerTwo.tsx    → Alternative theme toggle
```

#### E-commerce/Health Components
```
src/components/ecommerce/
├── EcommerceMetrics.tsx       → Health metrics display
├── MonthlySalesChart.tsx      → Monthly chart visualization
├── MonthlyTarget.tsx          → Target information display
├── RecentOrders.tsx           → Recent transactions/requests
├── StatisticsChart.tsx        → Statistics overview
├── CountryMap.tsx             → Geographic distribution map
└── DemographicCard.tsx        → Demographic information
```

#### Form Components
```
src/components/form/
├── Form.tsx                → Form wrapper & controller
├── Label.tsx              → Form label component
├── Select.tsx             → Select dropdown
├── MultiSelect.tsx        → Multi-select dropdown
├── date-picker.tsx        → Date picker input
├── form-elements/         → Reusable form inputs
│   ├── input/            → Text/Number inputs
│   ├── switch/           → Toggle switches
│   └── group-input/      → Grouped inputs
```

#### UI Elements (Foundation Components)
```
src/components/ui/
├── alert/                 → Alert notifications
├── avatar/                → User profile avatars
├── badge/                 → Badge labels & tags
├── button/                → Button styles
├── dropdown/              → Dropdown menus
├── images/                → Image wrapper
├── modal/                 → Modal dialogs
├── table/                 → Table components
└── video/                 → Video player
```

#### Header Components
```
src/components/header/
├── NotificationDropdown.tsx   → Notification center
└── UserDropdown.tsx           → User profile menu
```

#### Specialized Components
```
src/components/
├── calendar/Calendar.tsx               → Calendar/Schedule system
├── charts/                             → Chart components
│   ├── bar/                           → Bar chart
│   └── line/                          → Line chart
├── tables/                             → Table components
│   ├── BasicTableOne.tsx
│   └── Pagination.tsx
├── user-profile/                       → User profile cards
│   ├── UserAddressCard.tsx
│   ├── UserInfoCard.tsx
│   └── UserMetaCard.tsx
├── videos/                             → Video components
│   ├── FourIsToThree.tsx
│   ├── OneIsToOne.tsx
│   ├── SixteenIsToNine.tsx
│   └── TwentyOneIsToNine.tsx
└── example/
    └── ModalExample/                   → Modal usage example
```

### 📄 Configuration Files

| ไฟล์ | หน้าที่ |
|------|--------|
| `tsconfig.json` | **TypeScript Config** - ตั้งค่า TypeScript compiler |
| `next.config.ts` | **Next.js Config** - ตั้งค่า Next.js behavior |
| `postcss.config.js` | **PostCSS Config** - ตั้งค่า CSS processing |
| `tailwind.config.js` | **Tailwind Config** - ตั้งค่า theme, colors, plugins |
| `prettier.config.js` | **Code Formatter** - ตั้งค่า code style |
| `eslint.config.mjs` | **Linter Config** - ตั้งค่า code quality |
| `package.json` | **Dependencies** - npm packages และ scripts |

### 🎨 Public Assets

```
public/images/
├── brand/              → Logo and branding images
├── cards/              → Card preview images
├── carousel/           → Carousel images
├── chat/               → Chat icons/images
├── country/            → Country flags
├── error/              → Error page images
├── grid-image/         → Grid layout images
├── icons/              → Icon SVGs
├── logo/               → Logo variants
├── product/            → Product images
├── shape/              → Design shapes
├── task/               → Task related images
├── user/               → User avatars
└── video-thumb/        → Video thumbnails
```

### 📦 Key Dependencies

| Package | ใช้งาน |
|---------|--------|
| `@fullcalendar/*` | Calendar and scheduling system |
| `apexcharts` | Data visualization charts |
| `react-apexcharts` | React wrapper for ApexCharts |
| `react-dnd` | Drag and drop functionality |
| `swiper` | Carousel/slider component |
| `flatpickr` | Lightweight date picker |
| `@react-jvectormap/*` | Interactive world map |
| `tailwindcss` | Utility-first CSS framework |

## Development

### Available Scripts

#### Development
```bash
npm run dev
```
Starts the development server at `http://localhost:3000`

#### Build
```bash
npm run build
```
Creates optimized production build

#### Production
```bash
npm start
```
Starts the production server (after build)

#### Linting
```bash
npm run lint
```
Runs ESLint to check code quality

## Configuration

### Tailwind CSS
Edit `tailwind.config.js` to customize:
- Color schemes
- Spacing scale
- Typography
- Plugins and extensions

### TypeScript
Edit `tsconfig.json` to configure:
- Compiler options
- Module resolution
- Path aliases (@/ points to src/)

### Next.js
Edit `next.config.ts` for:
- Image optimization
- API routes
- Environment variables
- Build configurations

## Code Style

The project uses:
- **Prettier** for code formatting
- **ESLint** for code quality
- **TypeScript** for type safety
- **Tailwind CSS** for styling

## Best Practices

1. ✅ Use TypeScript for type safety
2. ✅ Keep components small and reusable
3. ✅ Use context API for global state
4. ✅ Leverage Tailwind CSS utilities
5. ✅ Follow component naming conventions
6. ✅ Document complex logic
7. ✅ Use custom hooks for logic reuse

## Troubleshooting

### Port 3000 Already in Use
```bash
npm run dev -- -p 3001
```

### Build Errors
```bash
npm install --legacy-peer-deps
npm run build
```

### Cache Issues
```bash
rm -rf .next node_modules
npm install
npm run dev
```

## License

This project is private and maintained by Thai Hajj Health Team.

---

**Version:** 1.0.0  
**Last Updated:** November 2025  
**Maintained by:** Thai Hajj Health Development Team
#   T h a i H a j j H e a l t h  
 