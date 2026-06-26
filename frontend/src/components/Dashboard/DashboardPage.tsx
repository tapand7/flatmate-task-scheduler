/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { getTasks } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import type { Task } from "../../types";
import CreateTaskModal from "../Tasks/CreateTaskModal";
import TaskCard from "../Tasks/TaskCard";

const PAGE_SIZE = 6;

/* ── Subtle themed wallpaper background ── */
function DashboardWallpaper() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.05] dark:opacity-[0.05]">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="wall"
            x="0"
            y="0"
            width="120"
            height="120"
            patternUnits="userSpaceOnUse"
          >
            {/* Checkbox / task done */}
            <rect
              x="8"
              y="10"
              width="18"
              height="18"
              rx="4"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <polyline
              points="12,19 16,23 22,14"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Round-robin arrows */}
            <path
              d="M54 12 a10 10 0 1 1 -7 17"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <polyline
              points="44,26 47,30 51,26"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Clock / scheduler */}
            <circle
              cx="95"
              cy="20"
              r="10"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <line
              x1="95"
              y1="12"
              x2="95"
              y2="20"
              stroke="#2D35D4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="95"
              y1="20"
              x2="101"
              y2="23"
              stroke="#2D35D4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* People / flat members */}
            <circle
              cx="20"
              cy="70"
              r="5"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M10 85 a10 10 0 0 1 20 0"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
            <circle
              cx="36"
              cy="70"
              r="5"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M26 85 a10 10 0 0 1 20 0"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />

            {/* Task list lines */}
            <line
              x1="60"
              y1="60"
              x2="110"
              y2="60"
              stroke="#2D35D4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="68"
              x2="98"
              y2="68"
              stroke="#2D35D4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1="60"
              y1="76"
              x2="104"
              y2="76"
              stroke="#2D35D4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <rect
              x="52"
              y="56"
              width="6"
              height="6"
              rx="1.5"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="52"
              y="64"
              width="6"
              height="6"
              rx="1.5"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />
            <rect
              x="52"
              y="72"
              width="6"
              height="6"
              rx="1.5"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
            />

            {/* Small dots — scatter */}
            <circle cx="45" cy="48" r="1.5" fill="#2D35D4" />
            <circle cx="80" cy="42" r="1.5" fill="#080c4e" />
            <circle cx="10" cy="100" r="1.5" fill="#2D35D4" />
            <circle cx="110" cy="100" r="1.5" fill="#12154d" />

            {/* Lightning / priority */}
            <path
              d="M90 55 l-4 8 h4 l-4 8"
              stroke="#2D35D4"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#wall)" />
      </svg>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!user?.flatId) {
      setLoading(false);
      return;
    }

    getTasks(user.flatId)
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => setLoading(false));
  }, [user]);

  const pending = tasks.filter((task) => task.status === "PENDING");
  const completed = tasks.filter((task) => task.status === "COMPLETED");
  const mine = tasks.filter((task) => {
    const assignee = task.assignedTo as { _id?: string } | string;
    return typeof assignee === "object"
      ? assignee._id === user?._id
      : assignee === user?._id;
  });

  const totalPages = Math.ceil(tasks.length / PAGE_SIZE);
  const paginated = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleCreated = (task: Task) => {
    setTasks((current) => [task, ...current]);
    setShowModal(false);
    setPage(1);
  };

  const handleUpdated = (updated: Task) => {
    setTasks((current) =>
      current.map((task) => (task._id === updated._id ? updated : task)),
    );
  };

  return (
    <div className="relative min-h-full">
      {/* Wallpaper */}
      <DashboardWallpaper />

      {/* Page content sits above wallpaper */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 py-8">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 dark:text-[#87CEEB]">
              Good to see you,
            </p>
            <h1 className="text-3xl font-black text-slate-950 dark:text-white">
              {user?.name}
            </h1>
            <p className="mt-2 text-sm text-slate-500 dark:text-[#AEB5FF]">
              Here is what is happening in your flat today.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-[#2D35D4] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#1A1F8C]"
          >
            New task
          </button>
        </header>

        <section className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Pending tasks",
              value: pending.length,
              color: "text-amber-600",
            },
            {
              label: "Completed",
              value: completed.length,
              color: "text-emerald-600",
            },
            {
              label: "Assigned to me",
              value: mine.length,
              color: "text-indigo-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-slate-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]/80"
            >
              <p className={`text-3xl font-black ${stat.color}`}>
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-medium text-slate-500 dark:text-[#AEB5FF]">
                {stat.label}
              </p>
            </div>
          ))}
        </section>

        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">
              Recent tasks
            </h2>
            <span className="text-sm text-slate-500 dark:text-[#AEB5FF]">
              {tasks.length} total
            </span>
          </div>

          {loading ? (
            <div className="rounded-lg border border-slate-200 bg-white/80 p-10 text-center text-sm font-semibold text-slate-500 backdrop-blur-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]/80 dark:text-[#AEB5FF]">
              Loading tasks...
            </div>
          ) : tasks.length === 0 ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-10 text-center backdrop-blur-sm dark:border-[#2D35D4]/40 dark:bg-[#101450]/80">
              <p className="font-bold text-slate-950 dark:text-white">
                No tasks yet
              </p>
              <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">
                Create your first task to get started.
              </p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 rounded-lg bg-[#2D35D4] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1A1F8C]"
              >
                Create task
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paginated.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onUpdated={handleUpdated}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-500 dark:text-[#AEB5FF]">
                    Page {page} of {totalPages} &middot; {tasks.length} tasks
                  </p>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      aria-label="Previous page"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:border-[#2D35D4]/30 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 18l-6-6 6-6" />
                      </svg>
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => setPage(p)}
                          className={`h-8 min-w-8 rounded-lg px-2 text-xs font-bold transition ${
                            p === page
                              ? "bg-[#2D35D4] text-white"
                              : "border border-slate-200 text-slate-500 hover:bg-slate-100 dark:border-[#2D35D4]/30 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
                          }`}
                        >
                          {p}
                        </button>
                      ),
                    )}

                    <button
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      aria-label="Next page"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:border-[#2D35D4]/30 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {totalPages <= 1 && (
                <p className="mt-4 text-right text-xs font-medium text-slate-500 dark:text-[#AEB5FF]">
                  Showing {tasks.length} tasks
                </p>
              )}
            </>
          )}
        </section>

        {showModal && (
          <CreateTaskModal
            onClose={() => setShowModal(false)}
            onCreated={handleCreated}
          />
        )}
      </div>
    </div>
  );
}
