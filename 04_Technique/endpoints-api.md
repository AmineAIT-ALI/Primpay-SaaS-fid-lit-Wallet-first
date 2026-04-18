---
name: Endpoints API
description: Liste des endpoints REST pour le MVP, avec conventions
type: technical
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Endpoints API

## 1. Objectif du document
Lister les endpoints REST exposés par le backend pour le MVP. Source de vérité pour le contrat front / back.

## 2. Conventions

- Base URL : `https://api.primpay.io/v1` (à confirmer selon naming).
- Auth : `Authorization: Bearer <JWT>` sauf mention contraire.
- Tous les endpoints métier sont **scopés merchant** via le JWT.
- Réponses JSON, codes HTTP standards.
- Erreurs sous forme `{ "error": { "code": "...", "message": "..." } }`.

## 3. Auth

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/auth/login` | Login staff (email + password) → access + refresh |
| POST | `/auth/refresh` | Renouvellement access token |
| POST | `/auth/logout` | Invalidation refresh token |

## 4. Customer onboarding

| Méthode | Endpoint | Description | Auth |
|---|---|---|---|
| POST | `/customers` | Création customer + loyalty_account (flow QR public) | Public (via merchant slug signé) |
| GET | `/customers/:id` | Récupération d'un customer | Staff |
| GET | `/customers/search?q=` | Recherche par prénom ou téléphone | Staff |

## 5. Wallet

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/wallet/passes` | Génération d'un pass Wallet |
| PATCH | `/wallet/passes/:customerId` | Mise à jour du pass |
| GET | `/wallet/passes/:customerId` | Récupération du pass (pour re-download) |

## 6. Merchant

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/merchant/me` | Infos du merchant courant (depuis JWT) |
| GET | `/merchant/programs` | Liste des programmes |
| POST | `/merchant/programs` | Création d'un programme |
| PATCH | `/merchant/programs/:id` | Modification |
| GET | `/merchant/staff` | Liste des staff users |
| POST | `/merchant/staff` | Invitation d'un staff |
| PATCH | `/merchant/staff/:id` | Modification rôle / statut |

## 7. Loyalty actions (endpoints critiques)

| Méthode | Endpoint | Description |
|---|---|---|
| POST | `/scan` | Validation d'un QR scanné, retourne customer + account |
| POST | `/loyalty/credit` | Crédit d'un client (source requise dans payload) |
| POST | `/loyalty/redeem` | Consommation d'une reward (transactionnel) |
| GET | `/loyalty/accounts/:customerId` | Compte fidélité (scopé merchant du JWT) |
| GET | `/loyalty/accounts/:customerId/history` | Historique des events |

### Payload `/loyalty/credit`
```json
{
  "customer_id": "uuid",
  "source": "qr_scan" | "manual_search_credit" | "quick_add_recent_customer" | "admin_adjustment",
  "points_delta": 1,
  "stamps_delta": 0,
  "note": "optional"
}
```

### Réponse `/loyalty/credit`
```json
{
  "event_id": "uuid",
  "new_balance": { "points": 0, "stamps": 7 },
  "progress": { "current": 7, "threshold": 10 },
  "reward_available": false
}
```

## 8. Analytics

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/analytics/overview` | Clients, passages, rewards (7/30 j) |
| GET | `/analytics/customers` | Liste clients actifs avec indicateurs |
| GET | `/analytics/rewards` | Rewards émises / consommées |
| GET | `/analytics/retention` | Taux de retour (MVP : valeur simple) |

## 9. Billing

| Méthode | Endpoint | Description |
|---|---|---|
| GET | `/subscription` | Statut abonnement courant |
| POST | `/subscription/checkout` | Création session de paiement Stripe |
| PATCH | `/subscription/plan` | Changement de plan |
| POST | `/subscription/webhook` | Webhook Stripe (non-authentifié, vérifié par signature) |

## 10. Codes d'erreur standards

| Code | Signification |
|---|---|
| `auth_invalid` | Credentials invalides |
| `auth_expired` | Token expiré |
| `forbidden_tenant` | Accès cross-tenant refusé |
| `customer_not_found` | Customer inconnu |
| `qr_invalid` | QR malformé ou signature KO |
| `cooldown_active` | Cooldown en cours sur ce client |
| `daily_limit_reached` | Limite journalière atteinte |
| `reward_not_available` | Reward déjà consommée ou inexistante |
| `program_not_active` | Programme désactivé |
| `validation_error` | Champ manquant ou invalide |

## 11. Contraintes non-fonctionnelles

- Latence p95 < 300 ms sur les endpoints `/loyalty/*`.
- Idempotence : `/loyalty/credit` idempotent via `Idempotency-Key` header.
- Rate-limiting : par IP + par staff_user_id.
- Logs structurés (JSON).

## 12. Questions ouvertes
- Exposer une API publique read-only pour partenaires ? (post-MVP)
- Faut-il un endpoint `/qr/validate` distinct ou conserver `/scan` ?
- Webhooks sortants vers les commerçants (ex. notification reward) ?

## 13. Next steps
- Spécifier le format OpenAPI (YAML) pour génération de clients typés.
- Tests d'intégration sur les 3 endpoints critiques (`/scan`, `/loyalty/credit`, `/loyalty/redeem`).
