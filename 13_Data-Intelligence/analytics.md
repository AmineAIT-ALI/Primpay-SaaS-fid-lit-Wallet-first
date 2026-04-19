---
Title: Analytics
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: events.md
Used by: 08_Performance-System/dashboards.md
---

# Objectif

Définir les analyses récurrentes à produire et les requêtes SQL de référence.

# Analyses hebdomadaires

## Activité par merchant

```sql
SELECT
  m.name,
  COUNT(le.id) as credits_this_week,
  COUNT(DISTINCT le.customer_id) as unique_customers
FROM loyalty_events le
JOIN merchants m ON m.id = le.merchant_id
WHERE le.created_at >= NOW() - INTERVAL '7 days'
  AND le.event_type = 'credit'
GROUP BY m.id, m.name
ORDER BY credits_this_week DESC;
```

## Taux d'adoption Wallet

```sql
SELECT
  COUNT(DISTINCT c.id) as total_customers,
  COUNT(DISTINCT wp.customer_id) as customers_with_wallet,
  ROUND(COUNT(DISTINCT wp.customer_id)::numeric / COUNT(DISTINCT c.id) * 100, 1) as wallet_adoption_pct
FROM customers c
LEFT JOIN wallet_passes wp ON wp.customer_id = c.id AND wp.status = 'active';
```

## MRR actuel

```sql
SELECT
  SUM(CASE WHEN plan_code = 'solo_29' THEN 29 ELSE 79 END) as mrr_euros
FROM subscriptions
WHERE status = 'active';
```

# Analyses mensuelles

## Rétention merchants (cohorte M1)

```sql
SELECT
  DATE_TRUNC('month', m.created_at) as cohort_month,
  COUNT(DISTINCT m.id) as merchants_created,
  COUNT(DISTINCT le.merchant_id) as merchants_active_this_month
FROM merchants m
LEFT JOIN loyalty_events le
  ON le.merchant_id = m.id
  AND le.created_at >= DATE_TRUNC('month', NOW())
WHERE m.created_at >= '2026-05-01'
GROUP BY cohort_month;
```

## Distribution des sources de crédit

```sql
SELECT
  source,
  COUNT(*) as count,
  ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER () * 100, 1) as pct
FROM loyalty_events
WHERE event_type = 'credit'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY source
ORDER BY count DESC;
```

# Analyses ponctuelles

## Identifier les merchants à risque de churn

```sql
SELECT
  m.name,
  MAX(le.created_at) as last_activity,
  NOW() - MAX(le.created_at) as days_inactive
FROM merchants m
JOIN subscriptions s ON s.merchant_id = m.id AND s.status = 'active'
LEFT JOIN loyalty_events le ON le.merchant_id = m.id
GROUP BY m.id, m.name
HAVING MAX(le.created_at) < NOW() - INTERVAL '14 days'
   OR MAX(le.created_at) IS NULL
ORDER BY days_inactive DESC;
```

# Dépendances

- `events.md`, `08_Performance-System/dashboards.md`
