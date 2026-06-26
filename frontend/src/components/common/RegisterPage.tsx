import { useState } from "react";
import type { FormEvent } from "react";
import { registerUser } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import AlternoLogo from "./AlternoLogo";
import Toast from "./Toast";

interface RegisterPageProps {
  onSwitch: () => void;
}

export default function RegisterPage({ onSwitch }: RegisterPageProps) {
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", flatId: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(form);
      login(response.user, response.token);
      setToast({ message: "Account created. Welcome to alterno.", type: "success" });
    } catch (error) {
      setToast({ message: (error as Error).message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const update = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10 transition-colors dark:bg-[#0D0F3C]">
      <div className="w-full max-w-xl">
        <div className="mb-8 flex justify-center">
          <AlternoLogo size="lg" />
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">Join alterno</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">Create your flatmate task scheduler account.</p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">Full name</span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">Phone</span>
                <input
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">Email</span>
              <input
                type="email"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">Password</span>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(event) => update("password", event.target.value)}
                required
                minLength={6}
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">Flat ID</span>
              <input
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                placeholder="Paste your flat ID"
                value={form.flatId}
                onChange={(event) => update("flatId", event.target.value)}
                required
              />
              <span className="mt-2 block text-xs text-slate-500 dark:text-[#AEB5FF]">Ask your flat admin for this ID.</span>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center rounded-lg bg-[#2D35D4] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1A1F8C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-[#AEB5FF]">
            Already have an account?{" "}
            <button type="button" onClick={onSwitch} className="font-semibold text-[#2D35D4] hover:text-[#1A1F8C] dark:text-[#87CEEB]">
              Sign in
            </button>
          </p>
        </section>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
