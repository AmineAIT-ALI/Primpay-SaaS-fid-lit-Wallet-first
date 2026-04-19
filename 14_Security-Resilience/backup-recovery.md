---
Title: Backup & Recovery
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 10_Operations/environments.md
Used by: 12_Execution-System/runbooks/rollback.md
---

# Objectif

Définir la stratégie de sauvegarde et les procédures de reprise.

# Stratégie de backup

## PostgreSQL (données critiques)

| Type | Fréquence | Rétention | Outil | Destination |
|---|---|---|---|---|
| Dump complet | Quotidien 3h UTC | 30 jours | `pg_dump` | Object storage EU |
| Dump complet | Mensuel (1er du mois) | 12 mois | `pg_dump` | Object storage EU |

```bash
# Commande de backup
pg_dump -Fc -U primpay_user primpay_prod > /backup/primpay_$(date +%Y%m%d_%H%M%S).dump
aws s3 cp /backup/primpay_$(date +%Y%m%d_%H%M%S).dump s3://primpay-backups/
```

## Configuration (secrets non inclus)

- Tout le code est versionné dans Git (GitHub).
- Les variables d'environnement sont documentées dans `10_Operations/environments.md` (sans valeurs).
- Les valeurs des secrets sont dans un gestionnaire de mots de passe (1Password / Bitwarden) avec accès Amine.

## Redis

- Redis ne stocke que des données temporaires (cooldown, locks, sessions).
- Pas de backup Redis requis : toutes les données permanentes sont dans PostgreSQL.
- En cas de perte Redis : service redémarre en mode dégradé (voir `dependencies.md`).

# Procédure de restauration

## Cas 1 — Restauration partielle (données corrompues)

```bash
# Identifier la backup la plus récente avant la corruption
ls /backup/ | sort | tail -5

# Restaurer dans une BDD de test d'abord
pg_restore -d primpay_test /backup/primpay_[DATE].dump

# Vérifier les données
psql -d primpay_test -c "SELECT COUNT(*) FROM loyalty_events;"

# Si OK, restaurer en production (service down pendant la restauration)
docker compose down
pg_restore -d primpay_prod /backup/primpay_[DATE].dump
docker compose up -d
```

## Cas 2 — Restauration complète (VPS perdu)

1. Créer un nouveau VPS (même configuration).
2. Installer Docker, Docker Compose, Nginx, Certbot.
3. Cloner le repo (`git clone`).
4. Copier les variables d'environnement depuis le gestionnaire de mots de passe.
5. Restaurer la backup PostgreSQL depuis l'object storage.
6. Reconfigurer DNS Cloudflare si IP change.
7. Lancer `docker compose up -d`.
8. Vérifier healthcheck.

**RTO (Recovery Time Objective)** : < 4 heures.

**RPO (Recovery Point Objective)** : < 24 heures (dernière backup quotidienne).

# Tests de restauration

- Tester la procédure de restauration **mensuellement** sur un environnement de test.
- Documenter le résultat dans `00_Pilotage/decision-log.md`.

# Décisions figées

- Backups quotidiens obligatoires avant lancement commercial.
- Test de restauration mensuel obligatoire.
- Object storage = EU uniquement.

# Dépendances

- `10_Operations/environments.md`, `12_Execution-System/runbooks/rollback.md`
