# Changelog

All notable changes to Jay Cloud will be documented in this file.

## [Unreleased]

### Added
- [2026-07-07] ThemeContext: React context providing theme ('dark'|'light') and toggleTheme(), reads/writes 'jay-cloud-theme' localStorage key
- [2026-07-07] ThemeProvider: Applies/removes 'dark' class on document.documentElement on mount and on theme change
- [2026-07-07] UsersPage: Admin-only user management page at /dashboard/users — Add User form (name, email, password, role) with react-hook-form + zod, users list with React Query, skeleton loading, delete action, role badges
- [2026-07-07] AuthContext: React context providing user, token, isAuthenticated, login(), logout() with typed User interface (id, email, role)
- [2026-07-07] AuthProvider: Wraps app with AuthContext.Provider, persists token+user to localStorage on login, clears on logout
- [2026-07-07] auth.service.ts: loginUser() and logoutUser() typed service functions, POST /api/auth/login, no any types
- [2026-07-07] ProtectedRoute: HOC that redirects unauthenticated users to /login via React Router Navigate
- [2026-07-07] LoginPage: Full login page with glassmorphism card, Framer Motion fade-up, react-hook-form + zod validation, email/password inputs, show/hide toggle, inline error display, gradient Sign In button, orb glow background
- [2026-07-07] DashboardPage: Sprint 3 placeholder page with top bar showing user email, logout button, admin tools grid showing Manage Users card for admin role
- [2026-07-06] HeroSection: Full hero with animated headline, terminal mockup, gradient CTA buttons, animated orb background, stats row, and Framer Motion fade-up reveals
- [2026-07-06] InfrastructureSection: Live service status grid showing 6 core services with animated pulse StatusBadge, service icons, and port display
- [2026-07-06] FeaturesSection: 3-column feature grid with gradient icon badges, hover scale and glow animation, and Soon badge for upcoming features
- [2026-07-06] Footer: Logo and tagline, navigation links, GitHub inline SVG link, copyright line with dark themed bottom border
- [2026-07-06] ProjectsSection: 3 project cards with status badges, tech stack badges, hover lift animation, and View All Projects CTA
- [2026-07-06] PortfolioSection: Two-column layout with bio, skill badges, and terminal-style stats card
- [2026-07-06] ContactSection: Centered section with soft glowing orb background, GitHub button, and email link CTA

### Changed
- [2026-07-07] Navbar: Added Sun/Moon theme toggle icon button (desktop: before auth button, no label; mobile: Switch theme row at top of drawer); uses useTheme()
- [2026-07-07] providers.tsx: Added QueryClientProvider (staleTime 30s) and ThemeProvider (outermost) wrapping all other providers
- [2026-07-07] index.css: Added html.dark and html:not(.dark) body rules for proper light/dark mode switching; updated :root to use blue primary in light mode
- [2026-07-07] router.tsx: Added /dashboard/users route (UsersPage wrapped in ProtectedRoute)
- [2026-07-07] DashboardPage: Added admin-only Manage Users card linking to /dashboard/users
- [2026-07-07] router.tsx: Added /login route (LoginPage) and /dashboard route (DashboardPage wrapped in ProtectedRoute)
- [2026-07-07] providers.tsx: Wrapped RouterProvider with AuthProvider for global auth state
- [2026-07-07] Navbar: Admin Login button now uses React Router Link to /login; shows Dashboard button when isAuthenticated; mobile menu updated accordingly
- [2026-07-06] LandingPage: Updated to import and render all sections in correct order
- [2026-07-06] Navbar: Added mobile hamburger menu with AnimatePresence slide-down animation
- [2026-07-06] PortfolioSection: Linked View Portfolio button to https://jaykaran24.github.io/JayPortfolio

### Fixed
- [2026-07-07] tsconfig: Added ignoreDeprecations 6.0 to silence TS6 baseUrl deprecation
- [2026-07-07] HeroSection: Fixed Framer Motion ease type assertion for strict TS compliance
- [2026-07-06] Footer: Replaced invalid Github lucide-react export with an inline SVG GitHub icon
