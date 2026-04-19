---
Title: Data Flow
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 11_Schemas
Depends on: 04_Technique/architecture.md
Used by: —
---

# Objectif

Représenter les flux de données entre les composants du système Primpay.

# Flux 1 — Ajout carte Wallet (client)

```
Client scanne QR code affiché en caisse
  └─► Page web publique /wallet/add/[token]
        └─► API : GET /wallet/token/:token (validation signature QR)
              └─► Création customer si inexistant
                    └─► Création loyalty_account
                          └─► Génération pass Wallet
                                ├─► Apple : POST apple-wallet-api → .pkpass
                                └─► Google : POST google-wallet-api → JWT link
                          └─► Retour : URL d'ajout dans le Wallet
  └─► Client clique "Ajouter à Wallet" → pass ajouté
```

**Données créées** : `customers`, `wallet_passes`, `loyalty_accounts`

---

# Flux 2 — Crédit en caisse (staff)

```
Staff ouvre PWA → écran principal
  ├─► Chemin A : Scan QR client
  │     └─► Décoder QR → extraire customer public_id
  ├─► Chemin B : Recherche manuelle
  │     └─► Saisie prénom / téléphone → liste de résultats
  └─► Chemin C : Derniers clients (liste pré-chargée)
        └─► Affichage des X derniers clients du merchant

Staff sélectionne le client
  └─► Affichage solde actuel
        └─► Staff clique "+1 crédit"
              └─► API : POST /loyalty/credit
                    ├─► Validation JWT merchant_id
                    ├─► Vérification cooldown (Redis)
                    ├─► Vérification daily_limit (Redis)
                    ├─► Création loyalty_event (append-only)
                    ├─► Mise à jour loyalty_account.points_balance
                    ├─► Vérification seuil de récompense
                    │     └─► Si atteint : création reward (status: available)
                    └─► Mise à jour pass Wallet (Apple/Google)
```

**Données créées/modifiées** : `loyalty_events` (créé), `loyalty_accounts` (mis à jour), `rewards` (conditionnel)

---

# Flux 3 — Encaissement récompense

```
Staff identifie client avec reward disponible
  └─► Affichage "1 récompense disponible : [libellé]"
        └─► Staff clique "Encaisser la récompense"
              └─► API : POST /rewards/:id/redeem
                    ├─► Validation JWT merchant_id
                    ├─► Lock Redis (anti double-click)
                    ├─► Vérification reward.status = 'available'
                    ├─► Vérification reward non expirée
                    ├─► rewards.status → 'redeemed'
                    ├─► Création loyalty_event (type: redeem)
                    └─► Mise à jour pass Wallet
```

---

# Flux 4 — Paiement abonnement (billing)

```
Merchant termine trial
  └─► Stripe : subscription status → 'active'
        └─► Webhook Stripe : invoice.payment_succeeded
              └─► API : POST /webhooks/stripe
                    ├─► Vérification signature webhook
                    ├─► Mise à jour subscriptions.status
                    └─► Email de confirmation (optionnel)

Merchant résilie
  └─► Stripe : customer.subscription.deleted
        └─► Webhook → subscriptions.status = 'canceled'
              └─► Merchant → read-only après fin période
```

---

# Flux 5 — Mise à jour pass Wallet (push)

```
Après tout loyalty_event
  └─► API appelle wallet module
        ├─► Apple : POST https://api.push.apple.com/3/device/[pushToken]
        │     └─► iOS récupère le pass mis à jour automatiquement
        └─► Google : PATCH https://walletobjects.googleapis.com/...
              └─► Mise à jour objet Google Wallet
```

**Note MVP** : si l'API Wallet est down, la mise à jour est en queue async (BullMQ Phase 1.5). MVP : tentative synchrone, timeout silencieux.

# Décisions figées

- Tous les flux critiques passent par l'API NestJS. Jamais de logique en frontend.
- `loyalty_events` est append-only sur tous les flux.

# Dépendances

- `04_Technique/architecture.md`, `04_Technique/data-model.md`, `04_Technique/api-design.md`
