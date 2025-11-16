import React, { useEffect, useState } from "react";
import UserTableActions from "./UserTableActions";
import Alert from "../common/Alert";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
}


const roles = ["", "ADMIN", "STAFF", "EXECUTIVE", "DOCTOR"];
const statuses = ["", "ACTIVE", "INACTIVE", "SUSPENDED"];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [alert, setAlert] = useState<{ open: boolean; type?: "success" | "error" | "info"; message: string }>({ open: false, message: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);

  // ดึง JWT token จาก localStorage (หรือ context/auth ตามจริง)
  const getToken = () => typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(search ? { search } : {}),
        ...(role ? { role } : {}),
        ...(status ? { status } : {}),
      });
      const token = getToken();
      const res = await fetch(`/api/users?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data = await res.json();
      if (data.success) {
        setUsers(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotal(data.pagination?.total || 0);
      } else {
        setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
      }
    } catch {
      setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, role, status, page, limit]);

  if (loading) return <div>กำลังโหลด...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <Alert open={alert.open} type={alert.type} message={alert.message} onClose={() => setAlert(a => ({ ...a, open: false }))} />
      <div className="flex flex-wrap gap-2 mb-4 items-end">
        <div>
          <label className="block text-xs font-medium mb-1">ค้นหา</label>
          <input
            className="border rounded px-2 py-1 text-sm"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="username, email, ชื่อ"
          />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Role</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={role}
            onChange={e => { setRole(e.target.value); setPage(1); }}
          >
            <option value="">ทั้งหมด</option>
            {roles.filter(r => r).map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Status</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={status}
            onChange={e => { setStatus(e.target.value); setPage(1); }}
          >
            <option value="">ทั้งหมด</option>
            {statuses.filter(s => s).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">แสดงต่อหน้า</label>
          <select
            className="border rounded px-2 py-1 text-sm"
            value={limit}
            onChange={e => { setLimit(Number(e.target.value)); setPage(1); }}
          >
            {[10, 20, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <div className="ml-auto text-xs text-gray-500">{`ทั้งหมด ${total} รายการ`}</div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">#</th>
              <th className="border px-2 py-1">Username</th>
              <th className="border px-2 py-1">ชื่อ-นามสกุล</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Role</th>
              <th className="border px-2 py-1">Status</th>
              <th className="border px-2 py-1">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4">ไม่พบข้อมูลผู้ใช้</td>
              </tr>
            ) : (
              users.map((u, idx) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{(page - 1) * limit + idx + 1}</td>
                  <td className="border px-2 py-1">{u.username}</td>
                  <td className="border px-2 py-1">{u.fullName}</td>
                  <td className="border px-2 py-1">{u.email}</td>
                  <td className="border px-2 py-1">{u.role}</td>
                  <td className="border px-2 py-1">{u.status}</td>
                  <td className="border px-2 py-1 text-center">
                    <UserTableActions
                      userId={u.id}
                      onView={id => setAlert({ open: true, type: "info", message: `ดูข้อมูลผู้ใช้ ${id}` })}
                      onEdit={id => setAlert({ open: true, type: "info", message: `แก้ไขผู้ใช้ ${id}` })}
                      onDelete={id => setAlert({ open: true, type: "error", message: `ยืนยันลบผู้ใช้ ${id}` })}
                      onStatus={id => setAlert({ open: true, type: "info", message: `เปลี่ยนสถานะผู้ใช้ ${id}` })}
                      onRole={id => setAlert({ open: true, type: "info", message: `เปลี่ยน role ผู้ใช้ ${id}` })}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
        >ก่อนหน้า</button>
        <span className="text-sm">หน้า {page} / {totalPages}</span>
        <button
          className="px-2 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >ถัดไป</button>
      </div>
    </div>
  );
};

export default UserTable;
