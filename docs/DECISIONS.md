# Architecture Decisions (ADR)

Version: 0.1.0

Project: Jay Cloud

Status: Active Development

Last Updated: July 2026

Owner: Jay Karan Chaturvedi

---

# Purpose

This document records significant architectural, design, and technical decisions made during the development of Jay Cloud.

Every major decision should answer four questions:

1. What decision was made?
2. Why was it made?
3. What alternatives were considered?
4. What are the long-term consequences?

Future developers and AI agents should consult this document before changing the architecture.

---

# Decision 001

## Feature-First Architecture

Status

Accepted

Date

July 2026

---

### Decision

The frontend will use a **feature-first architecture**.

Example

```
src/

features/

landing/

dashboard/

storage/

hosting/

auth/

shared/
```

---

### Why

As the project grows, organizing by feature is easier than organizing by page.

Each feature owns:

- Components
- Services
- Types
- Hooks
- Sections

This keeps unrelated code isolated.

---

### Alternatives Considered

Page-based architecture

```
pages/

Home

About

Dashboard

Login
```

Rejected because it becomes difficult to maintain once features become large.

---

### Consequences

Pros

- Highly scalable
- Easier maintenance
- Better separation of concerns

Cons

- Slightly more folders

---

# Decision 002

## React + TypeScript

Status

Accepted

---

### Decision

Frontend will be written entirely in TypeScript.

---

### Why

Benefits

- Better autocomplete
- Compile-time safety
- Easier refactoring
- Better documentation

---

### Alternatives

JavaScript

Rejected.

---

# Decision 003

## Tailwind CSS

Status

Accepted

---

### Decision

Use Tailwind CSS v4.

---

### Why

- Utility-first
- Excellent developer experience
- Great with React
- Easy theming

---

### Alternatives

Bootstrap

Rejected

Material UI

Rejected

CSS Modules

Rejected

---

# Decision 004

## shadcn/ui

Status

Accepted

---

### Decision

Jay Cloud will use shadcn/ui as its component foundation.

---

### Why

Unlike traditional UI libraries, shadcn generates source code that belongs to the project.

Benefits

- Full ownership
- Easy customization
- No runtime dependency
- Modern design

---

### Alternatives

Material UI

Rejected

Ant Design

Rejected

Chakra UI

Rejected

---

# Decision 005

## React Router

Status

Accepted

---

### Decision

Use React Router for routing.

Architecture

```
App

↓

Providers

↓

Router

↓

Features
```

---

### Why

Supports

- Nested routes
- Protected routes
- Future dashboard expansion

---

# Decision 006

## App Bootstrap Architecture

Status

Accepted

---

### Decision

Application startup flow

```
main.tsx

↓

App.tsx

↓

Providers

↓

Router

↓

Feature
```

Business logic must never be placed inside App.tsx.

---

# Decision 007

## Public Website + Private Dashboard

Status

Accepted

---

### Decision

Jay Cloud consists of two separate experiences.

Public

- Landing
- Portfolio
- Projects
- Docs

Private

- Dashboard
- Docker
- Storage
- Monitoring

---

### Why

Different audiences.

Visitors do not need infrastructure access.

Administrators need powerful tooling.

---

# Decision 008

## Self Hosted Infrastructure

Status

Accepted

---

### Decision

Infrastructure remains fully self-hosted.

Current stack

- Ubuntu Server
- Docker
- Cloudflare Tunnel
- MongoDB
- Portainer
- Uptime Kuma

---

### Why

Learning

Control

Privacy

Flexibility

---

# Decision 009

## MongoDB

Status

Accepted

---

### Decision

MongoDB will be the primary application database.

---

### Why

Flexible schemas

Rapid development

JSON-like documents

Good Node.js ecosystem

---

# Decision 010

## Docker as Deployment Engine

Status

Accepted

---

### Decision

All applications will run as Docker containers.

---

### Why

Consistency

Isolation

Portability

Easy deployment

---

# Decision 011

## Design Philosophy

Status

Accepted

---

### Decision

Jay Cloud should feel like a premium developer product.

Inspired by

- Vercel
- Linear
- GitHub

without copying them.

Maintain the visual identity established by Jay Portfolio.

---

### Design Principles

Minimal

Elegant

Fast

Developer-focused

Modern

Rounded

Accessible

---

# Decision 012

## Documentation First

Status

Accepted

---

### Decision

Documentation is part of the codebase.

Every significant feature must update:

- ROADMAP.md
- CHANGELOG.md
- DECISIONS.md

Documentation should never fall behind implementation.

---

# Decision 013

## Git Workflow

Status

Accepted

---

### Decision

Development should use small, focused commits.

Commit messages should describe intent, not just changed files.

Example

```
feat: add landing page navbar

fix: resolve Tailwind alias configuration

refactor: move router into app module
```

---

# Decision 014

## Current Development Strategy

Status

Accepted

---

### Decision

Build vertically.

Meaning

Complete one usable feature before moving to the next.

Current order

Landing Page

↓

Authentication

↓

Dashboard

↓

Hosting

↓

Storage

↓

Monitoring

---

### Why

Each milestone results in a working product.

Progress is easier to measure.

Testing becomes simpler.

---

# Future Decisions

This document will continue to grow.

Future topics include

- Authentication strategy
- RBAC
- Storage abstraction
- AI integration
- Background jobs
- WebSockets
- Kubernetes
- Plugin architecture
- Microservices (if needed)

---

# Decision Template

Use this template for future entries.

```
# Decision XXX

Status

Date

Decision

Why

Alternatives Considered

Consequences

Notes
```