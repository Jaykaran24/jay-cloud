import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

type ProjectStatus = "Live" | "In Progress" | "Archived";

interface Project {
  name: string;
  description: string;
  tags: string[];
  status: ProjectStatus;
  href?: string;
}

const projects: Project[] = [
  {
    name: "Jay Cloud",
    description:
      "A self-hosted personal cloud platform — container management, monitoring, storage, and a developer dashboard. Built from scratch on an Ubuntu home server.",
    tags: ["React", "Docker", "Node.js", "TypeScript"],
    status: "In Progress",
  },
  {
    name: "Jay Portfolio",
    description:
      "Personal portfolio website showcasing projects, skills, and experience. Fast, responsive, and dark-themed with smooth animations.",
    tags: ["React", "TypeScript", "Tailwind"],
    status: "Live",
    href: "https://github.com/Jaykaran24",
  },
  {
    name: "Homelab Setup",
    description:
      "A fully documented homelab running on a physical Ubuntu server with Docker, Nginx reverse proxy, Cloudflare tunnels, and automated backups.",
    tags: ["Ubuntu", "Docker", "Nginx", "Cloudflare"],
    status: "Live",
  },
];

const statusConfig: Record<
  ProjectStatus,
  { textClass: string; bgClass: string; borderClass: string }
> = {
  Live: {
    textClass: "text-emerald-400",
    bgClass: "bg-emerald-400/10",
    borderClass: "border-emerald-400/20",
  },
  "In Progress": {
    textClass: "text-yellow-400",
    bgClass: "bg-yellow-400/10",
    borderClass: "border-yellow-400/20",
  },
  Archived: {
    textClass: "text-zinc-500",
    bgClass: "bg-zinc-500/10",
    borderClass: "border-zinc-500/20",
  },
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps) {
  const cfg = statusConfig[project.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.55,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 transition-colors duration-300 hover:border-zinc-700"
    >
      {/* Border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/0 to-violet-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:from-blue-500/8 group-hover:to-violet-500/8 group-hover:opacity-100" />

      {/* Header row */}
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-zinc-100">{project.name}</h3>
        <span
          className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.bgClass} ${cfg.borderClass} ${cfg.textClass}`}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-500">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-lg border border-zinc-800 bg-zinc-800/60 px-2.5 py-0.5 text-xs text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* View button */}
      <a
        href={project.href ?? "#projects"}
        target={project.href ? "_blank" : undefined}
        rel={project.href ? "noopener noreferrer" : undefined}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 transition-colors duration-150 hover:text-blue-300"
      >
        View Project
        <ArrowRight size={14} />
      </a>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14 flex flex-col items-start gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-blue-400">
              Work
            </p>
            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
              Projects
            </h2>
            <p className="mt-2 text-zinc-400">
              A selection of things I have built and shipped.
            </p>
          </div>

          <a
            href="https://github.com/Jaykaran24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900/60 px-5 py-2.5 text-sm font-medium text-zinc-300 transition-all duration-200 hover:border-zinc-500 hover:text-zinc-100"
          >
            View All Projects
            <ExternalLink size={14} />
          </a>
        </motion.div>

        {/* Projects grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
