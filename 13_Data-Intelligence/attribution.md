---
Title: Attribution
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: events.md, 06_GoToMarket/channels.md
Used by: —
---

# Objectif

Comprendre d'où viennent les merchants signés. Attribuer les conversions aux canaux d'acquisition.

# Modèle d'attribution MVP

Modèle **last-touch simplifié** : on trace uniquement le canal qui a généré le premier contact.

## Champs à collecter à l'onboarding

À la création du compte merchant, tracker :
- `acquisition_channel` : terrain / referral / instagram / cold-email / inbound / unknown
- `referrer_merchant_id` : si parrainage

## Exemple de valeurs

| Canal | Valeur `acquisition_channel` |
|---|---|
| Démarchage terrain | `terrain` |
| Parrainage commerçant | `referral` |
| Instagram / DM | `instagram` |
| Cold email | `cold-email` |
| Inbound (visite site) | `inbound` |
| Inconnu | `unknown` |

# Requête de suivi d'attribution mensuelle

```sql
SELECT
  acquisition_channel,
  COUNT(*) as signups,
  ROUND(COUNT(*)::numeric / SUM(COUNT(*)) OVER () * 100, 1) as pct
FROM merchants
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY acquisition_channel
ORDER BY signups DESC;
```

# Objectif par canal

| Canal | Objectif Phase 1 | Objectif Phase 2 |
|---|---|---|
| Terrain | > 80 % des signatures | 50 % |
| Referral | 10 % | 25 % |
| Instagram | 5 % | 15 % |
| Inbound | 5 % | 10 % |

# Dépendances

- `06_GoToMarket/channels.md`, `events.md`, `analytics.md`
