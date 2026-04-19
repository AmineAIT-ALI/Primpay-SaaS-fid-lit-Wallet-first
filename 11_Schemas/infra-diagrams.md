---
Title: Infra Diagrams
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 11_Schemas
Depends on: 04_Technique/infra.md
Used by: —
---

# Objectif

Diagrammes d'infrastructure en notation texte (ASCII / Mermaid). À convertir en visuel si nécessaire.

# Architecture réseau globale

```
┌─────────────────────────────────────────────────────┐
│                    INTERNET                         │
└─────────────────────────────────────────────────────┘
                          │
                          ▼
┌─────────────────────────────────────────────────────┐
│              CLOUDFLARE                             │
│  ► DNS                                              │
│  ► CDN (cache assets statiques)                     │
│  ► WAF (protection DDoS basique)                    │
│  ► SSL termination (origine → Cloudflare)           │
└─────────────────────────────────────────────────────┘
                          │ HTTPS
                          ▼
┌─────────────────────────────────────────────────────┐
│              VPS (Hetzner, EU)                      │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │            NGINX (Reverse Proxy)            │   │
│  │  ► SSL termination (Cloudflare origin cert) │   │
│  │  ► Rate limiting global                     │   │
│  │  ► Routing :                                │   │
│  │    / → Next.js :3000                        │   │
│  │    /api → NestJS :4000                      │   │
│  └─────────────────────────────────────────────┘   │
│          │                      │                   │
│          ▼                      ▼                   │
│  ┌─────────────┐      ┌───────────────────┐        │
│  │  NEXT.JS    │      │     NESTJS        │        │
│  │  :3000      │      │     :4000         │        │
│  │  PWA Merch  │      │     REST API      │        │
│  │  Landing    │      │     Modules:      │        │
│  └─────────────┘      │  auth, customers  │        │
│                       │  merchants, wallet│        │
│                       │  loyalty, billing │        │
│                       └───────────────────┘        │
│                              │       │              │
│                    ┌─────────┘       └─────────┐   │
│                    ▼                           ▼   │
│             ┌────────────┐           ┌──────────┐  │
│             │ PostgreSQL │           │  REDIS   │  │
│             │  :5432     │           │  :6379   │  │
│             │ (données)  │           │ (cache,  │  │
│             └────────────┘           │  locks)  │  │
│                    │                 └──────────┘  │
│                    ▼                               │
│             ┌────────────┐                         │
│             │  BACKUPS   │                         │
│             │ (pg_dump   │                         │
│             │  → object  │                         │
│             │  storage)  │                         │
│             └────────────┘                         │
└─────────────────────────────────────────────────────┘

APIs EXTERNES (sortant)
  ├─► Apple Wallet API (api.apple.com)
  ├─► Google Wallet API (walletobjects.googleapis.com)
  ├─► Stripe API (api.stripe.com)
  └─► Sentry (sentry.io)
```

# Ports et services

| Service | Port interne | Exposé | Notes |
|---|---|---|---|
| Nginx | 80, 443 | ✅ Public | Reverse proxy |
| Next.js | 3000 | ❌ (via Nginx) | |
| NestJS | 4000 | ❌ (via Nginx) | |
| PostgreSQL | 5432 | ❌ (interne) | Jamais exposé |
| Redis | 6379 | ❌ (interne) | Jamais exposé |

# Décisions figées

- PostgreSQL et Redis ne sont jamais exposés directement sur Internet.
- Tout passe par Nginx.

# Dépendances

- `04_Technique/infra.md`, `04_Technique/architecture.md`
