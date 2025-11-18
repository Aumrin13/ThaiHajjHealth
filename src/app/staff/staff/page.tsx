import { StaffGuard } from '@/components/guards/RoleGuard';
import { UserIcon, DocsIcon, TimeIcon } from '@/icons';
import Image from 'next/image';

export default function StaffDashboard() {
  return (
    <StaffGuard>
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
                แดชบอร์ดเจ้าหน้าที่
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            ระบบจัดการข้อมูลสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <UserIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">ผู้ป่วยวันนี้</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">23</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <DocsIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">รายงานรอส่ง</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">5</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <TimeIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">เวลาทำงาน</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">8 ชม.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StaffGuard>
  );
}
