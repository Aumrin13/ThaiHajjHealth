"use client";
import React, { useState } from "react";
import ComponentCard from "@/components/common/ComponentCard";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import {
  CheckCircle2Icon,
  AlertCircleIcon,
  XCircleIcon,
} from "@/components/icons/HealthIcons";

// Fake Data
const FAKE_HEALTH_CHECKS = [
  {
    checkDate: "2024-11-10",
  // ...existing code...
    type: "ตรวจสุขภาพก่อนเดินทาง",
    bloodPressure: "140/90",
    bloodSugar: "150",
  // ...existing code...
		height: "170",
  },
];

export default function HealthCheckPage() {
  return <div>Health Check Page</div>;
}
