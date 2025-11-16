import React from "react";

interface UserTableActionsProps {
  userId: string;
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatus: (id: string) => void;
  onRole: (id: string) => void;
}

const UserTableActions: React.FC<UserTableActionsProps> = ({ userId, onView, onEdit, onDelete, onStatus, onRole }) => {
  return (
    <div className="flex gap-1 justify-center">
      <button className="px-2 py-1 text-xs bg-blue-100 hover:bg-blue-200 rounded" title="ดู" onClick={() => onView(userId)}>ดู</button>
      <button className="px-2 py-1 text-xs bg-yellow-100 hover:bg-yellow-200 rounded" title="แก้ไข" onClick={() => onEdit(userId)}>แก้ไข</button>
      <button className="px-2 py-1 text-xs bg-green-100 hover:bg-green-200 rounded" title="สถานะ" onClick={() => onStatus(userId)}>สถานะ</button>
      <button className="px-2 py-1 text-xs bg-purple-100 hover:bg-purple-200 rounded" title="เปลี่ยน Role" onClick={() => onRole(userId)}>Role</button>
      <button className="px-2 py-1 text-xs bg-red-100 hover:bg-red-200 rounded" title="ลบ" onClick={() => onDelete(userId)}>ลบ</button>
    </div>
  );
};

export default UserTableActions;
