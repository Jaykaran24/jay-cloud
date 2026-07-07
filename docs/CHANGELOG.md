# Changelog

All notable changes to Jay Cloud will be documented in this file.

## [Unreleased]

### Added
- [2026-07-07] AuthContext: React context providing user, token, isAuthenticated, login(), logout() with typed User interface (id, email, role)
- [2026-07-07] AuthProvider: Wraps app with AuthContext.Provider, persists token+user to localStorage on login, clears on logout
- [2026-07-07] auth.service.ts: loginUser() and logoutUser() typed service functions, POST /api/auth/login, no any types
- [2026-07-07] ProtectedRoute: HOC that redirects unauthenticated users to /login via React Router Navigate
- [2026-07-07] LoginPage: Full login page with glassmorphism card, Framer Motion fade-up, react-hook-form + zod validation, email/password inputs, show/hide toggle, inline error display, gradient Sign In button, orb glow background
- [2026-07-07] DashboardPage: Sprint 3 placeholder page with top bar showing user email, logout button, and animated centered coming soon message
- [2026-07-07] HeroSection: Full hero with animated headline, terminal mockup, gradient CTA buttons, animated orb background, stats row, and Framer Motion fade-up reveals
- [2026-07-06] InfrastructureSection: Live service status grid showing 6 core services (Portainer, MongoDB, Uptime Kuma, Cloudflare Tunnel, Jay Cloud Backend, Frontend) with animated pulse StatusBadge, service icons, and port display
- [2026-07-06] FeaturesSection: 3-column feature grid (Docker Management, Cloud Storage, Monitoring, MongoDB Manager, Secure Access, AI Assistant) with gradient icon badges, hover scale and glow animation, and "Soon" badge for upcoming features
- [2026-07-06] Footer: Logo and tagline, navigation links, GitHub inline SVG link, copyright line with dark themed bottom border
- [2026-07-06] ProjectsSection: 3 project cards (Jay Cloud, Jay Portfolio, Homelab Setup) with status badges, tech stack badges, hover lift animation, and "View All Projects" CTA
- [2026-07-06] PortfolioSection: Two-column layout with bio, skill badges, and terminal-style stats card (GitHub, Projects, Experience, Location)
- [2026-07-06] ContactSection: Centered section with soft glowing orb background, GitHub button, and email link CTA

### Changed
- [2026-07-07] router.tsx: Added /login route (LoginPage) and /dashboard route (DashboardPage wrapped in ProtectedRoute)
- [2026-07-07] providers.tsx: Wrapped RouterProvider with AuthProvider for global auth state
- [2026-07-07] Navbar: Admin Login button now uses React Router Link to /login; shows Dashboard button with LayoutDashboard icon when isAuthenticated; mobile menu updated accordingly
- [2026-07-06] LandingPage: Updated to import and render all sections in correct order (Navbar, Hero, Infrastructure, Features, Projects, Portfolio, Contact, Footer)
- [2026-07-06] Navbar: Added mobile hamburger menu with AnimatePresence slide-down animation, staggered link reveals, and full mobile Admin Login button
- [2026-07-06] PortfolioSection: Linked "View Portfolio" button to https://jaykaran24.github.io/JayPortfolio (was disabled with "Coming Soon" state)

### Fixed
- [2026-07-06] Footer: Replaced invalid Github lucide-react export with an inline SVG GitHub icon (lucide-react v1.x removed this icon)
