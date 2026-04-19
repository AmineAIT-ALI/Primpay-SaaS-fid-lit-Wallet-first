---
Title: Data Model
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: architecture.md
Used by: 09_Legal/data-retention.md
---

# Schéma de base de données

## 1. Objectif du document
Définir les tables, relations, contraintes et indexes. Source de vérité pour les migrations.

## 2. Principe central

> On ne construit pas une carte par commerce. On construit une identité client globale, avec N relations commerçantes, et un historique d'événements par relation.

## 3. Entités

### `customers` — Identité globale minimale
- `id` UUID PK
- `public_id` TEXT UNIQUE (identifiant court affiché au staff, ex. `AMIN-1423`)
- `first_name` TEXT
- `phone` TEXT (chiffré ou hash indexé à décider)
- `email` TEXT NULLABLE
- `created_at` TIMESTAMP

### `wallet_passes` — Pass Wallet lié au customer
- `id` UUID PK
- `customer_id` UUID FK → customers
- `qr_payload` TEXT
- `qr_signature` TEXT
- `apple_pass_id` TEXT NULLABLE
- `google_object_id` TEXT NULLABLE
- `status` TEXT (`active`, `revoked`)
- `updated_at` TIMESTAMP

### `merchants` — Commerce
- `id` UUID PK
- `name` TEXT
- `slug` TEXT UNIQUE
- `status` TEXT (`active`, `trial`, `suspended`)
- `created_at` TIMESTAMP

### `merchant_locations` — Établissements physiques
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `name` TEXT
- `address` TEXT
- `city` TEXT
- `created_at` TIMESTAMP

### `staff_users` — Employés
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `location_id` UUID FK NULLABLE
- `email` TEXT UNIQUE
- `password_hash` TEXT
- `role` TEXT (`owner`, `manager`, `staff`)
- `status` TEXT (`active`, `invited`, `disabled`)
- `created_at` TIMESTAMP

### `loyalty_programs` — Programme d'un commerce
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `name` TEXT
- `type` TEXT (`points`, `stamps`)
- `rules_json` JSONB (seuil, ratio, etc.)
- `reward_policy_json` JSONB (libellé, valeur)
- `status` TEXT (`active`, `draft`, `archived`)
- `created_at` TIMESTAMP

### `loyalty_accounts` — Compte fidélité d'un customer chez un merchant
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `customer_id` UUID FK → customers
- `loyalty_program_id` UUID FK → loyalty_programs
- `points_balance` INT DEFAULT 0
- `stamps_balance` INT DEFAULT 0
- `total_earned` INT DEFAULT 0
- `total_redeemed` INT DEFAULT 0
- `last_activity_at` TIMESTAMP
- `created_at` TIMESTAMP
- UNIQUE(`merchant_id`, `customer_id`, `loyalty_program_id`)

### `loyalty_events` — Historique append-only
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `customer_id` UUID FK → customers
- `loyalty_program_id` UUID FK → loyalty_programs
- `location_id` UUID FK NULLABLE
- `staff_user_id` UUID FK NULLABLE
- `source` TEXT (`qr_scan`, `manual_search_credit`, `quick_add_recent_customer`, `reward_redeem`, `admin_adjustment`)
- `event_type` TEXT (`credit`, `redeem`, `adjustment`)
- `points_delta` INT DEFAULT 0
- `stamps_delta` INT DEFAULT 0
- `metadata_json` JSONB
- `created_at` TIMESTAMP

### `rewards` — Récompenses acquises / consommées
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `customer_id` UUID FK → customers
- `loyalty_program_id` UUID FK → loyalty_programs
- `status` TEXT (`available`, `redeemed`, `expired`)
- `reward_type` TEXT
- `reward_value` TEXT
- `earned_at` TIMESTAMP
- `redeemed_at` TIMESTAMP NULLABLE
- `expires_at` TIMESTAMP NULLABLE

### `subscriptions` — Abonnement merchant
- `id` UUID PK
- `merchant_id` UUID FK → merchants
- `plan_code` TEXT (`solo_29`, `multi_79`)
- `status` TEXT (`trialing`, `active`, `past_due`, `canceled`)
- `trial_ends_at` TIMESTAMP NULLABLE
- `current_period_start` TIMESTAMP
- `current_period_end` TIMESTAMP

## 4. Relations clés

- `customer` 1—N `wallet_passes` (un seul actif à la fois recommandé).
- `customer` 1—N `loyalty_accounts` (un par merchant fréquenté).
- `merchant` 1—N `merchant_locations`, `staff_users`, `loyalty_programs`.
- `loyalty_account` ↔ `loyalty_events` (append-only).
- `loyalty_account` ↔ `rewards`.

## 5. Indexes recommandés

- `customers(phone)` → recherche staff.
- `customers(public_id)` → identification rapide.
- `loyalty_events(customer_id, merchant_id, created_at DESC)` → historique.
- `loyalty_events(merchant_id, created_at DESC)` → dashboard merchant.
- `rewards(customer_id, merchant_id, status)` → check reward dispo.
- `staff_users(email)` UNIQUE.
- `merchants(slug)` UNIQUE.

## 6. Contraintes métier

- Pas de delete sur `loyalty_events` (enforcement applicatif + rôle DB limité).
- UNIQUE (`merchant_id`, `customer_id`, `loyalty_program_id`) sur `loyalty_accounts`.
- Trigger ou logique applicative pour maintenir cohérence balance ↔ somme des events.

## 7. Sécurité

- Chiffrement au repos de la colonne `phone` (à évaluer).
- Mot de passe staff stocké en hash (bcrypt / argon2).
- Pas de PII dans les logs applicatifs.

## 8. Questions ouvertes
- Stocker `phone` en clair ou en hash + clear chiffré ? Trade-off recherche vs sécurité.
- Faut-il une table `audit_logs` séparée ou les `loyalty_events` suffisent ?
- Faut-il un soft-delete sur `customers` pour RGPD ?

## 9. Next steps
- Écrire les migrations initiales.
- Définir les seeds de test.
- Documenter la stratégie de backup / restore.
