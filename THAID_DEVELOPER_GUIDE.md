# ThaiD Integration - Developer Quick Start Guide

## 🚀 Quick Setup Guide

### 1. เพิ่มรูป ThaiD Logo
```bash
# วางไฟล์รูป ThaiD ใน:
public/images/logo/thaID.jpg

# หรือใช้รูปจาก URL
https://www.thaid.go.th/assets/images/thaid-logo.png
```

### 2. Environment Variables
```env
# Copy จาก .env.example
cp .env.example .env.local

# แก้ไขค่าต่อไปนี้:
NEXT_PUBLIC_THAID_CLIENT_ID=your-client-id
THAID_CLIENT_SECRET=your-client-secret
NEXT_PUBLIC_THAID_REDIRECT_URI=http://localhost:3000/auth/thaid/callback
```

### 3. Test ThaiD Integration
```bash
# Start development server
npm run dev

# เข้าไปที่:
http://localhost:3000/signin

# คลิกปุ่ม "เข้าสู่ระบบด้วย ThaiD"
```

---

## 🎨 UI Components ที่เพิ่มแล้ว

### 1. ThaiDLoginButton Component
```tsx
// Usage
import ThaiDLoginButton from '@/components/auth/ThaiDLoginButton';

<ThaiDLoginButton 
  role="admin" 
  variant="primary"
  className="w-full"
/>
```

### 2. Login Pages Updated
- ✅ `/signin` - หน้าหลักมี ThaiD Section
- ✅ `/signin/admin` - เพิ่ม ThaiD Button
- ✅ `/signin/staff` - เพิ่ม ThaiD Button  
- ✅ `/signin/executive` - เพิ่ม ThaiD Button

### 3. Callback Page
- ✅ `/auth/thaid/callback` - จัดการ OAuth callback

---

## 🔧 API Routes

### 1. ThaiD Callback Handler
```typescript
// /api/auth/thaid/callback/route.ts
POST /api/auth/thaid/callback
{
  "code": "authorization_code_from_thaid",
  "state": "csrf_protection_token",
  "redirect_uri": "callback_url"
}
```

### 2. Response Format
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "user_id",
      "citizenId": "1234567890123",
      "name": "นายสมชาย ใจดี",
      "email": "user@email.com",
      "role": "staff",
      "loginMethod": "thaid",
      "thaidVerified": true
    },
    "token": {
      "accessToken": "jwt_token",
      "expiresIn": 86400
    }
  }
}
```

---

## 🖼️ Image Assets Required

### ThaiD Logo Files
```
public/images/logo/
├── thaID.jpg          # Main ThaiD logo (200x200px)
├── thaID-white.png    # White version (for dark backgrounds)
├── thaID-icon.svg     # Icon only version
└── README_thaID.md    # Documentation
```

### Usage in Components
```tsx
// Small icon (buttons)
<img 
  src="/images/logo/thaID.jpg" 
  alt="ThaiD" 
  className="w-5 h-5 object-contain"
/>

// Large logo (hero sections)
<img 
  src="/images/logo/thaID.jpg" 
  alt="ThaiD Digital ID" 
  className="w-16 h-16 object-contain rounded"
/>

// Next.js Image component (recommended)
import Image from 'next/image';

<Image 
  src="/images/logo/thaID.jpg" 
  alt="ThaiD" 
  width={20}
  height={20}
  className="object-contain"
/>
```

---

## 📱 User Flow

### Login Flow
```
1. User clicks "เข้าสู่ระบบด้วย ThaiD"
   ↓
2. Redirect to ThaiD authorization
   ↓
3. User enters Citizen ID + PIN
   ↓
4. ThaiD redirects back with code
   ↓
5. Exchange code for token
   ↓
6. Get user info from ThaiD
   ↓
7. Create/update user in database
   ↓
8. Generate JWT token
   ↓
9. Redirect to appropriate dashboard
```

### Error Handling
```
- User cancels → Show cancellation message
- Network error → Show retry option
- Invalid citizen ID → Show validation error
- Server error → Show generic error + support contact
```

---

## 🔒 Security Implementation

### CSRF Protection
```typescript
// Generate state before redirect
const state = crypto.randomUUID();
localStorage.setItem('oauth_state', state);

