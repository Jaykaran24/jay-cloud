import { motion } from "framer-motion";
import { Mail, ExternalLink } from "lucide-react";

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

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background orb */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[500px] w-[500px] rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute h-[300px] w-[300px] rounded-full bg-violet-600/8 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">
            Contact
          </p>

          {/* Heading */}
          <h2 className="text-3xl font-bold tracking-tight lg:text-5xl">
            Get in Touch
          </h2>

          {/* Sub-copy */}
          <p className="max-w-md text-lg leading-relaxed text-zinc-400">
            Have a project in mind or want to collaborate? I am always open to
            new ideas and interesting work.
          </p>

          {/* CTA buttons */}
          <div className="mt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/Jaykaran24"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/30 transition-all duration-200 hover:scale-105 hover:shadow-blue-900/50"
            >
              <GitHubIcon size={16} />
              GitHub
              <ExternalLink size={13} className="opacity-70" />
            </a>

            <a
              href="mailto:jay@jay24codes.me"
              className="inline-flex items-center gap-2.5 rounded-xl border border-zinc-700 bg-zinc-900/60 px-6 py-3 text-sm font-semibold text-zinc-200 transition-all duration-200 hover:border-zinc-500 hover:bg-zinc-800/60"
            >
              <Mail size={15} />
              jay@jay24codes.me
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
