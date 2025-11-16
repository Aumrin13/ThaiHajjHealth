import React from "react";

interface AlertProps {
  open: boolean;
  type?: "success" | "error" | "info";
  message: string;
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ open, type = "info", message, onClose }) => {
  if (!open) return null;
  let color = "bg-blue-100 text-blue-800 border-blue-300";
  if (type === "success") color = "bg-green-100 text-green-800 border-green-300";
  if (type === "error") color = "bg-red-100 text-red-800 border-red-300";
  return (
    <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 border px-4 py-2 rounded shadow ${color}`}
         role="alert">
      <span>{message}</span>
      <button className="ml-4 text-xs underline" onClick={onClose}>ปิด</button>
    </div>
  );
};

export default Alert;
