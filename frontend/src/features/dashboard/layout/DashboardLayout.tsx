import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Server,
  HardDrive,
  Activity,
  Settings as SettingsIcon,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Cloud,
  ChevronRight,
  Database,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useTheme } from "@/features/theme/context/ThemeContext";

interface MenuItem {
  name: string;
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  adminOnly?: boolean;
}

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const menuItems: MenuItem[] = [
    { name: "Overview", path: "/dashboard", icon: LayoutDashboard },
    { name: "Users", path: "/dashboard/users", icon: Users, adminOnly: true },
    { name: "Docker", path: "/dashboard/docker", icon: Server },
    { name: "Storage", path: "/dashboard/storage", icon: HardDrive },
    { name: "Database (Mongo)", path: "/dashboard/mongo", icon: Database },
    { name: "Monitoring", path: "/dashboard/monitoring", icon: Activity },
    { name: "Settings", path: "/dashboard/settings", icon: SettingsIcon },
  ];

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  // Filter menu items by user role
  const filteredMenuItems = menuItems.filter(
    (item) => !item.adminOnly || user?.role === "admin"
  );

  // Helper to determine if a route is active
  const isRouteActive = (path: string) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }
    return location.pathname.startsWith(path);
  };

  // Get active page name for breadcrumb/title
  const activePageName =
    menuItems.find((item) => isRouteActive(item.path))?.name || "Dashboard";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* ── DESKTOP SIDEBAR ── */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 border-r border-sidebar-border bg-sidebar z-30">
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-md shadow-blue-500/10">
              <Cloud size={19} />
            </div>
            <span className="font-bold tracking-tight text-sidebar-foreground">JAY CLOUD</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1.5 px-4 py-6">
          {filteredMenuItems.map((item) => {
            const active = isRouteActive(item.path);
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/10"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    size={18}
                    className={`transition-colors duration-200 ${
                      active ? "text-white" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/75"
                    }`}
                  />
                  <span>{item.name}</span>
                </div>
                {active && <ChevronRight size={14} className="text-white/70" />}
              </Link>
            );
          })}
        </nav>

        {/* User Info & Logout Footer */}
        <div className="p-4 border-t border-sidebar-border bg-sidebar">
          <div className="flex items-center justify-between gap-3 mb-3 px-2">
            <div className="min-w-0">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user?.name || "Admin"}</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{user?.email}</p>
            </div>
            <span className="shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 uppercase">
              {user?.role}
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-sidebar-border hover:border-red-500/30 bg-sidebar text-sidebar-foreground/75 hover:text-red-500 hover:bg-red-500/5 transition-all text-xs font-medium"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── MOBILE DRAWER SIDEBAR ── */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-[#000000]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-sidebar border-r border-sidebar-border animate-in slide-in-from-left duration-250">
            {/* Close button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-sidebar-border bg-sidebar text-sidebar-foreground/70 hover:text-sidebar-foreground"
              >
                <X size={18} />
              </button>
            </div>

            {/* Brand */}
            <div className="flex h-16 items-center gap-2.5 px-6 border-b border-sidebar-border">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                <Cloud size={19} />
              </div>
              <span className="font-bold tracking-tight text-sidebar-foreground">JAY CLOUD</span>
            </div>

            {/* Navigation */}
            <nav className="flex-1 space-y-1.5 px-4 py-6 overflow-y-auto">
              {filteredMenuItems.map((item) => {
                const active = isRouteActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                      active
                        ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg shadow-blue-500/10"
                        : "text-sidebar-foreground/75 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={18}
                        className={`transition-colors duration-200 ${
                          active ? "text-white" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground/75"
                        }`}
                      />
                      <span>{item.name}</span>
                    </div>
                    {active && <ChevronRight size={14} className="text-white/70" />}
                  </Link>
                );
              })}
            </nav>

            {/* Footer info & Logout */}
            <div className="p-4 border-t border-sidebar-border bg-sidebar">
              <div className="flex items-center justify-between gap-3 mb-3 px-2">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-sidebar-foreground truncate">{user?.name || "Admin"}</p>
                  <p className="text-[10px] text-sidebar-foreground/60 truncate">{user?.email}</p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 uppercase">
                  {user?.role}
                </span>
              </div>
              <button
                onClick={() => {
                  setIsMobileOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-sidebar-border hover:border-red-500/30 bg-sidebar text-sidebar-foreground/75 hover:text-red-500 hover:bg-red-500/5 transition-all text-xs font-medium"
              >
                <LogOut size={14} />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ── */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between px-4 sm:px-6 border-b border-border bg-card/85 backdrop-blur-xl">
          {/* Left: Mobile hamburger & breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground/80">Dashboard</span>
              <ChevronRight size={14} className="text-muted-foreground/40" />
              <span className="font-semibold text-foreground">{activePageName}</span>
            </div>
          </div>

          {/* Right: Theme toggle & User icon */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-card/60 text-muted-foreground hover:text-foreground transition-colors"
            >
              {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* User Initial Circle */}
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-xs font-bold text-white shadow-md shadow-blue-500/10">
              {user?.name ? user.name.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase() || "A"}
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
