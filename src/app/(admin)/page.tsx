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
  CalenderIcon,
  PieChartIcon,
  CheckCircleIcon,
  AlertIcon,
  FileIcon,
  DownloadIcon,
  ArrowRightIcon,
} from "@/icons/index";

export const metadata: Metadata = {
  title: "ระบบสุขภาพผู้เดินทางไปประกอบพิธีฮัจญ์ - แดชบอร์ดผู้ดูแล",
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
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-500/10 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-lg bg-amber-200 dark:bg-amber-700 flex items-center justify-center mr-3">
              <AlertIcon className="w-6 h-6 text-amber-900 dark:text-amber-200" />
            </div>
            <h3 className="font-bold text-amber-900 dark:text-amber-200">ระยะที่ 3</h3>
          </div>
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-1">หลังเดินทาง</p>
          <p className="text-xs text-amber-700 dark:text-amber-400">เฝ้าระวัง 14 วัน หลังกลับจากต่างประเทศ</p>
        </div>
      </div>

      {/* Health Metrics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">ตัวชี้วัดหลัก</h2>
        <EcommerceMetrics />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* One ID System */}
        <div className="col-span-12 lg:col-span-6">
          <OneIDHealthRecord />
        </div>

        {/* Health Targets */}
        <div className="col-span-12 lg:col-span-6">
          <MonthlyTarget />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Disease Surveillance */}
        <div className="col-span-12 lg:col-span-6">
          <DiseaseSurveillance />
        </div>

        {/* Health Certificate */}
        <div className="col-span-12 lg:col-span-6">
          <HealthCertificate />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">แนวโน้มการตรวจสุขภาพ</h2>
        <MonthlySalesChart />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">สถิติรายละเอียด</h2>
        <StatisticsChart />
      </div>

      <div className="grid grid-cols-12 gap-6 mb-8">
        {/* Geographic Distribution */}
        <div className="col-span-12 lg:col-span-5">
          <DemographicCard />
        </div>

        {/* Recent Activities & Records */}
        <div className="col-span-12 lg:col-span-7">
          <RecentOrders />
        </div>
      </div>

      {/* Quick Access Section */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">เข้าถึงเร็ว</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/one-id" className="bg-blue-50 dark:bg-blue-500/10 p-4 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-500/20 transition border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-2">
              <FileIcon className="w-5 h-5 text-blue-900 dark:text-blue-300 mr-2" />
              <p className="font-semibold text-blue-900 dark:text-blue-300">One ID</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">ตรวจสอบระเบียน</p>
          </a>
          <a href="/disease-surveillance" className="bg-red-50 dark:bg-red-500/10 p-4 rounded-lg hover:bg-red-100 dark:hover:bg-red-500/20 transition border border-red-200 dark:border-red-800">
            <div className="flex items-center mb-2">
              <AlertIcon className="w-5 h-5 text-red-900 dark:text-red-300 mr-2" />
              <p className="font-semibold text-red-900 dark:text-red-300">เฝ้าระวัง</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">ติดตามโรค</p>
          </a>
          <a href="/health-certificate" className="bg-green-50 dark:bg-green-500/10 p-4 rounded-lg hover:bg-green-100 dark:hover:bg-green-500/20 transition border border-green-200 dark:border-green-800">
            <div className="flex items-center mb-2">
              <CheckCircleIcon className="w-5 h-5 text-green-900 dark:text-green-300 mr-2" />
              <p className="font-semibold text-green-900 dark:text-green-300">ใบรับรอง</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">ใบหนังสือรับรอง</p>
          </a>
          <a href="/health-literacy" className="bg-purple-50 dark:bg-purple-500/10 p-4 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-500/20 transition border border-purple-200 dark:border-purple-800">
            <div className="flex items-center mb-2">
              <PieChartIcon className="w-5 h-5 text-purple-900 dark:text-purple-300 mr-2" />
              <p className="font-semibold text-purple-900 dark:text-purple-300">การศึกษา</p>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">บทเรียน</p>
          </a>
        </div>
      </div>
    </>
  );
}
