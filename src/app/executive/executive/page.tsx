// import removed duplicate
import { ExecutiveGuard } from '@/components/guards/RoleGuard';
import { UserIcon, GroupIcon, CheckCircleIcon, ArrowUpIcon } from '@/icons';
import Image from 'next/image';

export default function ExecutivePage() {
  return (
    <ExecutiveGuard>
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
            </div>
          </div>
        </div>

        {/* ...rest of the dashboard... */}
      </div>
    </ExecutiveGuard>
  );
}
