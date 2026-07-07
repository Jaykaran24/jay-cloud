import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cloud, LayoutDashboard, LogOut, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#09090b]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-zinc-900/60 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
              <Cloud size={18} />
            </div>
            <span className="font-bold tracking-tight text-white">JAY CLOUD</span>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="hidden text-sm text-zinc-500 sm:block">
                {user.email}
              </span>
            )}
            <Button
              variant="outline"
              onClick={handleLogout}
              className="flex items-center gap-2 rounded-xl border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/60 hover:text-white"
            >
              <LogOut size={15} />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            className="text-center"
          >
            {/* Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20">
              <LayoutDashboard size={30} className="text-blue-400" />
            </div>

            <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
            <p className="mb-2 text-lg text-zinc-400">Sprint 3 coming soon</p>
            <p className="text-sm text-zinc-600">
              Container management, storage and monitoring are on the way.
            </p>
          </motion.div>

          {/* Admin actions */}
          {user?.role === "admin" && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.15 }}
              className="mt-10"
            >
              <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-zinc-600">
                Admin tools
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  onClick={() => navigate("/dashboard/users")}
                  className="flex items-center gap-3 rounded-xl border border-zinc-800/60 bg-zinc-900/60 px-5 py-4 text-left transition-colors hover:border-blue-500/30 hover:bg-zinc-800/60"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                    <Users size={18} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">Manage Users</p>
                    <p className="text-xs text-zinc-500">Create and remove users</p>
                  </div>
                </button>
              </div>
            </motion.div>
          )}

          {/* Back to home */}
          <div className="mt-8 flex justify-center">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              className="rounded-xl border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/60 hover:text-white"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
