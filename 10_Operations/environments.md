---
Title: Environments
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: 04_Technique/infra.md
Used by: deployment.md
---

# Objectif

Documenter les environnements de Primpay : configuration, accès, règles d'usage.

# Environnements actifs

## local

| Attribut | Valeur |
|---|---|
| Rôle | Développement quotidien |
| Accès | Développeur uniquement |
| BDD | PostgreSQL local (Docker) |
| Config | `.env.local` (non commité) |
| Seed | Fixtures de test |
| Déploiement | Manuel (`docker compose up`) |
| URL | `http://localhost:3000` (frontend), `http://localhost:4000` (API) |

---

## staging

| Attribut | Valeur |
|---|---|
| Rôle | Tests avant prod, démos commerçants |
| Accès | Amine + merchants pilotes (invitation) |
| BDD | PostgreSQL staging (VPS dédié ou même VPS, BDD séparée) |
| Config | Variables d'environnement dans GitHub Actions secrets |
| Seed | Données de test réalistes (pas de données réelles) |
| Déploiement | Automatique sur push `main` |
| URL | `staging.[domaine]` |
| Monitoring | Sentry (environment: staging, alertes désactivées sauf P1) |

**Règles staging** :
- Aucune donnée réelle de client final en staging.
- Les merchants pilotes utilisent staging pour les premières semaines.
- La migration de staging → prod est testée ici d'abord.

---

## production

| Attribut | Valeur |
|---|---|
| Rôle | Merchants actifs, données réelles |
| Accès | Merchants authentifiés, Amine (admin) |
| BDD | PostgreSQL production (VPS Hetzner EU) |
| Config | Variables d'environnement sur VPS prod (`.env.prod`) |
| Déploiement | Manuel sur tag semver (après approbation) |
| URL | `[domaine]` |
| Monitoring | Sentry + UptimeRobot (toutes alertes actives) |
| Backups | Quotidiens, rétention 30 jours |

**Règles production** :
- Jamais de `--force` en BDD production.
- Toute migration testée en staging d'abord.
- Backup vérifié avant tout déploiement.
- Accès direct BDD production : interdit sauf urgence critique.

# Variables d'environnement par environnement

| Variable | local | staging | production |
|---|---|---|---|
| `NODE_ENV` | `development` | `staging` | `production` |
| `DATABASE_URL` | `postgresql://...localhost` | `postgresql://...staging` | `postgresql://...prod` |
| `STRIPE_SECRET_KEY` | Test key | Test key | Live key |
| `APPLE_CERT` | Mock / test cert | Sandbox cert | Production cert |
| `SENTRY_DSN` | Optionnel | ✅ | ✅ |

# Décisions figées

- 3 environnements : local, staging, production. Pas de "preview" env au MVP.
- Production = EU uniquement, jamais de données en dehors de l'EU.

# Questions ouvertes

- Faut-il un environnement `preview` par PR pour les tests QA en Phase 2 ?

# Dépendances

- `04_Technique/infra.md`, `deployment.md`, `access-management.md`
