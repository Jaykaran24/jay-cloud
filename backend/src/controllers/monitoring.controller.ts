import { Request, Response } from 'express';
import si from 'systeminformation';

export async function getMetrics(_req: Request, res: Response): Promise<void> {
  try {
    const [cpu, mem, disk, network, osInfo, load, timeInfo] = await Promise.all([
      si.currentLoad(),
      si.mem(),
      si.fsSize(),
      si.networkStats(),
      si.osInfo(),
      si.currentLoad(),
      si.time(),
    ]);

    const primaryDisk = disk[0] ?? { size: 0, used: 0, available: 0, use: 0, fs: 'unknown', mount: '/' };
    const primaryNet = network[0] ?? { rx_sec: 0, tx_sec: 0, iface: 'unknown' };

    res.json({
      cpu: {
        usage: Math.round(cpu.currentLoad),
        cores: cpu.cpus?.length ?? 0,
      },
      memory: {
        total: mem.total,
        used: mem.used,
        free: mem.free,
        usagePercent: Math.round((mem.used / mem.total) * 100),
      },
      disk: {
        total: primaryDisk.size,
        used: primaryDisk.used,
        free: primaryDisk.available,
        usagePercent: Math.round(primaryDisk.use),
        fs: primaryDisk.fs,
        mount: primaryDisk.mount,
      },
      network: {
        rxSec: Math.max(0, primaryNet.rx_sec ?? 0),
        txSec: Math.max(0, primaryNet.tx_sec ?? 0),
        iface: primaryNet.iface,
      },
      os: {
        platform: osInfo.platform,
        distro: osInfo.distro,
        kernel: osInfo.kernel,
        arch: osInfo.arch,
        hostname: osInfo.hostname,
        uptime: Math.floor(timeInfo.uptime ?? 0),
      },
      loadAvg: {
        one: load.avgLoad,
      },
    });
  } catch (err) {
    console.error('Monitoring error:', err);
    res.status(500).json({ error: 'Failed to fetch metrics' });
  }
}
