---
name: Roadmap technique
description: Séquence de développement du backend, frontend, infra
type: technical
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Roadmap technique

## 1. Objectif du document
Séquencer le développement pour livrer un MVP utilisable en 3 à 4 semaines.

## 2. Sprint 0 — Setup (2–3 jours)

- Monorepo (pnpm workspaces ou Turborepo).
- Repos : `apps/api`, `apps/merchant-pwa`, `apps/landing`, `packages/shared`.
- CI GitHub Actions : lint, typecheck, tests unitaires.
- Docker Compose local (Postgres + Redis + API).
- Linter + Prettier + commit hook (lefthook ou husky).
- Création des comptes : Stripe, Apple Developer, Google Pay & Wallet, hébergeur.

**Livrable** : `docker compose up` lance API, DB, Redis, PWA.

## 3. Sprint 1 — Socle backend (Semaine 1)

- Schéma DB initial (migration 0001).
- Module `auth` : login, JWT, refresh.
- Module `merchants` + `staff_users` : CRUD minimal.
- Middleware multi-tenant.
- Seeds : 1 merchant, 1 owner, 1 staff.
- Tests d'isolation basiques.

**Livrable** : on peut se loguer en staff, le middleware scope correctement.

## 4. Sprint 2 — Core loyalty (Semaine 1–2)

- Module `customers` : création, recherche.
- Module `loyalty` : programs, accounts, events, rewards.
- Endpoint `/loyalty/credit` avec cooldown + limite journalière.
- Endpoint `/loyalty/redeem` avec lock transactionnel.
- Génération automatique de reward au seuil.

**Livrable** : on peut créditer un customer et consommer une reward via curl.

## 5. Sprint 3 — Wallet (Semaine 2)

- Module `wallet` : génération Apple Pass.
- Génération Google Object.
- Endpoint `POST /customers` (flow QR public).
- Page publique d'ajout Wallet (Next.js, responsive).
- QR fixe signé.

**Livrable** : un client peut scanner un QR public, saisir prénom + tel, ajouter la carte à son Wallet.

## 6. Sprint 4 — PWA commerçant (Semaine 2–3)

- Écran principal : scan, recherche, derniers clients, +1.
- Fiche client.
- Admin programme.
- Analytics basique.
- PWA manifest + service worker minimal.
- Installation guidée sur téléphone.

**Livrable** : un staff peut créditer un client en < 2 secondes depuis son téléphone.

## 7. Sprint 5 — Billing + polish (Semaine 3)

- Intégration Stripe Checkout.
- Webhooks Stripe.
- Statuts abonnement (`trialing`, `active`, `past_due`, `canceled`).
- Onboarding commerçant guidé.
- Email transactionnels (bienvenue, invitation staff, trial expiry).
- QA cross-device (iOS, Android, iPad, desktop).

**Livrable** : un commerçant peut s'inscrire, payer, onboarder son staff.

## 8. Sprint 6 — Tests terrain (Semaine 3–4)

- Déploiement staging + prod.
- Onboarding 3 commerces pilotes.
- Observation sur 2 semaines.
- Corrections rapides.

**Livrable** : 3 commerces utilisent Primpay en vrai, métriques collectées.

## 9. Dette technique tolérée au MVP

- Pas de workers dédiés (jobs synchrones ou via BullMQ si simple).
- Pas de tests E2E complets (focus intégration sur les endpoints critiques).
- Pas d'internationalisation (FR uniquement).
- Logs basiques (pas d'APM full).
- Monitoring simple (uptime + erreurs serveur).

## 10. Dette à résorber avant Phase 2

- Tests E2E sur les 5 écrans critiques.
- Observabilité complète (APM + logs centralisés).
- Workers séparés pour Wallet push.
- Stratégie de backup testée (restore drill).

## 11. Stack de monitoring recommandée

- **Uptime** : Better Stack ou UptimeRobot.
- **Erreurs serveur** : Sentry (free tier).
- **Logs** : Logflare ou Better Stack Logs.
- **DB monitoring** : pgHero ou pg_stat_statements.

## 12. Questions ouvertes
- ORM Prisma vs TypeORM : à trancher au Sprint 0.
- Hébergeur : OVH / Hetzner / Scaleway : à trancher avant Sprint 5.
- Stripe vs Mollie pour le paiement : à trancher au Sprint 5.

## 13. Next steps
- Setup du repo et du monorepo.
- Migration 0001 prête.
- Comptes Apple Developer + Google ouverts.
