import { ExecutiveGuard } from '@/components/auth/AuthGuard';
import { UserIcon, GroupIcon, CheckCircleIcon, ArrowUpIcon, PieChartIcon, DocsIcon, DownloadIcon, AlertIcon, TimeIcon } from '@/icons';

export default function ExecutiveDashboard() {
  return (
    <ExecutiveGuard>
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
                แดชบอร์ดผู้บริหาร
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            ภาพรวมและรายงานเชิงวิเคราะห์ระบบสุขภาพฮัจญ์
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">ผู้เดินทางทั้งหมด</p>
                <p className="text-3xl font-bold">15,847</p>
                <p className="text-blue-200 text-sm flex items-center gap-1">
                  <ArrowUpIcon className="w-3 h-3" />
                  +12% จากปีก่อน
                </p>
              </div>
              <div className="text-white">
                <UserIcon className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">หน่วยบริการ</p>
                <p className="text-3xl font-bold">156</p>
                <p className="text-green-200 text-sm">ครอบคลุม 77 จังหวัด</p>
              </div>
              <div className="text-white">
                <GroupIcon className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">ใบรับรองออก</p>
                <p className="text-3xl font-bold">14,523</p>
                <p className="text-orange-200 text-sm">91.6% ของผู้สมัคร</p>
              </div>
              <div className="text-white">
                <CheckCircleIcon className="w-8 h-8" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg shadow p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">อัตราผ่านเกณฑ์</p>
                <p className="text-3xl font-bold">94.2%</p>
                <p className="text-purple-200 text-sm flex items-center gap-1">
                  <ArrowUpIcon className="w-3 h-3" />
                  +2.1% จากปีก่อน
                </p>
              </div>
              <div className="text-white">
                <PieChartIcon className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                สถิติการตรวจสุขภาพรายเดือน
              </h2>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1">
                <option>ปี 2567</option>
                <option>ปี 2566</option>
              </select>
            </div>
            {/* Chart placeholder */}
            <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <PieChartIcon className="w-6 h-6" />
                <p>กราฟสถิติการตรวจสุขภาพ</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              ข้อมูลโรคติดต่อ
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">ไข้หวัดใหญ่</span>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">12 ราย</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">โควิด-19</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">3 ราย</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">มาลาเรีย</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">1 ราย</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">วัณโรค</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">2 ราย</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                รายงานเชิงวิเคราะห์
              </h2>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                ดูทั้งหมด →
              </button>
            </div>
            <div className="space-y-3">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">รายงานประจำสัปดาห์</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">สถิติการตรวจสุขภาพ</p>
                  </div>
                  <ArrowUpIcon className="w-5 h-5 text-green-500" />
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">รายงานการเดินทาง</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">วิเคราะห์แนวโน้มการเดินทาง</p>
                  </div>
                  <DocsIcon className="w-5 h-5 text-blue-500" />
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">รายงานคุณภาพบริการ</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">ประเมินประสิทธิภาพหน่วยบริการ</p>
                  </div>
                  <CheckCircleIcon className="w-5 h-5 text-purple-500" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                การดำเนินการเร่งด่วน
              </h2>
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">3 รายการ</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded">
                <div className="flex items-start gap-2">
                  <AlertIcon className="w-4 h-4 text-red-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">เวชภัณฑ์ขาดแคลน</p>
                    <p className="text-sm text-red-600 dark:text-red-300">รพ.สต.บ้านโป่ง - วัคซีนไข้เหลือง</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-orange-50 dark:bg-orange-900/20 border-l-4 border-orange-500 rounded">
                <div className="flex items-start gap-2">
                  <TimeIcon className="w-4 h-4 text-orange-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-orange-800 dark:text-orange-200">ระบบล่าช้า</p>
                    <p className="text-sm text-orange-600 dark:text-orange-300">การส่งรายงานจาก 5 หน่วยบริการ</p>
                  </div>
                </div>
              </div>
              
              <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-500 rounded">
                <div className="flex items-start gap-2">
                  <CheckCircleIcon className="w-4 h-4 text-yellow-500 mt-0.5" />
                  <div>
                    <p className="font-medium text-yellow-800 dark:text-yellow-200">ตรวจสอบคุณภาพ</p>
                    <p className="text-sm text-yellow-600 dark:text-yellow-300">รอการอนุมัติใบรับรอง 45 ฉบับ</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-indigo-800 dark:text-indigo-200">
                ดาวน์โหลดรายงานแบบครบถ้วน
              </h3>
              <p className="text-sm text-indigo-600 dark:text-indigo-300 mt-1">
                ข้อมูลสถิติและการวิเคราะห์ทั้งหมดในรูปแบบ Excel และ PDF
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                Excel
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center gap-2">
                <DownloadIcon className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </ExecutiveGuard>
  );
}