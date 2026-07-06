import { motion } from "framer-motion";
import {
  Container,
  Database,
  Activity,
  Globe,
  Server,
  LayoutDashboard,
} from "lucide-react";

type ServiceStatus = "running" | "starting" | "stopped";

interface Service {
  name: string;
  description: string;
  status: ServiceStatus;
  icon: React.ReactNode;
  port?: string;
}

const services: Service[] = [
  {
    name: "Portainer",
    description: "Docker container management UI",
    status: "running",
    icon: <Container size={20} />,
    port: ":9000",
  },
  {
    name: "MongoDB",
    description: "Primary database cluster",
    status: "running",
    icon: <Database size={20} />,
    port: ":27017",
  },
  {
    name: "Uptime Kuma",
    description: "Service monitoring and alerting",
    status: "running",
    icon: <Activity size={20} />,
    port: ":3001",
  },
  {
    name: "Cloudflare Tunnel",
    description: "Secure zero-trust access layer",
    status: "running",
    icon: <Globe size={20} />,
  },
  {
    name: "Jay Cloud Backend",
    description: "API server and auth service",
    status: "running",
    icon: <Server size={20} />,
    port: ":8080",
  },
  {
    name: "Jay Cloud Frontend",
    description: "React web application",
    status: "running",
    icon: <LayoutDashboard size={20} />,
    port: ":5173",
  },
];

const statusConfig: Record<
  ServiceStatus,
  {
    label: string;
    dotClass: string;
    textClass: string;
    bgClass: string;
    borderClass: string;
  }
> = {
  running: {
    label: "Running",
    dotClass: "bg-emerald-400",
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-400/10",
    borderClass: "border-emerald-400/20",
  },
  starting: {
    label: "Starting",
    dotClass: "bg-yellow-400",
    textClass: "text-yellow-400",
    bgClass: "bg-yellow-400/10",
    borderClass: "border-yellow-400/20",
  },
  stopped: {
    label: "Stopped",
    dotClass: "bg-red-400",
    textClass: "text-red-400",
    bgClass: "bg-red-400/10",
    borderClass: "border-red-400/20",
  },
};

interface StatusBadgeProps {
  status: ServiceStatus;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const cfg = statusConfig[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${cfg.bgClass} ${cfg.borderClass} ${cfg.textClass}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        {status === "running" && (
          <span
            className={`absolute inline-flex h-full w-full animate-ping rounded-full ${cfg.dotClass} opacity-75`}
          />
        )}
        <span
          className={`relative inline-flex h-1.5 w-1.5 rounded-full ${cfg.dotClass}`}
        />
      </span>
      {cfg.label}
    </span>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900/80"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-600/0 to-violet-600/0 opacity-0 transition-opacity duration-300 group-hover:from-blue-600/5 group-hover:to-violet-600/5 group-hover:opacity-100" />

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-800/80 text-zinc-400 transition-colors duration-300 group-hover:border-blue-500/30 group-hover:text-blue-400">
            {service.icon}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-zinc-100">
                {service.name}
              </h3>
              {service.port && (
                <span className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-xs text-zinc-500">
                  {service.port}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">{service.description}</p>
          </div>
        </div>

        <StatusBadge status={service.status} />
      </div>
    </motion.div>
  );
}

export default function InfrastructureSection() {
  const runningCount = services.filter((s) => s.status === "running").length;

  return (
    <section id="infrastructure" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
              Infrastructure
            </p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Live Infrastructure
            </h2>
            <p className="mt-2 text-zinc-400">
              Real-time status of all running services on this server.
            </p>
          </div>

          {/* Overall health pill */}
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span className="text-sm font-medium text-emerald-400">
              {runningCount}/{services.length} services running
            </span>
          </div>
        </motion.div>

        {/* Services grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
