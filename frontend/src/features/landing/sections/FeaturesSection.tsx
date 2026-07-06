import { motion } from "framer-motion";
import {
  Container,
  HardDrive,
  BarChart3,
  Database,
  ShieldCheck,
  Bot,
} from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  comingSoon?: boolean;
  accentColor: string;
}

const features: Feature[] = [
  {
    icon: <Container size={22} />,
    title: "Docker Management",
    description:
      "Deploy, manage, and monitor containers with a Portainer-powered interface. Full control over images, volumes, and networks.",
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    icon: <HardDrive size={22} />,
    title: "Cloud Storage",
    description:
      "Personal S3-compatible object storage for files, backups, and assets. Accessible from anywhere via secure tunnel.",
    accentColor: "from-violet-500 to-purple-500",
  },
  {
    icon: <BarChart3 size={22} />,
    title: "Monitoring",
    description:
      "Real-time uptime monitoring, latency tracking, and alerting via Uptime Kuma. Never miss a service outage.",
    accentColor: "from-emerald-500 to-teal-500",
  },
  {
    icon: <Database size={22} />,
    title: "MongoDB Manager",
    description:
      "Manage your MongoDB collections, run queries, and visualize data with a built-in UI layer. Fast and intuitive.",
    accentColor: "from-orange-500 to-amber-500",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Secure Access",
    description:
      "All services behind a Cloudflare Zero Trust tunnel. No open ports, no exposure. Authentication-first architecture.",
    accentColor: "from-rose-500 to-pink-500",
  },
  {
    icon: <Bot size={22} />,
    title: "AI Assistant",
    description:
      "An integrated AI assistant to help manage your cloud, answer questions, and automate routine tasks.",
    comingSoon: true,
    accentColor: "from-blue-500 to-violet-500",
  },
];

interface FeatureCardProps {
  feature: Feature;
  index: number;
}

function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors duration-300 hover:border-zinc-700"
    >
      {/* Border glow on hover */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.accentColor} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-10`}
      />

      {/* Icon */}
      <div
        className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${feature.accentColor} p-0.5`}
      >
        <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-zinc-900 text-white">
          {feature.icon}
        </div>
      </div>

      {/* Title row */}
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-base font-semibold text-zinc-100">{feature.title}</h3>
        {feature.comingSoon && (
          <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2 py-0.5 text-xs font-medium text-violet-400">
            Soon
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-500">{feature.description}</p>
    </motion.div>
  );
}

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            Capabilities
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            Everything You Need
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-zinc-400">
            A full-featured cloud platform built for personal use — powerful
            enough for production, simple enough for one person.
          </p>
        </motion.div>

        {/* Feature grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
