"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '@/context/AuthContext';

type CallbackStatus = 'processing' | 'success' | 'error';

export default function ThaiDCallbackPage() {
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
      } finally {
        // ลบ state ออกจาก localStorage
        localStorage.removeItem('oauth_state');
      }
    };

    // เช็คว่ามี searchParams หรือไม่
    if (searchParams.get('code') || searchParams.get('error')) {
      handleCallback();
    } else {
      setStatus('error');
      setMessage('ข้อมูลการยืนยันไม่ครบถ้วน');
    }
  }, [searchParams, router]);

  const LoadingIcon = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
  );

  const SuccessIcon = () => (
    <div className="text-green-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </div>
  );

  const ErrorIcon = () => (
    <div className="text-red-500 mb-4">
      <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        {status === 'processing' && (
          <>
            <LoadingIcon />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              กำลังดำเนินการ
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              กรุณารอสักครู่...
            </div>
          </>
        )}
        
        {status === 'success' && (
          <>
            <SuccessIcon />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              เข้าสู่ระบบสำเร็จ!
            </h2>
            <p className="text-gray-600 dark:text-gray-300">{message}</p>
            <div className="mt-4">
              <div className="inline-flex items-center text-sm text-green-600 dark:text-green-400">
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                ยืนยันตัวตนผ่าน ThaiD แล้ว
              </div>
            </div>
          </>
        )}
        
        {status === 'error' && (
          <>
            <ErrorIcon />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
              เกิดข้อผิดพลาด
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/signin')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                กลับไปหน้า Login
              </button>
              <button
                onClick={() => window.location.reload()}
                className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm"
              >
                ลองใหม่อีกครั้ง
              </button>
            </div>
            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              หากปัญหาเกิดขึ้นอีก กรุณาติดต่อผู้ดูแลระบบ
            </div>
          </>
        )}
      </div>
    </div>
  );
}