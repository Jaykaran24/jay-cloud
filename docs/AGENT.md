# AGENT.md

# Jay Cloud — AI Development Context

> This document is intended for AI agents and developers joining the project.
>
> Read this file before making any code changes.

---

# Project Overview

Jay Cloud is a self-hosted cloud platform built by **Jay Karan Chaturvedi**.

The goal is to provide one unified platform for:

- Application Hosting
- Docker Management
- Cloud Storage
- MongoDB Management
- Monitoring
- Portfolio
- Project Showcase

The project combines a **public website** with a **private cloud dashboard**.

---

# Vision

Jay Cloud is NOT a portfolio website.

It is a cloud platform.

The portfolio is only one feature of the platform.

Think of the project as a lightweight combination of:

- Railway
- Render
- Vercel
- Portainer
- Google Drive

built completely on a self-hosted infrastructure.

---

# Current Project Status

Project Phase

Frontend Foundation

Current Sprint

Sprint 1

Current Task

Building the Public Website

Current Feature

Landing Page

---

# Current Architecture

Frontend

React 19

TypeScript

Vite

Tailwind CSS v4

shadcn/ui

React Router

Backend

Node.js

Express

MongoDB

Dockerode

Infrastructure

Ubuntu Server

Docker

Docker Compose

Cloudflare Tunnel

Portainer

MongoDB

Uptime Kuma

---

# Current Frontend Architecture

```
main.tsx
      │
      ▼
App.tsx
      │
      ▼
Providers
      │
      ▼
Router
      │
      ▼
LandingPage
```

Do not place business logic directly inside `App.tsx`.

---

# Folder Structure

```
src/

app/

features/

landing/

components/

sections/

LandingPage.tsx

shared/

ui/

components/

layout/

primitives/

hooks/

services/

types/

utils/

assets/

styles/
```

Architecture is **feature-first**, not page-first.

---

# Design Philosophy

Jay Cloud should feel like a professional SaaS product.

Design inspirations:

- Vercel
- Linear
- GitHub

Do NOT copy their designs.

Maintain Jay Karan's own visual identity.

---

# Visual Identity

Inspired by Jay Portfolio.

Keep

- Large elegant typography
- Soft gradients
- Rounded corners
- Clean spacing
- Modern UI

Improve

- Dark theme
- Better component system
- Better navigation
- Better dashboard

---

# Public Website

Visitors can:

- View projects
- View portfolio
- Read documentation
- Learn about Jay Cloud

Visitors CANNOT

- Deploy apps
- Store files
- Access dashboard
- View infrastructure

---

# Admin Dashboard

Admins can

- Deploy Docker containers
- Upload applications
- Manage MongoDB
- Upload files
- Monitor services
- Restart containers
- View logs
- Manage users

---

# Current Folder Structure

Frontend

```
frontend/

src/

app/

features/

shared/

assets/

styles/
```

Backend

```
backend/

controllers/

routes/

middleware/

services/

models/

utils/
```

---

# Problems Encountered

## Problem 1

MongoDB container randomly restarted.

Symptoms

- Container stopped
- No Docker restart count
- Exit code 0

Investigation

Docker itself was not restarting MongoDB.

Docker events showed

```
signal=15
```

meaning the container received SIGTERM from outside.

Cause

VirtualBox instability caused by Hyper-V.

Solution

Recreated MongoDB deployment.

Verified Docker Compose.

Verified persistent volume.

Container stable.

---

## Problem 2

VirtualBox Performance

Symptoms

Green turtle icon.

Very poor VM performance.

Cause

Windows Hyper-V.

Windows Hypervisor Platform.

Memory Integrity.

Solution

Disable

- Hyper-V
- Virtual Machine Platform
- Windows Hypervisor Platform
- Memory Integrity

Reboot Windows.

---

## Problem 3

Docker Compose recreated containers

Cause

VS Code Remote SSH automatically modified docker-compose.yml.

Docker Compose detected file changes.

Solution

Avoid editing compose files while monitoring container events.

---

## Problem 4

App.tsx import failed.

Error

```
Failed to resolve ./App.tsx
```

Cause

App moved to

```
src/app/App.tsx
```

Solution

Import

```
./app/App
```

---

## Problem 5

shadcn Button missing.

Error

```
Cannot resolve

@/components/ui/button
```

Cause

Components not installed.

Solution

```
npx shadcn add button
```

Installed all required components.

---

## Problem 6

Missing utils.ts

Error

```
Cannot resolve

@/lib/utils
```

Cause

Helper file missing.

Solution

Created

```
src/lib/utils.ts
```

Content

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
```

---

## Problem 7

Tailwind alias issue.

Cause

Missing path alias.

Solution

Configured

- vite.config.ts
- tsconfig.app.json

Alias

```
@
```

points to

```
src/
```

---

# Coding Standards

Always

Use

TypeScript

Feature-first architecture

Reusable components

shadcn/ui

Tailwind CSS

Never

Write large components.

Duplicate UI.

Place business logic in App.tsx.

Mix dashboard code with landing page.

---

# Git Workflow

Feature branches preferred.

Small commits.

Meaningful commit messages.

---

# Current Milestone

Milestone 1

Public Website

Status

In Progress

Completed

- React setup
- TypeScript
- Tailwind
- shadcn
- Routing
- Providers
- Landing structure

Current Task

Landing Navbar

After Navbar

Hero

Infrastructure section

Projects

Portfolio

Footer

---

# Future Milestones

Milestone 2

Authentication

Milestone 3

Dashboard

Milestone 4

Hosting

Milestone 5

Storage

Milestone 6

Monitoring

Milestone 7

Artificial Intelligence

---

# Long-Term Goal

Jay Cloud should become the single interface for managing the entire homelab.

Users should rarely need to open:

- Portainer
- MongoDB Compass
- Cloudflare Dashboard

Everything should eventually be manageable directly from Jay Cloud.

---

# Instructions for Future AI Agents

Before writing code:

1. Read README.md.
2. Read ARCHITECTURE.md.
3. Read DECISIONS.md.
4. Read DESIGN_SYSTEM.md.
5. Continue from the current sprint.
6. Do not rewrite existing architecture unless there is a strong technical reason.
7. Preserve the design language inspired by Jay Portfolio while evolving it into a modern cloud platform.