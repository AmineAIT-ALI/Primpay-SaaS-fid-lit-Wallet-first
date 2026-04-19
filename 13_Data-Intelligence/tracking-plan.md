---
Title: Tracking Plan
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: events.md
Used by: analytics.md
---

# Objectif

Définir quels événements tracker, avec quelles propriétés, sur quels canaux.

# Phase MVP — Tracking minimal (côté serveur)

Tout est loggé nativement dans PostgreSQL via `loyalty_events`. Pas d'outil analytics tiers au MVP.

## Événements critiques à logger (BDD)

| Événement | Table | Propriétés | Finalité |
|---|---|---|---|
| Crédit accordé | `loyalty_events` | merchant_id, customer_id, source, staff_id, created_at | KPI nord |
| Récompense créée | `rewards` | merchant_id, customer_id, earned_at | Rétention |
| Récompense consommée | `rewards` | merchant_id, customer_id, redeemed_at | Engagement |
| Pass Wallet créé | `wallet_passes` | customer_id, created_at | Adoption |
| Merchant créé | `merchants` | merchant_id, created_at | Acquisition |
| Subscription active | `subscriptions` | merchant_id, plan_code, status | Revenue |
| Subscription annulée | `subscriptions` | merchant_id, canceled_at | Churn |

## Événements à logger (applicatif / Sentry)

| Événement | Niveau | Propriétés (sans PII) |
|---|---|---|
| Tentative QR invalide | Warning | merchant_id, timestamp |
| Cooldown déclenché | Info | merchant_id, timestamp |
| Daily limit atteint | Info | merchant_id, timestamp |
| Erreur API Apple Wallet | Error | merchant_id, error_code |
| Erreur API Google Wallet | Error | merchant_id, error_code |
| Erreur Stripe webhook | Error | event_type, error |

# Phase 1.5 — Tracking frontend (PWA merchant)

Ajouter un tracking côté client pour mesurer les comportements UX :

| Événement | Source | Propriétés |
|---|---|---|
| Ouverture écran crédit | PWA | merchant_id, timestamp |
| Crédit via scan | PWA | merchant_id, mode: 'scan' |
| Crédit via recherche | PWA | merchant_id, mode: 'search' |
| Crédit via derniers clients | PWA | merchant_id, mode: 'recent' |
| Temps entre ouverture et crédit | PWA | merchant_id, duration_ms |

**Outil Phase 1.5** : PostHog (self-hosted EU ou cloud EU).

# Règles RGPD

- Aucun tracking côté client final (end-user) sans consentement explicite.
- Les événements frontend anonymisent le customer_id dans les analyses.
- Opt-out possible pour les merchants.

# Décisions figées

- MVP : tracking = logs PostgreSQL + Sentry uniquement.
- Pas d'outil analytics tiers avant Phase 1.5.

# Dépendances

- `events.md`, `analytics.md`, `09_Legal/rgpd.md`
