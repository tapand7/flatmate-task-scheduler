import { useState } from "react";
import type { FormEvent } from "react";
import { createTask } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import { getFlatId, type Task } from "../../types";

interface CreateTaskModalProps {
  onClose: () => void;
  onCreated: (task: Task) => void;
}

export default function CreateTaskModal({
  onClose,
  onCreated,
}: CreateTaskModalProps) {
  const { user } = useAuth();
  const [form, setForm] = useState({ title: "", description: "", dueDate: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!user?.flatId) return;
    setLoading(true);
    setError("");
    try {
      const response = await createTask({
        ...form,
        flatId: getFlatId(user.flatId),
      });
      onCreated(response.task);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const minDate = new Date().toISOString().split("T")[0];

  return (
    <div
      className="fixed inset-0 z-40 grid place-items-center bg-slate-950/50 px-4"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <section className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl dark:border dark:border-[#2D35D4]/30 dark:bg-[#101450]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Create task
            </h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">
              The backend assigns it to the next active member.
            </p>
          </div>
          <button
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-full border border-slate-300 text-slate-500 hover:bg-slate-100 dark:border-[#2D35D4]/50 dark:text-[#87CEEB] dark:hover:bg-[#1A1F8C]"
          >
            x
          </button>
        </div>

        <div className="mb-5 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-950 dark:border-[#2D35D4]/40 dark:bg-[#1A1F8C]/70 dark:text-[#DDE2FF]">
          Round-robin assignment skips members marked OOF.
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">
              Task title
            </span>
            <input
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
              placeholder="Clean kitchen"
              value={form.title}
              onChange={(event) =>
                setForm({ ...form, title: event.target.value })
              }
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">
              Description
            </span>
            <textarea
              className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
              placeholder="Optional details"
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              rows={3}
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">
              Due date
            </span>
            <input
              type="date"
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white"
              value={form.dueDate}
              min={minDate}
              onChange={(event) =>
                setForm({ ...form, dueDate: event.target.value })
              }
              required
            />
          </label>

          {error && (
            <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm font-medium text-rose-700">
              {error}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-[#2D35D4]/50 dark:text-[#DDE2FF] dark:hover:bg-[#1A1F8C]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-[2] rounded-lg bg-[#2D35D4] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1A1F8C] disabled:opacity-60"
            >
              {loading ? "Assigning..." : "Assign task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
