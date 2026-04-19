---
Title: Automations — Scripts
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/automations
Depends on: —
Used by: —
---

# Objectif

Inventaire des scripts automatisés et leur fonction.

# Scripts existants (MVP)

| Script | Fonction | Exécution | Statut |
|---|---|---|---|
| `scripts/backup.sh` | Dump PostgreSQL → object storage | Cron quotidien | ⏳ À créer |
| `scripts/healthcheck.sh` | Vérification endpoints critiques | Cron 5 min | ⏳ À créer |
| `scripts/cleanup-logs.sh` | Suppression logs > 90 jours | Cron mensuel | ⏳ À créer |

# Scripts planifiés (Phase 1.5)

| Script | Fonction | Déclencheur |
|---|---|---|
| `scripts/wallet-retry.sh` | Retry des passes Wallet en échec | Cron toutes les 15 min |
| `scripts/churn-alert.sh` | Alerte si merchant inactif > 14 jours | Cron quotidien |
| `scripts/trial-expiry.sh` | Email J-3 avant fin de trial | Cron quotidien |

# Template de script

```bash
#!/bin/bash
set -e
LOG_FILE="/var/log/primpay/[script-name].log"
DATE=$(date +%Y-%m-%d\ %H:%M:%S)

echo "[$DATE] Starting [script-name]" >> $LOG_FILE

# Script logic here

echo "[$DATE] Done" >> $LOG_FILE
```

# Dépendances

- `jobs.md`, `triggers.md`
