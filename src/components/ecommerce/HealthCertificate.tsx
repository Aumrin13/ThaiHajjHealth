"use client";
import React from "react";
import Badge from "../ui/badge/Badge";

export const HealthCertificate = () => {
  return (
    <div className="rounded-2xl border border-purple-200 bg-gradient-to-br from-purple-50 to-blue-50 p-5 dark:border-gray-800 dark:from-purple-500/10 dark:to-blue-500/10 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white/90">
            📜 ใบรับรอง Pilgrims&apos; Health Status
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Certificate of Health Status
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-900">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">ออกใบรับรองแล้ว</p>
            <Badge color="success" size="sm">892 ใบ</Badge>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-900">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">รอการออกใบรับรอง</p>
            <Badge color="warning" size="sm">23 ใบ</Badge>
          </div>
        </div>

        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border border-purple-100 dark:border-purple-900">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">มีข้อแม้</p>
            <Badge color="error" size="sm">12 ใบ</Badge>
          </div>
        </div>
      </div>

      <button className="w-full mt-4 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium text-sm">
        ดาวน์โหลดใบรับรอง
      </button>
    </div>
  );
};
