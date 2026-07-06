# Frontend Architecture

Version: 0.1.0

Project: Jay Cloud

Status: Active Development

Last Updated: July 2026

Owner: Jay Karan Chaturvedi

---

# Purpose

This document explains how the frontend of Jay Cloud is structured.

It serves as the primary guide for developers and AI agents contributing to the React application.

The frontend is built with scalability, maintainability, and reusability in mind.

---

# Technology Stack

Framework

- React 19

Language

- TypeScript

Bundler

- Vite

Styling

- Tailwind CSS v4

Component Library

- shadcn/ui

Routing

- React Router

State Management

- React Context (Current)
- React Query (Future)

Icons

- Lucide React

Forms

- React Hook Form (Planned)

Validation

- Zod (Planned)

Animations

- Framer Motion (Planned)

---

# Project Structure

```

frontend/

src/

app/

features/

shared/

assets/

styles/

main.tsx

```

---

# Boot Process

Application startup follows this flow.

```

Browser

↓

main.tsx

↓

App.tsx

↓

Providers

↓

Router

↓

Feature

↓

Components

```

Business logic should never be placed inside App.tsx.

---

# Folder Structure

## app/

Application bootstrap.

Contains

```

App.tsx

providers.tsx

router.tsx

```

Responsibilities

- Global Providers
- Routing
- Theme
- Future Authentication Provider

---

## features/

Contains complete feature modules.

Example

```

features/

landing/

dashboard/

auth/

hosting/

storage/

monitoring/

projects/

portfolio/

```

Each feature owns its own:

- Components
- Hooks
- Types
- Services
- Sections
- Pages

No feature should depend directly on another feature.

---

## shared/

Contains reusable code shared across the application.

Structure

```

shared/

components/

hooks/

services/

types/

utils/

constants/

```

Examples

Button wrappers

Utility functions

API client

Date helpers

Global types

Shared hooks

---

## assets/

Contains static resources.

Examples

```

images/

icons/

logos/

fonts/

```

---

## styles/

Contains global styles.

Examples

```

globals.css

animations.css

variables.css

```

---

# Feature Structure

Each feature follows the same structure.

Example

```

landing/

components/

sections/

hooks/

services/

types/

LandingPage.tsx

```

---

## components/

Reusable inside the feature.

Example

Navbar

ProjectCard

FeatureCard

Footer

---

## sections/

Large page sections.

Example

Hero

Infrastructure

Projects

Contact

---

## hooks/

Feature-specific hooks.

Example

```

useProjects()

usePortfolio()

```

---

## services/

Communication with backend.

Example

```

landing.service.ts

```

---

## types/

TypeScript interfaces.

Example

```

Project.ts

Portfolio.ts

```

---

# Routing

All routes are configured inside

```

app/router.tsx

```

Current

```

/

↓

LandingPage

```

Future

```

/

Portfolio

Projects

Docs

Login

Dashboard

Hosting

Storage

Monitoring

Settings

```

---

# State Management

Current

React State

React Context

Future

React Query

Authentication Context

Theme Context

Notification Context

---

# API Layer

Frontend never communicates directly with Docker.

All communication goes through Express.

```

React

↓

API Client

↓

Express

↓

Services

↓

Docker

```

---

# Components

Jay Cloud uses shadcn/ui as its base.

Custom components are created only when necessary.

Examples

```

AppLogo

StatusCard

ServiceCard

MetricCard

DeploymentCard

```

Do NOT wrap every shadcn component unnecessarily.

---

# Naming Convention

Components

```

PascalCase

Navbar.tsx

ProjectCard.tsx

HeroSection.tsx

```

Hooks

```

camelCase

useProjects.ts

```

Types

```

PascalCase

Project.ts

```

Utilities

```

camelCase

formatDate.ts

```

---

# Import Order

Always import in this order.

React

External Libraries

Shared Modules

Feature Modules

Relative Imports

Example

```ts
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { AppLogo } from "@/shared/components/AppLogo";

import ProjectCard from "./ProjectCard";
```

---

# Styling Rules

Use

Tailwind CSS

Avoid

Inline styles

Large CSS files

Component-specific CSS

Use utility classes instead.

---

# Component Guidelines

Keep components small.

One responsibility per component.

Prefer composition over inheritance.

Extract reusable UI.

Avoid prop drilling.

---

# TypeScript Guidelines

Never use

```

any

```

Prefer

Interfaces

Generics

Utility Types

Strict typing

Always define types for

Props

API responses

State

Events

---

# Performance

Use

React.memo

useMemo

useCallback

only when profiling indicates they are beneficial.

Do not optimize prematurely.

---

# Accessibility

Every interactive element should support

Keyboard navigation

Visible focus

Semantic HTML

ARIA labels where required

---

# Error Handling

Every async operation should have

Loading state

Error state

Retry state

Avoid blank screens.

---

# Current Development

Current Feature

Landing Page

Current Sprint

Sprint 1

Current Work

- Navigation Bar
- Hero Section
- Infrastructure
- Projects
- Footer

---

# Future Features

Authentication

Dashboard

Hosting

Storage

Monitoring

AI Assistant

Notifications

Settings

---

# Best Practices

Always

Use TypeScript

Use feature-first architecture

Use reusable components

Keep files small

Prefer composition

Write meaningful commit messages

Never

Use any

Mix feature code

Place logic inside App.tsx

Duplicate components

Hardcode values repeatedly

---

# References

React

https://react.dev/

Vite

https://vitejs.dev/

Tailwind CSS

https://tailwindcss.com/

shadcn/ui

https://ui.shadcn.com/

React Router

https://reactrouter.com/

TypeScript

https://www.typescriptlang.org/