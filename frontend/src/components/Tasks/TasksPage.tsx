/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { getTasks } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import type { Task } from "../../types";
import CreateTaskModal from "./CreateTaskModal";
import TaskCard from "./TaskCard";
import { usePageLoader } from "../usePageLoader";
import PageLoader from "../common/PageLoader";

type Filter = "ALL" | "PENDING" | "COMPLETED";

const PAGE_SIZE = 6;

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("ALL");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(1);
  const { loading: pageLoading, withLoader } = usePageLoader();

  useEffect(() => {
    if (!user?.flatId) {
      return;
    }
    getTasks(user.flatId)
      .then(setTasks)
      .catch(() => setTasks([]))
      .finally(() => {});
  }, [user]);

  const filtered = tasks
    .filter((task) => filter === "ALL" || task.status === filter)
    .filter((task) => task.title.toLowerCase().includes(search.toLowerCase()));

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleFilterChange = (f: Filter) => {
    setFilter(f);
    setPage(1);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

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
  const handlePageChange = (newPage: number) => {
    withLoader(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setPage(newPage);
    });
  };
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      {pageLoading && <PageLoader />}
      <header className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">
            Tasks
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-[#AEB5FF]">
            All flat tasks, auto-assigned by round-robin.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-lg bg-[#2D35D4] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#1A1F8C]"
        >
          New task
        </button>
      </header>

      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          className="min-w-64 flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#101450] dark:text-white dark:placeholder:text-[#6B75D4]"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <div className="flex rounded-lg border border-slate-200 bg-white p-1 dark:border-[#2D35D4]/30 dark:bg-[#101450]">
          {(["ALL", "PENDING", "COMPLETED"] as Filter[]).map((item) => (
            <button
              key={item}
              onClick={() => handleFilterChange(item)}
              className={`rounded-md px-3 py-2 text-xs font-bold transition ${
                filter === item
                  ? "bg-[#2D35D4] text-white"
                  : "text-slate-500 hover:bg-slate-100 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
              }`}
            >
              {item === "ALL" ? "All" : item === "PENDING" ? "Pending" : "Done"}
            </button>
          ))}
        </div>
      </div>

      {pageLoading ? (
        <div className="rounded-lg border border-slate-200 bg-white p-10 text-center text-sm font-semibold text-slate-500 dark:border-[#2D35D4]/30 dark:bg-[#101450] dark:text-[#AEB5FF]">
          Loading tasks...
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-slate-300 bg-white p-10 text-center dark:border-[#2D35D4]/40 dark:bg-[#101450]">
          <p className="font-bold text-slate-950 dark:text-white">
            {search ? "No tasks match your search" : "No tasks here"}
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">
            {search
              ? "Try a different keyword."
              : "Create a task to get started."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {paginated.map((task) => (
              <TaskCard key={task._id} task={task} onUpdated={handleUpdated} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <p className="text-xs font-medium text-slate-500 dark:text-[#AEB5FF]">
                Page {page} of {totalPages} &middot; {filtered.length} tasks
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1 || pageLoading}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:border-[#2D35D4]/30 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
                  aria-label="Previous page"
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
                      onClick={() => handlePageChange(p)}
                      disabled={pageLoading}
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
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  disabled={page === totalPages || pageLoading}
                  className="grid h-8 w-8 place-items-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-100 disabled:opacity-30 dark:border-[#2D35D4]/30 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C]"
                  aria-label="Next page"
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
              Showing {filtered.length} of {tasks.length} tasks
            </p>
          )}
        </>
      )}

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreated={handleCreated}
        />
      )}
    </div>
  );
}
