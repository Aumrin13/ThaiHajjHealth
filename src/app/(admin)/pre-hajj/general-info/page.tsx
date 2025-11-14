"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  FileTextIcon,
  PhoneIcon,
  MailIcon,
  XCircleIcon,
} from "@/components/icons/HealthIcons";

// Fake Data
const FAKE_GENERAL_INFO = [
  {
    id: "P001",
    citizenId: "1234567890123",
    fullName: "นายสมชาย ใจดี",
    nameEn: "Mr. Somchai Jaidee",
    birthDate: "1975-05-15",
    age: 48,
    gender: "ชาย",
    bloodType: "O",
    nationality: "ไทย",
    religion: "อิสลาม",
    address: {
      houseNo: "123/45",
      moo: "5",
      soi: "รามคำแหง 24",
      road: "รามคำแหง",
      subDistrict: "หัวหมาก",
      district: "บางกะปิ",
      province: "กรุงเทพมหานคร",
      postalCode: "10240",
    },
    contact: {
      phone: "081-234-5678",
      email: "somchai@email.com",
      lineId: "somchai_j",
    },
    emergencyContact: {
      name: "นางสมใจ ใจดี",
      relation: "ภรรยา",
      phone: "082-345-6789",
    },
    passport: {
      number: "AB1234567",
      issueDate: "2023-01-15",
      expiryDate: "2033-01-14",
      issuePlace: "กรุงเทพมหานคร",
    },
    hajjInfo: {
      group: "กลุ่ม A - 2025",
      packageType: "Premium",
      departureDate: "2025-06-01",
      returnDate: "2025-06-25",
      airline: "สายการบินซาอุดีอาระเบีย",
    },
    status: "ครบถ้วน",
    statusColor: "success" as const,
    completeness: 100,
    lastUpdate: "2024-11-10",
  },
  {
    id: "P002",
    citizenId: "9876543210987",
    fullName: "นางสาวสมหญิง รักดี",
    nameEn: "Miss Somying Rakdee",
    birthDate: "1980-08-20",
    age: 43,
    gender: "หญิง",
    bloodType: "A",
    nationality: "ไทย",
    religion: "อิสลาม",
    address: {
      houseNo: "456",
      moo: "3",
      soi: "ดอยสะเก็ด",
      road: "เชียงใหม่-ลำพูน",
      subDistrict: "ท่าศาลา",
      district: "เมือง",
      province: "เชียงใหม่",
      postalCode: "50000",
    },
    contact: {
      phone: "082-345-6789",
      email: "somying@email.com",
      lineId: "somying_r",
    },
    emergencyContact: {
      name: "นายสมศักดิ์ รักดี",
      relation: "พี่ชาย",
      phone: "083-456-7890",
    },
    passport: {
      number: "CD9876543",
      issueDate: "2022-06-20",
      expiryDate: "2032-06-19",
      issuePlace: "เชียงใหม่",
    },
    hajjInfo: {
      group: "กลุ่ม B - 2025",
      packageType: "Standard",
      departureDate: "2025-06-05",
      returnDate: "2025-06-28",
      airline: "สายการบินไทย",
    },
    status: "ไม่ครบ",
    statusColor: "warning" as const,
    completeness: 75,
    lastUpdate: "2024-11-08",
  },
];

