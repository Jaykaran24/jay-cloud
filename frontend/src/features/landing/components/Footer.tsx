import { Cloud, Github, ExternalLink } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Docs", href: "#docs" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 bg-zinc-950/80">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          {/* Left — Logo + tagline */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                <Cloud size={18} />
              </div>
              <span className="text-base font-bold tracking-tight text-zinc-100">
                JAY CLOUD
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500">
              A self-hosted personal cloud platform. Built with passion, deployed
              at home.
            </p>
          </div>

          {/* Center — Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-zinc-500 transition-colors duration-150 hover:text-zinc-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right — GitHub */}
          <a
            href="https://github.com/Jaykaran24"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900/60 px-4 py-2.5 text-sm text-zinc-400 transition-all duration-200 hover:border-zinc-700 hover:text-zinc-200"
          >
            <Github size={16} />
            <span>Jaykaran24</span>
            <ExternalLink size={12} className="text-zinc-600" />
          </a>
        </div>

        {/* Bottom row */}
        <div className="mt-10 flex flex-col items-start gap-2 border-t border-zinc-800/50 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-zinc-600">
            &copy; {year} Jay Karan Chaturvedi. Jay Cloud.
          </p>
          <p className="text-xs text-zinc-700">
            Built on Ubuntu · Powered by Docker · Self-hosted with
          </p>
        </div>
      </div>
    </footer>
  );
}
