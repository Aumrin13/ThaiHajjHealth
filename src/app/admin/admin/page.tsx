import { AdminGuard } from '@/components/auth/AuthGuard';
import { UserIcon, GroupIcon, DocsIcon, AlertIcon } from '@/icons';
import Image from 'next/image';

export default function AdminDashboard() {
  return (
    <AdminGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <Image
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
              width={40}
              height={40}
              className="h-10"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                แดชบอร์ดผู้ดูแลระบบ
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            ยินดีต้อนรับสู่ระบบจัดการ Thai Hajj Health System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">ผู้ใช้ทั้งหมด</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">1,234</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <GroupIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">หน่วยบริการ</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">89</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <DocsIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">รายงานรายวัน</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">45</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <AlertIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">แจ้งเตือน</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">12</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              ฟังก์ชันการจัดการ
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="font-medium text-blue-800 dark:text-blue-200">จัดการผู้ใช้</div>
                <div className="text-sm text-blue-600 dark:text-blue-300">เพิ่ม แก้ไข ลบผู้ใช้ในระบบ</div>
              </button>
              
              <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="font-medium text-green-800 dark:text-green-200">จัดการหน่วยบริการ</div>
                <div className="text-sm text-green-600 dark:text-green-300">จัดการข้อมูลโรงพยาบาล และ รพ.สต.</div>
              </button>
              
              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="font-medium text-purple-800 dark:text-purple-200">ตั้งค่าระบบ</div>
                <div className="text-sm text-purple-600 dark:text-purple-300">กำหนดค่าต่างๆ ของระบบ</div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              กิจกรรมล่าสุด
            </h2>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  มีผู้ใช้งานใหม่ลงทะเบียน
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  เจ้า หน้าที่จาก รพ.สต.บ้านนา - 5 นาทีที่แล้ว
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  รายงานถูกส่งเรียบร้อย
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  รายงานประจำวันจาก รพ.เชียงใหม่ - 1 ชั่วโมงที่แล้ว
                </p>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-3">
                <p className="text-sm font-medium text-gray-800 dark:text-white">
                  มีการแก้ไขข้อมูลผู้ใช้
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  ข้อมูลผู้ใช้ป่วยถูกอัปเดท - 2 ชั่วโมงที่แล้ว
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}