// Validate state in callback
const savedState = localStorage.getItem('oauth_state');
if (state !== savedState) {
  throw new Error('CSRF token mismatch');
}
```

### Citizen ID Validation
```typescript
function validateCitizenId(citizenId: string): boolean {
  const regex = /^[1-8]\d{12}$/;
  if (!regex.test(citizenId)) return false;
  
  // Checksum validation
  const digits = citizenId.split('').map(Number);
  const sum = digits.slice(0, 12).reduce((acc, digit, i) => 
    acc + (digit * (13 - i)), 0
  );
  const checkDigit = (11 - (sum % 11)) % 10;
  
  return checkDigit === digits[12];
}
```

---

## 🧪 Testing

### Unit Tests
```typescript
// Test ThaiD button rendering
describe('ThaiDLoginButton', () => {
  test('renders with ThaiD logo', () => {
    render(<ThaiDLoginButton />);
    expect(screen.getByAltText('ThaiD')).toBeInTheDocument();
  });
});

// Test citizen ID validation
describe('validateCitizenId', () => {
  test('validates correct citizen ID', () => {
    expect(validateCitizenId('1234567890123')).toBe(true);
  });
  
  test('rejects invalid citizen ID', () => {
    expect(validateCitizenId('1234567890124')).toBe(false);
  });
});
```

### Integration Tests
```typescript
// Test OAuth flow
describe('ThaiD OAuth Flow', () => {
  test('completes login flow successfully', async () => {
    // Mock ThaiD responses
    // Test redirect to ThaiD
    // Test callback handling
    // Verify user creation
  });
});
```

---

## 📋 Deployment Checklist

### Pre-Production
- [ ] ได้รับ Production Client ID/Secret จาก DOPA
- [ ] อัพเดท Environment Variables เป็น Production URLs
- [ ] ทดสอบ OAuth flow ใน Sandbox
- [ ] เตรียมรูป ThaiD logo ในขนาดต่างๆ
- [ ] ตรวจสอบ HTTPS certificates
- [ ] เตรียม Error monitoring

### Production
- [ ] Switch URLs จาก Sandbox เป็น Production
- [ ] ตั้งค่า Redirect URIs ใน DOPA console
- [ ] ทดสอบ End-to-end flow
- [ ] Monitor error rates
- [ ] เตรียม Support documentation

### Post-Launch
- [ ] User adoption tracking
- [ ] Performance monitoring  
- [ ] Security audit
- [ ] User feedback collection

---

## 🆘 Troubleshooting

### Common Issues

#### 1. "ThaiD logo ไม่แสดง"
```bash
# Check file exists
ls public/images/logo/thaID.jpg

# Check file permissions
chmod 644 public/images/logo/thaID.jpg

# Use absolute path
<img src="/images/logo/thaID.jpg" alt="ThaiD" />
```

#### 2. "OAuth redirect ไม่ทำงาน"  
```bash
# Check redirect URI matches exactly
NEXT_PUBLIC_THAID_REDIRECT_URI=http://localhost:3000/auth/thaid/callback

# Check callback page exists
ls src/app/(full-width-pages)/(auth)/thaid/callback/page.tsx
```

#### 3. "Environment variables ไม่ work"
```bash
# Make sure prefix NEXT_PUBLIC_ for client-side vars
NEXT_PUBLIC_THAID_CLIENT_ID=your-id

# Restart dev server after changing .env
npm run dev
```

#### 4. "API route ไม่ทำงาน"
```bash
# Check API route exists
ls src/app/api/auth/thaid/callback/route.ts

# Check method is POST
export async function POST(request: NextRequest) { ... }
```

---

## 📚 Resources

### Official Documentation
- [ThaiD Developer Guide](https://www.thaid.go.th/developer)
- [OAuth 2.0 Specification](https://tools.ietf.org/html/rfc6749)
- [Next.js App Router](https://nextjs.org/docs/app)

### Support Contacts
- **ThaiD Support:** 1111
- **DOPA Developer Team:** developer@dopa.go.th
- **Project Team:** dev@thaihajjhealth.go.th

---

**Last Updated:** November 2025  
**Version:** 1.0.0