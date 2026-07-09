# Changelog

All notable changes to Jay Cloud will be documented in this file.

## [Unreleased]

### Added
- [2026-07-09] DockerPage: Full Docker Management page at /dashboard/docker with container cards, Start/Stop/Restart actions, animated stat counters (total/running/stopped), skeleton loading, empty state, error state with retry, and 30s auto-refresh via React Query
- [2026-07-09] docker.service.ts: Typed fetch service for Docker API (getContainers, startContainer, stopContainer, restartContainer) with Bearer token auth header
- [2026-07-09] docker.controller.ts: Backend Express controller using Dockerode to list all containers and perform start/stop/restart actions via /var/run/docker.sock
- [2026-07-09] docker.routes.ts: Backend router at /api/docker — GET /containers, POST /containers/:id/start|stop|restart — protected by requireAuth middleware
- [2026-07-07] DashboardLayout: Added responsive layout with desktop sidebar, mobile drawer, page breadcrumbs, Sun/Moon theme toggler and logout options
- [2026-07-07] Docker/Storage/Monitoring/Settings Placeholders: Added placeholder pages under dashboard layout for future sprints
- [2026-07-07] Backend Server: Fully implemented Node.js Express + Mongoose backend, connected successfully to Dockerized MongoDB with auth
- [2026-07-07] Seeding Admin: Added seed endpoint /api/auth/seed and successfully seeded database with admin user
- [2026-07-07] ThemeContext: React context providing theme ('dark'|'light') and toggleTheme(), reads/writes 'jay-cloud-theme' localStorage key
- [2026-07-07] ThemeProvider: Applies/removes 'dark' class on document.documentElement on mount and on theme change
- [2026-07-07] UsersPage: Admin-only user management page at /dashboard/users with Add User form, React Query list, skeleton loading, delete, role badges
- [2026-07-07] AuthContext: React context providing user, token, isAuthenticated, login(), logout() with typed User interface (id, name, email, role)
- [2026-07-07] AuthProvider: Wraps app with AuthContext.Provider, persists token+user to localStorage on login, clears on logout
- [2026-07-07] ProtectedRoute: HOC that redirects unauthenticated users to /login via React Router Navigate
- [2026-07-07] LoginPage: Full glassmorphism card with react-hook-form + zod, show/hide password, inline error, gradient button
- [2026-07-06] HeroSection: Full hero with animated headline, terminal mockup, gradient CTA buttons, Framer Motion reveals
- [2026-07-06] InfrastructureSection: Live service status grid with animated pulse StatusBadge
- [2026-07-06] FeaturesSection: 3-column feature grid with gradient icon badges and hover animations
- [2026-07-06] Footer: Logo, nav links, GitHub SVG link, copyright
- [2026-07-06] ProjectsSection: 3 project cards with status badges and tech stack
- [2026-07-06] PortfolioSection: Bio, skill badges, terminal-style stats card
- [2026-07-06] ContactSection: Glowing orb background, GitHub button, email CTA

### Changed
- [2026-07-09] app.ts: Registered /api/docker route with requireAuth middleware and dockerRoutes
- [2026-07-09] router.tsx: Replaced DockerPlaceholder with full DockerPage at /dashboard/docker route
- [2026-07-07] auth.service.ts: Removed mock login bypass and connected directly to backend API (/api/auth/login)
- [2026-07-07] LoginPage: Removed mock credentials hint from UI template
- [2026-07-07] DashboardPage: Updated dashboard home view with live system stats grid, Quick Actions, and Recent Activity log
- [2026-07-07] router.tsx: Nested all dashboard subroutes under DashboardLayout and configured child outlets
- [2026-07-07] Vite Config: Configured API proxying to http://localhost:8080/ for smooth development routing
- [2026-07-07] AuthContext User type: Added name field (id, name, email, role)
- [2026-07-07] Navbar: Added Sun/Moon theme toggle icon button; uses useTheme()
- [2026-07-07] providers.tsx: ThemeProvider outermost, QueryClientProvider (staleTime 30s), AuthProvider, RouterProvider
- [2026-07-07] index.css: html.dark and html:not(.dark) body rules for proper light/dark switching
- [2026-07-06] LandingPage: All 8 sections in correct order
- [2026-07-06] Navbar: Mobile hamburger menu with AnimatePresence
- [2026-07-06] PortfolioSection: Linked View Portfolio button

### Fixed
- [2026-07-09] docker.controller.ts: Fixed TS2345 error by coercing req.params.id to string before passing to docker.getContainer()
- [2026-07-07] Dashboard and Login Theme: Rewrote LoginPage, DashboardLayout, DashboardPage, and UsersPage from hardcoded dark colors to semantic Tailwind variables to enable full light/dark theme switching
- [2026-07-07] TypeScript Lints: Fixed React and ArrowRight unused imports in DashboardPage/Placeholders to resolve build errors
- [2026-07-07] tsconfig: Added ignoreDeprecations 6.0 to silence TS6 baseUrl deprecation
- [2026-07-07] HeroSection: Fixed Framer Motion ease type assertion
- [2026-07-06] Footer: Replaced invalid Github lucide-react export with inline SVG
