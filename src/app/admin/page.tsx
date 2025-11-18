import type { Metadata } from "next";
import { EcommerceMetrics } from "@/components/ecommerce/EcommerceMetrics";
import { OneIDHealthRecord } from "@/components/ecommerce/OneIDHealthRecord";
import { DiseaseSurveillance } from "@/components/ecommerce/DiseaseSurveillance";
import { HealthCertificate } from "@/components/ecommerce/HealthCertificate";
import React from "react";
import MonthlyTarget from "@/components/ecommerce/MonthlyTarget";
import MonthlySalesChart from "@/components/ecommerce/MonthlySalesChart";
import StatisticsChart from "@/components/ecommerce/StatisticsChart";
import RecentOrders from "@/components/ecommerce/RecentOrders";
import DemographicCard from "@/components/ecommerce/DemographicCard";
import {
  CheckCircleIcon,
  AlertIcon,
  CalenderIcon,
} from "@/icons/index";

export const metadata: Metadata = {
  title: "ระบ�บสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์ - แดชบอร์ดผู้ดูแล",
  description: "ระบบจัดการสุขภาพไทยสำหรับผู้เดินทางไปประกอบพิธีฮัจญ์ - ติดตามและจัดการข้อมูลสุขภาพผู้เดินทาง",
};

export default function ThaiHajjHealthDashboard() {
  return (
    <>
      {/* Header Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-brand-500 to-brand-600 dark:from-brand-600 dark:to-brand-700 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold mb-2">
            ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์
          </h1>
          <p className="text-brand-100 text-lg">
            ดูแลครอบคลุม 3 ระยะ: ก่อน • ระหว่าง • หลังเดินทาง
          </p>
        </div>
      </div>

      {/* Key Concepts Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-6 dark:border-blue-800 dark:bg-blue-500/10 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-200 dark:bg-blue-700 flex items-center justify-center mr-3">
              <CalenderIcon className="w-6 h-6 text-blue-900 dark:text-blue-200" />
            </div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200">ระยะที่ 1</h3>
          </div>
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">ก่อนเดินทาง</p>
          <p className="text-xs text-blue-700 dark:text-blue-400">การตรวจสุขภาพและเตรียมความพร้อม</p>
        </div>
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-6 dark:border-green-800 dark:bg-green-500/10 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-200 dark:bg-green-700 flex items-center justify-center mr-3">
              <CheckCircleIcon className="w-6 h-6 text-green-900 dark:text-green-200" />
            </div>
            <h3 className="font-bold text-green-900 dark:text-green-200">ระยะที่ 2</h3>
          </div>
          <p className="text-sm font-semibold text-green-900 dark:text-green-300 mb-1">ระหว่างการเดินทาง</p>
          <p className="text-xs text-green-700 dark:text-green-400">ติดตามและสนับสนุนสุขภาพอย่างต่อเนื่อง</p>
        </div>
        <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-6 dark:border-yellow-800 dark:bg-yellow-500/10 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-yellow-200 dark:bg-yellow-700 flex items-center justify-center mr-3">
              <AlertIcon className="w-6 h-6 text-yellow-900 dark:text-yellow-200" />
            </div>
            <h3 className="font-bold text-yellow-900 dark:text-yellow-200">ระยะที่ 3</h3>
          </div>
          <p className="text-sm font-semibold text-yellow-900 dark:text-yellow-300 mb-1">หลังเดินทาง</p>
          <p className="text-xs text-yellow-700 dark:text-yellow-400">ประเมินและจัดการข้อมูลสุขภาพหลังเดินทาง</p>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <EcommerceMetrics />
        <OneIDHealthRecord />
        <DiseaseSurveillance />
        <HealthCertificate />
        <MonthlyTarget />
        <MonthlySalesChart />
        <StatisticsChart />
        <RecentOrders />
        <DemographicCard />
      </div>
    </>
  );
}
