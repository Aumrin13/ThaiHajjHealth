"use client";
import React from "react";
import Badge from "../ui/badge/Badge";

export const OneIDHealthRecord = () => {
  return (
    <div className="rounded-2xl border border-purple-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white/90">
            One ID - One Health Record
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            เลขบัตรประชาชน 13 หลัก เชื่อมข้อมูลจากทุกระบบ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">เลขบัตรประชาชน</p>
          <p className="font-semibold text-gray-800 dark:text-white/90 mt-1">
            1234567890123
          </p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">สถานะการเชื่อมต่อ</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge color="success" size="sm">ทั้งหมด</Badge>
          </div>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">ระยะการดูแล</p>
          <p className="font-semibold text-gray-800 dark:text-white/90 mt-1">
            ระยะที่ 3
          </p>
        </div>
        <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
          <p className="text-xs text-gray-500 dark:text-gray-400">การซิงค์ข้อมูล</p>
          <p className="font-semibold text-gray-800 dark:text-white/90 mt-1">
            Real-time
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-200 dark:border-blue-800">
        <p className="text-xs text-blue-600 dark:text-blue-300 font-medium">
          ✓ เชื่อมข้อมูลจากหลายหน่วยงาน | ✓ ไม่มีข้อมูลซ้ำซ้อน | ✓ ความต่อเนื่องของการดูแล
        </p>
      </div>
    </div>
  );
};
