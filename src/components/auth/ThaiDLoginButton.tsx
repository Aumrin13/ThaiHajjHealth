"use client";

import React from 'react';
import Image from 'next/image';

interface ThaiDLoginButtonProps {
  role?: 'admin' | 'staff' | 'executive';
  className?: string;
  variant?: 'primary' | 'outline';
}

export default function ThaiDLoginButton({ 
  role, 
  className = "", 
  variant = 'primary' 
}: ThaiDLoginButtonProps) {
  
  const initiateThaiDLogin = () => {
    // Generate random state for CSRF protection
    const state = crypto.randomUUID();
    localStorage.setItem('oauth_state', state);
    
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_THAID_CLIENT_ID || 'demo-client-id',
      response_type: 'code',
      scope: 'openid profile citizen_id email phone',
      redirect_uri: process.env.NEXT_PUBLIC_THAID_REDIRECT_URI || `${window.location.origin}/auth/thaid/callback`,
      state: state,
      prompt: 'consent',
      ...(role && { role }) // ส่ง role ไปด้วยถ้ามี
    });
    
    const authUrl = `${process.env.NEXT_PUBLIC_THAID_AUTH_URL || 'https://imauth.bora.dopa.go.th/sandbox/oauth2/authorize'}?${params}`;
    window.location.href = authUrl;
  };

  // ThaiD Icon Component
  const ThaiDIcon = ({ className = "w-5 h-5" }) => (
    <Image 
      src="/images/logo/thaID.jpg" 
      alt="ThaiD" 
      width={20}
      height={20}
      className={`${className} object-contain`}
    />
  );

  const baseStyles = "w-full flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium transition-all duration-200 text-xs sm:text-sm";
  
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 dark:border-blue-400 dark:text-blue-400"
  };

  return (
    <div className="w-full">
      <button
        type="button"
        onClick={initiateThaiDLogin}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      >
        <ThaiDIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="truncate">เข้าสู่ระบบด้วย ThaiD</span>
      </button>
      
      <div className="mt-1.5 sm:mt-2 text-xs text-gray-500 dark:text-gray-400 text-center px-2">
        ใช้บัตรประชาชนและ PIN เพื่อยืนยันตัวตน
      </div>
    </div>
  );
}