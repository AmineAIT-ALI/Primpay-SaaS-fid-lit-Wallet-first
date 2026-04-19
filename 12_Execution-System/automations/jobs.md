---
Title: Automations — Jobs
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/automations
Depends on: —
Used by: —
---

# Objectif

Inventaire des jobs planifiés (cron, queues) et leur fréquence.

# Jobs cron (infrastructure)

| Job | Commande | Fréquence | Serveur |
|---|---|---|---|
| Backup PostgreSQL | `pg_dump → object storage` | Quotidien 3h UTC | VPS |
| Renouvellement SSL | `certbot renew` | Bi-mensuel | VPS |
| Nettoyage logs Docker | `docker system prune` | Mensuel | VPS |
| Nettoyage sessions Redis expirées | Automatique (Redis TTL) | Continu | Redis |

# Jobs applicatifs (NestJS — Phase 1.5)

| Job | Module NestJS | Fréquence | Fonction |
|---|---|---|---|
| `wallet-pass-retry` | WalletModule | Toutes les 15 min | Retry des passes en échec |
| `trial-expiry-reminder` | BillingModule | Quotidien | Email J-3 avant fin trial |
| `inactive-merchant-alert` | AnalyticsModule | Quotidien | Alerte si 0 événement en 14 j |
| `reward-expiry` | LoyaltyModule | Quotidien | Expirer les rewards non utilisées |

# Crontab prod (à configurer)

```bash
# Backup quotidien à 3h UTC
0 3 * * * /opt/primpay/scripts/backup.sh

# Renouvellement SSL le 1er et 15 du mois
0 2 1,15 * * certbot renew --quiet

# Nettoyage logs mensuel
0 4 1 * * /opt/primpay/scripts/cleanup-logs.sh
```

# Dépendances

- `scripts.md`, `triggers.md`
