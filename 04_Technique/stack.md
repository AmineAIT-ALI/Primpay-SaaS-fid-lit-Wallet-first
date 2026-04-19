---
Title: Stack
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: architecture.md
Used by: infra.md
---

# Objectif

Documenter chaque choix technologique, sa version cible, et la raison derrière.

# Contexte

Tous les choix de stack sont figés pour le MVP. Toute modification nécessite un ADR.

# Stack frontend

| Technologie | Version | Rôle | Raison du choix |
|---|---|---|---|
| **Next.js** | 14+ (App Router) | PWA merchant + landing page | SSR, routing, API routes, écosystème React mature |
| **TypeScript** | 5+ | Typage | Cohérence full-stack, maintenance solo |
| **Tailwind CSS** | 3+ | Styling | Rapide, pas de CSS custom à maintenir |
| **PWA** | — | Installable sur mobile merchant | Évite app store, fonctionne offline partiel |

# Stack backend

| Technologie | Version | Rôle | Raison du choix |
|---|---|---|---|
| **NestJS** | 10+ | API REST | Modulaire, TypeScript natif, DI intégré |
| **TypeScript** | 5+ | Typage | Cohérence full-stack |
| **Prisma** (à confirmer) | 5+ | ORM | DX excellent, migrations auto, type-safe |
| **class-validator** | — | Validation DTOs | Intégré NestJS, standard |
| **Passport.js** | — | Auth strategy | Standard NestJS, JWT + refresh |

# Base de données

| Technologie | Version | Rôle | Raison du choix |
|---|---|---|---|
| **PostgreSQL** | 16+ | BDD principale | Transactions ACID indispensables pour le moteur fidélité |
| **Redis** | 7+ | Cache + locks | Cooldown, rate-limit, locks transactionnels rewards |

# Infra & DevOps

| Technologie | Version | Rôle | Raison du choix |
|---|---|---|---|
| **Docker** + **Docker Compose** | — | Containers dev + prod | Reproductibilité, portabilité |
| **Nginx** | Latest stable | Reverse proxy | Standard, performant, SSL termination |
| **Cloudflare** | — | CDN + DNS + WAF basique | Gratuit, protection DDoS, cache edge |
| **GitHub Actions** | — | CI/CD | Intégré GitHub, gratuit pour petits projets |

# APIs externes

| Service | Usage | Auth |
|---|---|---|
| **Apple Wallet API** | Génération passes iOS | Certificate + passphrase |
| **Google Wallet API** | Génération passes Android | Service account JSON |
| **Stripe** | Paiements abonnements, webhooks | Secret key + webhook secret |
| **Sentry** | Monitoring erreurs | DSN |
| **Better Stack / UptimeRobot** | Uptime monitoring | API key |

# Email

| Service | Usage | À décider |
|---|---|---|
| **Resend** ou **Brevo** | Emails transactionnels | À trancher — Resend (DX) vs Brevo (EU RGPD) |

# Tests

| Type | Outil | Couverture cible |
|---|---|---|
| Unit | Jest (NestJS natif) | Services critiques : loyalty engine, auth |
| Integration | Jest + Supertest | Tous les endpoints API |
| Multi-tenant isolation | Jest | Obligatoire avant mise en prod |
| E2E | Playwright (Phase 2) | Non prioritaire MVP |

# Décisions figées

- TypeScript full-stack (pas de JavaScript pur).
- PostgreSQL pour la BDD principale (pas de MongoDB, pas de SQLite prod).
- Redis pour les locks (pas de solution applicative maison).
- Docker en développement ET en production.

# Questions ouvertes

- **ORM final** : Prisma vs TypeORM. Décision D1 Semaine 1. Défaut : Prisma.
- **Monorepo** : Turborepo vs pnpm workspaces vs dépôts séparés.
- **Email** : Resend vs Brevo.

# Dépendances

- `architecture.md`, `infra.md`, `04_Technique/adr/`
