import { useState } from "react";
import { updateTaskStatus } from "../../api";
import type { Task, User } from "../../types";

interface TaskCardProps {
  task: Task;
  onUpdated: (task: Task) => void;
}

export default function TaskCard({ task, onUpdated }: TaskCardProps) {
  const [loading, setLoading] = useState(false);
  const assignee = task.assignedTo as User | string;
  const dueDate = new Date(task.dueDate);
  const isComplete = task.status === "COMPLETED";
  const isOverdue = dueDate < new Date() && !isComplete;

  const toggle = async () => {
    setLoading(true);
    try {
      const newStatus = isComplete ? "PENDING" : "COMPLETED";
      const updated = await updateTaskStatus(task._id, newStatus);
      onUpdated(updated);
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = dueDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const assigneeName = typeof assignee === "object" ? assignee.name : "";

  return (
    <article
      className={`flex h-full gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450] ${
        isComplete ? "opacity-70" : ""
      }`}
    >
      <button
        onClick={toggle}
        disabled={loading}
        aria-label={isComplete ? "Mark task pending" : "Mark task complete"}
        className={`mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 text-xs font-black transition disabled:opacity-50 ${
          isComplete
            ? "border-[#2D35D4] bg-[#2D35D4] text-white"
            : "border-slate-300 bg-white text-transparent hover:border-indigo-600 dark:border-[#2D35D4]/50 dark:bg-[#0D0F3C]"
        }`}
      >
        ✓
      </button>

      <div className="min-w-0 flex-1">
        <h3
          className={`text-sm font-bold ${
            isComplete
              ? "text-slate-500 line-through dark:text-[#6B75D4]"
              : "text-slate-950 dark:text-white"
          }`}
        >
          {task.title}
        </h3>
        {task.description && (
          <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {assigneeName && (
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-900 dark:bg-[#1A1F8C]/70 dark:text-[#DDE2FF]">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-[#2D35D4] text-[10px] text-white">
                {assigneeName[0]?.toUpperCase()}
              </span>
              {assigneeName}
            </span>
          )}
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              isOverdue
                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-200"
                : "bg-slate-100 text-slate-600 dark:bg-[#0D0F3C] dark:text-[#AEB5FF]"
            }`}
          >
            {isOverdue ? `Overdue · ${formattedDate}` : formattedDate}
          </span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              isComplete
                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-200"
                : "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-200"
            }`}
          >
            {task.status}
          </span>
        </div>
      </div>
    </article>
  );
}
