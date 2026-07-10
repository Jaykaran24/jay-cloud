# Changelog

All notable changes to Jay Cloud will be documented in this file.

### Added
- [2026-07-11] DeploymentsPage: Added deployment lifecycle action buttons (Stop, Start, Restart, Delete) directly to the active deployment cards.
- [2026-07-11] deployments.controller.ts: Added backend endpoints `/:id/stop`, `/:id/start`, `/:id/restart`, and `/:id/delete` using Dockerode to manage container lifecycles securely.
- [2026-07-11] DeploymentsPage: New feature for Vercel/Render-style application hosting with segmented controls for deployment sources (Upload ZIP, GitHub Repository, Docker Image) and environment variable injection.
- [2026-07-11] deployments.controller.ts: Added endpoints to clone Git repositories via `child_process`, pull Docker images directly, or extract ZIP files, and dynamically run Docker containers from them.
- [2026-07-11] deployments.routes.ts: New `/api/deployments` endpoint to handle dynamic application hosting payloads.
- [2026-07-11] MongoPage: New MongoDB Manager dashboard page with a split sidebar layout to browse databases, collections, and a main pane for viewing JSON documents with auto-scroll and text-wrapping constraints.
- [2026-07-11] mongo.service.ts: API fetch service connecting to backend Mongo endpoints, including robust handling of MongoDB `Not Authorized` JSON errors.
- [2026-07-11] mongo.controller.ts: Native MongoDB driver endpoints (`listDatabases`, `listCollections`, `fetchDocuments`) extracting connections dynamically from Mongoose instance.
- [2026-07-11] mongo.routes.ts: Three new GET routes for DB management, guarded by `requireAuth`.
- [2026-07-09] StoragePage: Folder uploads using `webkitdirectory`, multi-select files/folders, bulk delete toolbar, and bulk move/copy modal.
- [2026-07-09] storage.service.ts: Added endpoints for batch delete, move, and copy, and extended uploadFile with `relativePath`.
- [2026-07-09] storage.controller.ts: Added backend endpoints `moveItems`, `copyItems` (using `fs.cp`), and `deleteBatch`.
- [2026-07-09] storage.routes.ts: Updated multer diskStorage to reconstruct directories based on `relativePath` query param.
- [2026-07-09] StoragePage: Initial Google Drive-style layout with folder creation, drag-and-drop file upload, file downloading, and deletion.
- [2026-07-09] MonitoringPage: Real-time infrastructure monitoring page at /dashboard/monitoring with animated SVG usage rings for CPU/Memory/Disk, live network I/O card, System Info panel (hostname, OS, kernel, arch, platform), Uptime & Load panel, skeleton loading, error state with retry, and 10s auto-refresh via React Query
- [2026-07-09] monitoring.service.ts: Typed frontend fetch service for monitoring API (getMetrics, formatBytes, formatUptime) with SystemMetrics interface
- [2026-07-09] monitoring.controller.ts: Backend Express controller using systeminformation to collect CPU load, memory, disk, network, OS info, and uptime via si.time()
- [2026-07-09] monitoring.routes.ts: Backend router at /api/monitoring — GET /metrics — protected by requireAuth middleware
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
- [2026-07-11] app.ts: Mounted new `/api/deployments` router under requireAuth.
- [2026-07-11] router.tsx: Added `DeploymentsPage` at `/dashboard/deployments` route.
- [2026-07-11] DashboardLayout: Updated sidebar to include the Deployments tab.
- [2026-07-11] app.ts: Mounted new `/api/mongo` router under requireAuth.
- [2026-07-11] router.tsx: Replaced MongoPlaceholder with full MongoPage at `/dashboard/mongo` route.
- [2026-07-11] DashboardLayout: Updated sidebar to include the Database (Mongo) tab with Lucide Database icon.
- [2026-07-09] app.ts: Registered /api/storage route with requireAuth middleware and storageRoutes
- [2026-07-09] router.tsx: Replaced StoragePlaceholder with full StoragePage at /dashboard/storage route
- [2026-07-09] app.ts: Registered /api/monitoring route with requireAuth middleware and monitoringRoutes
- [2026-07-09] router.tsx: Replaced MonitoringPlaceholder with full MonitoringPage at /dashboard/monitoring route
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
- [2026-07-11] mongo.controller.ts: Fixed 500 crashes when accessing restricted MongoDB config/system collections (e.g. `system.sessions`) by safely catching MongoError code 13 and returning HTTP 403.
- [2026-07-09] storage.service.ts: Fixed Type-Only Export syntax error by importing types explicitly for Vite/esbuild
- [2026-07-09] storage.service.ts: Fixed `../` typo in fetch headers object spread
- [2026-07-09] storage.routes.ts: Changed `req.body.path` to `req.query.path` to resolve Multer missing form data path issues before saving files
- [2026-07-09] docker.controller.ts: Fixed TS2345 error by coercing req.params.id to string before passing to docker.getContainer()
- [2026-07-07] Dashboard and Login Theme: Rewrote LoginPage, DashboardLayout, DashboardPage, and UsersPage from hardcoded dark colors to semantic Tailwind variables to enable full light/dark theme switching
- [2026-07-07] TypeScript Lints: Fixed React and ArrowRight unused imports in DashboardPage/Placeholders to resolve build errors
- [2026-07-07] tsconfig: Added ignoreDeprecations 6.0 to silence TS6 baseUrl deprecation
- [2026-07-07] HeroSection: Fixed Framer Motion ease type assertion
- [2026-07-06] Footer: Replaced invalid Github lucide-react export with inline SVG
