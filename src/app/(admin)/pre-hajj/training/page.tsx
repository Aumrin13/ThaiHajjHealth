"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  AlertCircleIcon,
  CalendarDaysIcon,
  MapPinIcon,
  CheckCircle2Icon,
  UsersIcon,
  XCircleIcon,
} from "@/components/icons/HealthIcons";

// Fake Data
const FAKE_TRAINING_COURSES = [
  {
    id: "TR001",
    courseName: "หลักสูตรการเตรียมตัวสำหรับการประกอบพิธีฮัจญ์",
    courseNameEn: "Hajj Preparation Course",
    category: "พิธีกรรม",
    duration: "2 วัน",
    hours: 16,
    instructor: "อิหม่าม สมชาย ใจดี",
    location: "ห้องประชุมใหญ่ ชั้น 3",
    maxParticipants: 50,
    currentParticipants: 45,
    startDate: "2025-03-15",
    endDate: "2025-03-16",
    schedule: "09:00 - 17:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "success" as const,
    price: 0,
    description: "อบรมพิธีกรรมฮัจญ์ครบถ้วน ตั้งแต่การเตรียมตัว การประกอบพิธีในสถานที่สำคัญ",
    topics: [
      "การทำอิหร็อม (Ihram)",
      "พิธีต่างๆ ในมัสยิดิลหะรอม",
      "การประกอบพิธีที่อะรอฟะห์",
      "การขว้างหินที่มินา",
      "การเดินรอบคะอฺบะห์",
      "การวิ่งระหว่างซอฟาและมัรวะห์",
    ],
    certificate: true,
    mandatory: true,
  },
  {
    id: "TR002",
    courseName: "การดูแลสุขภาพระหว่างการเดินทางฮัจญ์",
    courseNameEn: "Health Care During Hajj",
    category: "สุขภาพ",
    duration: "1 วัน",
    hours: 8,
    instructor: "นพ. สมศักดิ์ รักษาชีพ",
    location: "ห้องประชุมกลาง ชั้น 2",
    maxParticipants: 40,
    currentParticipants: 35,
    startDate: "2025-04-10",
    endDate: "2025-04-10",
    schedule: "09:00 - 17:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "success" as const,
    price: 0,
    description: "แนวทางการดูแลสุขภาพในสภาพอากาศร้อนและสถานการณ์ต่างๆ",
    topics: [
      "การป้องกันโรคระบาดในสถานที่แออัด",
      "การรับประทานอาหารและน้ำ",
      "การใช้ยาประจำตัว",
      "การปฐมพยาบาลเบื้องต้น",
      "อาการเจ็บป่วยฉุกเฉิน",
      "จุดบริการทางการแพทย์ในซาอุดีอาระเบีย",
    ],
    certificate: true,
    mandatory: true,
  },
  {
    id: "TR003",
    courseName: "กฎหมายและข้อบังคับในซาอุดีอาระเบีย",
    courseNameEn: "Saudi Arabia Laws and Regulations",
    category: "กฎหมาย",
    duration: "0.5 วัน",
    hours: 4,
    instructor: "นายกฤษณ์ กฎหมาย",
    location: "ห้องประชุมเล็ก ชั้น 2",
    maxParticipants: 30,
    currentParticipants: 28,
    startDate: "2025-04-20",
    endDate: "2025-04-20",
    schedule: "13:00 - 17:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "success" as const,
    price: 0,
    description: "ความรู้เกี่ยวกับกฎหมาย ข้อบังคับ และวัฒนธรรมในประเทศซาอุดีอาระเบีย",
    topics: [
      "กฎหมายพื้นฐานที่ต้องรู้",
      "ข้อห้ามสำหรับผู้เดินทาง",
      "สิทธิและหน้าที่ของผู้แสวงบุญ",
      "วัฒนธรรมและมารยาทท้องถิ่น",
      "การติดต่อสถานทูตไทย",
    ],
    certificate: true,
    mandatory: true,
  },
  {
    id: "TR004",
    courseName: "ภาษาอาหรับเบื้องต้นสำหรับผู้เดินทางฮัจญ์",
    courseNameEn: "Basic Arabic for Hajj Pilgrims",
    category: "ภาษา",
    duration: "3 วัน",
    hours: 12,
    instructor: "อาจารย์ฟาติมะห์ สุไหมดี",
    location: "ห้องเรียนออนไลน์",
    maxParticipants: 100,
    currentParticipants: 67,
    startDate: "2025-05-01",
    endDate: "2025-05-03",
    schedule: "18:00 - 22:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "success" as const,
    price: 500,
    description: "คำศัพท์และประโยคภาษาอาหรับที่จำเป็นในการดำเนินชีวิตและประกอบพิธี",
    topics: [
      "คำทักทายและบทสนทนาพื้นฐาน",
      "ตัวเลขและราคา",
      "คำศัพท์เกี่ยวกับอาหาร",
      "คำถามทิศทางและสถานที่",
      "คำศัพท์พิธีกรรม",
      "สำนวนที่ใช้บ่อย",
    ],
    certificate: true,
    mandatory: false,
  },
  {
    id: "TR005",
    courseName: "การจัดการสัมภาระและความปลอดภัย",
    courseNameEn: "Luggage Management and Safety",
    category: "ความปลอดภัย",
    duration: "0.5 วัน",
    hours: 3,
    instructor: "คุณสมหญิง รอบคอบ",
    location: "ห้องประชุมกลาง ชั้น 2",
    maxParticipants: 50,
    currentParticipants: 42,
    startDate: "2025-05-15",
    endDate: "2025-05-15",
    schedule: "09:00 - 12:00 น.",
    status: "เปิดรับสมัคร",
    statusColor: "success" as const,
    price: 0,
    description: "แนวทางการจัดสัมภาระ ของใช้จำเป็น และการรักษาความปลอดภัยส่วนตัว",
    topics: [
      "รายการสิ่งของที่ควรนำไป",
      "สิ่งของต้องห้าม",
      "การจัดกระเป๋าอย่างมีประสิทธิภาพ",
      "การดูแลเอกสารสำคัญ",
      "การป้องกันการสูญหาย",
      "ประกันการเดินทาง",
    ],
    certificate: false,
    mandatory: true,
  },
];

