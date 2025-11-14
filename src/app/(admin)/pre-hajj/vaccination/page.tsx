"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  SyringeIcon,
  CalendarDaysIcon,
  FileTextIcon,
} from "@/components/icons/HealthIcons";

// Fake Data
const FAKE_VACCINATIONS = [
  {
    id: "V001",
    pilgrimId: "P001",
    pilgrimName: "นายสมชาย ใจดี",
    vaccineName: "วัคซีนไข้หวัดใหญ่ (Influenza)",
    vaccineDate: "2024-11-01",
    nextDose: "-",
    doseNumber: "1/1",
    vaccineLocation: "โรงพยาบาลรามาธิบดี",
    vaccinator: "พย.สมหวัง ดีใจ",
    batchNumber: "INF-2024-001",
    expiryDate: "2025-10-31",
    status: "สำเร็จ",
    statusColor: "success" as const,
    sideEffects: "ไม่มี",
  },
  {
    id: "V002",
    pilgrimId: "P001",
    pilgrimName: "นายสมชาย ใจดี",
    vaccineName: "วัคซีนไข้เหลือง (Yellow Fever)",
    vaccineDate: "2024-11-05",
    nextDose: "-",
    doseNumber: "1/1",
    vaccineLocation: "โรงพยาบาลรามาธิบดี",
    vaccinator: "พย.สมหวัง ดีใจ",
    batchNumber: "YF-2024-002",
    expiryDate: "2025-11-04",
    status: "สำเร็จ",
    statusColor: "success" as const,
    sideEffects: "ปวดเมื่อยเล็กน้อย",
  },
  {
    id: "V003",
    pilgrimId: "P002",
    pilgrimName: "นางสาวสมหญิง รักดี",
    vaccineName: "วัคซีนไข้หวัดใหญ่ (Influenza)",
    vaccineDate: "2024-11-03",
    nextDose: "-",
    doseNumber: "1/1",
    vaccineLocation: "โรงพยาบาลจุฬาลงกรณ์",
    vaccinator: "พย.วิภา ใจดี",
    batchNumber: "INF-2024-003",
    expiryDate: "2025-10-31",
    status: "สำเร็จ",
    statusColor: "success" as const,
    sideEffects: "ไม่มี",
  },
  {
    id: "V004",
    pilgrimId: "P003",
    pilgrimName: "นายประยุทธ มั่นคง",
    vaccineName: "วัคซีนไข้หวัดใหญ่ (Influenza)",
    vaccineDate: "2024-11-15",
    nextDose: "-",
    doseNumber: "1/1",
    vaccineLocation: "โรงพยาบาลศิริราช",
    vaccinator: "พย.สมศรี สุขใจ",
    batchNumber: "INF-2024-004",
    expiryDate: "2025-10-31",
    status: "กำหนดการ",
    statusColor: "info" as const,
    sideEffects: "-",
  },
  {
    id: "V005",
    pilgrimId: "P003",
    pilgrimName: "นายประยุทธ มั่นคง",
    vaccineName: "วัคซีนไข้เหลือง (Yellow Fever)",
    vaccineDate: "2024-11-20",
    nextDose: "-",
    doseNumber: "1/1",
    vaccineLocation: "โรงพยาบาลศิริราช",
    vaccinator: "พย.สมศรี สุขใจ",
    batchNumber: "YF-2024-005",
    expiryDate: "2025-11-19",
    status: "กำหนดการ",
    statusColor: "info" as const,
    sideEffects: "-",
  },
];

const VACCINE_REQUIREMENTS = [
  {
    name: "วัคซีนไข้หวัดใหญ่ (Influenza)",
    required: true,
    doses: 1,
    description: "ป้องกันไข้หวัดใหญ่ระหว่างเดินทาง",
    priority: "สูง",
  },
  {
    name: "วัคซีนไข้เหลือง (Yellow Fever)",
    required: true,
    doses: 1,
    description: "จำเป็นสำหรับการเดินทางไปประเทศซาอุดีอาระเบีย",
    priority: "สูง",
  },
  {
    name: "วัคซีนไข้หัดหรือ MMR",
    required: true,
    doses: 1,
    description: "ป้องกันโรคไข้หัด",
    priority: "กลาง",
  },
  {
    name: "วัคซีนไข้กาฬหลัง (Meningococcal)",
    required: true,
    doses: 1,
    description: "จำเป็นตามกฎของซาอุดีอาระเบีย",
    priority: "สูง",
  },
];

