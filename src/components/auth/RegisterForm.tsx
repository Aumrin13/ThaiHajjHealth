"use client";


import React, { useState } from "react";
import { UserIcon, IdentificationIcon, Building2Icon } from "lucide-react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import ComponentCard from "@/components/common/ComponentCard";


export default function RegisterForm() {
  // State for form fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "PENDING",
    hospital: "",
    phoneNumber: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    workplace: "",
    position: "",
  });
  interface Province { id?: string | number; name: string; }
  interface Amphur { id?: string | number; name: string; }
  interface Subdistrict { id?: string | number; name: string; }
  interface Hospital { id?: string | number; name: string; code?: string; }

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [amphurs, setAmphurs] = useState<Amphur[]>([]); // district
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // For PhoneInput country codes (example, can be customized)
  const countries = [
    { code: "TH", label: "+66" },
    { code: "US", label: "+1" },
    { code: "GB", label: "+44" },
  ];

  // Stepper state
  const [step, setStep] = useState(1);
  const steps = [
    {
      key: 1,
      label: "ข้อมูลบัญชี",
      icon: <UserIcon size={20} />,
    },
    {
      key: 2,
      label: "ข้อมูลส่วนตัว",
      icon: <IdentificationIcon size={20} />,
    },
    {
      key: 3,
      label: "ข้อมูลโรงพยาบาล/งาน",
      icon: <Building2Icon size={20} />,
    },
  ];


  // Fetch provinces, hospitals on mount
  React.useEffect(() => {
    fetch("/api/provinces").then(r => r.json()).then(data => setProvinces(data));
    fetch("/api/hospitals").then(r => r.json()).then(data => setHospitals(data));
  }, []);

  // Fetch amphurs (districts) when province changes
  React.useEffect(() => {
    if (form.province) {
      fetch(`/api/amphurs?province=${encodeURIComponent(form.province)}`)
        .then(r => r.json())
        .then(data => setAmphurs(data));
    } else {
      setAmphurs([]);
    }
    setForm(f => ({ ...f, district: "", subdistrict: "" }));
  }, [form.province]);

  // Fetch subdistricts when district changes
  React.useEffect(() => {
    if (form.district) {
      fetch(`/api/subdistricts?district=${encodeURIComponent(form.district)}`)
        .then(r => r.json())
        .then(data => setSubdistricts(data));
    } else {
      setSubdistricts([]);
    }
    setForm(f => ({ ...f, subdistrict: "" }));
  }, [form.district]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("สมัครสมาชิกสำเร็จ กรุณารอการอนุมัติ");
        setForm({
          username: "",
          email: "",
          password: "",
          fullName: "",
          role: "PENDING",
          hospital: "",
          phoneNumber: "",
          address: "",
          subdistrict: "",
          district: "",
          province: "",
          workplace: "",
          position: "",
        });
      } else {
        setError(data.message || "เกิดข้อผิดพลาด");
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  return (
    <ComponentCard title="สมัครสมาชิก" className="max-w-xl mx-auto mt-6">
      {/* Stepper Navigation */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((s, idx) => (
          <div key={s.key} className="flex-1 flex flex-col items-center relative">
            <button
              type="button"
              className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 z-10
                ${step === s.key ? "bg-blue-600 border-blue-600 text-white shadow-lg" : step > s.key ? "bg-green-500 border-green-500 text-white" : "bg-gray-200 border-gray-300 text-gray-400"}
              `}
              disabled={step < s.key}
              onClick={() => step > s.key && setStep(s.key)}
            >
              {s.icon}
            </button>
            <span className={`mt-2 text-xs font-medium ${step === s.key ? "text-blue-600" : step > s.key ? "text-green-500" : "text-gray-400"}`}>{s.label}</span>
            {idx < steps.length - 1 && (
              <span className={`absolute top-5 left-1/2 w-full h-1 z-0 ${step > s.key ? "bg-green-500" : "bg-gray-200"}`} style={{ right: "-50%", left: "50%", width: "100%" }}></span>
            )}
          </div>
        ))}
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <div className="text-error-500 text-sm mb-2">{error}</div>}
        {success && <div className="text-success-500 text-sm mb-2">{success}</div>}
        {/* Step 1: Account Info */}
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>ชื่อผู้ใช้ (username)</Label>
              <Input name="username" value={form.username} onChange={handleChange} required />
            </div>
            <div>
              <Label>รหัสผ่าน</Label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>อีเมล</Label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
        )}
        {/* Step 2: Personal Info */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>ชื่อ-นามสกุล</Label>
              <Input name="fullName" value={form.fullName} onChange={handleChange} required />
            </div>
            <div className="md:col-span-2">
              <Label>เบอร์โทรศัพท์</Label>
              <PhoneInput
                countries={countries}
                placeholder="เช่น 0812345678"
                onChange={value => setForm({ ...form, phoneNumber: value })}
                selectPosition="start"
              />
            </div>
            <div className="md:col-span-2">
              <Label>ที่อยู่</Label>
              <Input name="address" value={form.address} onChange={handleChange} />
            </div>
            <div>
              <Label>จังหวัด</Label>
              <Select
                options={provinces.map((p) => ({ value: p.name, label: p.name }))}
                placeholder="เลือกจังหวัด"
                onChange={value => setForm({ ...form, province: value })}
                defaultValue={form.province}
              />
            </div>
            <div>
              <Label>อำเภอ/เขต</Label>
              <Select
                options={amphurs.map((a) => ({ value: a.name, label: a.name }))}
                placeholder="เลือกอำเภอ/เขต"
                onChange={value => setForm({ ...form, district: value })}
                defaultValue={form.district}
              />
            </div>
            <div>
              <Label>ตำบล/แขวง</Label>
              <Select
                options={subdistricts.map((s) => ({ value: s.name, label: s.name }))}
                placeholder="เลือกตำบล/แขวง"
                onChange={value => setForm({ ...form, subdistrict: value })}
                defaultValue={form.subdistrict}
              />
            </div>
          </div>
        )}
        {/* Step 3: Work Info */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>โรงพยาบาล</Label>
              <Select
                options={hospitals.map((h) => ({ value: h.name, label: h.name }))}
                placeholder="เลือกโรงพยาบาล"
                onChange={value => setForm({ ...form, hospital: value })}
                defaultValue={form.hospital}
              />
            </div>
            <div>
              <Label>สถานที่ทำงาน</Label>
              <Input name="workplace" value={form.workplace} onChange={handleChange} />
            </div>
            <div>
              <Label>ตำแหน่ง</Label>
              <Input name="position" value={form.position} onChange={handleChange} />
            </div>
          </div>
        )}
        {/* Stepper Navigation Buttons */}
        <div className="flex justify-between gap-2 pt-2">
          {step > 1 && (
            <Button type="button" size="sm" className="w-32" onClick={() => setStep(step - 1)}>
              ย้อนกลับ
            </Button>
          )}
          {step < 3 && (
            <Button type="button" size="sm" className="w-32 ml-auto" onClick={() => setStep(step + 1)}>
              ถัดไป
            </Button>
          )}
          {step === 3 && (
            <Button type="submit" className="w-32 ml-auto" size="sm" disabled={loading}>
              {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
            </Button>
          )}
        </div>
      </form>
    </ComponentCard>
  );
}
