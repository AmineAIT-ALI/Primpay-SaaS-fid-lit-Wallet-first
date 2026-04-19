---
Title: Infrastructure
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: stack.md
Used by: 10_Operations/environments.md
---

# Objectif

Décrire l'infrastructure complète : hébergement, environnements, réseau, CI/CD, backups.

# Contexte

L'infra doit être simple, sécurisée, EU-only (RGPD), et maintenable solo.

# Hébergeur

**À trancher** : OVH / Hetzner / Scaleway.

| Critère | OVH | Hetzner | Scaleway |
|---|---|---|---|
| Localisation | FR | DE | FR |
| Prix VPS 4 vCPU / 8 GB RAM | ~25 €/mois | ~15 €/mois | ~20 €/mois |
| Support FR | Oui | Non | Oui |
| Object storage (backups) | Oui | Oui | Oui |
| **Défaut** | — | ✅ Recommandé | — |

# Environnements

| Env | Rôle | Accès |
|---|---|---|
| `local` | Développement | Développeur uniquement |
| `staging` | Tests avant prod, démos | Amine + pilotes sur invitation |
| `production` | Merchants actifs | Public (PWA) + staff authentifié |

# Architecture réseau

```
Internet
  └─► Cloudflare (DNS + WAF + cache)
        └─► VPS (Hetzner, EU)
              ├─► Nginx (reverse proxy, SSL termination)
              │     ├─► Next.js app (PWA merchant + landing) :3000
              │     └─► NestJS API :4000
              ├─► PostgreSQL :5432 (interne uniquement)
              └─► Redis :6379 (interne uniquement)
```

# Configuration VPS

| Composant | Spec MVP | Notes |
|---|---|---|
| CPU | 4 vCPU | Suffisant jusqu'à ~200 merchants actifs |
| RAM | 8 GB | PostgreSQL + Redis + Node × 2 |
| Disque | 80 GB SSD | Données + logs + backups locaux |
| OS | Ubuntu 22.04 LTS | Support long terme |
| Docker | Compose v3 | Orchestration simple |

# CI/CD

```
GitHub Push → GitHub Actions
  ├─► Lint + Type check
  ├─► Tests unitaires + intégration
  ├─► Build Next.js + NestJS
  └─► Si branche main → Deploy staging
      Si tag vX.Y.Z → Deploy production (manuel)
```

# Backups

| Cible | Fréquence | Rétention | Outil |
|---|---|---|---|
| PostgreSQL dump | Quotidien 3h UTC | 30 jours | pg_dump + cron + object storage |
| Fichiers upload | Si applicable | 30 jours | rsync + object storage |
| Configuration | Versionné dans Git | Historique complet | Git |

# Monitoring

| Système | Outil | Alerte |
|---|---|---|
| Uptime | UptimeRobot ou Better Stack | Email + SMS si down |
| Erreurs | Sentry | Slack / email si nouveau 5xx |
| Métriques serveur | Netdata (optionnel) ou VPS provider | Manuel Phase 1 |

# SSL / TLS

- Certificat Let's Encrypt via Certbot + Nginx.
- Renouvellement automatique (cron certbot).
- Cloudflare full (strict mode) entre Cloudflare et Nginx.

# Décisions figées

- EU uniquement (RGPD).
- Pas de serverless / FaaS en MVP (trop de complexité).
- Backups PostgreSQL quotidiens obligatoires avant lancement.

# Questions ouvertes

- **Hébergeur final** : décision D1 Semaine 1.
- Object storage : Hetzner Storage Boxes ou Scaleway Object Storage ?
- Alerting : Better Stack (payant) vs UptimeRobot (gratuit limité) ?

# Dépendances

- `stack.md`, `10_Operations/environments.md`, `10_Operations/deployment.md`
