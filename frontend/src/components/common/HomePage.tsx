import { useAuth } from "../Auth/AuthContext";

interface HomePageProps {
  onGetStarted: () => void;
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  const { user } = useAuth();

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* ── Background wallpaper (same as dashboard) ── */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-[0.04] dark:opacity-[0.06]">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="home-wall"
              x="0"
              y="0"
              width="120"
              height="120"
              patternUnits="userSpaceOnUse"
            >
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
              <circle cx="45" cy="48" r="1.5" fill="#2D35D4" />
              <circle cx="80" cy="42" r="1.5" fill="#2D35D4" />
              <circle cx="10" cy="100" r="1.5" fill="#2D35D4" />
              <circle cx="110" cy="100" r="1.5" fill="#2D35D4" />
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
          <rect width="100%" height="100%" fill="url(#home-wall)" />
        </svg>
      </div>

      {/* ── Page content ── */}
      <div className="relative z-10 mx-auto flex min-h-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Welcome pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2D35D4]/20 bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#2D35D4] backdrop-blur-sm dark:border-[#2D35D4]/40 dark:bg-[#101450]/80 dark:text-[#87CEEB]">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Live · Beta
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-6xl">
          Welcome to{" "}
          <span className="rounded-xl bg-[#2D35D4] px-3 py-0.5 text-white">
            alterno
          </span>
        </h1>

        <p className="mt-5 max-w-xl text-base text-slate-500 dark:text-[#AEB5FF]">
          A smart flat task manager built on round-robin assignment — so chores,
          responsibilities and errands are always fairly distributed. No more
          "whose turn is it?" arguments.
        </p>

        {/* Why we built it */}
        <div className="mt-10 grid w-full max-w-2xl gap-4 sm:grid-cols-3">
          {[
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
              ),
              title: "Round-robin",
              desc: "Tasks auto-rotate to the next available flatmate. Fair every time.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              ),
              title: "Scheduler",
              desc: "Set due dates and track what's pending, in progress or done.",
            },
            {
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
              title: "Flat members",
              desc: "Mark yourself OOF and get skipped until you're back.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]/80"
            >
              <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[#2D35D4]/10 text-[#2D35D4] dark:bg-[#2D35D4]/30 dark:text-[#87CEEB]">
                {item.icon}
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">
                {item.title}
              </p>
              <p className="mt-1 text-xs text-slate-500 dark:text-[#AEB5FF]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Get started CTA */}
        <button
          onClick={onGetStarted}
          className="group mt-10 inline-flex items-center gap-2 rounded-xl bg-[#2D35D4] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1A1F8C] active:scale-95"
        >
          Get started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform group-hover:translate-x-1"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Divider */}
        <div className="mt-14 w-full max-w-2xl border-t border-slate-200 pt-10 dark:border-[#2D35D4]/30">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#6B75D4]">
            Built by
          </p>
          <div className="flex flex-col items-center gap-1">
            {/* Avatar */}

            <p className="mt-2 text-base font-black text-slate-950 dark:text-white">
              {"Tapan"}
            </p>
            <p className="text-xs font-semibold text-[#2D35D4] dark:text-[#87CEEB]">
              Product Owner &amp; CEO
            </p>
            <p className="mt-2 max-w-xs text-xs text-slate-400 dark:text-[#6B75D4]">
              Built alterno after one too many arguments about whose turn it was
              to clean. Turns out, fairness just needed an algorithm.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
