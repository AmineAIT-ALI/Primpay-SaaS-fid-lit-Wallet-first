---
Title: Runbook — Incident
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/runbooks
Depends on: 10_Operations/incident-management.md
Used by: —
---

# Objectif

Procédure de gestion d'incident technique en production.

# Niveaux d'incident

| Niveau | Définition | Temps de réponse |
|---|---|---|
| P1 | Service down ou bug bloquant tous les merchants | < 30 min |
| P2 | Dégradation significative (latence élevée, erreurs > 1 %) | < 2 h |
| P3 | Bug non bloquant, contournement disponible | < 24 h |

# Procédure P1

## Étape 1 — Détecter et qualifier (0–15 min)

1. Recevoir l'alerte (Sentry / UptimeRobot / merchant).
2. Ouvrir Sentry → identifier l'erreur dominante.
3. Vérifier uptime : `curl -f https://[domaine]/health`.
4. Qualifier : P1, P2 ou P3.
5. Ouvrir un incident dans `00_Pilotage/decision-log.md` (date, heure, symptômes).

## Étape 2 — Communiquer (15–20 min)

Email aux merchants actifs :
```
Objet : [Primpay] Incident en cours — [DATE HH:MM]
Nous avons identifié un problème sur la plateforme.
Nos équipes travaillent à sa résolution.
Nous vous informerons dès la résolution.
```

## Étape 3 — Diagnostiquer (15–60 min)

```bash
# Logs API
docker logs primpay_api --tail 100

# Logs BDD
docker logs primpay_db --tail 50

# Statut containers
docker compose ps

# Charge système
htop
```

## Étape 4 — Résoudre

- Bug applicatif → hotfix + déploiement d'urgence (sans CI complet si P1).
- Crash container → `docker compose restart [service]`.
- BDD corrompue → restaurer backup (`runbooks/rollback.md`).

## Étape 5 — Confirmer la résolution

```bash
curl -f https://[domaine]/health
# Tester un crédit de bout en bout sur staging
```

## Étape 6 — Communiquer la résolution

Email de clôture : date, heure, durée, cause, actions prises.

## Étape 7 — Post-mortem (dans les 48 h)

→ Utiliser `00_Pilotage/template-post-mortem.md`.

# Dépendances

- `10_Operations/incident-management.md`, `runbooks/rollback.md`
