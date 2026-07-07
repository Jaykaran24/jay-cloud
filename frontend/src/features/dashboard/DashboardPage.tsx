import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Users,
  Server,
  Clock,
  HardDrive,
  UserPlus,
  Play,
  Activity,
  Database,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    {
      name: "Total Users",
      value: user?.role === "admin" ? "5 Active" : "1 Active",
      description: "Platform accounts",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10",
    },
    {
      name: "Services Running",
      value: "4 Containers",
      description: "Docker stack status",
      icon: Server,
      color: "text-green-400",
      bg: "bg-green-500/10",
    },
    {
      name: "System Uptime",
      value: "2 days 4h",
      description: "Ubuntu server uptime",
      icon: Clock,
      color: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    {
      name: "Storage Used",
      value: "10.7%",
      description: "12.6 GB of 117 GB",
      icon: HardDrive,
      color: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      type: "info",
      message: `Admin user "${user?.email}" logged in`,
      time: "Just now",
      icon: Users,
      color: "text-blue-400 border-blue-500/20",
    },
    {
      id: 2,
      type: "success",
      message: "MongoDB connection established",
      time: "15 minutes ago",
      icon: Database,
      color: "text-green-400 border-green-500/20",
    },
    {
      id: 3,
      type: "warning",
      message: "Admin seeded successfully",
      time: "17 minutes ago",
      icon: ShieldAlert,
      color: "text-amber-400 border-amber-500/20",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-[#09090b]">
      {/* Welcome header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
        <p className="text-sm text-zinc-500 mt-1">
          Welcome back, {user?.name || "Admin"}. Here is your homelab status.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
      >
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 p-5 flex items-center justify-between"
            >
              <div className="space-y-1">
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                  {stat.name}
                </p>
                <p className="text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </p>
                <p className="text-xs text-zinc-500">{stat.description}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                <Icon size={22} />
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="lg:col-span-2 rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 space-y-5"
        >
          <h2 className="text-lg font-bold text-white tracking-tight">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {user?.role === "admin" && (
              <button
                onClick={() => navigate("/dashboard/users")}
                className="flex flex-col items-start gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-blue-500/30 hover:bg-zinc-800/40 text-left transition-all duration-200 group"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                  <UserPlus size={18} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Create User</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Add client profiles</p>
                </div>
              </button>
            )}

            <button
              onClick={() => navigate("/dashboard/docker")}
              className="flex flex-col items-start gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-green-500/30 hover:bg-zinc-800/40 text-left transition-all duration-200 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-500/10 text-green-400 group-hover:scale-105 transition-transform">
                <Play size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Docker Config</p>
                <p className="text-xs text-zinc-500 mt-0.5">Manage containers</p>
              </div>
            </button>

            <button
              onClick={() => navigate("/dashboard/monitoring")}
              className="flex flex-col items-start gap-4 p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 hover:border-violet-500/30 hover:bg-zinc-800/40 text-left transition-all duration-200 group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400 group-hover:scale-105 transition-transform">
                <Activity size={18} />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">System Metrics</p>
                <p className="text-xs text-zinc-500 mt-0.5">Monitor server health</p>
              </div>
            </button>
          </div>
        </motion.div>

        {/* Right: Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="rounded-2xl border border-zinc-800/60 bg-zinc-900/50 p-6 space-y-5"
        >
          <h2 className="text-lg font-bold text-white tracking-tight">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4 items-start">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-800 border ${activity.color}`}>
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm text-zinc-200 truncate">{activity.message}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
