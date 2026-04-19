---
Title: Runbook — Rollback
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/runbooks
Depends on: runbooks/deploy.md
Used by: —
---

# Objectif

Procédure de rollback d'un déploiement défaillant.

# Quand utiliser

- Healthcheck post-déploiement échoue.
- Augmentation soudaine des erreurs 5xx après un déploiement.
- Bug critique découvert en prod dans les 30 min post-déploiement.

# Procédure

## Étape 1 — Rollback applicatif (< 5 min)

```bash
# Sur le VPS
cd /opt/primpay

# Lister les tags disponibles
git tag | sort -V | tail -5

# Revenir au tag précédent
git checkout v1.2.2  # version précédente stable
docker compose pull
docker compose up -d --remove-orphans
```

## Étape 2 — Vérifier la migration BDD

Si la release rollbackée incluait une migration BDD :

```bash
# ATTENTION : les migrations Prisma ne se rollback pas automatiquement
# Vérifier si la migration est destructive
docker compose run --rm api npx prisma migrate status
```

Si la migration est backward-compatible (ajout de colonne nullable) → rollback applicatif suffit.

Si la migration est destructive → restaurer le backup :

```bash
# STOP application d'abord
docker compose down

# Restaurer le backup PostgreSQL
pg_restore -d primpay_prod /backup/primpay_[DATE].dump

# Redémarrer avec la version précédente
docker compose up -d
```

## Étape 3 — Vérifier

```bash
curl -f https://[domaine]/health
# Tester un crédit de bout en bout
```

## Étape 4 — Communiquer

Email merchant si downtime > 10 min (voir `runbooks/incident.md` Étape 2).

## Étape 5 — Post-mortem

→ `00_Pilotage/template-post-mortem.md` dans les 48 h.

# Décisions figées

- Ne jamais appliquer de migration destructive en prod sans backup vérifié < 1 h.
- En cas de doute → rollback d'abord, diagnostic ensuite.

# Dépendances

- `runbooks/deploy.md`, `14_Security-Resilience/backup-recovery.md`
