"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  ClipboardIcon,
  GraduationCapIcon,
  StethoscopeIcon,
  SyringeIcon,
  EditIcon,
  SaveIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  ClockIcon,
  LightbulbIcon,
  CheckCircle2Icon,
  XCircleIcon,
  AlertCircleIcon,
} from "@/components/icons/HealthIcons";

// Types
interface PatientData {
  id: string;
  cid: string;
  fullName: string;
  nameEn: string;
  birthDate: string;
  age: number;
  gender: string;
  bloodType: string;
  religion: string;
  address: {
    houseNo: string;
    moo: string;
    soi: string;
    road: string;
    subDistrict: string;
    district: string;
    province: string;
    postalCode: string;
  };
  contact: {
    phone: string;
    email: string;
    lineId: string;
  };
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  passport: {
    number: string;
    issueDate: string;
    expiryDate: string;
    issuePlace: string;
  };
  hajjInfo: {
    group: string;
    packageType: string;
    departureDate: string;
    returnDate: string;
    airline: string;
  };
  [key: string]: unknown;
}

// Fake Data - ข้อมูลผู้เดินทาง
const PATIENT_DATA: Record<string, PatientData> = {
  P001: {
    id: "P001",
    cid: "1234567890123",
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
  },
};

type TabType = "general" | "training" | "health" | "vaccination";

export default function PatientProfilePage() {
  const params = useParams();
  const patientId = params.id as string;
  const patient = PATIENT_DATA[patientId];

  const [activeTab, setActiveTab] = useState<TabType>("general");

  if (!patient) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ไม่พบข้อมูลผู้เดินทาง
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Patient ID: {patientId}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Patient Header */}
      <ComponentCard className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-500/10 dark:to-purple-500/10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {patient.fullName.charAt(3)}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {patient.fullName}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {patient.nameEn} | {patient.cid}
              </p>
              <div className="flex gap-2 mt-2">
                <Badge variant="solid" color="primary" size="sm">
                  {patient.age} ปี
                </Badge>
                <Badge variant="solid" color="info" size="sm">
                  {patient.gender}
                </Badge>
                <Badge variant="solid" color="success" size="sm">
                  หมู่เลือด {patient.bloodType}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 dark:text-gray-400">กลุ่มเดินทาง</p>
            <p className="font-semibold text-gray-800 dark:text-white">
              {patient.hajjInfo.group}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {patient.hajjInfo.departureDate}
            </p>
          </div>
        </div>
      </ComponentCard>

      {/* Tabs Navigation */}
      <div className="flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === "general"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <ClipboardIcon size={18} />
          ข้อมูลทั่วไป
        </button>
        <button
          onClick={() => setActiveTab("training")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === "training"
              ? "bg-purple-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <GraduationCapIcon size={18} />
          การอบรม
        </button>
        <button
          onClick={() => setActiveTab("health")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === "health"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <StethoscopeIcon size={18} />
          การตรวจสุขภาพ (4 ครั้ง)
        </button>
        <button
          onClick={() => setActiveTab("vaccination")}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
            activeTab === "vaccination"
              ? "bg-yellow-600 text-white shadow-lg"
              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <SyringeIcon size={18} />
          การฉีดวัคซีน
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "general" && <GeneralInfoTab patient={patient} />}
      {activeTab === "training" && <TrainingTab />}
      {activeTab === "health" && <HealthCheckTab />}
      {activeTab === "vaccination" && <VaccinationTab />}
    </div>
  );
}

