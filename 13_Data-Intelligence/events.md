---
Title: Events Catalog
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: tracking-plan.md
Used by: analytics.md, attribution.md
---

# Objectif

Catalogue exhaustif de tous les événements trackés dans le système Primpay.

# Événements métier (loyalty_events)

| event_type | source | Définition |
|---|---|---|
| `credit` | `qr_scan` | Crédit accordé via scan du QR client |
| `credit` | `manual_search_credit` | Crédit accordé via recherche manuelle |
| `credit` | `quick_add_recent_customer` | Crédit accordé via liste "derniers clients" |
| `redeem` | `reward_redeem` | Récompense encaissée |
| `adjustment` | `admin_adjustment` | Ajustement manuel par un admin/owner |

# Événements système

| Événement | Déclencheur | Données |
|---|---|---|
| `customer.created` | Scan QR public + validation | customer_id, merchant_id |
| `wallet_pass.created` | customer.created | customer_id, platform (apple/google) |
| `wallet_pass.updated` | Après loyalty_event | customer_id, merchant_id, new_balance |
| `wallet_pass.revoked` | Suppression compte / RGPD | customer_id |
| `reward.created` | Seuil atteint après crédit | customer_id, merchant_id, type |
| `reward.redeemed` | Staff encaisse récompense | reward_id, staff_id |
| `reward.expired` | Date d'expiration dépassée | reward_id |

# Événements billing

| Événement | Source | Données |
|---|---|---|
| `subscription.trial_started` | Création compte merchant | merchant_id, trial_ends_at |
| `subscription.activated` | Stripe invoice.payment_succeeded | merchant_id, plan_code |
| `subscription.payment_failed` | Stripe invoice.payment_failed | merchant_id |
| `subscription.canceled` | Stripe subscription.deleted | merchant_id, canceled_at |

# Propriétés communes à tous les événements

| Propriété | Type | Présent dans |
|---|---|---|
| `id` | UUID | Tous |
| `merchant_id` | UUID | Tous (sauf customer.created public) |
| `created_at` | Timestamp | Tous |
| `source` | String | loyalty_events |
| `staff_user_id` | UUID | loyalty_events (nullable) |

# Dépendances

- `tracking-plan.md`, `04_Technique/data-model.md`
