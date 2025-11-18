"use client";

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

type CallbackStatus = 'processing' | 'success' | 'error';

// Component ที่ใช้ useSearchParams จริง
function ThaiDCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // Note: loginWithThaiD function will be implemented in AuthContext
  const [status, setStatus] = useState<CallbackStatus>('processing');
  const [message, setMessage] = useState('กำลังตรวจสอบข้อมูล...');

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const code = searchParams.get('code');
        const state = searchParams.get('state');
        const error = searchParams.get('error');
        const errorDescription = searchParams.get('error_description');

        // ตรวจสอบ error จาก ThaiD
        if (error) {
          setStatus('error');
          if (error === 'access_denied') {
            setMessage('ผู้ใช้ยกเลิกการเข้าสู่ระบบผ่าน ThaiD');
          } else {
            setMessage(errorDescription || 'การเข้าสู่ระบบผ่าน ThaiD ล้มเหลว');
          }
          return;
        }

        // ตรวจสอบ CSRF state
        const savedState = localStorage.getItem('oauth_state');
        if (!state || state !== savedState) {
          setStatus('error');
          setMessage('เกิดข้อผิดพลาดด้านความปลอดภัย กรุณาลองใหม่อีกครั้ง');
          return;
        }

        if (!code) {
          setStatus('error');
          setMessage('ไม่พบรหัสยืนยันจาก ThaiD');
          return;
        }

        setMessage('กำลังยืนยันตัวตนกับ ThaiD...');
        
        // เรียก API เพื่อ exchange code เป็น token
        const response = await fetch('/api/auth/thaid/callback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            code, 
            state,
            redirect_uri: `${window.location.origin}/auth/thaid/callback`
          }),
        });

        const data = await response.json();
        
        if (response.ok && data.success) {
          setStatus('success');
          setMessage('เข้าสู่ระบบสำเร็จ! กำลังนำไปยังหน้าหลัก...');
          
          // เก็บ token
          localStorage.setItem('token', data.data.token.accessToken);
          localStorage.setItem('user', JSON.stringify(data.data.user));
          
          // Redirect ตาม role
          setTimeout(() => {
            switch(data.data.user.role) {
              case 'admin':
                router.push('/admin');
                break;
              case 'staff':
                router.push('/staff');
                break;
              case 'executive':
                router.push('/executive');
                break;
              default:
                router.push('/');
            }
          }, 2000);
        } else {
          setStatus('error');
          setMessage(data.message || 'เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
        }

      } catch (error) {
        console.error('ThaiD callback error:', error);
        setStatus('error');
        setMessage('เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง');
      }
    };
    handleCallback();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">ThaiD Callback</h1>
        <p className={`mb-4 ${status === 'error' ? 'text-red-600' : status === 'success' ? 'text-green-600' : 'text-gray-600'}`}>{message}</p>
        {status === 'processing' && <div className="animate-spin h-8 w-8 border-4 border-blue-400 border-t-transparent rounded-full mx-auto" />}
      </div>
    </div>
  );
}

export default function ThaiDCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThaiDCallbackContent />
    </Suspense>
  );
}
