import { motion } from "framer-motion";
import { MapPin, ExternalLink, ArrowRight } from "lucide-react";

const skills = [
  "Node.js",
  "React",
  "TypeScript",
  "Docker",
  "MongoDB",
  "Linux",
  "Nginx",
  "Cloudflare",
];

const stats = [
  { label: "GitHub", value: "Jaykaran24" },
  { label: "Projects", value: "12+" },
  { label: "Experience", value: "2+ yrs" },
  { label: "Location", value: "India" },
];

// Inline GitHub SVG (same as Footer)
function GitHubIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

export default function PortfolioSection() {
  return (
    <section id="portfolio" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
            About
          </p>
          <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
            The Developer
          </h2>
        </motion.div>

        {/* Two-column layout */}
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-6"
          >
            <div>
              <h3 className="text-2xl font-bold text-zinc-100">
                Jay Karan Chaturvedi
              </h3>
              <p className="mt-1 text-sm font-medium text-blue-400">
                Software Engineer · Backend Developer · Cloud Enthusiast
              </p>
            </div>

            <p className="text-zinc-400 leading-relaxed">
              I build full-stack applications, self-hosted infrastructure, and
              developer tools. Passionate about clean code, great UX, and the
              freedom of owning your own stack. Jay Cloud is my homelab turned
              into a real product.
            </p>

            {/* Skill badges */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-zinc-800 bg-zinc-800/60 px-3 py-1 text-xs font-medium text-zinc-300"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                disabled
                className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-500 opacity-60"
              >
                View Portfolio
                <ArrowRight size={14} />
                <span className="rounded-full border border-zinc-700 px-1.5 py-0.5 text-xs">
                  Soon
                </span>
              </button>

              <a
                href="https://github.com/Jaykaran24"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-150 hover:text-zinc-200"
              >
                <GitHubIcon size={15} />
                GitHub
                <ExternalLink size={12} className="text-zinc-600" />
              </a>
            </div>
          </motion.div>

          {/* Right — Stats card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-br from-blue-600/20 to-violet-600/15 blur-2xl" />

            <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
              {/* Card header */}
              <div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/60 px-5 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_6px_2px_rgb(52,211,153,0.4)]" />
                <span className="font-mono text-xs text-zinc-500">
                  jay@homelab ~ profile
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-zinc-800/60">
                {stats.map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.4 }}
                    className="flex flex-col gap-1 p-5"
                  >
                    <span className="text-xs text-zinc-500">{stat.label}</span>
                    <span className="font-mono text-lg font-semibold text-zinc-100">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Location row */}
              <div className="flex items-center gap-2 border-t border-zinc-800 bg-zinc-900/40 px-5 py-3">
                <MapPin size={13} className="text-zinc-600" />
                <span className="text-xs text-zinc-500">India · Available for remote work</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
