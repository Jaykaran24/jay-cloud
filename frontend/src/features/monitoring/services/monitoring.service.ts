export interface SystemMetrics {
  cpu: { usage: number; cores: number };
  memory: { total: number; used: number; free: number; usagePercent: number };
  disk: { total: number; used: number; free: number; usagePercent: number; fs: string; mount: string };
  network: { rxSec: number; txSec: number; iface: string };
  os: { platform: string; distro: string; kernel: string; arch: string; hostname: string; uptime: number };
  loadAvg: { one: number };
}

export async function getMetrics(token: string | null): Promise<SystemMetrics> {
  const res = await fetch('/api/monitoring/metrics', {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error('Failed to fetch metrics');
  return res.json() as Promise<SystemMetrics>;
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function formatUptime(seconds: number): string {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h ${m}m`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}
