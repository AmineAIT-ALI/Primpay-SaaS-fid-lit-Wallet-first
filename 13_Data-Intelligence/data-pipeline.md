---
Title: Data Pipeline
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: events.md
Used by: data-quality.md
---

# Objectif

Décrire le pipeline de collecte, transformation et stockage des données.

# Pipeline MVP (simple)

```
Sources                  Stockage              Consommation
──────                   ────────              ────────────
PWA Merchant  ──────►    PostgreSQL  ──────►   Requêtes SQL
NestJS API    ──────►    (source of  ──────►   Dashboard merchant
Stripe webhk  ──────►    truth)      ──────►   Revue hebdo (Amine)
                │
                ├──────► Redis        ──────►  Cooldown / locks (temps réel)
                │
                └──────► Sentry       ──────►  Alertes erreurs
```

# Flux de données par type

## Données transactionnelles (temps réel → PostgreSQL)

- `loyalty_events` : écrit immédiatement après chaque crédit.
- `rewards` : écrit immédiatement après seuil atteint.
- `wallet_passes` : mis à jour après chaque crédit.

## Données de session / cache (Redis)

- Cooldown par customer/merchant : TTL 10 min.
- Daily limit counter : TTL 24 h.
- Lock reward redeem : TTL 30 s.
- Sessions JWT refresh : TTL 30 jours.

## Données d'erreur (Sentry)

- Exceptions non gérées : push immédiat.
- Performance transactions (Phase 2) : échantillonnage 10 %.

# Phase 2 — Pipeline enrichi

```
PostgreSQL  ──────► Job d'agrégation (daily) ──────► Table analytics_daily
                                                      (pré-calculé pour dashboards)

PostgreSQL  ──────► PostHog / Metabase        ──────► Visualisations avancées
```

# Décisions figées

- MVP : PostgreSQL = seul datastore permanent.
- Pas d'ETL, pas de data lake avant Phase 3.

# Dépendances

- `events.md`, `data-quality.md`, `realtime-layer.md`
