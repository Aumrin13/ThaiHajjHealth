"use client";

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { AdminLoginCredentials } from '@/types/auth';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeIcon, EyeCloseIcon } from '@/icons';
import Link from 'next/link';
import ThaiDLoginButton from './ThaiDLoginButton';
import LoginDivider from './LoginDivider';

export default function AdminLoginForm() {
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AdminLoginCredentials>({
    username: '',
    password: '',
    role: 'admin',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof AdminLoginCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.username.trim()) {
      errors.username = 'กรุณากรอกชื่อผู้ใช้';
    }

    if (!formData.password) {
      errors.password = 'กรุณากรอกรหัสผ่าน';
    } else if (formData.password.length < 6) {
      errors.password = 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const success = await login(formData);
    if (!success) {
      // Error is handled by the auth context
      console.log('Login failed');
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full sm:pt-6 lg:pt-8 mb-4 lg:mb-6">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center text-xs sm:text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          >
            ← กลับหน้าหลัก
          </Link>
          <div className="flex gap-1 sm:gap-2 text-xs">
            <Link
              href="/signin/staff"
              className="text-blue-500 hover:text-blue-600 truncate"
            >
              เจ้าหน้าที่
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/signin/executive"
              className="text-blue-500 hover:text-blue-600 truncate"
            >
              ผู้บริหาร
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="text-center mb-4 lg:mb-6">
            <img
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
              className="h-16 sm:h-18 lg:h-20 mx-auto mb-3"
            />
          </div>
          <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-xl lg:text-2xl dark:text-white/90 text-center">
            เข้าสู่ระบบ - ผู้ดูแลระบบ
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center px-2">
            กรุณากรอกชื่อผู้ใช้และรหัสผ่านเพื่อเข้าสู่ระบบ
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* ThaiD Login Option */}
        <div className="mb-4 lg:mb-6">
          <ThaiDLoginButton role="admin" />
        </div>

        <LoginDivider />

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 lg:space-y-6">
            <div>
              <Label>
                ชื่อผู้ใช้ <span className="text-error-500">*</span>
              </Label>
              <Input
                type="text"
                placeholder="กรอกชื่อผู้ใช้"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                className={formErrors.username ? 'border-red-300' : ''}
              />
              {formErrors.username && (
                <p className="mt-1 text-sm text-red-500">{formErrors.username}</p>
              )}
            </div>

            <div>
              <Label>
                รหัสผ่าน <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="กรอกรหัสผ่าน"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className={formErrors.password ? 'border-red-300' : ''}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                  )}
                </span>
              </div>
              {formErrors.password && (
                <p className="mt-1 text-sm text-red-500">{formErrors.password}</p>
              )}
            </div>

            <div>
              <Button 
                type="submit"
                className="w-full" 
                size="sm"
                disabled={isLoading}
              >
                {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
              </Button>
            </div>
          </div>
        </form>

        <div className="mt-4 lg:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
            สำหรับผู้ดูแลระบบเท่านั้น <br className="hidden sm:block"/>
            <span className="sm:hidden"> </span>หากคุณเป็นเจ้าหน้าที่หรือผู้บริหาร กรุณาเลือกประเภทผู้ใช้ที่ถูกต้อง
          </p>
        </div>
      </div>
    </div>
  );
}