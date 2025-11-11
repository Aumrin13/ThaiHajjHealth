"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";

// Fake Data
const FAKE_HEALTH_CHECKS = [
  {
    id: "HC001",
    pilgrimId: "P001",
    pilgrimName: "นายสมชาย ใจดี",
    checkDate: "2024-11-10",
    type: "ตรวจสุขภาพก่อนเดินทาง",
    bloodPressure: "140/90",
    bloodSugar: "150",
    weight: "75",
    height: "170",
    bmi: "25.9",
    temperature: "36.5",
    heartRate: "78",
    status: "ผิดปกติ - ต้องติดตาม",
    statusColor: "warning" as const,
    doctor: "นพ.สมศักดิ์ รักษาดี",
    notes: "ความดันโลหิตสูงเล็กน้อย แนะนำควบคุมอาหาร",
    nextCheckup: "2024-12-10",
  },
  {
    id: "HC002",
    pilgrimId: "P002",
    pilgrimName: "นางสาวสมหญิง รักดี",
    checkDate: "2024-11-08",
    type: "ตรวจสุขภาพก่อนเดินทาง",
    bloodPressure: "120/80",
    bloodSugar: "95",
    weight: "60",
    height: "160",
    bmi: "23.4",
    temperature: "36.8",
    heartRate: "72",
    status: "ปกติ",
    statusColor: "success" as const,
    doctor: "นพ.สมศักดิ์ รักษาดี",
    notes: "สุขภาพแข็งแรงดี พร้อมเดินทาง",
    nextCheckup: "-",
  },
  {
    id: "HC003",
    pilgrimId: "P003",
    pilgrimName: "นายประยุทธ มั่นคง",
    checkDate: "2024-11-05",
    type: "ตรวจสุขภาพก่อนเดินทาง",
    bloodPressure: "160/100",
    bloodSugar: "110",
    weight: "85",
    height: "175",
    bmi: "27.8",
    temperature: "37.0",
    heartRate: "88",
    status: "ไม่ผ่าน - ต้องรักษา",
    statusColor: "error" as const,
    doctor: "พญ.สมใจ ใจดี",
    notes: "ความดันโลหิตสูงมาก ต้องรักษาก่อนเดินทาง",
    nextCheckup: "2024-11-20",
  },
];

export default function HealthCheckPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");

  const filteredData = FAKE_HEALTH_CHECKS.filter((check) => {
    const matchSearch =
      check.pilgrimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      check.pilgrimId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = selectedStatus === "ทั้งหมด" || check.status.includes(selectedStatus);

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            ตรวจสุขภาพก่อนเดินทาง
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ติดตามและจัดการผลการตรวจสุขภาพผู้เดินทาง
          </p>
        </div>
        <Button size="sm">
          + บันทึกผลตรวจ
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ผลตรวจปกติ</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {FAKE_HEALTH_CHECKS.filter(h => h.status === "ปกติ").length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white text-2xl">
              ✓
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-600/10 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ต้องติดตาม</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {FAKE_HEALTH_CHECKS.filter(h => h.status.includes("ติดตาม")).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg text-white text-2xl">
              ⚠
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-600/10 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ไม่ผ่าน</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {FAKE_HEALTH_CHECKS.filter(h => h.status.includes("ไม่ผ่าน")).length}
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg text-white text-2xl">
              ✕
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Filters */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ค้นหา
            </label>
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้เดินทาง, รหัส..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              สถานะผลตรวจ
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>ทั้งหมด</option>
              <option>ปกติ</option>
              <option>ต้องติดตาม</option>
              <option>ไม่ผ่าน</option>
            </select>
          </div>
        </div>
      </ComponentCard>

      {/* Health Check Records */}
      <div className="grid gap-4">
        {filteredData.map((check) => (
          <ComponentCard key={check.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {check.pilgrimName}
                      </h3>
                      <Badge variant={check.statusColor} size="sm">
                        {check.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      รหัส: {check.pilgrimId} | ผลตรวจ: {check.id}
                    </p>
                  </div>
                </div>

                {/* Vital Signs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ความดัน</p>
                    <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                      {check.bloodPressure}
                    </p>
                    <p className="text-xs text-gray-500">mmHg</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">น้ำตาล</p>
                    <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                      {check.bloodSugar}
                    </p>
                    <p className="text-xs text-gray-500">mg/dL</p>
                  </div>
                  <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">BMI</p>
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400">
                      {check.bmi}
                    </p>
                    <p className="text-xs text-gray-500">kg/m²</p>
                  </div>
                  <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ชีพจร</p>
                    <p className="text-lg font-semibold text-orange-600 dark:text-orange-400">
                      {check.heartRate}
                    </p>
                    <p className="text-xs text-gray-500">bpm</p>
                  </div>
                </div>

                {/* Notes */}
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">หมายเหตุแพทย์</p>
                  <p className="text-sm text-gray-800 dark:text-white">{check.notes}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    โดย {check.doctor} | {check.checkDate}
                  </p>
                </div>
              </div>

              {/* Right Section - Actions */}
              <div className="flex flex-col gap-2 lg:min-w-[150px]">
                <Button size="sm" variant="outline">
                  ดูรายละเอียด
                </Button>
                <Button size="sm" variant="outline">
                  พิมพ์รายงาน
                </Button>
                {check.nextCheckup !== "-" && (
                  <div className="mt-2 p-2 bg-yellow-50 dark:bg-yellow-500/10 rounded">
                    <p className="text-xs text-gray-600 dark:text-gray-400">นัดตรวจครั้งต่อไป</p>
                    <p className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                      {check.nextCheckup}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {filteredData.length === 0 && (
        <ComponentCard>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              ไม่พบข้อมูลการตรวจสุขภาพ
            </p>
          </div>
        </ComponentCard>
      )}
    </div>
  );
}
