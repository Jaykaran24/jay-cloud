# Architecture

> Technical architecture of Jay Cloud.

Version: 0.1

Status: Active Development

---

# Overview

Jay Cloud is a modern self-hosted cloud platform consisting of three major layers.

```
                Internet
                     │
                     ▼
          Cloudflare Tunnel
                     │
                     ▼
              Ubuntu Server
                     │
      ┌──────────────┴──────────────┐
      │                             │
      ▼                             ▼
Frontend (React)              Backend (Express)
      │                             │
      └──────────────┬──────────────┘
                     ▼
              Docker Engine
                     │
     ┌───────────────┼────────────────┐
     ▼               ▼                ▼
 MongoDB        User Containers   Storage
```

---

# High-Level Architecture

Jay Cloud consists of two applications.

## Frontend

Responsible for:

- Landing page
- Portfolio
- Dashboard
- Authentication
- User Interface

Technology

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

---

## Backend

Responsible for:

- Authentication
- Docker Management
- MongoDB
- File Storage
- Cloudflare API
- Monitoring
- Logging

Technology

- Node.js
- Express
- Dockerode
- MongoDB

---

# Infrastructure

Current infrastructure

```
Internet

↓

Cloudflare DNS

↓

Cloudflare Tunnel

↓

Ubuntu Server VM

↓

Docker

↓

Containers
```

---

Current Containers

```
Portainer

Cloudflared

MongoDB

Uptime Kuma

Jay Cloud Backend (Future)

Jay Cloud Frontend (Future)
```

---

# Frontend Architecture

Current architecture

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

↓

Component
```

---

Folder Structure

```
src/

app/

features/

shared/

assets/

styles/
```

---

## app/

Contains application bootstrap.

```
App.tsx

providers.tsx

router.tsx
```

Never place business logic here.

---

## features/

Contains feature modules.

Current

```
landing
```

Future

```
landing

auth

dashboard

hosting

storage

monitoring

portfolio

projects

settings
```

Each feature owns:

- Components
- Hooks
- Services
- Types
- Sections

---

## shared/

Reusable code.

```
ui/

hooks/

services/

utils/

types/

lib/
```

Nothing inside shared should depend on a feature.

---

# Backend Architecture

```
Express

↓

Routes

↓

Controllers

↓

Services

↓

Docker / MongoDB

↓

Response
```

Folder structure

```
controllers/

routes/

middleware/

services/

models/

utils/
```

---

# Authentication Flow

Future

```
User

↓

Login

↓

JWT

↓

Cookie

↓

Protected Route

↓

Dashboard
```

Roles

```
Guest

↓

Authenticated User

↓

Administrator
```

Guests

- Portfolio

- Projects

- Documentation

Administrators

Everything

---

# Docker Architecture

Backend communicates directly with Docker Engine.

```
Frontend

↓

REST API

↓

Dockerode

↓

Docker Socket

↓

Docker Engine

↓

Containers
```

Containers can be

- Created

- Started

- Stopped

- Restarted

- Removed

directly from Jay Cloud.

---

# Storage Architecture

Future

```
Browser

↓

Upload

↓

Backend

↓

Storage Service

↓

Disk
```

Supported

- Images

- ZIP

- PDF

- Documents

Future

Object storage abstraction.

---

# Database Architecture

MongoDB stores

```
Users

Projects

Deployments

Sessions

Logs

Files

Notifications

Settings
```

Each collection has its own model.

---

# Monitoring Architecture

Future

```
Docker

↓

Metrics Service

↓

Database

↓

Dashboard
```

Monitored

CPU

RAM

Storage

Containers

Network

Disk

---

# Deployment Pipeline

Future deployment process

```
Upload ZIP

↓

Extract

↓

Docker Build

↓

Docker Image

↓

Container

↓

Health Check

↓

Cloudflare Update

↓

Deployment Complete
```

---

# Networking

Public

```
jay24codes.me
```

↓

Cloudflare

↓

Tunnel

↓

Ubuntu Server

↓

Reverse Proxy

↓

Frontend / Backend

Internal Docker network

```
homelab-network
```

---

# Request Lifecycle

Example

```
Browser

↓

React

↓

Express API

↓

Service

↓

Docker Engine

↓

Response

↓

React Update
```

---

# Error Handling

Frontend

- Error Boundary

- Toast Notifications

Backend

- Global Error Handler

- Request Logging

Docker

- Retry Strategy

Future

Centralized logging.

---

# Security

Current

Cloudflare Tunnel

Private Dashboard

Future

JWT

HTTPS Only

Rate Limiting

Helmet

Input Validation

CSRF Protection

Refresh Tokens

RBAC

Audit Logs

---

# Scalability

Current

Single Server

Future

```
Frontend

↓

Backend

↓

Redis

↓

MongoDB

↓

Docker Swarm / Kubernetes
```

Architecture should support horizontal scaling.

---

# Design Principles

- Feature-first architecture
- Small reusable components
- Strong TypeScript typing
- Separation of concerns
- Service-oriented backend
- Clean folder structure
- Minimal dependencies
- Self-hosted infrastructure

---

# Current Status

Frontend Foundation

✅ Complete

React

TypeScript

Tailwind

shadcn/ui

Providers

Router

Landing structure

Current work

Landing Page

Next

Navigation Bar

Hero Section

Infrastructure Section

Projects Section

Footer

Authentication begins after the public website is complete.

---

# Future Architecture Goals

- Multi-user support
- Background jobs
- WebSockets
- AI assistant
- Plugin system
- Kubernetes support
- Multi-server deployments
- Object storage abstraction
- Deployment templates
- API versioning