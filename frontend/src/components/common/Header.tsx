type HeaderProps = {
  darkMode: boolean;
  onToggleTheme: () => void;
};

export default function Header({ darkMode, onToggleTheme }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 overflow-hidden bg-[#1A1F8C] px-5 py-4">
      {/* ── Background graphics only — no layout impact ── */}

      {/* Main blob — top right, lighter opacity */}
      <div
        className="pointer-events-none absolute -right-6 -top-8 h-32 w-32 bg-[#2D35D4] opacity-40"
        style={{ borderRadius: "55% 45% 65% 35% / 60% 40% 70% 30%" }}
      />

      {/* Soft glow behind blob */}
      <div className="pointer-events-none absolute -right-2 -top-4 h-28 w-28 bg-[#87CEEB] opacity-10 blur-xl" />

      {/* Small sky bubble — right edge */}
      <div
        className="pointer-events-none absolute right-10 -top-3 h-10 w-10 bg-[#87CEEB] opacity-15"
        style={{ borderRadius: "50%" }}
      />

      {/* Tiny dot cluster — right area */}
      <div className="pointer-events-none absolute right-28 top-2 h-1.5 w-1.5 rounded-full bg-[#87CEEB] opacity-30" />
      <div className="pointer-events-none absolute right-24 top-6 h-1 w-1 rounded-full bg-white opacity-20" />
      <div className="pointer-events-none absolute right-20 top-2 h-1 w-1 rounded-full bg-[#87CEEB] opacity-25" />

      {/* Round-robin arc — left, very faint */}
      <div
        className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 border-[3px] border-[#87CEEB] opacity-10"
        style={{ borderRadius: "50%" }}
      />
      <div
        className="pointer-events-none absolute -left-1 -top-1 h-8 w-8 border-2 border-[#87CEEB] opacity-10"
        style={{ borderRadius: "50%" }}
      />

      {/* Workflow line — horizontal dashes across mid-header */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="50%"
          x2="100%"
          y2="50%"
          stroke="#87CEEB"
          strokeWidth="1"
          strokeDasharray="4 8"
        />
      </svg>

      {/* Mascot — bottom right, very faint */}
      <div className="pointer-events-none absolute -bottom-1 right-6 opacity-10">
        <svg width="52" height="52" viewBox="0 0 80 80">
          <ellipse cx="40" cy="48" rx="28" ry="22" fill="#87CEEB" />
          <circle cx="40" cy="24" rx="16" ry="18" fill="#87CEEB" />
          <circle cx="34" cy="24" r="3" fill="#1A1F8C" />
          <circle cx="46" cy="24" r="3" fill="#1A1F8C" />
          <ellipse
            cx="40"
            cy="30"
            rx="4"
            ry="2"
            fill="none"
            stroke="#1A1F8C"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* ── Content row — unchanged height ── */}
      <div className="relative z-10 flex items-center justify-between">
        {/* Logo + tagline */}
        <div>
          <div className="flex items-center gap-2.5">
            <span className="rounded-[10px] bg-[#2D35D4] px-3.5 py-1 text-lg font-extrabold tracking-tight text-white">
              alterno
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-[#87CEEB]">
              Beta
            </span>
          </div>
          <p className="mt-1 text-[12px] text-white/55">
            Smart task &amp; workflow manager
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative grid h-8 w-8 place-items-center rounded-lg bg-[#2D35D4]/60 text-white transition hover:bg-[#2D35D4]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-400 ring-2 ring-[#1A1F8C]" />
          </button>

          <button
            onClick={onToggleTheme}
            aria-label={
              darkMode ? "Switch to light mode" : "Switch to dark mode"
            }
            className="grid h-8 w-8 place-items-center rounded-lg bg-[#2D35D4]/60 text-white transition hover:bg-[#2D35D4]"
          >
            {darkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* 3-color stripe */}
      <div className="absolute bottom-0 left-0 flex h-1 w-full">
        <div className="flex-1 bg-gradient-to-r from-[#E7C88F] to-[#F4D58D]" />
        <div className="flex-1 bg-gradient-to-r from-[#6C7AE0] to-[#5B69C5]" />
        <div className="flex-1 bg-gradient-to-r from-[#BFE8F9] to-[#87CEEB]" />
      </div>
    </header>
  );
}