// Tab: ข้อมูลทั่วไป
function GeneralInfoTab({ patient }: { patient: PatientData }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          ข้อมูลทั่วไป
        </h2>
        <Button
          size="sm"
          variant={isEditing ? "primary" : "outline"}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? (
            <span className="flex items-center gap-2"><SaveIcon size={16} /> บันทึก</span>
          ) : (
            <span className="flex items-center gap-2"><EditIcon size={16} /> แก้ไข</span>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <ComponentCard>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            ข้อมูลส่วนตัว
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">เลขบัตรประชาชน:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.cid}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">วันเกิด:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.birthDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">อายุ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.age} ปี</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">เพศ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.gender}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">หมู่เลือด:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.bloodType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ศาสนา:</span>
              <span className="font-semibold text-gray-800 dark:text-white">{patient.religion}</span>
            </div>
          </div>
        </ComponentCard>

        {/* Address */}
        <ComponentCard>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">ที่อยู่</h3>
          <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {patient.address.houseNo} หมู่ {patient.address.moo}<br />
            ซอย{patient.address.soi} ถนน{patient.address.road}<br />
            ตำบล{patient.address.subDistrict} อำเภอ{patient.address.district}<br />
            จังหวัด{patient.address.province} {patient.address.postalCode}
          </div>
        </ComponentCard>

        {/* Contact */}
        <ComponentCard>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            ข้อมูลติดต่อ
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <PhoneIcon size={16} className="text-gray-500" />
              <span className="text-gray-800 dark:text-white">{patient.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon size={16} className="text-gray-500" />
              <span className="text-gray-800 dark:text-white">{patient.contact.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 dark:text-gray-400">💬</span>
              <span className="text-gray-800 dark:text-white">Line: {patient.contact.lineId}</span>
            </div>
          </div>
        </ComponentCard>

        {/* Emergency Contact */}
        <ComponentCard>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            ผู้ติดต่อฉุกเฉิน
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ชื่อ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.emergencyContact.name}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">ความสัมพันธ์:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.emergencyContact.relation}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">เบอร์โทร:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.emergencyContact.phone}
              </span>
            </div>
          </div>
        </ComponentCard>

        {/* Passport */}
        <ComponentCard>
          <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
            ข้อมูลพาสปอร์ต
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">เลขที่:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.passport.number}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">วันออก:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.passport.issueDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">วันหมดอายุ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.passport.expiryDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">สถานที่ออก:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.passport.issuePlace}
              </span>
            </div>
          </div>
        </ComponentCard>

        {/* Hajj Info */}
        <ComponentCard className="bg-purple-50 dark:bg-purple-500/10">
          <h3 className="font-semibold text-purple-800 dark:text-purple-400 mb-4">
            ข้อมูลการเดินทาง
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">กลุ่ม:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.hajjInfo.group}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">แพ็คเกจ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.hajjInfo.packageType}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">วันเดินทาง:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.hajjInfo.departureDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">วันกลับ:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.hajjInfo.returnDate}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">สายการบิน:</span>
              <span className="font-semibold text-gray-800 dark:text-white">
                {patient.hajjInfo.airline}
              </span>
            </div>
          </div>
        </ComponentCard>
      </div>
    </div>
  );
}

