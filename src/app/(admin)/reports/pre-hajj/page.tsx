"use client";
import React from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  FileTextIcon,
  UsersIcon,
  CheckCircle2Icon,
  StethoscopeIcon,
  SyringeIcon,
  TrendingUpIcon,
} from "@/components/icons/HealthIcons";

// Fake Statistics Data
const STATS = {
  totalPilgrims: 500,
  healthCheckComplete: 450,
  vaccinationComplete: 420,
  readyToTravel: 380,
  cancelled: 20,
  averageAge: 52,
  maleCount: 280,
  femaleCount: 220,
};

const PROVINCE_STATS = [
  { name: "กรุงเทพมหานคร", count: 120, percentage: 24 },
  { name: "เชียงใหม่", count: 80, percentage: 16 },
  { name: "ขอนแก่น", count: 70, percentage: 14 },
  { name: "สงขลา", count: 65, percentage: 13 },
  { name: "นครราชสีมา", count: 60, percentage: 12 },
  { name: "อื่นๆ", count: 105, percentage: 21 },
];

const DISEASE_STATS = [
  { name: "เบาหวาน", count: 85, percentage: 17, severity: "warning" as const },
  { name: "ความดันโลหิตสูง", count: 120, percentage: 24, severity: "error" as const },
  { name: "โรคหัวใจ", count: 45, percentage: 9, severity: "error" as const },
  { name: "หอบหืด", count: 30, percentage: 6, severity: "warning" as const },
  { name: "ไม่มีโรคประจำตัว", count: 220, percentage: 44, severity: "success" as const },
];

const HEALTH_STATUS = [
  { status: "ปกติ - พร้อมเดินทาง", count: 380, color: "success" as const },
  { status: "ต้องติดตาม", count: 70, color: "warning" as const },
  { status: "ต้องรักษา", count: 30, color: "error" as const },
  { status: "รอตรวจ", count: 20, color: "info" as const },
];

const VACCINATION_COVERAGE = [
  { vaccine: "ไข้หวัดใหญ่", completed: 480, total: 500, percentage: 96 },
  { vaccine: "ไข้เหลือง", completed: 465, total: 500, percentage: 93 },
  { vaccine: "ไข้กาฬหลัง", completed: 450, total: 500, percentage: 90 },
  { vaccine: "MMR", completed: 470, total: 500, percentage: 94 },
];

export default function PreHajjReportsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            รายงานและสถิติการดูแลสุขภาพก่อนเดินทาง
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ภาพรวมและสถิติการเตรียมความพร้อมผู้เดินทาง
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline">
            <TrendingUpIcon className="inline w-4 h-4 mr-2 align-text-bottom" /> ส่งออก Excel
          </Button>
          <Button size="sm">
            <FileTextIcon className="inline w-4 h-4 mr-2 align-text-bottom" /> พิมพ์รายงาน
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ComponentCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ผู้เดินทางทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {STATS.totalPilgrims}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg text-white text-2xl">
              <UsersIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">พร้อมเดินทาง</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {STATS.readyToTravel}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((STATS.readyToTravel / STATS.totalPilgrims) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white text-2xl">
              <CheckCircle2Icon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/10 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ตรวจสุขภาพแล้ว</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {STATS.healthCheckComplete}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((STATS.healthCheckComplete / STATS.totalPilgrims) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-lg text-white text-2xl">
              <StethoscopeIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-500/10 dark:to-orange-600/10 border-orange-200 dark:border-orange-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ฉีดวัคซีนครบ</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {STATS.vaccinationComplete}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round((STATS.vaccinationComplete / STATS.totalPilgrims) * 100)}%
              </p>
            </div>
            <div className="p-3 bg-orange-500 rounded-lg text-white text-2xl">
              <SyringeIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Gender and Age */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ComponentCard>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            สัดส่วนเพศ
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">ชาย</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {STATS.maleCount} คน ({Math.round((STATS.maleCount / STATS.totalPilgrims) * 100)}%)
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500"
                  style={{ width: `${(STATS.maleCount / STATS.totalPilgrims) * 100}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">หญิง</span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {STATS.femaleCount} คน ({Math.round((STATS.femaleCount / STATS.totalPilgrims) * 100)}%)
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-pink-500"
                  style={{ width: `${(STATS.femaleCount / STATS.totalPilgrims) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </ComponentCard>

        <ComponentCard>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            สถานะสุขภาพ
          </h3>
          <div className="space-y-3">
            {HEALTH_STATUS.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant={item.color} size="sm">
                    {item.status}
                  </Badge>
                </div>
                <span className="text-lg font-semibold text-gray-800 dark:text-white">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </ComponentCard>
      </div>

      {/* Province Distribution */}
      <ComponentCard>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          การกระจายตามจังหวัด
        </h3>
        <div className="space-y-3">
          {PROVINCE_STATS.map((province, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {province.name}
                </span>
                <span className="text-sm font-medium text-gray-800 dark:text-white">
                  {province.count} คน ({province.percentage}%)
                </span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  style={{ width: `${province.percentage * 4}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      {/* Disease Statistics */}
      <ComponentCard>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          สถิติโรคประจำตัว
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {DISEASE_STATS.map((disease, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-800 dark:text-white">
                  {disease.name}
                </h4>
                <Badge variant={disease.severity} size="sm">
                  {disease.percentage}%
                </Badge>
              </div>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {disease.count}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                คน
              </p>
            </div>
          ))}
        </div>
      </ComponentCard>

      {/* Vaccination Coverage */}
      <ComponentCard>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          ความครอบคลุมการฉีดวัคซีน
        </h3>
        <div className="space-y-4">
          {VACCINATION_COVERAGE.map((vac, idx) => (
            <div key={idx}>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {vac.vaccine}
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {vac.completed}/{vac.total} ({vac.percentage}%)
                </span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    vac.percentage >= 95
                      ? "bg-green-500"
                      : vac.percentage >= 85
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                  style={{ width: `${vac.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      {/* Summary */}
      <ComponentCard className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <TrendingUpIcon className="w-5 h-5" /> สรุปภาพรวม
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">ความพร้อมโดยรวม</p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
              {Math.round((STATS.readyToTravel / STATS.totalPilgrims) * 100)}%
            </p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">อายุเฉลี่ย</p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
              {STATS.averageAge}
            </p>
            <p className="text-xs text-gray-500">ปี</p>
          </div>
          <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
            <p className="text-sm text-gray-600 dark:text-gray-400">ยกเลิก</p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400">
              {STATS.cancelled}
            </p>
            <p className="text-xs text-gray-500">คน</p>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
