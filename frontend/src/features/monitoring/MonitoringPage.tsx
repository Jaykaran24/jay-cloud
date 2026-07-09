import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { Cpu, HardDrive, Network, RefreshCw, AlertCircle, Server, Clock, MemoryStick } from 'lucide-react';
import { useAuth } from '@/features/auth/context/AuthContext';
import { getMetrics, formatBytes, formatUptime, type SystemMetrics } from './services/monitoring.service';

function UsageRing({ percent, color, size = 80 }: { percent: number; color: string; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
        strokeWidth="6" className="text-muted/30" />
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="currentColor"
        strokeWidth="6" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset}
        strokeLinecap="round" className={`transition-all duration-700 ${color}`} />
    </svg>
  );
}

function MetricCard({
  title, icon: Icon, percent, primary, secondary, color, iconColor
}: {
  title: string; icon: React.ElementType; percent: number;
  primary: string; secondary: string; color: string; iconColor: string;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-border bg-card/50 p-5 flex items-center gap-5">
      <div className="relative shrink-0">
        <UsageRing percent={percent} color={color} size={80} />
        <div className="absolute inset-0 flex items-center justify-center">
          <Icon size={20} className={iconColor} />
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">{percent}%</p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">{primary}</p>
        <p className="text-xs text-muted-foreground/70 truncate">{secondary}</p>
      </div>
    </motion.div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2 border-b border-border/50 last:border-0">
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
      <span className="text-xs font-medium text-foreground text-right truncate">{value}</span>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 flex items-center gap-5 animate-pulse">
      <div className="h-20 w-20 rounded-full bg-muted/30 shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-6 w-12 rounded bg-muted" />
        <div className="h-3 w-32 rounded bg-muted" />
      </div>
    </div>
  );
}

export default function MonitoringPage() {
  const { token } = useAuth();

  const { data, isLoading, isError, refetch, dataUpdatedAt } = useQuery<SystemMetrics, Error>({
    queryKey: ['monitoring-metrics'],
    queryFn: () => getMetrics(token),
    refetchInterval: 10000,
  });

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : '—';

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 bg-background text-foreground">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
        className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1">Live infrastructure metrics · refreshes every 10s</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground">Updated {lastUpdated}</span>
          <button onClick={() => void refetch()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-card/60 text-foreground/80 hover:text-foreground hover:bg-accent transition-all text-sm font-medium">
            <RefreshCw size={15} /> Refresh
          </button>
        </div>
      </motion.div>

      {/* Error */}
      {isError && (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
          <AlertCircle size={36} className="text-red-400" />
          <p className="text-sm text-muted-foreground">Failed to load metrics</p>
          <button onClick={() => void refetch()}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm">Retry</button>
        </div>
      )}

      {/* Skeletons */}
      {isLoading && (
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      )}

      {/* Metric Cards */}
      {data && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <MetricCard
              title="CPU Usage" icon={Cpu} percent={data.cpu.usage}
              primary={`${data.cpu.cores} cores`}
              secondary={`Load avg: ${data.loadAvg.one.toFixed(2)}`}
              color={data.cpu.usage > 80 ? 'text-red-400' : data.cpu.usage > 50 ? 'text-amber-400' : 'text-blue-400'}
              iconColor={data.cpu.usage > 80 ? 'text-red-400' : data.cpu.usage > 50 ? 'text-amber-400' : 'text-blue-400'}
            />
            <MetricCard
              title="Memory" icon={MemoryStick} percent={data.memory.usagePercent}
              primary={`${formatBytes(data.memory.used)} / ${formatBytes(data.memory.total)}`}
              secondary={`${formatBytes(data.memory.free)} free`}
              color={data.memory.usagePercent > 85 ? 'text-red-400' : data.memory.usagePercent > 60 ? 'text-amber-400' : 'text-violet-400'}
              iconColor={data.memory.usagePercent > 85 ? 'text-red-400' : data.memory.usagePercent > 60 ? 'text-amber-400' : 'text-violet-400'}
            />
            <MetricCard
              title="Disk" icon={HardDrive} percent={data.disk.usagePercent}
              primary={`${formatBytes(data.disk.used)} / ${formatBytes(data.disk.total)}`}
              secondary={`${data.disk.mount} · ${data.disk.fs}`}
              color={data.disk.usagePercent > 85 ? 'text-red-400' : data.disk.usagePercent > 60 ? 'text-amber-400' : 'text-green-400'}
              iconColor={data.disk.usagePercent > 85 ? 'text-red-400' : data.disk.usagePercent > 60 ? 'text-amber-400' : 'text-green-400'}
            />
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card/50 p-5 flex items-center gap-5">
              <div className="relative shrink-0">
                <div className="h-20 w-20 rounded-full bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                  <Network size={28} className="text-cyan-400" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Network · {data.network.iface}</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">↓ Download</span>
                    <span className="text-sm font-bold text-cyan-400">{formatBytes(data.network.rxSec)}/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">↑ Upload</span>
                    <span className="text-sm font-bold text-violet-400">{formatBytes(data.network.txSec)}/s</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* OS Info + Uptime */}
          <div className="grid gap-4 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Server size={16} className="text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">System Info</h2>
              </div>
              <InfoRow label="Hostname" value={data.os.hostname} />
              <InfoRow label="OS" value={`${data.os.distro}`} />
              <InfoRow label="Kernel" value={data.os.kernel} />
              <InfoRow label="Architecture" value={data.os.arch} />
              <InfoRow label="Platform" value={data.os.platform} />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="rounded-2xl border border-border bg-card/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={16} className="text-muted-foreground" />
                <h2 className="text-sm font-semibold text-foreground">Uptime & Load</h2>
              </div>
              <InfoRow label="System Uptime" value={formatUptime(data.os.uptime)} />
              <InfoRow label="Load Average (1m)" value={data.loadAvg.one.toFixed(2)} />
              <InfoRow label="CPU Cores" value={`${data.cpu.cores} cores`} />
              <InfoRow label="Memory Total" value={formatBytes(data.memory.total)} />
              <InfoRow label="Disk Total" value={formatBytes(data.disk.total)} />
            </motion.div>
          </div>
        </>
      )}
    </div>
  );
}
