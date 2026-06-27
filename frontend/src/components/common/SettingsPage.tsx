import { useState } from "react";
import { useAuth } from "../Auth/AuthContext";
import AlternoLogo from "./AlternoLogo";
import Toast from "./Toast";
import { getFlatId, getFlatName } from "../../types";

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const copyFlatId = async () => {
    if (!user?.flatId) return;
    await navigator.clipboard.writeText(getFlatId(user.flatId));
    setToast({ message: "Flat ID copied to clipboard.", type: "success" });
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">
          Settings
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-[#AEB5FF]">
          Manage your account and flat details.
        </p>
      </header>

      <section className="mb-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]">
        <h2 className="mb-5 text-xs font-black uppercase tracking-wide text-slate-500 dark:text-[#87CEEB]">
          Profile
        </h2>
        <div className="mb-6 flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-[#2D35D4] text-xl font-black text-white">
            {user?.name[0]?.toUpperCase()}
          </div>
          <div>
            <p className="text-lg font-bold text-slate-950 dark:text-white">
              {user?.name}
            </p>
            <p className="text-sm text-slate-500 dark:text-[#AEB5FF]">
              {user?.email}
            </p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { label: "Phone", value: user?.phone || "-" },
            { label: "Role", value: user?.role || "-" },
            { label: "Status", value: user?.status || "-" },
            {
              label: "Notifications",
              value: user?.notificationPreference || "-",
            },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#87CEEB]">
                {label}
              </p>
              <p className="mt-1 text-sm font-semibold text-slate-950 dark:text-white">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]">
        <h2 className="mb-5 text-xs font-black uppercase tracking-wide text-slate-500 dark:text-[#87CEEB]">
          Flat
        </h2>
        <div className="flex flex-wrap items-end gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-[#87CEEB]">
              Flat ID
            </p>
            <code className="mt-2 block break-all rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-800 dark:bg-[#0D0F3C] dark:text-[#DDE2FF]">
              {getFlatName(user?.flatId)}
            </code>
          </div>
          <button
            onClick={copyFlatId}
            className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-100 dark:border-[#2D35D4]/50 dark:text-[#DDE2FF] dark:hover:bg-[#1A1F8C]"
          >
            Copy ID
          </button>
        </div>
        <p className="mt-3 text-sm text-slate-500 dark:text-[#AEB5FF]">
          Share this ID with flatmates so they can register into your flat.
        </p>
      </section>

      <section className="mb-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]">
        <AlternoLogo size="sm" />
        <p className="mt-4 text-sm text-slate-500 dark:text-[#AEB5FF]">
          You are on the beta plan. Feedback is welcome.
        </p>
        <a
          href="mailto:feedback@alterno.app"
          className="mt-2 inline-block text-sm font-bold text-[#2D35D4] hover:text-[#1A1F8C] dark:text-[#87CEEB]"
        >
          Send feedback
        </a>
      </section>

      <section className="rounded-lg border border-rose-200 bg-white p-6 dark:border-rose-500/40 dark:bg-[#101450]">
        <h2 className="text-sm font-bold text-rose-700">Danger zone</h2>
        <button
          onClick={logout}
          className="mt-4 rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-700"
        >
          Sign out of alterno
        </button>
      </section>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