const FAKE_PARTICIPANTS = [
  {
    pilgrimId: "P001",
    name: "นายสมชาย ใจดี",
    courses: ["TR001", "TR002", "TR003", "TR005"],
    completedCourses: ["TR001", "TR002"],
    certificatesReceived: 2,
    totalHours: 24,
    progress: 50,
  },
  {
    pilgrimId: "P002",
    name: "นางสาวสมหญิง รักดี",
    courses: ["TR001", "TR002", "TR004"],
    completedCourses: ["TR001"],
    certificatesReceived: 1,
    totalHours: 16,
    progress: 33,
  },
];

export default function TrainingPage() {
  const [selectedCategory, setSelectedCategory] = useState("ทั้งหมด");
  const [selectedStatus, setSelectedStatus] = useState("ทั้งหมด");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<typeof FAKE_TRAINING_COURSES[0] | null>(null);
  const [showParticipants, setShowParticipants] = useState(false);

  const categories = ["ทั้งหมด", "พิธีกรรม", "สุขภาพ", "กฎหมาย", "ภาษา", "ความปลอดภัย"];

  const filteredCourses = FAKE_TRAINING_COURSES.filter((course) => {
    const matchCategory = selectedCategory === "ทั้งหมด" || course.category === selectedCategory;
    const matchStatus = selectedStatus === "ทั้งหมด" || course.status === selectedStatus;
    const matchSearch =
      course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.courseNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchStatus && matchSearch;
  });

  const totalCourses = FAKE_TRAINING_COURSES.length;
  const totalParticipants = FAKE_TRAINING_COURSES.reduce((sum, c) => sum + c.currentParticipants, 0);
  const mandatoryCourses = FAKE_TRAINING_COURSES.filter(c => c.mandatory).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            การฝึกอบรมเตรียมความพร้อม
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            หลักสูตรอบรมสำหรับผู้เดินทางประกอบพิธีฮัจญ์
          </p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setShowParticipants(!showParticipants)}>
            {showParticipants ? "ดูหลักสูตร" : "ดูผู้เข้าอบรม"}
          </Button>
          <Button size="sm">
            + เพิ่มหลักสูตร
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <ComponentCard className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/10 dark:to-blue-600/10 border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรทั้งหมด</p>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{totalCourses}</p>
            </div>
            <div className="p-3 bg-blue-500 rounded-lg text-white text-2xl">📚</div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-500/10 dark:to-purple-600/10 border-purple-200 dark:border-purple-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">ผู้เข้าอบรมทั้งหมด</p>
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{totalParticipants}</p>
            </div>
            <div className="p-3 bg-purple-500 rounded-lg text-white text-2xl">
              <UsersIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-500/10 dark:to-red-600/10 border-red-200 dark:border-red-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">หลักสูตรบังคับ</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400">{mandatoryCourses}</p>
            </div>
            <div className="p-3 bg-red-500 rounded-lg text-white text-2xl">
              <AlertCircleIcon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>

        <ComponentCard className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-500/10 dark:to-green-600/10 border-green-200 dark:border-green-800">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">เฉลี่ยที่นั่งว่าง</p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                {Math.round(
                  FAKE_TRAINING_COURSES.reduce(
                    (sum, c) => sum + ((c.maxParticipants - c.currentParticipants) / c.maxParticipants) * 100,
                    0
                  ) / FAKE_TRAINING_COURSES.length
                )}%
              </p>
            </div>
            <div className="p-3 bg-green-500 rounded-lg text-white text-2xl">
              <CheckCircle2Icon className="w-6 h-6" />
            </div>
          </div>
        </ComponentCard>
      </div>

      {!showParticipants ? (
        <>
          {/* Filters */}
          <ComponentCard>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  ค้นหาหลักสูตร
                </label>
                <input
                  type="text"
                  placeholder="ชื่อหลักสูตร, วิทยากร..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  หมวดหมู่
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
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
                  <option>เปิดรับสมัคร</option>
                  <option>เต็มแล้ว</option>
                  <option>ปิดรับสมัคร</option>
                </select>
              </div>
            </div>
          </ComponentCard>

          {/* Courses List */}
          <div className="grid gap-4">
            {filteredCourses.map((course) => {
              const availableSeats = course.maxParticipants - course.currentParticipants;
              const percentFull = (course.currentParticipants / course.maxParticipants) * 100;

              return (
                <ComponentCard key={course.id} className="hover:shadow-lg transition-shadow">
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 space-y-4">
                      {/* Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 flex-wrap">
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                              {course.courseName}
                            </h3>
                            <Badge variant="solid" color={course.statusColor} size="sm">
                              {course.status}
                            </Badge>
                            {course.mandatory && (
                              <Badge variant="solid" color="danger" size="sm">
                                บังคับ
                              </Badge>
                            )}
                            {course.certificate && (
                              <Badge variant="light" color="warning" size="sm">
                                📜 ออกใบรับรอง
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {course.courseNameEn}
                          </p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-700 dark:text-gray-300">{course.description}</p>

                      {/* Course Info Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">หมวดหมู่</p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {course.category}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">ระยะเวลา</p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {course.duration} ({course.hours} ชม.)
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">วิทยากร</p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {course.instructor}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <p className="text-xs text-gray-600 dark:text-gray-400">ค่าลงทะเบียน</p>
                          <p className="text-sm font-semibold text-gray-800 dark:text-white">
                            {course.price === 0 ? "ฟรี" : `${course.price} บาท`}
                          </p>
                        </div>
                      </div>

                      {/* Schedule & Location */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                            <CalendarDaysIcon className="w-4 h-4" /> กำหนดการ
                          </p>
                          <p className="text-sm text-gray-800 dark:text-white">
                            {course.startDate === course.endDate
                              ? course.startDate
                              : `${course.startDate} - ${course.endDate}`}
                          </p>
                          <p className="text-sm text-gray-800 dark:text-white">{course.schedule}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-1 flex items-center gap-1">
                            <MapPinIcon className="w-4 h-4" /> สถานที่
                          </p>
                          <p className="text-sm text-gray-800 dark:text-white">{course.location}</p>
                        </div>
                      </div>

                      {/* Seats Available */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600 dark:text-gray-400">
                            ผู้เข้าร่วม: {course.currentParticipants}/{course.maxParticipants} คน
                          </span>
                          <span
                            className={`font-semibold ${
                              availableSeats === 0
                                ? "text-red-600 dark:text-red-400"
                                : availableSeats <= 5
                                ? "text-yellow-600 dark:text-yellow-400"
                                : "text-green-600 dark:text-green-400"
                            }`}
                          >
                            เหลือที่ว่าง {availableSeats} ที่
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              percentFull === 100
                                ? "bg-red-500"
                                : percentFull >= 90
                                ? "bg-yellow-500"
                                : "bg-green-500"
                            }`}
                            style={{ width: `${percentFull}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 lg:min-w-[180px]">
                      <Button size="sm" onClick={() => setSelectedCourse(course)}>
                        ดูรายละเอียด
                      </Button>
                      <Button size="sm" variant="outline">
                        ลงทะเบียน
                      </Button>
                      <Button size="sm" variant="outline">
                        รายชื่อผู้เข้าอบรม
                      </Button>
                      <Button size="sm" variant="outline">
                        แก้ไขหลักสูตร
                      </Button>
                    </div>
                  </div>
                </ComponentCard>
              );
            })}
          </div>

          {filteredCourses.length === 0 && (
            <ComponentCard>
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">ไม่พบหลักสูตรที่ค้นหา</p>
              </div>
            </ComponentCard>
          )}
        </>
      ) : (
        /* Participants View */
        <div className="space-y-4">
          <ComponentCard>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              ข้อมูลผู้เข้าอบรม
            </h2>
            <div className="space-y-4">
              {FAKE_PARTICIPANTS.map((participant) => (
                <div
                  key={participant.pilgrimId}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        {participant.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        รหัส: {participant.pilgrimId}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600 dark:text-gray-400">ความคืบหน้า</p>
                      <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {participant.progress}%
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">ลงทะเบียน</p>
                      <p className="text-lg font-semibold text-gray-800 dark:text-white">
                        {participant.courses.length}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-green-50 dark:bg-green-500/10 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">สำเร็จ</p>
                      <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {participant.completedCourses.length}
                      </p>
                    </div>
                    <div className="text-center p-2 bg-blue-50 dark:bg-blue-500/10 rounded">
                      <p className="text-xs text-gray-600 dark:text-gray-400">ชั่วโมง</p>
                      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                        {participant.totalHours}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      หลักสูตรที่ลงทะเบียน:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {participant.courses.map((courseId) => {
                        const course = FAKE_TRAINING_COURSES.find((c) => c.id === courseId);
                        const isCompleted = participant.completedCourses.includes(courseId);
                        return (
                          <Badge
                          <Badge
                            variant={isCompleted ? "solid" : "light"}
                            color={isCompleted ? "success" : "primary"}
                            size="sm"
                          >
                            {isCompleted && (
                              <CheckCircle2Icon className="inline w-3 h-3 mr-1 align-text-bottom" />
                            )}
                            {course?.courseName}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ComponentCard>
        </div>
      )}

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <ComponentCard className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {selectedCourse.courseName}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {selectedCourse.courseNameEn}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
                >
                  <XCircleIcon className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Badge variant="solid" color={selectedCourse.statusColor}>
                  {selectedCourse.status}
                </Badge>
                <Badge variant="light" color="primary">
                  {selectedCourse.category}
                </Badge>
                {selectedCourse.mandatory && (
                  <Badge variant="solid" color="danger">
                    หลักสูตรบังคับ
                  </Badge>
                )}
                {selectedCourse.certificate && (
                  <Badge variant="light" color="warning">
                    ออกใบรับรอง
                  </Badge>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    รายละเอียดหลักสูตร
                  </h3>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {selectedCourse.description}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-2">
                    หัวข้อการอบรม
                  </h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                    {selectedCourse.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">วิทยากร</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedCourse.instructor}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ระยะเวลา</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedCourse.duration} ({selectedCourse.hours} ชั่วโมง)
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">สถานที่</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedCourse.location}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">ค่าลงทะเบียน</p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white">
                      {selectedCourse.price === 0 ? "ฟรี" : `${selectedCourse.price} บาท`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" variant="outline" onClick={() => setSelectedCourse(null)}>
                  ปิด
                </Button>
                <Button size="sm">ลงทะเบียนเข้าอบรม</Button>
              </div>
            </div>
          </ComponentCard>
        </div>
      )}
    </div>
  );
}
