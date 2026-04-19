---
Title: Data Quality
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: data-pipeline.md
Used by: analytics.md
---

# Objectif

Définir les règles de qualité des données et les contrôles associés.

# Règles de qualité

## Complétude

| Champ | Règle | Action si violation |
|---|---|---|
| `loyalty_events.merchant_id` | NOT NULL | Rejection à l'insertion (contrainte BDD) |
| `loyalty_events.customer_id` | NOT NULL | Rejection à l'insertion |
| `loyalty_events.event_type` | NOT NULL, IN ('credit', 'redeem', 'adjustment') | Rejection |
| `loyalty_accounts.points_balance` | >= 0 | Alerte si balance négative |
| `customers.phone` | UNIQUE | Contrainte UNIQUE BDD |

## Cohérence

| Règle | Vérification |
|---|---|
| Balance `loyalty_accounts` = somme des `loyalty_events` | Vérification mensuelle par requête SQL |
| Chaque `reward` a un `loyalty_account` correspondant | Contrainte FK |
| Chaque `wallet_pass` actif a un `customer` actif | Requête de vérification mensuelle |

## Fraîcheur

| Données | Fraîcheur attendue | Alerte si |
|---|---|---|
| `loyalty_events` | Temps réel | Retard > 5 s (pipeline) |
| `wallet_passes.updated_at` | < 10 s après crédit | Retard > 60 s |
| Abonnements Stripe | < 5 min après webhook | Webhook non reçu |

# Contrôles de qualité SQL (mensuels)

```sql
-- Vérifier les balances incohérentes
SELECT la.id, la.points_balance,
       SUM(le.points_delta) as calculated_balance
FROM loyalty_accounts la
JOIN loyalty_events le ON le.customer_id = la.customer_id
  AND le.merchant_id = la.merchant_id
GROUP BY la.id, la.points_balance
HAVING la.points_balance != SUM(le.points_delta);
```

# Décisions figées

- Toute contrainte de qualité critique est enforced par la BDD (NOT NULL, UNIQUE, FK).
- Les contrôles applicatifs complètent mais ne remplacent pas les contraintes BDD.

# Dépendances

- `data-pipeline.md`, `04_Technique/data-model.md`
