"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  UsersIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from "@/components/icons/HealthIcons";

// Fake Data
const FAKE_PILGRIMS = [
  {
    id: "P001",
    citizenId: "1234567890123",
    fullName: "นายสมชาย ใจดี",
    birthDate: "1975-05-15",
    age: 48,
    province: "กรุงเทพมหานคร",
    hajjGroup: "กลุ่ม A - 2025",
    status: "รอตรวจสุขภาพ",
    statusColor: "warning" as const,
    phone: "081-234-5678",
    email: "somchai@email.com",
    registrationDate: "2024-11-01",
    diseases: ["เบาหวาน", "ความดันโลหิตสูง"],
  },
  {
    id: "P002",
    citizenId: "9876543210987",
    fullName: "นางสาวสมหญิง รักดี",
    birthDate: "1980-08-20",
    age: 43,
    province: "เชียงใหม่",
    hajjGroup: "กลุ่ม B - 2025",
    status: "ผ่านการตรวจสุขภาพ",
    statusColor: "success" as const,
    phone: "082-345-6789",
    email: "somying@email.com",
    registrationDate: "2024-11-05",
    diseases: [],
  },
  {
    id: "P003",
    citizenId: "5555666677778",
    fullName: "นายประยุทธ มั่นคง",
    birthDate: "1970-12-10",
    age: 53,
    province: "ขอนแก่น",
    hajjGroup: "กลุ่ม A - 2025",
    status: "รอฉีดวัคซีน",
    statusColor: "info" as const,
    phone: "089-456-7890",
    email: "prayut@email.com",
    registrationDate: "2024-10-28",
    diseases: ["โรคหัวใจ"],
  },
  {
    id: "P004",
    citizenId: "1111222233334",
    fullName: "นางวิภา สุขสันต์",
    birthDate: "1978-03-25",
    age: 45,
    province: "สงขลา",
    hajjGroup: "กลุ่ม C - 2025",
    status: "พร้อมเดินทาง",
    statusColor: "success" as const,
    phone: "090-567-8901",
    email: "wipa@email.com",
    registrationDate: "2024-10-15",
    diseases: [],
  },
  {
    id: "P005",
    citizenId: "4444555566667",
    fullName: "นายอนุชา กล้าหาญ",
    birthDate: "1968-07-30",
    age: 55,
    province: "นครราชสีมา",
    hajjGroup: "กลุ่ม B - 2025",
    status: "ยกเลิก",
    statusColor: "error" as const,
    phone: "091-678-9012",
    email: "anucha@email.com",
    registrationDate: "2024-09-20",
    diseases: ["หอบหืด"],
  },
];

export default function PilgrimsListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("ทั้งหมด");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");

  // Filter data
  const filteredData = FAKE_PILGRIMS.filter((pilgrim) => {
    const matchSearch =
      pilgrim.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pilgrim.citizenId.includes(searchTerm) ||
      pilgrim.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchGroup = selectedGroup === "ทั้งหมด" || pilgrim.hajjGroup.includes(selectedGroup);
    const matchStatus = selectedStatus === "ทั้งหมด" || pilgrim.status === selectedStatus;

    return matchSearch && matchGroup && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            รายชื่อผู้เดินทางไปประกอบพิธีฮัจญ์
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            จัดการและติดตามข้อมูลผู้เดินทางทั้งหมด
          </p>
        </div>
        <Button size="sm">
          + เพิ่มผู้เดินทาง
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ComponentCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ผู้เดินทางทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{FAKE_PILGRIMS.length}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg text-white">
              <UsersIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">พร้อมเดินทาง</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {FAKE_PILGRIMS.filter(p => p.status === "พร้อมเดินทาง").length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white">
              <CheckCircle2Icon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-600/10 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">รอดำเนินการ</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {FAKE_PILGRIMS.filter(p => p.status.includes("รอ")).length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg text-white">
              <ClockIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-600/10 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ยกเลิก</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">
                {FAKE_PILGRIMS.filter(p => p.status === "ยกเลิก").length}
              </p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg text-white">
              <XCircleIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Filters */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ค้นหา
            </label>
            <input
              type="text"
              placeholder="ค้นหาชื่อ, เลขบัตร, รหัสผู้เดินทาง..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              กลุ่มฮัจญ์
            </label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>ทั้งหมด</option>
              <option>กลุ่ม A</option>
              <option>กลุ่ม B</option>
              <option>กลุ่ม C</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              สถานะ
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>ทั้งหมด</option>
              <option>รอตรวจสุขภาพ</option>
              <option>ผ่านการตรวจสุขภาพ</option>
              <option>รอฉีดวัคซีน</option>
              <option>พร้อมเดินทาง</option>
              <option>ยกเลิก</option>
            </select>
          </div>
        </div>
      </ComponentCard>

      {/* Table */}
      <ComponentCard>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  รหัส
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  ชื่อ-สกุล
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  อายุ
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  จังหวัด
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  กลุ่มฮัจญ์
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  สถานะ
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300">
                  โรคประจำตัว
                </th>
                <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((pilgrim) => (
                <tr
                  key={pilgrim.id}
                  className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white font-medium">
                    {pilgrim.id}
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {pilgrim.fullName}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {pilgrim.phone}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {pilgrim.age} ปี
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {pilgrim.province}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600 dark:text-gray-400">
                    {pilgrim.hajjGroup}
                  </td>
                  <td className="px-4 py-4">
                    <Badge color={pilgrim.statusColor} variant="solid" size="sm">
                      {pilgrim.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    {pilgrim.diseases.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {pilgrim.diseases.map((disease, idx) => (
                          <Badge key={idx} variant="warning" size="sm">
                            {disease}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 text-sm">
                        ดูข้อมูล
                      </button>
                      <button className="text-green-600 hover:text-green-700 dark:text-green-400 text-sm">
                        แก้ไข
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Results */}
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              ไม่พบข้อมูลผู้เดินทาง
            </p>
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            แสดง {filteredData.length} จาก {FAKE_PILGRIMS.length} รายการ
          </p>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm">
              ก่อนหน้า
            </button>
            <button className="px-3 py-1 rounded bg-blue-500 text-white text-sm">
              1
            </button>
            <button className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm">
              ถัดไป
            </button>
          </div>
        </div>
      </ComponentCard>
    </div>
  );
}
