---
Title: Resilience Rules
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 10_Operations/service-levels.md
Used by: antifragility.md
---

# Objectif

Définir les règles de résilience : SLA, dégradation gracieuse, retry, circuit breaker.

# SLA de disponibilité

| Période | Disponibilité cible | Tolérance downtime mensuel |
|---|---|---|
| Phase 1 (MVP) | 99 % | ~7 h / mois |
| Phase 2 | 99,5 % | ~3,6 h / mois |
| Phase 3 | 99,9 % | ~44 min / mois |

# Règles de dégradation gracieuse

## Règle 1 — Le crédit passe toujours

> Si un composant non-critique est down, le crédit fidélité doit toujours pouvoir être accordé.

| Composant down | Comportement |
|---|---|
| API Apple Wallet | Crédit accordé, pass mis à jour en différé |
| API Google Wallet | Crédit accordé, pass mis à jour en différé |
| Redis | Crédit accordé sans cooldown (mode dégradé — alerte staff) |
| Dashboard analytics | Crédit accordé normalement |
| Email service | Crédit accordé, email différé |

## Règle 2 — Les données ne sont jamais perdues

> Un crédit accordé par la PWA doit être enregistré dans PostgreSQL même si les services périphériques échouent.

Implémentation :
- PostgreSQL = seul point de vérité.
- Mise à jour Wallet = side effect asynchrone (peut échouer sans impacter le crédit).

## Règle 3 — Retry intelligent

| Opération | Retry | Backoff | Max |
|---|---|---|---|
| Mise à jour pass Apple Wallet | 3 tentatives | Exponentiel (1s, 2s, 4s) | 4 min |
| Mise à jour pass Google Wallet | 3 tentatives | Exponentiel | 4 min |
| Envoi email | 3 tentatives | 1 min, 5 min, 30 min | 36 min |
| Webhook Stripe (reçu) | Géré par Stripe | Auto | — |

## Règle 4 — Healthcheck et redémarrage automatique

Docker Compose avec `restart: unless-stopped` sur tous les services.

Healthcheck toutes les 30 s. Si 3 échecs consécutifs → redémarrage automatique du container.

# Circuit Breaker (Phase 2)

À implémenter si les APIs Wallet deviennent instables :
- Si > 5 erreurs consécutives sur l'API Apple/Google → circuit ouvert.
- Tous les crédits sont enregistrés, les mises à jour de passes sont mises en queue.
- Le circuit se referme après 5 minutes de vérification.

# Décisions figées

- Le crédit est la fonction la plus résiliente du système.
- PostgreSQL est le seul composant sans mode dégradé acceptable.

# Dépendances

- `10_Operations/service-levels.md`, `dependencies.md`, `antifragility.md`
