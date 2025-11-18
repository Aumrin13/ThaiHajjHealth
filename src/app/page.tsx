import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export default async function HomePage() {
  // ใช้ next-auth ตรวจสอบ session ฝั่ง server
  const session = await getServerSession(authOptions);

  if (!session) {
    // ถ้าไม่ได้ login ให้ redirect ไปหน้า login
    redirect('/login');
    return null;
  }

  // ตรวจสอบ role แล้ว redirect ตามสิทธิ์
  const role = session.user?.role;
  if (role === 'ADMIN') {
    redirect('/admin');
    return null;
  }
  if (role === 'STAFF') {
    redirect('/staff');
    return null;
  }
  if (role === 'EXECUTIVE') {
    redirect('/executive');
    return null;
  }
  if (role === 'DOCTOR') {
    redirect('/doctor');
    return null;
  }

  // ถ้าไม่มี role ตรงกับที่กำหนด
  return <div>ไม่พบสิทธิ์ผู้ใช้งาน</div>;
}
