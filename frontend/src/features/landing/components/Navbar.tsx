import { Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-6 py-4 backdrop-blur-xl shadow-lg">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
            <Cloud size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">
              JAY CLOUD
            </h1>

            <p className="text-xs text-muted-foreground">
              Self Hosted Platform
            </p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a href="#" className="text-sm hover:text-primary transition-colors">
            Home
          </a>

          <a href="#" className="text-sm hover:text-primary transition-colors">
            Projects
          </a>

          <a href="#" className="text-sm hover:text-primary transition-colors">
            Portfolio
          </a>

          <a href="#" className="text-sm hover:text-primary transition-colors">
            Docs
          </a>
        </nav>

        <Button>Admin Login</Button>
      </div>
    </header>
  );
}