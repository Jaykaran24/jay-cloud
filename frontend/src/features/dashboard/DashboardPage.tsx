import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cloud, LayoutDashboard, LogOut } from "lucide-react";
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
      <main className="flex flex-1 items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20">
            <LayoutDashboard size={30} className="text-blue-400" />
          </div>

          <h1 className="mb-3 text-4xl font-bold tracking-tight text-white">
            Dashboard
          </h1>

          <p className="mb-2 text-lg text-zinc-400">
            Sprint 3 coming soon
          </p>
          <p className="text-sm text-zinc-600">
            Container management, storage and monitoring are on the way.
          </p>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mt-8 rounded-xl border-zinc-700 bg-zinc-800/60 text-zinc-300 hover:bg-zinc-700/60 hover:text-white"
          >
            Back to Home
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
