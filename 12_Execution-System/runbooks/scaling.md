---
Title: Runbook — Scaling
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/runbooks
Depends on: 04_Technique/infra.md
Used by: —
---

# Objectif

Procédure pour scaler l'infrastructure en cas de pic de charge ou de croissance.

# Signaux déclencheurs

- Latence API p95 > 1 000 ms sur 15 min (trigger T2).
- CPU VPS > 80 % sur 10 min.
- RAM VPS > 85 % sur 10 min.
- PostgreSQL connexions actives > 80 % du pool.

# Niveau 1 — Optimisation (sans scaling infra)

1. Identifier la requête lente : `EXPLAIN ANALYZE` sur PostgreSQL.
2. Vérifier les index manquants (voir `04_Technique/data-model.md` section indexes).
3. Augmenter le pool de connexions NestJS si nécessaire.
4. Vérifier la mémoire Redis : `redis-cli INFO memory`.
5. Redémarrer les containers si memory leak suspect.

## Niveau 2 — Scaling vertical (upgrade VPS)

Si CPU / RAM constamment saturés malgré l'optimisation :

1. Évaluer le plan VPS supérieur (x2 RAM/CPU).
2. Estimer le coût additionnel vs MRR actuel.
3. Décision D2 dans `00_Pilotage/decision-log.md`.
4. Snapshot du VPS actuel avant migration.
5. Upgrade via dashboard hébergeur (Hetzner : < 5 min de downtime).

## Niveau 3 — Scaling horizontal (Phase 2+)

Déclenché à partir de 500+ merchants actifs simultanés :
- Migrer PostgreSQL vers instance dédiée.
- Ajouter un load balancer.
- Multiple instances NestJS.

**Note** : pas prévu en MVP. Décision à prendre quand les signaux l'indiquent.

# Dépendances

- `04_Technique/infra.md`, `08_Performance-System/triggers.md`
