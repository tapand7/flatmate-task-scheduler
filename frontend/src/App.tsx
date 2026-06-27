import { useEffect, useState } from "react";
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
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

type Page = "dashboard" | "tasks" | "members" | "settings";

/* ── Authenticated shell ── */
function AppShell() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("alterno_theme") === "dark",
  );
  const { loading, withLoader } = usePageLoader();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("alterno_theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const currentPage = location.pathname.replace("/", "") as Page;

  const handlePageChange = (next: Page) => {
    if (location.pathname === `/${next}`) return;
    withLoader(async () => {
      await new Promise((res) => setTimeout(res, 400));
      navigate(`/${next}`);
    });
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
            current={currentPage}
            onChange={handlePageChange}
            darkMode={darkMode}
            onToggleTheme={() => setDarkMode((c) => !c)}
          />
        </aside>

        <main className="relative flex-1 overflow-y-auto">
          {loading && <PageLoader />}
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      <Footer />
    </div>
  );
}

/* ── Auth shell ── */
function AuthShell() {
  const { isAuthenticated } = useAuth();
  const [authView, setAuthView] = useState<"login" | "register">("login");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("alterno_theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (isAuthenticated) return <Navigate to="/home" replace />;

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

/* ── Home shell ── */
function HomeShell() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("alterno_theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-slate-100 transition-colors dark:bg-[#0D0F3C] dark:text-white">
      <HomePage onGetStarted={() => navigate("/dashboard")} />
    </div>
  );
}

/* ── Root ── */
function Inner() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<AuthShell />} />
      <Route path="/register" element={<AuthShell />} />
      <Route path="/home" element={<HomeShell />} />
      <Route
        path="*"
        element={
          isAuthenticated ? <AppShell /> : <Navigate to="/login" replace />
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Inner />
    </AuthProvider>
  );
}
