"use client";

import React, { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { ExecutiveLoginCredentials } from '@/types/auth';
import Input from '@/components/form/input/InputField';
import Label from '@/components/form/Label';
import Button from '@/components/ui/button/Button';
import { EyeIcon, EyeCloseIcon } from '@/icons';
import Link from 'next/link';
import Image from 'next/image';
import ThaiDLoginButton from './ThaiDLoginButton';
import LoginDivider from './LoginDivider';

export default function ExecutiveLoginForm() {
  const { login, isLoading } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<ExecutiveLoginCredentials>({
    username: '',
    password: '',
    role: 'executive',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof ExecutiveLoginCredentials, value: string) => {
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
    setError(null);
    if (!validateForm()) {
      return;
    }
    const result = await login(formData.username, formData.password);
    if (!result.success) {
      setError(result.error || 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
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
              href="/signin/admin"
              className="text-blue-500 hover:text-blue-600 truncate"
            >
              ผู้ดูแลระบบ
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              href="/signin/staff"
              className="text-blue-500 hover:text-blue-600 truncate"
            >
              เจ้าหน้าที่
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center flex-1 w-full max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0">
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <div className="text-center mb-4 lg:mb-6">
            <Image
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
              width={80}
              height={80}
              className="h-16 sm:h-18 lg:h-20 mx-auto mb-3"
              priority
            />
          </div>
          <h1 className="mb-2 font-semibold text-gray-800 text-lg sm:text-xl lg:text-2xl dark:text-white/90 text-center">
            เข้าสู่ระบบ - ผู้บริหาร
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 text-center px-2">
            สำหรับผู้บริหารระดับสูงและผู้มีสิทธิ์เข้าถึงข้อมูลรายงาน
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* ThaiD Login Option */}
        <div className="mb-4 lg:mb-6">
          <ThaiDLoginButton role="executive" />
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
          <div className="p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-2 text-sm">สิทธิ์การเข้าถึง</h3>
            <ul className="text-xs text-blue-700 text-left space-y-1">
              <li>• เรียกดูรายงานและสถิติทั้งหมด</li>
              <li>• ดาวน์โหลดข้อมูลเป็น Excel/PDF</li>
              <li>• เข้าถึง Dashboard ผู้บริหาร</li>
              <li>• ติดตามผลการดำเนินงาน</li>
            </ul>
          </div>
        </div>

        <div className="mt-3 lg:mt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2">
            หากคุณไม่ใช่ผู้บริหาร กรุณาเลือกประเภทผู้ใช้ที่เหมาะสม
          </p>
        </div>
      </div>
    </div>
  );
}