// Tab: การอบรม
function TrainingTab() {
  // Fake Data - หลักสูตรอบรมของผู้เดินทาง
  const TRAINING_DATA = [
    {
      id: 1,
      courseName: "การเตรียมตัวสำหรับการประกอบพิธีฮัจญ์",
      category: "พิธีกรรม",
      instructor: "อิหม่าม สมชาย อับดุลเลาะ",
      hours: 6,
      date: "2024-10-15",
      location: "มัสยิด กลาง",
      status: "ผ่าน",
      statusColor: "success" as const,
      score: 85,
      certificate: true,
      attendance: "100%",
    },
    {
      id: 2,
      courseName: "การดูแลสุขภาพระหว่างการเดินทางฮัจญ์",
      category: "สุขภาพ",
      instructor: "นพ. สมศักดิ์ ใจดี",
      hours: 4,
      date: "2024-10-20",
      location: "โรงพยาบาล สมุทรปราการ",
      status: "ผ่าน",
      statusColor: "success" as const,
      score: 90,
      certificate: true,
      attendance: "100%",
    },
    {
      id: 3,
      courseName: "กฎหมายและข้อบังคับในซาอุดีอาระเบีย",
      category: "กฎหมาย",
      instructor: "อาจารย์ อับดุล อาซิซ",
      hours: 3,
      date: "2024-11-01",
      location: "ห้องประชุม ชั้น 3",
      status: "กำลังเรียน",
      statusColor: "warning" as const,
      score: null,
      certificate: false,
      attendance: "66%",
    },
    {
      id: 4,
      courseName: "ภาษาอาหรับเบื้องต้น",
      category: "ภาษา",
      instructor: "อุสตาซ มูฮัมหมัด",
      hours: 8,
      date: "2024-11-10",
      location: "Online",
      status: "ยังไม่เริ่ม",
      statusColor: "info" as const,
      score: null,
      certificate: false,
      attendance: "0%",
    },
  ];

  const [selectedCourse, setSelectedCourse] = useState<typeof TRAINING_DATA[0] | null>(null);

  const passedCourses = TRAINING_DATA.filter((c) => c.status === "ผ่าน").length;
  const totalHours = TRAINING_DATA.reduce((sum, c) => sum + c.hours, 0);
  const completedHours = TRAINING_DATA.filter((c) => c.status === "ผ่าน").reduce(
    (sum, c) => sum + c.hours,
    0
  );

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ComponentCard className="bg-blue-50 dark:bg-blue-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {TRAINING_DATA.length}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-green-50 dark:bg-green-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">ผ่านแล้ว</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {passedCourses}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-purple-50 dark:bg-purple-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">ชั่วโมงอบรม</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {completedHours}/{totalHours}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-yellow-50 dark:bg-yellow-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">ความสำเร็จ</p>
          <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
            {Math.round((passedCourses / TRAINING_DATA.length) * 100)}%
          </p>
        </ComponentCard>
      </div>

      {/* Course List */}
      <div className="space-y-4">
        {TRAINING_DATA.map((course) => (
          <ComponentCard
            key={course.id}
            className="hover:shadow-lg transition-shadow"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {course.courseName}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="light" color="primary" size="sm">
                        {course.category}
                      </Badge>
                      <Badge variant="solid" color={course.statusColor} size="sm">
                        {course.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">วิทยากร</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {course.instructor}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">ชั่วโมง</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {course.hours} ชม.
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">วันที่อบรม</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {course.date}
                    </p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-xs text-gray-600 dark:text-gray-400">สถานที่</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {course.location}
                    </p>
                  </div>
                </div>

                {course.status === "ผ่าน" && (
                  <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">คะแนน: </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {course.score}/100
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-400">การเข้าเรียน: </span>
                        <span className="font-bold text-green-600 dark:text-green-400">
                          {course.attendance}
                        </span>
                      </div>
                      <div>
                        {course.certificate && (
                              <span className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                <CheckCircle2Icon size={16} /> มีใบรับรอง
                              </span>
                            )}
                      </div>
                    </div>
                  </div>
                )}

                {course.status === "กำลังเรียน" && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        การเข้าเรียน: {course.attendance}
                      </span>
                      <div className="flex-1 mx-4">
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-yellow-500"
                            style={{ width: course.attendance }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[150px]">
                <Button size="sm" onClick={() => setSelectedCourse(course)}>
                  รายละเอียด
                </Button>
                {course.status === "ผ่าน" && course.certificate && (
                  <Button size="sm" variant="outline">
                    พิมพ์ใบรับรอง
                  </Button>
                )}
                {course.status === "กำลังเรียน" && (
                  <Button size="sm" variant="outline">
                    บันทึกผล
                  </Button>
                )}
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {/* Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {selectedCourse.courseName}
                  </h2>
                  <Badge variant="solid" color={selectedCourse.statusColor} size="sm">
                    {selectedCourse.status}
                  </Badge>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">หมวดหมู่</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.category}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">วิทยากร</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.instructor}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ชั่วโมงอบรม</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.hours} ชั่วโมง
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">วันที่อบรม</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.date}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">สถานที่</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.location}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">การเข้าเรียน</p>
                  <p className="font-semibold text-gray-800 dark:text-white">
                    {selectedCourse.attendance}
                  </p>
                </div>
                {selectedCourse.score !== null && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">คะแนน</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedCourse.score}/100
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" onClick={() => setSelectedCourse(null)}>
                  ปิด
                </Button>
                {selectedCourse.certificate && (
                  <Button size="sm">พิมพ์ใบรับรอง</Button>
                )}
              </div>
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}

// Tab: การตรวจสุขภาพ
function HealthCheckTab() {
  // Fake Data - ผลการตรวจสุขภาพ 4 ครั้ง
  const HEALTH_CHECKS = [
    {
      round: 1,
      date: "2024-09-15",
      examiner: "นพ. สมชาย แพทย์ดี",
      location: "รพ.สมุทรปราการ",
      status: "เสร็จสิ้น",
      statusColor: "success" as const,
      vitalSigns: {
        weight: 72,
        height: 170,
        bmi: 24.9,
        bloodPressure: "120/80",
        heartRate: 78,
        temperature: 36.8,
        bloodSugar: 95,
        cholesterol: 180,
      },
      assessment: "สุขภาพดี พร้อมเดินทาง",
      recommendations: "ควรออกกำลังกายสม่ำเสมอ ดื่มน้ำให้เพียงพอ",
      nextCheckup: "2024-11-15",
    },
    {
      round: 2,
      date: "2024-11-15",
      examiner: "นพ. สมชาย แพทย์ดี",
      location: "รพ.สมุทรปราการ",
      status: "เสร็จสิ้น",
      statusColor: "success" as const,
      vitalSigns: {
        weight: 70,
        height: 170,
        bmi: 24.2,
        bloodPressure: "118/78",
        heartRate: 75,
        temperature: 36.7,
        bloodSugar: 92,
        cholesterol: 175,
      },
      assessment: "สุขภาพดีขึ้น น้ำหนักลดลงเล็กน้อย",
      recommendations: "รักษาระดับน้ำหนักปัจจุบัน",
      nextCheckup: "2025-01-15",
    },
    {
      round: 3,
      date: "2025-01-15",
      examiner: "",
      location: "รพ.สมุทรปราการ",
      status: "รอตรวจ",
      statusColor: "warning" as const,
      vitalSigns: null,
      assessment: "",
      recommendations: "",
      nextCheckup: "2025-03-15",
    },
    {
      round: 4,
      date: "2025-03-15",
      examiner: "",
      location: "รพ.สมุทรปราการ",
      status: "ยังไม่ถึงกำหนด",
      statusColor: "info" as const,
      vitalSigns: null,
      assessment: "",
      recommendations: "",
      nextCheckup: "-",
    },
  ];

  const [selectedRound, setSelectedRound] = useState<number | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    bloodPressure: "",
    heartRate: "",
    temperature: "",
    bloodSugar: "",
    cholesterol: "",
    assessment: "",
    recommendations: "",
  });

  const completedChecks = HEALTH_CHECKS.filter((c) => c.status === "เสร็จสิ้น").length;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateBMI = () => {
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100;
    if (weight && height) {
      return (weight / (height * height)).toFixed(1);
    }
    return "-";
  };

  const handleSave = () => {
    alert("บันทึกผลการตรวจสำเร็จ");
    setIsAddingRecord(false);
    // Reset form
    setFormData({
      weight: "",
      height: "",
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      bloodSugar: "",
      cholesterol: "",
      assessment: "",
      recommendations: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <ComponentCard className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-500/10 dark:to-blue-500/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              ความคืบหน้าการตรวจสุขภาพ
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ตรวจแล้ว {completedChecks} จาก 4 ครั้ง
            </p>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-green-600 dark:text-green-400">
              {Math.round((completedChecks / 4) * 100)}%
            </p>
          </div>
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-blue-500"
            style={{ width: `${(completedChecks / 4) * 100}%` }}
          />
        </div>
      </ComponentCard>

      {/* Health Check Rounds */}
      <div className="grid gap-4">
        {HEALTH_CHECKS.map((check) => (
          <ComponentCard
            key={check.round}
            className={`hover:shadow-lg transition-shadow ${
              check.status === "เสร็จสิ้น"
                ? "border-l-4 border-green-500"
                : check.status === "รอตรวจ"
                ? "border-l-4 border-yellow-500"
                : "border-l-4 border-gray-300"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/20 rounded-full flex items-center justify-center">
                      <span className="text-xl font-bold text-blue-600 dark:text-blue-400">
                        {check.round}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        การตรวจครั้งที่ {check.round}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        วันที่: {check.date}
                      </p>
                    </div>
                  </div>
                  <Badge variant="solid" color={check.statusColor} size="sm">
                    {check.status}
                  </Badge>
                </div>

                {check.vitalSigns && (
                  <>
                    {/* Vital Signs Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">น้ำหนัก</p>
                        <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                          {check.vitalSigns.weight} kg
                        </p>
                      </div>
                      <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">ส่วนสูง</p>
                        <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
                          {check.vitalSigns.height} cm
                        </p>
                      </div>
                      <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">BMI</p>
                        <p className="text-lg font-bold text-green-600 dark:text-green-400">
                          {check.vitalSigns.bmi}
                        </p>
                      </div>
                      <div className="p-3 bg-red-50 dark:bg-red-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">ความดัน</p>
                        <p className="text-lg font-bold text-red-600 dark:text-red-400">
                          {check.vitalSigns.bloodPressure}
                        </p>
                      </div>
                      <div className="p-3 bg-pink-50 dark:bg-pink-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">ชีพจร</p>
                        <p className="text-lg font-bold text-pink-600 dark:text-pink-400">
                          {check.vitalSigns.heartRate} bpm
                        </p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">อุณหภูมิ</p>
                        <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                          {check.vitalSigns.temperature} °C
                        </p>
                      </div>
                      <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">น้ำตาล</p>
                        <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                          {check.vitalSigns.bloodSugar} mg/dL
                        </p>
                      </div>
                      <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 rounded-lg">
                        <p className="text-xs text-gray-600 dark:text-gray-400">คอเลสเตอรอล</p>
                        <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                          {check.vitalSigns.cholesterol} mg/dL
                        </p>
                      </div>
                    </div>

                    {/* Assessment */}
                    <div className="p-4 bg-green-50 dark:bg-green-500/10 rounded-lg">
                      <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                        ผลการประเมิน:
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {check.assessment}
                      </p>
                    </div>

                    {/* Recommendations */}
                    {check.recommendations && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                        <p className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                          คำแนะนำ:
                        </p>
                        <p className="text-sm text-gray-700 dark:text-gray-300">
                          {check.recommendations}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <StethoscopeIcon size={16} className="text-gray-500" />
                        <span>แพทย์ผู้ตรวจ: {check.examiner}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon size={16} className="text-gray-500" />
                        <span>{check.location}</span>
                      </div>
                    </div>
                  </>
                )}

                {!check.vitalSigns && check.status !== "ยังไม่ถึงกำหนด" && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg text-center">
                    <div className="flex items-center justify-center gap-2 text-yellow-700 dark:text-yellow-400 font-semibold">
                      <ClockIcon size={18} />
                      <span>รอการตรวจสุขภาพครั้งที่ {check.round}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      สถานที่: {check.location}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[150px]">
                {check.status === "รอตรวจ" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedRound(check.round);
                      setIsAddingRecord(true);
                    }}
                  >
                    <span className="flex items-center gap-2"><SaveIcon size={14} /> บันทึกผลตรวจ</span>
                  </Button>
                )}
                {check.vitalSigns && (
                  <>
                    <Button size="sm" variant="outline">
                      ดูรายละเอียด
                    </Button>
                    <Button size="sm" variant="outline">
                      พิมพ์รายงาน
                    </Button>
                  </>
                )}
                {check.nextCheckup !== "-" && (
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    ครั้งถัดไป: {check.nextCheckup}
                  </div>
                )}
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {/* Add Record Modal */}
      {isAddingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    บันทึกผลการตรวจสุขภาพครั้งที่ {selectedRound}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    กรอกข้อมูล Vital Signs และผลการประเมิน
                  </p>
                </div>
                <button
                  onClick={() => setIsAddingRecord(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XCircleIcon size={22} />
                </button>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* น้ำหนัก */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    น้ำหนัก <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="70"
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">kg</span>
                  </div>
                </div>

                {/* ส่วนสูง */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ส่วนสูง <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="170"
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">cm</span>
                  </div>
                </div>

                {/* BMI (Auto-calculated) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    BMI
                  </label>
                  <div className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-semibold">
                    {calculateBMI()}
                  </div>
                </div>

                {/* ความดันโลหิต */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ความดันโลหิต <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.bloodPressure}
                      onChange={(e) => handleInputChange("bloodPressure", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="120/80"
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">mmHg</span>
                  </div>
                </div>

                {/* ระดับน้ำตาลในเลือด (FBS) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ระดับน้ำตาลในเลือด (FBS)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.bloodSugar}
                      onChange={(e) => handleInputChange("bloodSugar", e.target.value)}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      placeholder="95"
                    />
                    <span className="absolute right-3 top-2.5 text-sm text-gray-500">mg/dL</span>
                  </div>
                </div>
              </div>

              {/* แนบรูป ผลการตรวจห้องปฏิบัติการ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  แนบรูป ผลการตรวจห้องปฏิบัติการ
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                />
              </div>

              {/* ผลการตรวจห้องปฏิบัติการ(LAB) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ผลการตรวจห้องปฏิบัติการ(LAB):
                </label>
                <textarea
                  value={formData.assessment}
                  onChange={(e) => handleInputChange("assessment", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="ระบุผลการตรวจห้องปฏิบัติการ..."
                />
              </div>

              {/* แนบรูป ประวัติการใช้ยา */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  แนบรูป ประวัติการใช้ยา
                </label>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-blue-900 dark:file:text-blue-300"
                />
              </div>

              {/* ประวัติการใช้ยาโรคเรื้อรัง */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ประวัติการใช้ยาโรคเรื้อรัง(ล่าสุด)/รายละเอียดอื่นๆ:
                </label>
                <textarea
                  value={formData.recommendations}
                  onChange={(e) => handleInputChange("recommendations", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={3}
                  placeholder="ระบุประวัติการใช้ยาโรคเรื้อรัง..."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* วันที่ตรวจ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันที่ตรวจ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>

                {/* ตรวจสุขภาพโดย */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ตรวจสุขภาพโดย <span className="text-red-500">*</span>
                  </label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  >
                    <option value="">-เลือกผู้ตรวจสุขภาพ-</option>
                    <option value="doctor1">นพ.สมชาย ใจดี</option>
                    <option value="doctor2">พญ.สมหญิง รักดี</option>
                    <option value="doctor3">นพ.วิชัย สุขสม</option>
                  </select>
                </div>

                {/* ชื่อสถานพยาบาล */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ชื่อสถานพยาบาล:
                  </label>
                  <input
                    type="text"
                    defaultValue="ศูนย์บริหารการพัฒนาสุขภาพจังหวัดชายแดนภาคใต้(ศบ.สต)"
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="ระบุชื่อสถานพยาบาล..."
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setIsAddingRecord(false)}
                >
                  ยกเลิก
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <span className="flex items-center gap-2"><SaveIcon size={14} /> บันทึกผลการตรวจ</span>
                </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}

// Tab: การฉีดวัคซีน
function VaccinationTab() {
  // Fake Data - วัคซีนที่ต้องฉีด
  const REQUIRED_VACCINES = [
    {
      id: 1,
      name: "Meningococcal (ACWY)",
      nameEn: "เมนินโกค็อกคัล",
      required: true,
      description: "ป้องกันเยื่อหุ้มสมองอักเสบ (บังคับโดยรัฐบาลซาอุดีอาระเบีย)",
      doses: 1,
      status: "ฉีดแล้ว",
      statusColor: "success" as const,
      vaccineDate: "2024-08-15",
      batchNumber: "MEN-2024-A1234",
      expiryDate: "2026-08-15",
      hospital: "รพ.สมุทรปราการ",
      vaccinator: "พยาบาล สมหญิง ใจดี",
      nextDose: null,
    },
    {
      id: 2,
      name: "Influenza",
      nameEn: "ไข้หวัดใหญ่",
      required: true,
      description: "ป้องกันไข้หวัดใหญ่",
      doses: 1,
      status: "ฉีดแล้ว",
      statusColor: "success" as const,
      vaccineDate: "2024-09-01",
      batchNumber: "FLU-2024-B5678",
      expiryDate: "2025-09-01",
      hospital: "รพ.สมุทรปราการ",
      vaccinator: "พยาบาล สมหญิง ใจดี",
      nextDose: null,
    },
    {
      id: 3,
      name: "Pneumococcal",
      nameEn: "นิวโมค็อกคัล",
      required: true,
      description: "ป้องกันปอดบวม (แนะนำสำหรับผู้สูงอายุ)",
      doses: 1,
      status: "รอฉีด",
      statusColor: "warning" as const,
      vaccineDate: null,
      batchNumber: null,
      expiryDate: null,
      hospital: null,
      vaccinator: null,
      nextDose: "2024-12-01",
    },
    {
      id: 4,
      name: "COVID-19 Booster",
      nameEn: "โควิด-19 (บูสเตอร์)",
      required: false,
      description: "เข็มกระตุ้น (แนะนำ)",
      doses: 1,
      status: "ฉีดแล้ว",
      statusColor: "success" as const,
      vaccineDate: "2024-07-20",
      batchNumber: "COV-2024-C9012",
      expiryDate: "2025-07-20",
      hospital: "รพ.สมุทรปราการ",
      vaccinator: "พยาบาล สมศรี รักษ์ดี",
      nextDose: null,
    },
  ];

  const [selectedVaccine, setSelectedVaccine] = useState<typeof REQUIRED_VACCINES[0] | null>(null);
  const [isAddingRecord, setIsAddingRecord] = useState(false);
  const [formData, setFormData] = useState({
    vaccineDate: "",
    batchNumber: "",
    expiryDate: "",
    hospital: "",
    vaccinator: "",
    sideEffects: "",
    notes: "",
  });

  const completedVaccines = REQUIRED_VACCINES.filter((v) => v.status === "ฉีดแล้ว").length;
  const requiredVaccines = REQUIRED_VACCINES.filter((v) => v.required).length;
  const requiredCompleted = REQUIRED_VACCINES.filter(
    (v) => v.required && v.status === "ฉีดแล้ว"
  ).length;

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    alert("บันทึกข้อมูลวัคซีนสำเร็จ");
    setIsAddingRecord(false);
    setSelectedVaccine(null);
    // Reset form
    setFormData({
      vaccineDate: "",
      batchNumber: "",
      expiryDate: "",
      hospital: "",
      vaccinator: "",
      sideEffects: "",
      notes: "",
    });
  };

  return (
    <div className="space-y-6">
      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ComponentCard className="bg-blue-50 dark:bg-blue-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">วัคซีนทั้งหมด</p>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            {REQUIRED_VACCINES.length}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-green-50 dark:bg-green-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">ฉีดแล้ว</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400">
            {completedVaccines}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-red-50 dark:bg-red-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">บังคับ</p>
          <p className="text-3xl font-bold text-red-600 dark:text-red-400">
            {requiredCompleted}/{requiredVaccines}
          </p>
        </ComponentCard>
        <ComponentCard className="bg-purple-50 dark:bg-purple-500/10">
          <p className="text-sm text-gray-600 dark:text-gray-400">ความสำเร็จ</p>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            {Math.round((completedVaccines / REQUIRED_VACCINES.length) * 100)}%
          </p>
        </ComponentCard>
      </div>

      {/* Vaccine Requirements Info */}
      <ComponentCard className="bg-yellow-50 dark:bg-yellow-500/10 border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center gap-2 font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
          <AlertCircleIcon size={18} />
          วัคซีนที่บังคับโดยรัฐบาลซาอุดีอาระเบีย
        </div>
        <ul className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
          <li>• Meningococcal (ACWY) - บังคับทุกคน</li>
          <li>• Influenza - บังคับทุกคน</li>
          <li>• Pneumococcal - แนะนำสำหรับผู้สูงอายุ 65 ปีขึ้นไป</li>
        </ul>
      </ComponentCard>

      {/* Vaccine List */}
      <div className="space-y-4">
        {REQUIRED_VACCINES.map((vaccine) => (
          <ComponentCard
            key={vaccine.id}
            className={`hover:shadow-lg transition-shadow ${
              vaccine.status === "ฉีดแล้ว"
                ? "border-l-4 border-green-500"
                : vaccine.required
                ? "border-l-4 border-red-500"
                : "border-l-4 border-gray-300"
            }`}
          >
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {vaccine.name}
                      </h3>
                      <div className="flex gap-2">
                        {vaccine.required && (
                          <Badge variant="solid" color="error" size="sm">
                            บังคับ
                          </Badge>
                        )}
                        <Badge variant="solid" color={vaccine.statusColor} size="sm">
                          {vaccine.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {vaccine.nameEn}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {vaccine.description}
                    </p>
                  </div>
                </div>

                {vaccine.status === "ฉีดแล้ว" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">วันที่ฉีด</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {vaccine.vaccineDate}
                      </p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">Batch Number</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {vaccine.batchNumber}
                      </p>
                    </div>
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">วันหมดอายุ</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {vaccine.expiryDate}
                      </p>
                    </div>
                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">สถานที่</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {vaccine.hospital}
                      </p>
                    </div>
                  </div>
                )}

                {vaccine.status === "รอฉีด" && vaccine.nextDose && (
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-500/10 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-yellow-700 dark:text-yellow-400">
                      <ClockIcon size={16} />
                      <span>กำหนดฉีดภายในวันที่: {vaccine.nextDose}</span>
                    </div>
                  </div>
                )}

                {vaccine.vaccinator && (
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <SyringeIcon size={16} className="text-gray-500" />
                    <span>ผู้ฉีด: {vaccine.vaccinator}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2 lg:min-w-[150px]">
                {vaccine.status === "รอฉีด" && (
                  <Button
                    size="sm"
                    onClick={() => {
                      setSelectedVaccine(vaccine);
                      setIsAddingRecord(true);
                    }}
                  >
                    บันทึกการฉีด
                  </Button>
                )}
                {vaccine.status === "ฉีดแล้ว" && (
                  <>
                    <Button size="sm" variant="outline" onClick={() => setSelectedVaccine(vaccine)}>
                      ดูรายละเอียด
                    </Button>
                    <Button size="sm" variant="outline">
                      พิมพ์ใบรับรอง
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ComponentCard>
        ))}
      </div>

      {/* Add Record Modal */}
      {isAddingRecord && selectedVaccine && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    บันทึกการฉีดวัคซีน
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {selectedVaccine.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsAddingRecord(false);
                    setSelectedVaccine(null);
                  }}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <XCircleIcon size={22} />
                </button>
              </div>

              {/* Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* วันที่ฉีด */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันที่ฉีดวัคซีน *
                  </label>
                  <input
                    type="date"
                    value={formData.vaccineDate}
                    onChange={(e) => handleInputChange("vaccineDate", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* Batch Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Batch Number *
                  </label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => handleInputChange("batchNumber", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="เช่น MEN-2024-A1234"
                    required
                  />
                </div>

                {/* วันหมดอายุ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    วันหมดอายุวัคซีน *
                  </label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                {/* สถานที่ */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    สถานที่ฉีด *
                  </label>
                  <input
                    type="text"
                    value={formData.hospital}
                    onChange={(e) => handleInputChange("hospital", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="ชื่อโรงพยาบาล/คลินิก"
                    required
                  />
                </div>

                {/* ผู้ฉีด */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ผู้ฉีดวัคซีน *
                  </label>
                  <input
                    type="text"
                    value={formData.vaccinator}
                    onChange={(e) => handleInputChange("vaccinator", e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="ชื่อพยาบาล/แพทย์ผู้ฉีด"
                    required
                  />
                </div>
              </div>

              {/* ผลข้างเคียง */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ผลข้างเคียง (ถ้ามี)
                </label>
                <textarea
                  value={formData.sideEffects}
                  onChange={(e) => handleInputChange("sideEffects", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={2}
                  placeholder="บันทึกผลข้างเคียงที่เกิดขึ้น (ถ้ามี)"
                />
              </div>

              {/* หมายเหตุ */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  หมายเหตุ
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={2}
                  placeholder="บันทึกข้อมูลเพิ่มเติม..."
                />
              </div>

              {/* Info Alert */}
              <div className="p-4 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
                  <LightbulbIcon size={16} />
                  <span>กรุณาตรวจสอบข้อมูล Batch Number และวันหมดอายุให้ถูกต้อง เนื่องจากเป็นข้อมูลสำคัญสำหรับการตรวจสอบ</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setIsAddingRecord(false);
                    setSelectedVaccine(null);
                  }}
                >
                  ยกเลิก
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <span className="flex items-center gap-2"><SaveIcon size={14} /> บันทึกข้อมูล</span>
                </Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Detail Modal */}
      {selectedVaccine && !isAddingRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                    {selectedVaccine.name}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">{selectedVaccine.nameEn}</p>
                  <div className="flex gap-2 mt-2">
                    {selectedVaccine.required && (
                      <Badge variant="solid" color="error" size="sm">
                        บังคับ
                      </Badge>
                    )}
                    <Badge variant="solid" color={selectedVaccine.statusColor} size="sm">
                      {selectedVaccine.status}
                    </Badge>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedVaccine(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {selectedVaccine.description}
                </p>
              </div>

              {selectedVaccine.status === "ฉีดแล้ว" && (
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">วันที่ฉีด</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedVaccine.vaccineDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Batch Number</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedVaccine.batchNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">วันหมดอายุ</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedVaccine.expiryDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">สถานที่ฉีด</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedVaccine.hospital}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600 dark:text-gray-400">ผู้ฉีดวัคซีน</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {selectedVaccine.vaccinator}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" onClick={() => setSelectedVaccine(null)}>
                  ปิด
                </Button>
                <Button size="sm">พิมพ์ใบรับรอง</Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}
