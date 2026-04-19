---
Title: Automations — Triggers
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/automations
Depends on: 08_Performance-System/triggers.md
Used by: —
---

# Objectif

Inventaire des triggers événementiels et leurs actions associées.

# Triggers Stripe (webhooks)

| Event Stripe | Action déclenchée | Module |
|---|---|---|
| `invoice.payment_succeeded` | `subscriptions.status` → `active` | BillingModule |
| `invoice.payment_failed` | Email de relance merchant | BillingModule |
| `customer.subscription.deleted` | `subscriptions.status` → `canceled`, merchant → read-only | BillingModule |
| `customer.subscription.trial_will_end` | Email J-3 "Votre essai se termine" | BillingModule |
| `customer.subscription.updated` | Mise à jour plan_code | BillingModule |

# Triggers applicatifs (NestJS events)

| Événement interne | Action déclenchée | Module |
|---|---|---|
| `loyalty.credit` créé | Vérifier seuil → créer reward si atteint | LoyaltyModule |
| `loyalty.credit` créé | Mettre à jour pass Wallet | WalletModule |
| `reward.available` créé | Mettre à jour pass Wallet (badge récompense) | WalletModule |
| `reward.redeemed` | Mettre à jour pass Wallet (solde remis à 0) | WalletModule |
| `customer` créé | Générer pass Wallet | WalletModule |

# Triggers de monitoring

| Signal | Action | Outil |
|---|---|---|
| Uptime < 99 % sur 5 min | Email + SMS Amine | UptimeRobot |
| Nouvelle erreur 5xx | Email Amine | Sentry |
| Erreur 5xx > 10/heure | Alerte urgente | Sentry |

# Dépendances

- `08_Performance-System/triggers.md`, `jobs.md`
