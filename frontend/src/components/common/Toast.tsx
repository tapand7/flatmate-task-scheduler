import { useEffect } from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
  duration?: number;
}

export default function Toast({ message, type, onClose, duration = 3500 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={`fixed right-5 top-5 z-50 flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold text-white shadow-lg ${
        type === "success" ? "bg-emerald-600" : "bg-rose-600"
      }`}
    >
      <span>{type === "success" ? "OK" : "!"}</span>
      <span>{message}</span>
    </div>
  );
}
