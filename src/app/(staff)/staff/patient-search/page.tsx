"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  SearchIcon,
  ClipboardIcon,
  LightbulbIcon,
  XCircleIcon,
  ArrowRightIcon,
} from "@/components/icons/HealthIcons";

// Fake Data - รายชื่อผู้เดินทางทั้งหมด
const FAKE_PILGRIMS = [
  {
    id: "P001",
    cid: "1234567890123",
    fullName: "นายสมชาย ใจดี",
    age: 48,
    gender: "ชาย",
    province: "กรุงเทพมหานคร",
    phone: "081-234-5678",
    group: "กลุ่ม A - 2025",
    status: "กำลังดำเนินการ",
    statusColor: "warning" as const,
    completeness: {
      generalInfo: 100,
      training: 80,
      healthCheck: 50, // 2/4 ครั้ง
      vaccination: 75,
    },
  },
  {
    id: "P002",
    cid: "9876543210987",
    fullName: "นางสาวสมหญิง รักดี",
    age: 43,
    gender: "หญิง",
    province: "เชียงใหม่",
    phone: "082-345-6789",
    group: "กลุ่ม B - 2025",
    status: "ข้อมูลครบถ้วน",
    statusColor: "success" as const,
    completeness: {
      generalInfo: 100,
      training: 100,
      healthCheck: 100, // 4/4 ครั้ง
      vaccination: 100,
    },
  },
  {
    id: "P003",
    cid: "1122334455667",
    fullName: "นายอับดุลเลาะ หะยีสาแม",
    age: 55,
    gender: "ชาย",
    province: "ปัตตานี",
    phone: "083-456-7890",
    group: "กลุ่ม C - 2025",
    status: "เริ่มต้น",
    statusColor: "danger" as const,
    completeness: {
      generalInfo: 60,
      training: 20,
      healthCheck: 0, // 0/4 ครั้ง
      vaccination: 25,
    },
  },
  {
    id: "P004",
    cid: "5544332211098",
    fullName: "นางฟาติมะห์ มะยิ",
    age: 50,
    gender: "หญิง",
    province: "ยะลา",
    phone: "084-567-8901",
    group: "กลุ่ม A - 2025",
    status: "กำลังดำเนินการ",
    statusColor: "warning" as const,
    completeness: {
      generalInfo: 100,
      training: 60,
      healthCheck: 25, // 1/4 ครั้ง
      vaccination: 50,
    },
  },
  {
    id: "P005",
    cid: "6677889900112",
    fullName: "นายมูฮัมหมัด อาลี",
    age: 62,
    gender: "ชาย",
    province: "นราธิวาส",
    phone: "085-678-9012",
    group: "กลุ่ม B - 2025",
    status: "กำลังดำเนินการ",
    statusColor: "warning" as const,
    completeness: {
      generalInfo: 100,
      training: 100,
      healthCheck: 75, // 3/4 ครั้ง
      vaccination: 100,
    },
  },
];

