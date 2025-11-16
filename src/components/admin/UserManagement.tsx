import React from "react";
import UserTable from "./UserTable";

const UserManagement: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">จัดการผู้ใช้ (User Management)</h1>
      <div className="bg-white rounded shadow p-4">
        <UserTable />
      </div>
    </div>
  );
};

export default UserManagement;
