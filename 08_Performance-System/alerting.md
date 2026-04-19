---
Title: Alerting
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: triggers.md
Used by: 10_Operations/incident-management.md
---

# Objectif

Documenter le système d'alerte : canaux, niveaux, destinataires et règles anti-bruit.

# Canaux d'alerte

| Canal | Outil | Usage |
|---|---|---|
| Email | Sentry + UptimeRobot | Erreurs applicatives, downtime |
| SMS | UptimeRobot (plan payant) ou Better Stack | Downtime critique uniquement |
| Dashboard | Sentry / Better Stack | Monitoring temps réel |
| Log | Journald + Docker logs | Debug post-incident |

# Niveaux d'alerte

| Niveau | Définition | Canal | Réponse attendue |
|---|---|---|---|
| **P1 — Critique** | Service down ou erreur critique impactant tous les merchants | Email + SMS | < 30 min |
| **P2 — Majeur** | Dégradation significative (latence > 1 s, erreurs 5xx > 1 %) | Email | < 2 h |
| **P3 — Mineur** | Anomalie détectée, pas d'impact immédiat | Dashboard | Revue dans la journée |
| **P4 — Info** | Métriques business hors seuil | Email hebdo | Revue hebdomadaire |

# Règles anti-bruit

- Pas d'alerte P2 si l'anomalie dure < 2 minutes (spike transitoire).
- Pas d'alerte SMS pour des erreurs 5xx < 0,5 %.
- Les alertes business (P4) sont agrégées en digest hebdomadaire, pas en temps réel.
- En dehors des heures de travail : seulement P1 déclenche une alerte SMS.

# Configuration Sentry

| Règle | Valeur |
|---|---|
| Seuil alerte erreur nouvelle | 1 occurrence |
| Seuil alerte erreur fréquente | 10 occurrences / heure |
| Ignore les erreurs | 404 sur routes inconnues, bot scanners |
| Environments | staging (ignore P2+), production (tous) |

# Configuration UptimeRobot / Better Stack

| Check | URL | Intervalle | Alerte si down |
|---|---|---|---|
| API health | `GET /health` | 1 min | > 2 min |
| Page Wallet publique | `GET /wallet/add/[id]` | 5 min | > 5 min |
| Dashboard merchant | `GET /` | 5 min | > 5 min |

# On-call (Phase 1)

- Unique responsable : Amine AIT ALI.
- Joignable 9h–22h (hors crises).
- P1 : réponse 30 min, 7j/7.

# Décisions figées

- SMS uniquement pour P1.
- Sentry obligatoire avant staging.

# Questions ouvertes

- Quel outil de monitoring pour les métriques serveur (CPU/RAM) ? Netdata vs Grafana ?

# Dépendances

- `triggers.md`, `10_Operations/incident-management.md`
