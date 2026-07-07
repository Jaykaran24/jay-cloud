import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Cloud, Menu, X, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/features/auth/context/AuthContext";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Projects", href: "#projects" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Docs", href: "#docs" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-6 flex max-w-7xl flex-col rounded-2xl border border-border/50 bg-background/70 backdrop-blur-xl shadow-lg">
        {/* Main row */}
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
              <Cloud size={22} />
            </div>

            <div>
              <h1 className="text-lg font-bold tracking-tight">JAY CLOUD</h1>
              <p className="text-xs text-muted-foreground">Self Hosted Platform</p>
            </div>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Button
                className="hidden md:inline-flex items-center gap-2"
                onClick={() => navigate("/dashboard")}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Button>
            ) : (
              <Link to="/login" className="hidden md:inline-flex">
                <Button>Admin Login</Button>
              </Link>
            )}

            {/* Hamburger mobile only */}
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/60 text-zinc-400 transition-colors duration-150 hover:border-zinc-700 hover:text-zinc-200 md:hidden"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 border-t border-zinc-800/60 px-6 pb-4 pt-3">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.2 }}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-2.5 text-sm text-zinc-400 transition-colors duration-150 hover:bg-zinc-800/60 hover:text-zinc-200"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <div className="mt-2 border-t border-zinc-800/40 pt-3">
                  {isAuthenticated ? (
                    <Button
                      className="w-full flex items-center gap-2"
                      onClick={() => {
                        setMobileOpen(false);
                        navigate("/dashboard");
                      }}
                    >
                      <LayoutDashboard size={15} />
                      Dashboard
                    </Button>
                  ) : (
                    <Link to="/login" onClick={() => setMobileOpen(false)}>
                      <Button className="w-full">Admin Login</Button>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
