---
Title: Runbook — Deploy
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/runbooks
Depends on: 10_Operations/deployment.md
Used by: —
---

# Objectif

Procédure step-by-step pour déployer en production.

# Prérequis

- [ ] Tous les tests passent en CI sur `main`.
- [ ] Migration BDD testée en staging.
- [ ] Backup PostgreSQL vérifié (< 24 h).
- [ ] Changelog mis à jour.

# Étapes

## 1. Créer le tag de release

```bash
git tag -a v1.2.3 -m "Release v1.2.3 — [description courte]"
git push origin v1.2.3
```

## 2. Se connecter au VPS

```bash
ssh prod-primpay
```

## 3. Déployer

```bash
cd /opt/primpay
git fetch --tags
git checkout v1.2.3
docker compose pull
docker compose up -d --remove-orphans
```

## 4. Appliquer les migrations BDD

```bash
docker compose run --rm api npx prisma migrate deploy
```

## 5. Vérifier le healthcheck

```bash
curl -f https://[domaine]/health
# Réponse attendue : {"status":"ok"}
```

## 6. Vérifier Sentry

Ouvrir Sentry → vérifier qu'aucune nouvelle erreur critique n'est apparue dans les 5 minutes post-déploiement.

## 7. Créer la release Sentry

```bash
sentry-cli releases new v1.2.3
sentry-cli releases finalize v1.2.3
```

## 8. Mettre à jour le log

Dans `00_Pilotage/decision-log.md` (si la release contient une décision D1).

# En cas de problème

→ Appliquer immédiatement `runbooks/rollback.md`.

# Dépendances

- `10_Operations/deployment.md`, `runbooks/rollback.md`
