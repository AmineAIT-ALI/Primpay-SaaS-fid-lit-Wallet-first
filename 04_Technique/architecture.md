---
Title: Architecture
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: stack.md
Used by: 11_Schemas/
---

# Architecture technique

## 1. Objectif du document
Décrire la stack, les couches logiques, les frontières de responsabilité. Source de vérité pour toute décision technique ultérieure.

## 2. Stack figée

### Frontend
- **Next.js** (App Router) + TypeScript.
- **Tailwind CSS** pour le styling.
- **PWA** côté commerçant (manifest, service worker minimal).
- Marketing / landing : Next.js dans le même monorepo au départ.

### Backend
- **NestJS** (monolithe modulaire, TypeScript).
- API REST.
- Workers séparés uniquement si besoin avéré (post-MVP).

### Base de données
- **PostgreSQL** (version 16+).
- Migrations gérées via Prisma ou TypeORM (à trancher).

### Cache / état transitoire
- **Redis** (version 7+).
- Usages : cooldown, rate-limit, locks transactionnels, cache programme, sessions courtes.

### Infra
- **Docker Compose** au démarrage.
- **Nginx** en reverse proxy.
- **Cloudflare** en edge (DNS, cache, protection basique).
- **VPS solide** (OVH / Hetzner / Scaleway à trancher).
- Backups PostgreSQL automatiques (quotidiens + rétention 30 jours).
- Monitoring basique (uptime, erreurs serveur).

## 3. Les 4 couches logiques

### Couche 1 — Wallet Layer
Responsable de :
- Génération des passes Apple Wallet / Google Wallet.
- Mise à jour des passes.
- Notifications Wallet (Phase 2).
- Templates visuels.

⚠ Cette couche ne décide **pas** des points. Elle rend l'identité visible côté client.

### Couche 2 — Merchant Ops Layer
Responsable de :
- Interface de scan.
- Recherche client rapide.
- Mode rush.
- Actions rapides staff.

⚠ C'est **la couche critique business**. Elle fait ou casse l'adoption.

### Couche 3 — Core Loyalty Engine
Responsable de :
- Règles de points / tampons.
- Récompenses.
- Bonus.
- Validation métier.

⚠ C'est le cœur du produit. Testé à 100 % dès le MVP.

### Couche 4 — Control Layer
Responsable de :
- Auth (JWT access + refresh).
- Multi-tenant.
- Logs.
- Sécurité.
- Analytics.
- Billing.
- Administration interne.

## 4. Principes d'architecture

### Multi-tenant strict
- `merchant_id` obligatoire sur toute entité métier.
- Aucune requête métier sans filtre tenant.
- Isolation vérifiée par tests automatiques.

### Append-only sur events
- `loyalty_events` ne sont jamais supprimés ni modifiés.
- Correction = nouvel event compensatoire.

### API first, pas de logique métier côté client
- Tout passe par le backend.
- Le frontend est un affichage + des appels.

### Séparation claire des responsabilités
- Le Wallet Layer ne touche pas à la logique de points.
- L'Ops Layer ne stocke aucune règle métier.
- Le Loyalty Engine ne parle jamais directement au Wallet.

## 5. Organisation monolithe modulaire (NestJS)

Modules prévus :
- `auth` — login, JWT, refresh.
- `customers` — CRUD customer, recherche.
- `merchants` — CRUD merchant, locations, staff.
- `wallet` — génération et MAJ passes.
- `loyalty` — programmes, accounts, events, rewards.
- `analytics` — agrégations, dashboards.
- `billing` — abonnements, factures, webhooks paiement.
- `admin` — outils internes.

Chaque module expose un contrôleur REST + des services internes.

## 6. Communication inter-modules

- Par appels de services internes au démarrage.
- Évolution possible vers une bus d'événements léger (BullMQ / Redis streams) en Phase 2.

## 7. Gestion des secrets

- Hors code (fichier `.env` non commité).
- Rotation possible.
- Chiffrement des données sensibles si nécessaire (téléphones).

## 8. Choix ouverts à trancher

- **ORM** : Prisma vs TypeORM.
- **Hébergeur** : OVH, Hetzner, Scaleway.
- **Paiement** : Stripe (défaut) vs alternatives européennes.
- **Observabilité** : Sentry + Grafana Cloud vs self-hosted.

## 9. Pourquoi cette stack

- Rapide à développer.
- Écosystème TypeScript cohérent front / back.
- PostgreSQL = transactions solides, indispensable sur le moteur de fidélité.
- Redis = indispensable pour cooldown et locks.
- Pas de microservices prématurés.

## 10. Questions ouvertes
- Faut-il prévoir une file de jobs dès le MVP (pour les envois de passes Wallet) ou attendre ?
- Stratégie de tests : intégration vs E2E vs unitaires, quelle proportion ?

## 11. Next steps
- Trancher ORM et hébergeur.
- Setup du repo (monorepo Turborepo ou pnpm workspaces).
- CI/CD minimale (lint, tests, build).
