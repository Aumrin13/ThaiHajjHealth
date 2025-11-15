"use client";

import React, { useState } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";

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
    <form className="space-y-6 max-w-xl mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">สมัครสมาชิก</h2>
      {error && <div className="text-error-500 text-sm">{error}</div>}
      {success && <div className="text-success-500 text-sm">{success}</div>}
      <div>
        <Label>ชื่อผู้ใช้ (username)</Label>
        <Input name="username" value={form.username} onChange={handleChange} required />
      </div>
      <div>
        <Label>รหัสผ่าน</Label>
        <Input name="password" type="password" value={form.password} onChange={handleChange} required />
      </div>
      <div>
        <Label>อีเมล</Label>
        <Input name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <div>
        <Label>ชื่อ-นามสกุล</Label>
        <Input name="fullName" value={form.fullName} onChange={handleChange} required />
      </div>
      <div>
        <Label>โรงพยาบาล</Label>
        <Select
          options={hospitals.map((h) => ({ value: h.name, label: h.name }))}
          placeholder="เลือกโรงพยาบาล"
          onChange={value => setForm({ ...form, hospital: value })}
          defaultValue={form.hospital}
        />
      </div>
      <div>
        <Label>เบอร์โทรศัพท์</Label>
        <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} required />
      </div>
      <div>
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
      <div>
        <Label>สถานที่ทำงาน</Label>
        <Input name="workplace" value={form.workplace} onChange={handleChange} />
      </div>
      <div>
        <Label>ตำแหน่ง</Label>
        <Input name="position" value={form.position} onChange={handleChange} />
      </div>
      <Button type="submit" className="w-full" size="sm" disabled={loading}>
        {loading ? "กำลังสมัคร..." : "สมัครสมาชิก"}
      </Button>
    </form>
  );
}
