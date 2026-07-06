import { Cloud, ExternalLink } from "lucide-react";

// Inline GitHub SVG — lucide-react v1.x removed the Github icon
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
            <GitHubIcon size={16} />
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
            Built on Ubuntu · Powered by Docker · Self-hosted
          </p>
        </div>
      </div>
    </footer>
  );
}
