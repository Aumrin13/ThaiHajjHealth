# รูปภาพ ThaiD Logo

เนื่องจากไฟล์รูป `thaID.jpg` เป็นไฟล์ binary ฉันไม่สามารถสร้างไฟล์จริงได้

## วิธีการเพิ่มรูป ThaiD:

1. **ดาวน์โหลดโลโก้ ThaiD** จากเว็บไซต์ทางการ: https://www.thaid.go.th
2. **บันทึกไฟล์** ชื่อ `thaID.jpg` 
3. **วางไฟล์** ใน folder: `public/images/logo/`
4. **ขนาดที่แนะนำ**: 200x200 pixels หรือ 1:1 aspect ratio
5. **รูปแบบ**: JPG, PNG, หรือ SVG

## หรือใช้รูปภาพจาก CDN:
```tsx
// ใช้รูปจากเว็บไซต์ ThaiD โดยตรง
<img 
  src="https://www.thaid.go.th/assets/images/thaid-logo.png" 
  alt="ThaiD" 
  className="w-5 h-5 object-contain"
/>
```

## หรือใช้ Base64 แทน:
```tsx
// สำหรับ demo ใช้ placeholder image
<img 
  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSI+CjxyZWN0IHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgZmlsbD0iIzAwN0ZGRiIgcng9IjQiLz4KPHRleHQgeD0iMTIiIHk9IjE2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIxMCIgZm9udC13ZWlnaHQ9ImJvbGQiPlRIPC90ZXh0Pgo8L3N2Zz4K" 
  alt="ThaiD" 
  className="w-5 h-5 object-contain"
/>
```