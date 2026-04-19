---
Title: Deployment
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: 04_Technique/infra.md
Used by: 12_Execution-System/runbooks/deploy.md
---

# Objectif

Documenter le processus de déploiement de Primpay en staging et en production.

# Environnements

| Env | URL | Déploiement | Qui |
|---|---|---|---|
| Staging | staging.[domaine] | Automatique sur `main` | GitHub Actions |
| Production | [domaine] | Manuel sur tag `vX.Y.Z` | Amine |

# Pipeline CI/CD

```
1. Push sur branche feature
   └─► Lint (ESLint, Prettier)
   └─► Type check (tsc --noEmit)
   └─► Tests unitaires (Jest)
   └─► Tests intégration (Jest + Supertest)

2. Merge PR → main
   └─► Build Next.js
   └─► Build NestJS
   └─► Deploy staging (SSH + Docker Compose pull)
   └─► Tests E2E smoke (Phase 2)

3. Tag vX.Y.Z → main
   └─► Approbation manuelle
   └─► Deploy production
   └─► Healthcheck post-deploy
   └─► Rollback automatique si healthcheck fail
```

# Checklist pré-déploiement production

- [ ] Tous les tests passent en CI.
- [ ] Migrations BDD testées en staging.
- [ ] Variables d'environnement production à jour.
- [ ] Backup PostgreSQL récent vérifié (< 24 h).
- [ ] Changelog mis à jour.
- [ ] Sentry release créée.

# Commandes de déploiement

```bash
# Sur le VPS production
cd /opt/primpay
git pull origin main
docker compose pull
docker compose up -d --remove-orphans
docker compose run --rm api npx prisma migrate deploy
# Healthcheck
curl -f https://[domaine]/health || echo "ALERTE: healthcheck failed"
```

# Rollback rapide

Si quelque chose tourne mal immédiatement après déploiement :

```bash
# Revenir à l'image précédente
docker compose down
git checkout [previous-tag]
docker compose up -d
```

Voir `12_Execution-System/runbooks/rollback.md` pour le détail complet.

# Variables d'environnement critiques

| Variable | Environnement | Notes |
|---|---|---|
| `DATABASE_URL` | Tous | PostgreSQL connection string |
| `REDIS_URL` | Tous | Redis connection string |
| `JWT_SECRET` | Tous | Rotation annuelle |
| `APPLE_CERT` | Prod | Certificat Wallet Apple |
| `GOOGLE_SERVICE_ACCOUNT` | Prod | JSON service account |
| `STRIPE_SECRET_KEY` | Prod | Clé secrète Stripe |
| `STRIPE_WEBHOOK_SECRET` | Prod | Signature webhook Stripe |
| `SENTRY_DSN` | Staging + Prod | DSN Sentry |

# Décisions figées

- Pas de déploiement production sans backup vérifié.
- Toute migration BDD = testée en staging d'abord.
- Déploiement production = tag semver uniquement.

# Questions ouvertes

- Faut-il des feature flags pour les déploiements progressifs en Phase 2 ?

# Dépendances

- `04_Technique/infra.md`, `10_Operations/environments.md`, `12_Execution-System/runbooks/deploy.md`
