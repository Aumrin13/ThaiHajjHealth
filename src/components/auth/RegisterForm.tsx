"use client";


import React, { useState } from "react";
import { UserIcon, UserCircleIcon, Building2Icon } from "lucide-react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select2 from "@/components/form/Select2";
import PhoneInput from "@/components/form/group-input/PhoneInput";
import ComponentCard from "@/components/common/ComponentCard";


export default function RegisterForm() {
    // Error state for each field
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  // State for form fields
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    role: "STAFF",
    hospital: "",
    phoneNumber: "",
    address: "",
    subdistrict: "",
    district: "",
    province: "",
    workplace: "",
    position: "",
  });
  // Store selected ids for province, amphur, subdistrict, hospital
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
  const [selectedAmphur, setSelectedAmphur] = useState<Amphur | null>(null);
  const [selectedSubdistrict, setSelectedSubdistrict] = useState<Subdistrict | null>(null);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null);
  interface Province { id: number; name: string; }
  interface Amphur { id: number; name: string; }
  interface Subdistrict { id: number; name: string; }
  interface Hospital { id?: string | number; name: string; code?: string; }

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [amphurs, setAmphurs] = useState<Amphur[]>([]);
  const [subdistricts, setSubdistricts] = useState<Subdistrict[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [provinceId, setProvinceId] = useState<number | null>(null);
  const [amphurId, setAmphurId] = useState<number | null>(null);
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
      icon: <UserCircleIcon size={20} />,
    },
    {
      key: 3,
      label: "ข้อมูลโรงพยาบาล/งาน",
      icon: <Building2Icon size={20} />,
    },
  ];


  // Fetch provinces on mount
  React.useEffect(() => {
    fetch("/api/provinces")
      .then(r => r.json())
      .then(data => setProvinces(data));
  }, []);

  // Fetch amphurs when provinceId changes
  React.useEffect(() => {
    if (provinceId) {
      fetch(`/api/amphurs?provinceId=${provinceId}`)
        .then(r => r.json())
        .then(data => setAmphurs(data));
    } else {
      setAmphurs([]);
    }
    setAmphurId(null);
    setForm(f => ({ ...f, district: "", subdistrict: "" }));
  }, [provinceId]);

  // Fetch subdistricts when amphurId changes
  React.useEffect(() => {
    if (amphurId) {
      fetch(`/api/districts?amphurId=${amphurId}`)
        .then(r => r.json())
        .then(data => setSubdistricts(data));
    } else {
      setSubdistricts([]);
    }
    setForm(f => ({ ...f, subdistrict: "" }));
  }, [amphurId]);

  // Fetch hospitals by location (province, amphur, subdistrict)
  React.useEffect(() => {
    if (form.province && form.district && form.subdistrict) {
      const params = new URLSearchParams({
        province: form.province,
        amphur: form.district,
        district: form.subdistrict,
      });
      fetch(`/api/hospitals/by-location?${params.toString()}`)
        .then(r => r.json())
        .then(data => setHospitals(data));
    } else if (form.province && form.district) {
      const params = new URLSearchParams({
        province: form.province,
        amphur: form.district,
      });
      fetch(`/api/hospitals/by-location?${params.toString()}`)
        .then(r => r.json())
        .then(data => setHospitals(data));
    } else if (form.province) {
      const params = new URLSearchParams({ province: form.province });
      fetch(`/api/hospitals/by-location?${params.toString()}`)
        .then(r => r.json())
        .then(data => setHospitals(data));
    } else {
      setHospitals([]);
    }
  }, [form.province, form.district, form.subdistrict]);

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
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: "" })); // clear error on change
  };

  // Validate fields for each step
  const validateStep = () => {
    const errors: { [key: string]: string } = {};
    if (step === 1) {
      if (!form.username) errors.username = "กรุณากรอกชื่อผู้ใช้";
      if (!form.password) errors.password = "กรุณากรอกรหัสผ่าน";
      else if (form.password.length < 6) errors.password = "รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร";
      if (!form.email) errors.email = "กรุณากรอกอีเมล";
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }
    if (step === 2) {
      if (!form.fullName) errors.fullName = "กรุณากรอกชื่อ-นามสกุล";
      if (!form.phoneNumber) errors.phoneNumber = "กรุณากรอกเบอร์โทรศัพท์";
      if (!selectedProvince) errors.province = "กรุณาเลือกจังหวัด";
      if (!selectedAmphur) errors.district = "กรุณาเลือกอำเภอ/เขต";
      if (!selectedSubdistrict) errors.subdistrict = "กรุณาเลือกตำบล/แขวง";
    }
    if (step === 3) {
      if (!selectedHospital) errors.hospital = "กรุณาเลือกโรงพยาบาล";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    setError("");
    setSuccess("");
    // Prepare payload with id/code for province, district, subdistrict, hospital
    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      fullName: form.fullName,
      role: form.role,
      hospital: selectedHospital ? selectedHospital.id || selectedHospital.code : "",
      phoneNumber: form.phoneNumber,
      address: form.address,
      subdistrict: selectedSubdistrict ? selectedSubdistrict.id : "",
      district: selectedAmphur ? selectedAmphur.id : "",
      province: selectedProvince ? selectedProvince.id : "",
      workplace: form.workplace,
      position: form.position,
    };
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess("สมัครสมาชิกสำเร็จ กรุณารอการอนุมัติ");
        setForm({
          username: "",
          email: "",
          password: "",
          fullName: "",
          role: "STAFF",
          hospital: "",
          phoneNumber: "",
          address: "",
          subdistrict: "",
          district: "",
          province: "",
          workplace: "",
          position: "",
        });
        setSelectedProvince(null);
        setSelectedAmphur(null);
        setSelectedSubdistrict(null);
        setSelectedHospital(null);
      } else {
        setError(data.message || "เกิดข้อผิดพลาด");
      }
    } catch {
      setError("เกิดข้อผิดพลาด");
    }
    setLoading(false);
  };

  // Step navigation with validation
  const handleNextStep = () => {
    if (validateStep()) setStep(step + 1);
  };
  const handlePrevStep = () => setStep(step - 1);

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
              <Input name="username" value={form.username} onChange={handleChange} required error={!!fieldErrors.username} hint={fieldErrors.username} />
            </div>
            <div>
              <Label>รหัสผ่าน</Label>
              <Input name="password" type="password" value={form.password} onChange={handleChange} required error={!!fieldErrors.password} hint={fieldErrors.password} />
            </div>
            <div className="md:col-span-2">
              <Label>อีเมล</Label>
              <Input name="email" type="email" value={form.email} onChange={handleChange} required error={!!fieldErrors.email} hint={fieldErrors.email} />
            </div>
          </div>
        )}
        {/* Step 2: Personal Info */}
        {step === 2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>ชื่อ-นามสกุล</Label>
              <Input name="fullName" value={form.fullName} onChange={handleChange} required error={!!fieldErrors.fullName} hint={fieldErrors.fullName} />
            </div>
            <div className="md:col-span-2">
              <Label>เบอร์โทรศัพท์</Label>
              <PhoneInput
                countries={countries}
                placeholder="เช่น 0812345678"
                onChange={value => {
                  setForm({ ...form, phoneNumber: value });
                  setFieldErrors((prev) => ({ ...prev, phoneNumber: "" }));
                }}
                selectPosition="start"
              />
              {fieldErrors.phoneNumber && <p className="mt-1.5 text-xs text-error-500">{fieldErrors.phoneNumber}</p>}
            </div>
            <div className="md:col-span-2">
              <Label>ที่อยู่</Label>
              <Input name="address" value={form.address} onChange={handleChange} />
            </div>
            <div>
              <Label>จังหวัด</Label>
              <Select2
                options={provinces.map((p) => ({ value: p.name, label: p.name, id: p.id }))}
                placeholder="เลือกจังหวัด"
                onChange={value => {
                  const selected = provinces.find(p => p.name === value);
                  setForm({ ...form, province: value });
                  setProvinceId(selected ? selected.id : null);
                  setSelectedProvince(selected || null);
                  setFieldErrors((prev) => ({ ...prev, province: "" }));
                }}
                defaultValue={form.province}
                
              />
              {fieldErrors.province && <p className="mt-1.5 text-xs text-error-500">{fieldErrors.province}</p>}
            </div>
            <div>
              <Label>อำเภอ/เขต</Label>
              <Select2
                options={amphurs.map((a) => ({ value: a.name, label: a.name, id: a.id }))}
                placeholder="เลือกอำเภอ/เขต"
                onChange={value => {
                  const selected = amphurs.find(a => a.name === value);
                  setForm({ ...form, district: value });
                  setAmphurId(selected ? selected.id : null);
                  setSelectedAmphur(selected || null);
                  setFieldErrors((prev) => ({ ...prev, district: "" }));
                }}
                defaultValue={form.district}
                
              />
              {fieldErrors.district && <p className="mt-1.5 text-xs text-error-500">{fieldErrors.district}</p>}
            </div>
            <div>
              <Label>ตำบล/แขวง</Label>
              <Select2
                options={subdistricts.map((s) => ({ value: s.name, label: s.name, id: s.id }))}
                placeholder="เลือกตำบล/แขวง"
                onChange={value => {
                  const selected = subdistricts.find(s => s.name === value);
                  setForm({ ...form, subdistrict: value });
                  setSelectedSubdistrict(selected || null);
                  setFieldErrors((prev) => ({ ...prev, subdistrict: "" }));
                }}
                defaultValue={form.subdistrict}
                
              />
              {fieldErrors.subdistrict && <p className="mt-1.5 text-xs text-error-500">{fieldErrors.subdistrict}</p>}
            </div>
          </div>
        )}
        {/* Step 3: Work Info */}
        {step === 3 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>โรงพยาบาล</Label>
              <Select2
                options={hospitals.map((h) => ({ value: h.name, label: h.name, id: h.id || h.code }))}
                placeholder="เลือกโรงพยาบาล"
                onChange={value => {
                  const selected = hospitals.find(h => h.name === value);
                  setForm({ ...form, hospital: value });
                  setSelectedHospital(selected || null);
                  setFieldErrors((prev) => ({ ...prev, hospital: "" }));
                }}
                defaultValue={form.hospital}

              />
              {fieldErrors.hospital && <p className="mt-1.5 text-xs text-error-500">{fieldErrors.hospital}</p>}
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
            <Button type="button" size="sm" className="w-32" onClick={handlePrevStep}>
              ย้อนกลับ
            </Button>
          )}
          {step < 3 && (
            <Button type="button" size="sm" className="w-32 ml-auto" onClick={handleNextStep}>
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
