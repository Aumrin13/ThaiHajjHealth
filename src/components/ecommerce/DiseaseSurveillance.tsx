"use client";
import React from "react";
import Badge from "../ui/badge/Badge";
import { SearchIcon, PhoneIcon } from "../icons/HealthIcons";

export const DiseaseSurveillance = () => {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white/90 flex items-center gap-2">
            <SearchIcon className="w-5 h-5" /> เฝ้าระวังโรคติดต่อ
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ติดตามเป็นระยะเวลา 14 วันหลังเดินทางกลับ
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-lg border border-red-100 dark:border-red-900">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800 dark:text-white/90">วันที่ติดตาม</p>
            <Badge color="error" size="sm">วันที่ 5 / 14</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            กำลังติดตาม 847 ผู้เดินทาง
          </p>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 rounded-lg border border-amber-100 dark:border-amber-900">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800 dark:text-white/90">ผู้เดินทางมีอาการ</p>
            <Badge color="warning" size="sm">45 คน</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ต้องการการติดตามเพิ่มเติม
          </p>
        </div>

        <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg border border-green-100 dark:border-green-900">
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-800 dark:text-white/90">ความปลอดภัย</p>
            <Badge color="success" size="sm">ปกติ</Badge>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ไม่พบกรณีติดเชื้อเพิ่มเติม
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-600 dark:text-blue-300 font-medium flex items-center gap-2">
          <PhoneIcon className="w-4 h-4" /> Mr. Hajj Alert: ส่งแจ้งเตือนอัตโนมัติสำหรับกรณีที่เสี่ยง
        </p>
      </div>
    </div>
  );
};
