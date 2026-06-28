import { useState } from "react";
import type { FormEvent } from "react";
import { loginUser } from "../../api";
import { useAuth } from "../Auth/AuthContext";
import AlternoLogo from "./AlternoLogo";
import Toast from "./Toast";

interface LoginPageProps {
  onSwitch: () => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({
  onSwitch,
  onLoginSuccess,
}: LoginPageProps) {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await loginUser(form);
      login(response.user, response.token);
      onLoginSuccess();
    } catch (error) {
      setToast({ message: (error as Error).message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-slate-100 px-4 py-10 transition-colors dark:bg-[#0D0F3C]">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <AlternoLogo size="lg" />
        </div>

        <section className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm dark:border-[#2D35D4]/30 dark:bg-[#101450]">
          <h1 className="text-2xl font-bold text-slate-950 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-[#AEB5FF]">
            Sign in to manage your flat tasks.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-5">
            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">
                Email
              </span>
              <input
                type="email"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                placeholder="Enter your email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />
            </label>

            <label className="block">
              <span className="text-sm font-semibold text-slate-700 dark:text-[#DDE2FF]">
                Password
              </span>
              <input
                type="password"
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-950 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:border-[#2D35D4]/40 dark:bg-[#0D0F3C] dark:text-white dark:placeholder:text-[#6B75D4]"
                placeholder="Enter your password"
                value={form.password}
                onChange={(event) =>
                  setForm({ ...form, password: event.target.value })
                }
                required
              />
            </label>

            {loading ? (
              <div className="flex justify-center py-3">
                <div
                  style={{
                    height: "4px",
                    width: "130px",
                    background:
                      "no-repeat linear-gradient(#2D35D4 0 0), no-repeat linear-gradient(#2D35D4 0 0), #AEB5FF",
                    backgroundSize: "60% 100%",
                    animation: "l16 3s infinite",
                  }}
                />
                <style>{`
      @keyframes l16 {
        0%   { background-position: -150% 0, -150% 0 }
        66%  { background-position: 250% 0, -150% 0 }
        100% { background-position: 250% 0, 250% 0 }
      }
    `}</style>
              </div>
            ) : (
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-lg bg-[#2D35D4] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#1A1F8C]"
              >
                Sign in
              </button>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-[#AEB5FF]">
            New to alterno?{" "}
            <button
              type="button"
              onClick={onSwitch}
              className="font-semibold text-[#2D35D4] hover:text-[#1A1F8C] dark:text-[#87CEEB]"
            >
              Create an account
            </button>
          </p>
        </section>
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
