"use client";

import Link from 'next/link';
import Image from 'next/image';
// ...existing code...

export default function SignInSelectionPage() {
  return (
    <div className="w-full">
      {/* Back Link - Hidden on Mobile (handled by mobile header) */}
      <div className="hidden lg:block mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          ← กลับหน้าหลัก
        </Link>
      </div>

      {/* Main Content Container */}
      <div className="space-y-8">
        {/* Header Section - Only visible on Desktop */}
        <div className="hidden lg:block text-center">
          <div className="mb-6">
            <Image
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
              width={96}
              height={96}
              className="h-20 xl:h-24 mx-auto mb-4"
              priority
            />
          </div>
          <h1 className="mb-3 font-bold text-gray-800 text-xl xl:text-2xl dark:text-white/90">
            ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์
          </h1>
          <p className="text-base xl:text-lg text-gray-600 dark:text-gray-300 mb-2">
            Thai Hajj Health System
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            กรุณาเลือกประเภทผู้ใช้งานที่ตรงกับบทบาทของคุณ
          </p>
        </div>

        {/* ThaiD Introduction Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/10 dark:via-indigo-900/10 dark:to-purple-900/10 rounded-xl lg:rounded-2xl p-6 lg:p-8 border border-blue-100 dark:border-blue-800">
            <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white rounded-xl lg:rounded-2xl mb-4 lg:mb-6 p-2 lg:p-3 shadow-md">
              <Image 
                src="/images/logo/thaID.jpg" 
                alt="ThaiD Digital ID" 
                width={64}
                height={64}
                className="w-full h-full object-contain rounded"
              />
            </div>

            
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed px-2">
              ตอนนี้คุณสามารถเข้าสู่ระบบด้วย <strong>ThaiD (Digital ID)</strong> ได้แล้ว<br className="hidden sm:block"/>
              ใช้เพียงบัตรประชาชนและ PIN - ง่าย ปลอดภัย และรวดเร็ว
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
