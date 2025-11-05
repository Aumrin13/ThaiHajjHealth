import { StaffGuard } from '@/components/auth/AuthGuard';
import { UserIcon, DocsIcon, TimeIcon, PlusIcon, CheckCircleIcon, PaperPlaneIcon, FolderIcon, InfoIcon } from '@/icons';

export default function StaffDashboard() {
  return (
    <StaffGuard>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <img
              src="/images/logo/thh_logo.png"
              alt="Thai Hajj Health System"
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
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <TimeIcon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">นัดหมายถัดไป</p>
                <p className="text-2xl font-semibold text-gray-900 dark:text-white">8</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              ฟังก์ชันการทำงาน
            </h2>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <PlusIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <div className="font-medium text-green-800 dark:text-green-200">บันทึกข้อมูลผู้ป่วย</div>
                    <div className="text-sm text-green-600 dark:text-green-300">เพิ่มข้อมูลผู้ป่วยใหม่</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-800 dark:text-blue-200">จัดการใบรับรองสุขภาพ</div>
                    <div className="text-sm text-blue-600 dark:text-blue-300">ออกใบรับรองสุขภาพ</div>
                  </div>
                </div>
              </button>
              
              <button className="w-full text-left p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <PaperPlaneIcon className="w-5 h-5 text-orange-600" />
                  <div>
                    <div className="font-medium text-orange-800 dark:text-orange-200">ส่งรายงาน</div>
                    <div className="text-sm text-orange-600 dark:text-orange-300">ส่งรายงานประจำวัน</div>
                  </div>
                </div>
              </button>

              <button className="w-full text-left p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors">
                <div className="flex items-center gap-3">
                  <FolderIcon className="w-5 h-5 text-purple-600" />
                  <div>
                    <div className="font-medium text-purple-800 dark:text-purple-200">ข้อมูลหน่วยบริการ</div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">ดูข้อมูลของหน่วยบริการ</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              รายการผู้ป่วยล่าสุด
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">นายสมชาย ใจดี</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">HN: 001234 | อายุ 45 ปี</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                  ผ่านการตรวจ
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">นางสาววิไล สุขใส</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">HN: 001235 | อายุ 38 ปี</p>
                </div>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  รอตรวจ
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">นายประเสริฐ เก่งการ</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">HN: 001236 | อายุ 52 ปี</p>
                </div>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                  นัดติดตาม
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InfoIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                ข้อมูลหน่วยบริการของคุณ
              </h3>
              <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
                รหัส HCODE: <strong>12345678</strong> | โรงพยาบาลส่งเสริมสุขภาพตำบลบ้านนา, จังหวัดเชียงใหม่
              </p>
            </div>
          </div>
        </div>
      </div>
    </StaffGuard>
  );
}