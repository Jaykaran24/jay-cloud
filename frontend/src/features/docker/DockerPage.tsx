import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Square, RotateCcw, Container, RefreshCw, AlertCircle } from "lucide-react";
import { useAuth } from "@/features/auth/context/AuthContext";
import {
  getContainers,
  startContainer,
  stopContainer,
  restartContainer,
  type Container as DockerContainer,
} from "./services/docker.service";

function StatusBadge({ status }: { status: string }) {
  const isRunning = status === "running";
  const isExited = status === "exited" || status === "stopped";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
        isRunning
          ? "bg-green-500/15 text-green-400"
          : isExited
          ? "bg-red-500/15 text-red-400"
          : "bg-amber-500/15 text-amber-400"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          isRunning
            ? "bg-green-400 animate-pulse"
            : isExited
            ? "bg-red-400"
            : "bg-amber-400"
        }`}
      />
      {status}
    </span>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 space-y-4 animate-pulse">
      <div className="h-4 w-1/3 rounded bg-muted" />
      <div className="h-3 w-1/2 rounded bg-muted" />
      <div className="h-6 w-20 rounded-full bg-muted" />
      <div className="flex gap-2 pt-2">
        <div className="h-8 w-16 rounded-lg bg-muted" />
        <div className="h-8 w-16 rounded-lg bg-muted" />
        <div className="h-8 w-20 rounded-lg bg-muted" />
      </div>
    </div>
  );
}

export default function DockerPage() {
  const { token } = useAuth();
  const qc = useQueryClient();

  const {
    data: containers,
    isLoading,
    isError,
    refetch,
  } = useQuery<DockerContainer[], Error>({
    queryKey: ["containers"],
    queryFn: () => getContainers(token),
    refetchInterval: 30000,
  });

  const startMutation = useMutation({
    mutationFn: (id: string) => startContainer(id, token),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["containers"] });
    },
  });

  const stopMutation = useMutation({
    mutationFn: (id: string) => stopContainer(id, token),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["containers"] });
    },
  });

  const restartMutation = useMutation({
    mutationFn: (id: string) => restartContainer(id, token),
    onSuccess: () => {
      void qc.invalidateQueries({ queryKey: ["containers"] });
    },
  });

  const running = containers?.filter((c) => c.status === "running").length ?? 0;
  const stopped = containers?.filter((c) => c.status !== "running").length ?? 0;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-background text-foreground">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Docker Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your running containers
          </p>
        </div>
        <button
          onClick={() => void refetch()}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 text-foreground/80 hover:text-foreground hover:bg-accent transition-all text-sm font-medium"
        >
          <RefreshCw size={15} />
          Refresh
        </button>
      </motion.div>

      {/* Stats row */}
      {containers && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="grid grid-cols-3 gap-4"
        >
          <div className="rounded-xl border border-border bg-card/40 p-4 text-center">
            <p className="text-2xl font-bold text-foreground">{containers.length}</p>
            <p className="text-xs text-muted-foreground mt-1">Total</p>
          </div>
          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-4 text-center">
            <p className="text-2xl font-bold text-green-400">{running}</p>
            <p className="text-xs text-muted-foreground mt-1">Running</p>
          </div>
          <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{stopped}</p>
            <p className="text-xs text-muted-foreground mt-1">Stopped</p>
          </div>
        </motion.div>
      )}

      {/* Container cards */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
      >
        {isError && (
          <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
            <AlertCircle size={36} className="text-red-400" />
            <p className="text-sm text-muted-foreground">Failed to load containers</p>
            <button
              onClick={() => void refetch()}
              className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm"
            >
              Retry
            </button>
          </div>
        )}
        {isLoading && (
          <div className="grid gap-4 md:grid-cols-2">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}
        {!isLoading && !isError && containers?.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-20">
            <Container size={36} className="text-muted-foreground/40" />
            <p className="text-sm text-muted-foreground">No containers found</p>
          </div>
        )}
        {!isLoading && !isError && containers && containers.length > 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            {containers.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl border border-border bg-card/50 p-5 space-y-3 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground truncate">{c.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{c.image}</p>
                  </div>
                  <StatusBadge status={c.status} />
                </div>
                {c.ports.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {c.ports.map((p) => (
                      <span
                        key={p}
                        className="rounded-md bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                )}
                <p className="text-xs text-muted-foreground/70">{c.uptime}</p>
                <div className="flex gap-2 pt-1">
                  <button
                    disabled={c.status === "running" || startMutation.isPending}
                    onClick={() => startMutation.mutate(c.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-green-500/10 text-green-400 hover:bg-green-500/20 disabled:opacity-40 transition-colors"
                  >
                    <Play size={12} />
                    Start
                  </button>
                  <button
                    disabled={c.status !== "running" || stopMutation.isPending}
                    onClick={() => stopMutation.mutate(c.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 hover:bg-red-500/20 disabled:opacity-40 transition-colors"
                  >
                    <Square size={12} />
                    Stop
                  </button>
                  <button
                    disabled={restartMutation.isPending}
                    onClick={() => restartMutation.mutate(c.id)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 disabled:opacity-40 transition-colors"
                  >
                    <RotateCcw size={12} />
                    Restart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
