"use client";

import Link from 'next/link';
import { UserIcon, GroupIcon, PieChartIcon } from '@/icons';

export default function SignInSelectionPage() {
  const userTypes = [
    {
      type: 'admin',
      title: 'ผู้ดูแลระบบ',
      description: 'จัดการระบบและข้อมูลทั่วไป',
      icon: <UserIcon className="w-6 h-6" />,
      href: '/signin/admin',
      bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200',
      textColor: 'text-blue-700',
      iconColor: 'text-blue-600'
    },
    {
      type: 'staff',
      title: 'เจ้าหน้าที่',
      description: 'บันทึกและจัดการข้อมูลผู้ป่วย',
      icon: <GroupIcon className="w-6 h-6" />,
      href: '/signin/staff',
      bgColor: 'bg-gradient-to-br from-green-100 to-green-200',
      textColor: 'text-green-700',
      iconColor: 'text-green-600'
    },
    {
      type: 'executive',
      title: 'ผู้บริหาร',
      description: 'ดูรายงานและสถิติข้อมูล',
      icon: <PieChartIcon className="w-6 h-6" />,
      href: '/signin/executive',
      bgColor: 'bg-gradient-to-br from-purple-100 to-purple-200',
      textColor: 'text-purple-700',
      iconColor: 'text-purple-600'
    }
  ];

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
            <img
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
              className="h-20 xl:h-24 mx-auto mb-4"
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
              <img 
                src="/images/logo/thaID.jpg" 
                alt="ThaiD Digital ID" 
                className="w-full h-full object-contain rounded"
              />
            </div>

            
            <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300 mb-4 lg:mb-6 leading-relaxed px-2">
              ตอนนี้คุณสามารถเข้าสู่ระบบด้วย <strong>ThaiD (Digital ID)</strong> ได้แล้ว<br className="hidden sm:block"/>
              ใช้เพียงบัตรประชาชนและ PIN - ง่าย ปลอดภัย และรวดเร็ว
            </p>

          </div>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs lg:text-sm">
            <span className="px-4 lg:px-6 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400 font-medium">
              เลือกประเภทผู้ใช้งาน
            </span>
          </div>
        </div>

        {/* User Type Cards - Responsive Grid */}
        <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {userTypes.map((userType) => (
            <Link
              key={userType.type}
              href={userType.href}
              className="group relative overflow-hidden rounded-lg lg:rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-lg lg:hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-800/50 transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-1"
            >
              <div className={`${userType.bgColor} p-4 lg:p-5 relative`}>
                <div className="flex items-center justify-between mb-3">
                  <div className={`${userType.iconColor} p-1.5 lg:p-2 bg-white/80 rounded-lg shadow-sm`}>
                    {userType.icon}
                  </div>
                  <div className={`w-6 h-6 lg:w-7 lg:h-7 ${userType.textColor} bg-white/60 rounded-full flex items-center justify-center group-hover:bg-white/80 transition-colors`}>
                    <svg className="w-2.5 h-2.5 lg:w-3 lg:h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </div>
                
                <h3 className={`font-bold text-sm lg:text-base mb-2 ${userType.textColor}`}>
                  {userType.title}
                </h3>
                
                <p className={`text-xs lg:text-sm ${userType.textColor}/80 leading-relaxed`}>
                  {userType.description}
                </p>
                
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Tip Section */}
        <div className="text-center">
          <div className="p-3 lg:p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-700 rounded-lg lg:rounded-xl">
            <p className="text-xs lg:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              <strong>💡 เคล็ดลับ:</strong> ใช้ ThaiD เพื่อการเข้าสู่ระบบที่ปลอดภัยและสะดวก<br className="hidden sm:block"/>
              หรือเลือกประเภทผู้ใช้ตามสิทธิ์ของคุณ
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
