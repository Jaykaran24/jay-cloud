import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Cloud, Terminal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

const terminalLines = [
  { prompt: "$", command: "jay cloud deploy ./my-app", color: "text-zinc-300" },
  { prompt: "", command: "✓ Building image...", color: "text-emerald-400" },
  { prompt: "", command: "✓ Pushing to registry...", color: "text-emerald-400" },
  { prompt: "", command: "✓ Container live at jay.local:3000", color: "text-blue-400" },
  { prompt: "$", command: "jay cloud status", color: "text-zinc-300" },
  { prompt: "", command: "● 6/6 services running", color: "text-violet-400" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background orbs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-20 -left-20 h-[400px] w-[400px] rounded-full bg-violet-600/8 blur-[100px]" />
        <div className="absolute top-40 -right-20 h-[350px] w-[350px] rounded-full bg-blue-500/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left — copy */}
          <div className="flex flex-col items-start gap-6">
            {/* Badge */}
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-medium text-blue-400">
                <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_6px_2px_rgb(59,130,246,0.5)]" />
                Self-hosted · Always online · Fully yours
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              custom={0.1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-5xl font-extrabold leading-tight tracking-tight lg:text-6xl xl:text-7xl"
            >
              Build.{" "}
              <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-blue-300 bg-clip-text text-transparent">
                Deploy.
              </span>{" "}
              Host.
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              custom={0.2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="max-w-lg text-lg leading-relaxed text-zinc-400"
            >
              Jay Cloud is a personal self-hosted platform — manage containers,
              monitor services, store files, and showcase projects all from one
              beautiful dashboard.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              custom={0.3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#features"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:scale-105 hover:shadow-blue-900/50"
              >
                Explore Platform
                <ArrowRight size={16} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/60"
              >
                <GitBranch size={16} />
                View Projects
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              custom={0.45}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="flex items-center gap-8 pt-2"
            >
              {[
                { label: "Services", value: "6+" },
                { label: "Uptime", value: "99.9%" },
                { label: "Projects", value: "12+" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-500">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Terminal mockup */}
          <motion.div
            custom={0.25}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="relative"
          >
            {/* Glow behind terminal */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/15 blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 shadow-2xl shadow-black/60 backdrop-blur-sm">
              {/* Terminal titlebar */}
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-500/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                <div className="ml-3 flex items-center gap-1.5 text-xs text-zinc-500">
                  <Terminal size={12} />
                  <span>jay-cloud — bash</span>
                </div>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm">
                {terminalLines.map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + i * 0.18, duration: 0.35 }}
                    className="mb-1.5 flex gap-2"
                  >
                    {line.prompt && (
                      <span className="text-violet-400">{line.prompt}</span>
                    )}
                    <span className={line.color}>{line.command}</span>
                  </motion.div>
                ))}
                {/* Blinking cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1.1 }}
                  className="inline-block h-4 w-2 bg-violet-400"
                />
              </div>

              {/* Status row */}
              <div className="flex items-center gap-4 border-t border-zinc-800 bg-zinc-900/60 px-5 py-3">
                <Cloud size={14} className="text-zinc-500" />
                <span className="text-xs text-zinc-500">jay.local</span>
                <div className="ml-auto flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgb(52,211,153,0.4)]" />
                  <span className="text-xs text-emerald-400">All systems operational</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
