import GridShape from "@/components/common/GridShape";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

import { ThemeProvider } from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <ThemeProvider>
        <div className="flex flex-col lg:flex-row min-h-screen w-full">
          {/* Mobile Header - ปรากฏเฉพาะ Mobile */}
          <div className="lg:hidden bg-gradient-to-r from-brand-600 to-brand-700 dark:from-gray-800 dark:to-gray-900 p-4 relative">
            <div className="flex items-center justify-center">
              <Link href="/" className="block">
                <Image
                  width={180}
                  height={54}
                  src="/images/logo/thh_logo.png"
                  alt="Thai Hajj Health System"
                  className="max-w-full h-auto filter drop-shadow-md"
                />
              </Link>
            </div>
          </div>

          {/* Left Side - Form Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-start p-4 sm:p-6 lg:p-6 xl:p-8 min-h-0 lg:min-h-screen">
            <div className="w-full max-w-md lg:max-w-none mx-auto lg:mx-0 lg:pr-8 xl:pr-12">
              <div className="lg:hidden mb-6 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  ยินดีต้อนรับ
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  เข้าสู่ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์
                </p>
              </div>
              {children}
            </div>
          </div>
          
          {/* Right Side - Branding (Desktop Only) */}
          <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 dark:from-gray-800 dark:via-gray-900 dark:to-black relative flex-col justify-start overflow-hidden p-8 xl:p-12">
            {/* Background Elements */}
            <div className="absolute inset-0">
              <GridShape />
              {/* Additional decorative elements */}
              <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
              <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-brand-400/10 rounded-full blur-2xl"></div>
            </div>
            
            {/* Content Container */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
              {/* Logo */}
              <div className="mb-8 transform hover:scale-105 transition-transform duration-300">
                <Link href="/" className="block">
                  <Image
                    width={280}
                    height={84}
                    src="/images/logo/thh_logo.png"
                    alt="Thai Hajj Health System"
                    className="max-w-full h-auto filter drop-shadow-2xl"
                  />
                </Link>
              </div>
              
              {/* Main Content */}
              <div className="space-y-6">
                <h1 className="text-white text-2xl xl:text-3xl font-bold leading-tight">
                  ระบบสุขภาพผู้เดินทาง<br/>
                  <span className="text-brand-200">ไปประกอบพิธีฮัจญ์</span>
                </h1>
                
                <p className="text-brand-100 text-lg font-medium tracking-wide">
                  Thai Hajj Health System
                </p>
                
                <p className="text-gray-300 text-base leading-relaxed max-w-md mx-auto">
                  ระบบจัดการและติดตามสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์
                  อย่างครบถ้วนและมีประสิทธิภาพด้วยเทคโนโลยีที่ทันสมัย
                </p>

                {/* Features Highlight */}
                <div className="grid grid-cols-1 gap-3 mt-8 text-left max-w-sm mx-auto">
                  <div className="flex items-center space-x-3 text-brand-100">
                    <div className="flex-shrink-0 w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">One ID - One Health Record</span>
                  </div>
                  <div className="flex items-center space-x-3 text-brand-100">
                    <div className="flex-shrink-0 w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span className="text-sm">เฝ้าระวังโรคติดต่อ 14 วัน</span>
                  </div>
                  <div className="flex items-center space-x-3 text-brand-100">
                    <div className="flex-shrink-0 w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span className="text-sm">รองรับ ThaiD Digital ID</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Theme Toggle - Responsive Position */}
          <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
            <ThemeTogglerTwo />
          </div>

          {/* Mobile Footer - ปรากฏเฉพาะ Mobile */}
          <div className="lg:hidden bg-gray-50 dark:bg-gray-800 p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>© 2025 กระทรวงสาธารณสุข</p>
              <p>Thai Hajj Health System v1.0.0</p>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
}