export default function PatientSearchPage() {
  const router = useRouter();
  const [searchType, setSearchType] = useState<"cid" | "list">("cid");
  const [cidInput, setCidInput] = useState("");
  const [searchResult, setSearchResult] = useState<typeof FAKE_PILGRIMS[0] | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [listFilter, setListFilter] = useState("");

  // ค้นหาจาก CID
  const handleSearchByCID = () => {
    setNotFound(false);
    setSearchResult(null);

    const found = FAKE_PILGRIMS.find((p) => p.cid === cidInput);
    if (found) {
      setSearchResult(found);
    } else {
      setNotFound(true);
    }
  };

  // กรองรายชื่อ
  const filteredPilgrims = FAKE_PILGRIMS.filter((p) => {
    const searchLower = listFilter.toLowerCase();
    return (
      p.fullName.toLowerCase().includes(searchLower) ||
      p.cid.includes(searchLower) ||
      p.id.toLowerCase().includes(searchLower) ||
      p.province.toLowerCase().includes(searchLower)
    );
  });

  // ไปหน้า Patient Profile
  const goToPatientProfile = (pilgrimId: string) => {
    router.push(`/staff/patient-profile/${pilgrimId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          ค้นหาผู้เดินทาง
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ค้นหาจากเลขบัตรประชาชน หรือเลือกจากรายชื่อทะเบียน
        </p>
      </div>

      {/* Search Type Selector */}
      <ComponentCard>
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => {
              setSearchType("cid");
              setSearchResult(null);
              setNotFound(false);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              searchType === "cid"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <SearchIcon size={20} />
            ค้นหาจากเลขบัตรประชาชน
          </button>
          <button
            onClick={() => {
              setSearchType("list");
              setSearchResult(null);
              setNotFound(false);
            }}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
              searchType === "list"
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
            }`}
          >
            <ClipboardIcon size={20} />
            เลือกจากรายชื่อทะเบียน
          </button>
        </div>

        {/* Search by CID */}
        {searchType === "cid" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                เลขบัตรประชาชน (13 หลัก)
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="กรอกเลขบัตรประชาชน"
                  value={cidInput}
                  onChange={(e) => {
                    setCidInput(e.target.value);
                    setNotFound(false);
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSearchByCID()}
                  maxLength={13}
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <Button onClick={handleSearchByCID} className="px-8">
                  ค้นหา
                </Button>
              </div>
            </div>

            {/* Search Result */}
            {searchResult && (
              <div className="mt-6 p-6 bg-green-50 dark:bg-green-500/10 border-2 border-green-500 rounded-lg">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                      {searchResult.fullName}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {searchResult.cid} | {searchResult.age} ปี | {searchResult.gender}
                    </p>
                  </div>
                  <Badge variant="solid" color={searchResult.statusColor}>
                    {searchResult.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ข้อมูลทั่วไป</p>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {searchResult.completeness.generalInfo}%
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">การอบรม</p>
                    <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                      {searchResult.completeness.training}%
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ตรวจสุขภาพ</p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      {searchResult.completeness.healthCheck}%
                    </p>
                  </div>
                  <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">วัคซีน</p>
                    <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                      {searchResult.completeness.vaccination}%
                    </p>
                  </div>
                </div>

                <Button onClick={() => goToPatientProfile(searchResult.id)} className="w-full flex items-center justify-center gap-2">
                  เข้าสู่หน้าดูแลสุขภาพก่อนไป
                  <ArrowRightIcon size={18} />
                </Button>
              </div>
            )}

            {/* Not Found */}
            {notFound && (
              <div className="mt-6 p-6 bg-red-50 dark:bg-red-500/10 border-2 border-red-500 rounded-lg">
                <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-semibold mb-2">
                  <XCircleIcon size={24} />
                  ไม่พบข้อมูลผู้เดินทางในระบบ
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  กรุณาตรวจสอบเลขบัตรประชาชนอีกครั้ง
                </p>
              </div>
            )}
          </div>
        )}

        {/* Search from List */}
        {searchType === "list" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ค้นหาจากรายชื่อ
              </label>
              <input
                type="text"
                placeholder="ค้นหาชื่อ, เลขบัตร, จังหวัด..."
                value={listFilter}
                onChange={(e) => setListFilter(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {FAKE_PILGRIMS.length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ทั้งหมด</p>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {FAKE_PILGRIMS.filter((p) => p.status === "ข้อมูลครบถ้วน").length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ครบถ้วน</p>
              </div>
              <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg text-center">
                <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {FAKE_PILGRIMS.filter((p) => p.status === "กำลังดำเนินการ").length}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">ดำเนินการ</p>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredPilgrims.map((pilgrim) => (
                <div
                  key={pilgrim.id}
                  className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-blue-500"
                  onClick={() => goToPatientProfile(pilgrim.id)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {pilgrim.fullName}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {pilgrim.cid} | {pilgrim.age} ปี | {pilgrim.province}
                      </p>
                    </div>
                    <Badge variant="solid" color={pilgrim.statusColor} size="sm">
                      {pilgrim.status}
                    </Badge>
                  </div>

                  {/* Progress Bars */}
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">ทั่วไป</p>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${pilgrim.completeness.generalInfo}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">อบรม</p>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500"
                          style={{ width: `${pilgrim.completeness.training}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">สุขภาพ</p>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-green-500"
                          style={{ width: `${pilgrim.completeness.healthCheck}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">วัคซีน</p>
                      <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: `${pilgrim.completeness.vaccination}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPilgrims.length === 0 && (
              <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                ไม่พบข้อมูลผู้เดินทาง
              </div>
            )}
          </div>
        )}
      </ComponentCard>

      {/* Help Card */}
      <ComponentCard className="bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-400 mb-3">
          <LightbulbIcon size={20} />
          คำแนะนำ
        </div>
        <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
          <li>• ค้นหาด้วยเลขบัตรประชาชน 13 หลัก เพื่อเข้าถึงข้อมูลผู้เดินทางโดยตรง</li>
          <li>• เลือกจากรายชื่อทะเบียน สำหรับการดูรายชื่อทั้งหมดและเลือกผู้เดินทาง</li>
          <li>• คลิกที่ผู้เดินทาง เพื่อเข้าสู่หน้าดูแลสุขภาพก่อนไป</li>
        </ul>
      </ComponentCard>
    </div>
  );
}
