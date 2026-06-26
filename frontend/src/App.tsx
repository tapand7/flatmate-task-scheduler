import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { AuthProvider, useAuth } from "./components/Auth/AuthContext";
import LoginPage from "./components/common/LoginPage";
import RegisterPage from "./components/common/RegisterPage";
import HomePage from "./components/common/HomePage";
import DashboardPage from "./components/Dashboard/DashboardPage";
import TasksPage from "./components/Tasks/TasksPage";
import MembersPage from "./components/Users/MembersPage";
import SettingsPage from "./components/common/SettingsPage";
import Sidebar from "./components/common/Sidebar";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import PageLoader from "./components/common/PageLoader";
import { usePageLoader } from "./components/usePageLoader";

type Page = "home" | "dashboard" | "tasks" | "members" | "settings";

function Inner() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [page, setPage] = useState<Page>("home");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("alterno_theme") === "dark",
  );
  const { loading, withLoader } = usePageLoader();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("alterno_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  // Reset to home whenever user logs in fresh
  useEffect(() => {
    if (isAuthenticated) setPage("home");
  }, [isAuthenticated]);

  const handlePageChange = (next: Page) => {
    if (next === page) return;
    setPage(next);
    withLoader(async () => {
      await new Promise((res) => setTimeout(res, 400));
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-[#0D0F3C]">
        <button
          onClick={() => setDarkMode((c) => !c)}
          className="fixed right-5 top-5 z-10 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-[#2D35D4]/50 dark:bg-[#1A1F8C] dark:text-[#87CEEB] dark:hover:bg-[#232AAD]"
        >
          {darkMode ? "☀ Light mode" : "☾ Dark mode"}
        </button>
        {authView === "login" ? (
          <LoginPage onSwitch={() => setAuthView("register")} />
        ) : (
          <RegisterPage onSwitch={() => setAuthView("login")} />
        )}
      </div>
    );
  }

  // Home page — full screen, no sidebar/header/footer
  if (page === "home") {
    return (
      <div className="min-h-screen bg-slate-100 transition-colors dark:bg-[#0D0F3C] dark:text-white">
        <HomePage onGetStarted={() => handlePageChange("dashboard")} />
      </div>
    );
  }

  const PageMap: Record<Exclude<Page, "home">, ReactNode> = {
    dashboard: <DashboardPage />,
    tasks: <TasksPage />,
    members: <MembersPage />,
    settings: <SettingsPage />,
  };

  return (
    <div className="flex h-screen flex-col bg-slate-100 text-slate-950 transition-colors dark:bg-[#0D0F3C] dark:text-white">
      <Header
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode((c) => !c)}
      />

      <div className="flex flex-1 overflow-hidden">
        <aside className="flex h-full w-56 flex-shrink-0 flex-col overflow-x-hidden overflow-y-auto border-r border-[#E8EAFF] bg-white dark:border-[#2D35D4]/30 dark:bg-[#1A1F8C]">
          <Sidebar
            current={page as Exclude<Page, "home">}
            onChange={(p) => handlePageChange(p)}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((c) => !c)}
          />
        </aside>

        <main className="relative flex-1 overflow-y-auto">
          {loading && <PageLoader />}
          {PageMap[page as Exclude<Page, "home">]}
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
