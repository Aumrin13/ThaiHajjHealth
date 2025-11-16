import React, { useEffect, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        } else {
          setError("ไม่สามารถโหลดข้อมูลผู้ใช้ได้");
        }
      } catch {
        setError("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  if (loading) return <div>กำลังโหลด...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
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
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-4">ไม่พบข้อมูลผู้ใช้</td>
            </tr>
          ) : (
            users.map((u, idx) => (
              <tr key={u.id} className="hover:bg-gray-50">
                <td className="border px-2 py-1">{idx + 1}</td>
                <td className="border px-2 py-1">{u.username}</td>
                <td className="border px-2 py-1">{u.fullName}</td>
                <td className="border px-2 py-1">{u.email}</td>
                <td className="border px-2 py-1">{u.role}</td>
                <td className="border px-2 py-1">{u.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