export default function VaccinationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");
  const [selectedVaccine, setSelectedVaccine] = useState("ทั้งหมด");

  const filteredData = FAKE_VACCINATIONS.filter((vac) => {
    const matchSearch =
      vac.pilgrimName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vac.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vac.vaccineName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = selectedStatus === "ทั้งหมด" || vac.status === selectedStatus;
    const matchVaccine = selectedVaccine === "ทั้งหมด" || vac.vaccineName.includes(selectedVaccine);

    return matchSearch && matchStatus && matchVaccine;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            การฉีดวัคซีนก่อนเดินทาง
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            จัดการและติดตามการฉีดวัคซีนของผู้เดินทาง
          </p>
        </div>
        <Button size="sm">
          + บันทึกการฉีดวัคซีน
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ฉีดครบแล้ว</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {FAKE_VACCINATIONS.filter(v => v.status === "สำเร็จ").length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white text-2xl">
              <SyringeIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">มีกำหนดการ</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {FAKE_VACCINATIONS.filter(v => v.status === "กำหนดการ").length}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg text-white text-2xl">
              <CalendarDaysIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/10 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">วัคซีนทั้งหมด</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {VACCINE_REQUIREMENTS.length}
              </p>
            </div>
            <div className="p-3 bg-purple-500 rounded-lg text-white text-2xl">
              <FileTextIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>
      </div>

      {/* Vaccine Requirements */}
      <ComponentCard>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          วัคซีนที่ต้องการก่อนเดินทาง
        </h3>
        <div className="grid gap-3">
          {VACCINE_REQUIREMENTS.map((vac, idx) => (
            <div
              key={idx}
              className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50"
            >
              <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                <SyringeIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {vac.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {vac.description}
                    </p>
                  </div>
                  <Badge
                    variant={vac.priority === "สูง" ? "error" : "warning"}
                    size="sm"
                  >
                    {vac.priority}
                  </Badge>
                </div>
                <div className="flex gap-4 mt-2 text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    จำนวนโดส: {vac.doses}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {vac.required ? "• บังคับ" : "• ไม่บังคับ"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentCard>

      {/* Filters */}
      <ComponentCard>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ค้นหา
            </label>
            <input
              type="text"
              placeholder="ค้นหาชื่อผู้เดินทาง, วัคซีน..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              ประเภทวัคซีน
            </label>
            <select
              value={selectedVaccine}
              onChange={(e) => setSelectedVaccine(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>ทั้งหมด</option>
              <option>ไข้หวัดใหญ่</option>
              <option>ไข้เหลือง</option>
              <option>ไข้หัด</option>
              <option>ไข้กาฬหลัง</option>
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
              <option>สำเร็จ</option>
              <option>กำหนดการ</option>
              <option>ยกเลิก</option>
            </select>
          </div>
        </div>
      </ComponentCard>

      {/* Vaccination Records */}
      <div className="grid gap-4">
        {filteredData.map((vac) => (
          <ComponentCard key={vac.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Section */}
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {vac.pilgrimName}
                      </h3>
                      <Badge variant={vac.statusColor} size="sm">
                        {vac.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {vac.vaccineName}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">วันที่ฉีด</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {vac.vaccineDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">จำนวนโดส</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {vac.doseNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Batch Number</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {vac.batchNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">วันหมดอายุ</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {vac.expiryDate}
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">สถานที่: </span>
                      <span className="text-gray-800 dark:text-white">{vac.vaccineLocation}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">ผู้ฉีด: </span>
                      <span className="text-gray-800 dark:text-white">{vac.vaccinator}</span>
                    </div>
                    <div className="md:col-span-2">
                      <span className="text-gray-600 dark:text-gray-400">ผลข้างเคียง: </span>
                      <span className="text-gray-800 dark:text-white">{vac.sideEffects}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col gap-2 lg:min-w-[150px]">
                <Button size="sm" variant="outline">
                  ดูรายละเอียด
                </Button>
                <Button size="sm" variant="outline">
                  พิมพ์ใบรับรอง
                </Button>
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {filteredData.length === 0 && (
        <ComponentCard>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              ไม่พบข้อมูลการฉีดวัคซีน
            </p>
          </div>
        </ComponentCard>
      )}
    </div>
  );
}
