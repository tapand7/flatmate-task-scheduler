import { useAuth } from "../Auth/AuthContext";

type Page = "dashboard" | "tasks" | "members" | "settings";

const navItems: { page: Page; icon: React.ReactNode; label: string }[] = [
  {
    page: "dashboard",
    label: "Dashboard",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    page: "tasks",
    label: "Tasks",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 11l3 3L22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
  {
    page: "members",
    label: "Members",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    page: "settings",
    label: "Settings",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
  },
];

interface SidebarProps {
  current: Page;
  onChange: (page: Page) => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export default function Sidebar({ current, onChange }: SidebarProps) {
  const { user, logout } = useAuth();

  return (
    <aside className="flex h-full w-full flex-col border-r border-slate-200 bg-white transition-colors dark:border-[#2D35D4]/30 dark:bg-[#101450]">
      {/* ── Scrollable top section ── */}
      <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-3 pt-2">
        {user && (
          <div className="mb-5 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 dark:border-[#2D35D4]/40 dark:bg-[#1A1F8C]/60">
            <p className="text-[11px] font-bold uppercase tracking-wide text-indigo-600 dark:text-[#87CEEB]">
              Current flat
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-white">
              {typeof user.flatId === "object" ? user.flatId.name : user.flatId}
            </p>
          </div>
        )}

        <nav className="space-y-1">
          {navItems.map(({ page, icon, label }) => {
            const active = current === page;
            return (
              <button
                key={page}
                onClick={() => onChange(page)}
                className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[#2D35D4] text-white"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-[#AEB5FF] dark:hover:bg-[#1A1F8C] dark:hover:text-white"
                }`}
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md ${
                    active
                      ? "bg-white/15 text-white"
                      : "bg-slate-100 text-slate-500 dark:bg-[#0D0F3C] dark:text-[#87CEEB]"
                  }`}
                >
                  {icon}
                </span>
                {label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* ── Pinned bottom section — never scrolls away ── */}
      {user && (
        <div className="shrink-0 border-t border-slate-200 px-3 py-4 dark:border-[#2D35D4]/30">
          <div className="mb-3 flex items-center gap-3">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#2D35D4] text-sm font-bold text-white">
              {user.name[0]?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-[#AEB5FF]">
                {user.role}
              </p>
            </div>
          </div>
          <button
            onClick={logout}
            className="inline-flex w-full cursor-pointer items-center gap-2 rounded bg-indigo-600 px-3.5 py-2 text-xs font-semibold text-white transition-all duration-300 hover:bg-orange-700 active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </aside>
  );
}
