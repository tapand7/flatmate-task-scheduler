import { useAuth } from "../Auth/AuthContext";

interface HomePageProps {
  onGetStarted: () => void;
}

/* ── Floating workflow cards ── */
function FloatingCards() {
  const cards = [
    {
      title: "Shine the Shared Space",
      sub: "Created by Tapan",
      dot: "#6C7AE0",
      label: "✦ New task",
      labelBg: "rgba(45,53,212,0.08)",
      labelColor: "#2D35D4",
      pos: "top-[6%] left-[2%]",
      anim: "float1",
    },
    {
      title: "Who's Keeping Us Fed This Week?",
      sub: "→ Assigned to Mousam",
      dot: "#2D35D4",
      label: "↻ Round-robin",
      labelBg: "rgba(45,53,212,0.08)",
      labelColor: "#2D35D4",
      pos: "top-[5%] right-[2%]",
      anim: "float2",
    },
    {
      title: "Bill Payments?",
      sub: "Anurag · Due today",
      dot: "#f59e0b",
      label: "◉ In progress",
      labelBg: "rgba(245,158,11,0.1)",
      labelColor: "#d97706",
      pos: "top-[42%] left-[1%]",
      anim: "float3",
    },
    {
      title: "Vacuum rooms",
      sub: "Rowin · Out of flat",
      dot: "#94a3b8",
      label: "🧳 OOF — skipped",
      labelBg: "rgba(148,163,184,0.1)",
      labelColor: "#64748b",
      pos: "top-[40%] right-[1%]",
      anim: "float1d",
    },
    {
      title: "Fix WiFi router",
      sub: "Barsha · Done",
      dot: "#10b981",
      label: "✓ Completed",
      labelBg: "rgba(16,185,129,0.1)",
      labelColor: "#059669",
      pos: "bottom-[7%] left-[2%]",
      anim: "float2d",
    },
    {
      title: "Take out trash",
      sub: "→ Next: Deepak",
      dot: "#2D35D4",
      label: "⟳ Up next",
      labelBg: "rgba(45,53,212,0.08)",
      labelColor: "#2D35D4",
      pos: "bottom-[7%] right-[2%]",
      anim: "float3",
    },
  ];

  return (
    <>
      <style>{`
        @keyframes float1  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-12px)} }
        @keyframes float2  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(10px)}  }
        @keyframes float3  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-7px)}  }
        .anim-float1  { animation: float1 6s ease-in-out infinite; }
        .anim-float2  { animation: float2 7s ease-in-out infinite; }
        .anim-float3  { animation: float3 5s ease-in-out infinite; }
        .anim-float1d { animation: float1 6s ease-in-out infinite 1.2s; }
        .anim-float2d { animation: float2 7s ease-in-out infinite 2s; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        {cards.map((card) => (
          <div
            key={card.title}
            className={`absolute ${card.pos} anim-${card.anim}`}
            style={{ opacity: 0.18 }}
          >
            {/* Light mode card */}
            <div
              className="flex flex-col gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-md dark:hidden"
              style={{ minWidth: 160 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: card.dot }}
                />
                <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                  {card.title}
                </span>
              </div>
              <span className="text-[10px] text-slate-400">{card.sub}</span>
              <span
                className="self-start rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ background: card.labelBg, color: card.labelColor }}
              >
                {card.label}
              </span>
            </div>

            {/* Dark mode card */}
            <div
              className="hidden flex-col gap-1.5 rounded-xl border border-[#2D35D4]/30 bg-[#101450] px-3 py-2.5 shadow-md dark:flex"
              style={{ minWidth: 160 }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: card.dot }}
                />
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  {card.title}
                </span>
              </div>
              <span className="text-[10px] text-[#6B75D4]">{card.sub}</span>
              <span
                className="self-start rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide whitespace-nowrap"
                style={{ background: card.labelBg, color: card.labelColor }}
              >
                {card.label}
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function HomePage({ onGetStarted }: HomePageProps) {
  const { user } = useAuth();

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* ── Floating cards behind everything ── */}
      <FloatingCards />

      {/* ── Page content — sits above cards ── */}
      <div className="relative z-10 mx-auto flex min-h-full max-w-4xl flex-col items-center justify-center px-6 py-16 text-center">
        {/* Welcome pill */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#2D35D4]/20 bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#2D35D4] backdrop-blur-sm dark:border-[#2D35D4]/40 dark:bg-[#101450]/90 dark:text-[#87CEEB]">
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

        {/* Feature cards */}
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
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="12" y1="12" x2="12" y2="16" />
                  <line x1="10" y1="14" x2="14" y2="14" />
                </svg>
              ),
              title: "Out of flat (OOF)",
              desc: "Mark yourself OOF and get skipped until you're back.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white/90 p-5 text-left shadow-sm backdrop-blur-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]/90"
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

        {/* CTA */}
        <button
          onClick={onGetStarted}
          className="group mt-10 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#2D35D4] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#1A1F8C] active:scale-95"
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

        {/* Built by */}
        <div className="mt-14 w-full max-w-2xl border-t border-slate-200 pt-10 dark:border-[#2D35D4]/30">
          <p className="mb-6 text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-[#6B75D4]">
            Built by
          </p>
          <div className="flex flex-col items-center gap-1">
            <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2D35D4] text-xl font-black text-white shadow-md">
              {"T"}
            </div>
            <p className="mt-2 text-base font-black text-slate-950 dark:text-white">
              {"Tapan"}
            </p>
            <p className="text-xs font-semibold text-[#2D35D4] dark:text-[#87CEEB]">
              Product Owner &amp; CEO
            </p>
            <p className="mt-2 max-w-xs text-xs text-slate-400 dark:text-[#6B75D4]">
              Built Alterno because sharing responsibilities shouldn't create
              friction. From everyday tasks to team projects, Alterno makes
              fairness automatic.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