export default function GeneralInfoPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");
  const [selectedPilgrim, setSelectedPilgrim] = useState<typeof FAKE_GENERAL_INFO[0] | null>(null);

  const filteredData = FAKE_GENERAL_INFO.filter((info) => {
    const matchSearch =
      info.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      info.citizenId.includes(searchTerm) ||
      info.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchStatus = selectedStatus === "ทั้งหมด" || info.status === selectedStatus;

    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            ตรวจสอบข้อมูลทั่วไปผู้เดินทาง
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ตรวจสอบความครบถ้วนของข้อมูลส่วนบุคคลและเอกสาร
          </p>
        </div>
        <Button size="sm">
          + เพิ่มข้อมูล
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ข้อมูลครบถ้วน</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {FAKE_GENERAL_INFO.filter(i => i.status === "ครบถ้วน").length}
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white text-2xl">
              <CheckCircle2Icon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-500/10 dark:to-yellow-600/10 border-yellow-200 dark:border-yellow-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ข้อมูลไม่ครบ</p>
              <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {FAKE_GENERAL_INFO.filter(i => i.status === "ไม่ครบ").length}
              </p>
            </div>
            <div className="p-3 bg-yellow-500 rounded-lg text-white text-2xl">
              <AlertCircleIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {FAKE_GENERAL_INFO.length}
              </p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg text-white text-2xl">
              <FileTextIcon className="w-6 h-6" />
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
              placeholder="ค้นหาชื่อ, เลขบัตรประชาชน, รหัส..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              สถานะข้อมูล
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
              <option>ทั้งหมด</option>
              <option>ครบถ้วน</option>
              <option>ไม่ครบ</option>
            </select>
          </div>
        </div>
      </ComponentCard>

      {/* Pilgrims List */}
      <div className="grid gap-4">
        {filteredData.map((info) => (
          <ComponentCard key={info.id} className="hover:shadow-lg transition-shadow">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Left Section */}
              <div className="flex-1 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {info.fullName}
                      </h3>
                      <Badge variant="solid" color={info.statusColor} size="sm">
                        {info.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {info.nameEn} | {info.citizenId}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500 dark:text-gray-400">ความครบถ้วน</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {info.completeness}%
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${
                        info.completeness === 100
                          ? "bg-green-500"
                          : info.completeness >= 75
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{ width: `${info.completeness}%` }}
                    />
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">อายุ</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {info.age} ปี
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">เพศ</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {info.gender}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">หมู่เลือด</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {info.bloodType}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">จังหวัด</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {info.address.province}
                    </p>
                  </div>
                </div>

                {/* Contact & Passport */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">ข้อมูลติดต่อ</p>
                    <p className="text-sm text-gray-800 dark:text-white">
                      <PhoneIcon className="inline w-4 h-4 mr-2 align-text-bottom" /> {info.contact.phone}
                    </p>
                    <p className="text-sm text-gray-800 dark:text-white">
                      <MailIcon className="inline w-4 h-4 mr-2 align-text-bottom" /> {info.contact.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">พาสปอร์ต</p>
                    <p className="text-sm text-gray-800 dark:text-white">
                      {info.passport.number}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      หมดอายุ: {info.passport.expiryDate}
                    </p>
                  </div>
                </div>

                {/* Hajj Info */}
                <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">ข้อมูลการเดินทาง</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">กลุ่ม: </span>
                      <span className="text-gray-800 dark:text-white">{info.hajjInfo.group}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">แพ็คเกจ: </span>
                      <span className="text-gray-800 dark:text-white">{info.hajjInfo.packageType}</span>
                    </div>
                    <div>
                      <span className="text-gray-600 dark:text-gray-400">สายการบิน: </span>
                      <span className="text-gray-800 dark:text-white">{info.hajjInfo.airline}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex flex-col gap-2 lg:min-w-[180px]">
                <Button 
                  size="sm" 
                  onClick={() => setSelectedPilgrim(info)}
                >
                  ดูรายละเอียดเต็ม
                </Button>
                <Button size="sm" variant="outline">
                  แก้ไขข้อมูล
                </Button>
                <Button size="sm" variant="outline">
                  พิมพ์เอกสาร
                </Button>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  อัปเดตล่าสุด: {info.lastUpdate}
                </div>
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {filteredData.length === 0 && (
        <ComponentCard>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              ไม่พบข้อมูลผู้เดินทาง
            </p>
          </div>
        </ComponentCard>
      )}

      {/* Detail Modal */}
      {selectedPilgrim && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedPilgrim.fullName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selectedPilgrim.nameEn}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPilgrim(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              {/* Complete Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">ข้อมูลส่วนตัว</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600 dark:text-gray-400">เลขบัตร:</span> {selectedPilgrim.citizenId}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">วันเกิด:</span> {selectedPilgrim.birthDate}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">อายุ:</span> {selectedPilgrim.age} ปี</div>
                    <div><span className="text-gray-600 dark:text-gray-400">เพศ:</span> {selectedPilgrim.gender}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">หมู่เลือด:</span> {selectedPilgrim.bloodType}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">ศาสนา:</span> {selectedPilgrim.religion}</div>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">ที่อยู่</h3>
                  <div className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedPilgrim.address.houseNo} หมู่ {selectedPilgrim.address.moo}<br />
                    ซอย{selectedPilgrim.address.soi} ถนน{selectedPilgrim.address.road}<br />
                    ตำบล{selectedPilgrim.address.subDistrict} อำเภอ{selectedPilgrim.address.district}<br />
                    จังหวัด{selectedPilgrim.address.province} {selectedPilgrim.address.postalCode}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">ผู้ติดต่อฉุกเฉิน</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600 dark:text-gray-400">ชื่อ:</span> {selectedPilgrim.emergencyContact.name}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">ความสัมพันธ์:</span> {selectedPilgrim.emergencyContact.relation}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">เบอร์โทร:</span> {selectedPilgrim.emergencyContact.phone}</div>
                  </div>
                </div>

                {/* Passport Info */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-800 dark:text-white">ข้อมูลพาสปอร์ต</h3>
                  <div className="space-y-2 text-sm">
                    <div><span className="text-gray-600 dark:text-gray-400">เลขที่:</span> {selectedPilgrim.passport.number}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">วันออก:</span> {selectedPilgrim.passport.issueDate}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">วันหมดอายุ:</span> {selectedPilgrim.passport.expiryDate}</div>
                    <div><span className="text-gray-600 dark:text-gray-400">สถานที่ออก:</span> {selectedPilgrim.passport.issuePlace}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" onClick={() => setSelectedPilgrim(null)}>
                  ปิด
                </Button>
                <Button size="sm">
                  แก้ไขข้อมูล
                </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}
