import { HardDrive, Server, Activity, Settings as SettingsIcon } from "lucide-react";

export function DockerPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-[#09090b] min-h-[calc(100vh-4rem)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20 mb-6">
        <Server size={30} className="text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Docker Containers</h1>
      <p className="text-sm text-zinc-500 max-w-md">
        Container orchestration, start/stop controls, and logs management will be available here in Sprint 4.
      </p>
    </div>
  );
}

export function StoragePlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-[#09090b] min-h-[calc(100vh-4rem)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20 mb-6">
        <HardDrive size={30} className="text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Storage Management</h1>
      <p className="text-sm text-zinc-500 max-w-md">
        Shared folder volumes, Samba configuration, and disk health metrics will be available here in Sprint 5.
      </p>
    </div>
  );
}

export function MonitoringPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-[#09090b] min-h-[calc(100vh-4rem)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20 mb-6">
        <Activity size={30} className="text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Monitoring</h1>
      <p className="text-sm text-zinc-500 max-w-md">
        Real-time CPU, RAM, Network usage graphs, and temperature sensors will be available here in Sprint 6.
      </p>
    </div>
  );
}

export function SettingsPlaceholder() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center bg-[#09090b] min-h-[calc(100vh-4rem)]">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-violet-600/20 ring-1 ring-blue-500/20 mb-6">
        <SettingsIcon size={30} className="text-blue-400" />
      </div>
      <h1 className="text-3xl font-bold tracking-tight text-white mb-2">System Settings</h1>
      <p className="text-sm text-zinc-500 max-w-md">
        Network setup, SSH keys management, security policies, and update checks will be available here in Sprint 7.
      </p>
    </div>
  );
}
