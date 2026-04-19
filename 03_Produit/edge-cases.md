---
Title: Edge Cases
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: business-rules.md
Used by: 04_Technique/
---

# Objectif

Documenter les cas limites identifiés et leur traitement décidé. Éviter les surprises en production.

# Contexte

Les cas limites doivent être décidés avant le développement, pas découverts en prod.

# Cas limites — Crédit

| Cas | Comportement attendu | Décision |
|---|---|---|
| Staff crédite deux fois le même client en < 10 min | Bloqué par cooldown | Cooldown 10 min par défaut, configurable 5 min–2 h |
| Staff crédite > 3 fois en 24 h le même client | Bloqué par daily limit | Limite 3 crédits / client / jour par défaut (configurable 1–10) |
| Client présente un QR révoqué | Message d'erreur clair, pas de crédit | Vérification signature côté serveur |
| QR invalide (screenshot flou, mauvaise app) | Erreur lisible + suggestion recherche manuelle | Message : "QR non reconnu — cherchez le client par nom" |
| Connexion perdue pendant le crédit | Retry automatique × 3, puis message d'erreur | Le crédit n'est pas imputé si le serveur n'a pas répondu OK |
| Double envoi réseau (même requête × 2) | Idempotence sur l'endpoint de crédit | Clé d'idempotence dans le header de la requête |

# Cas limites — Récompense

| Cas | Comportement attendu | Décision |
|---|---|---|
| Client atteint le seuil exactement à la limite | Récompense créée automatiquement | Trigger dans le Core Loyalty Engine post-crédit |
| Staff tente d'encaisser une récompense déjà consommée | Erreur bloquante avec message clair | Vérification statut `rewards.status` avant encaissement |
| Staff tente d'encaisser une récompense expirée | Erreur avec date d'expiration affichée | Vérification `expires_at` avant encaissement |
| Double-click sur "Encaisser la récompense" | Un seul encaissement | Lock transactionnel Redis + idempotence |
| Client a plusieurs récompenses disponibles | Afficher la liste, staff choisit | Interface de sélection si N > 1 récompenses |

# Cas limites — Wallet

| Cas | Comportement attendu | Décision |
|---|---|---|
| Client iOS et Android simultanément | 2 passes distincts, même compte | `wallet_passes` supporte N passes par customer |
| Client supprime son pass puis rescanne | Nouveau pass créé, même compte customer | Matching par `public_id` ou numéro de téléphone |
| Apple / Google Wallet API down au moment de la création | Compte customer créé, pass en file d'attente | Job de retry async |
| Pass mis à jour mais notification Wallet pas reçue | Données correctes dans le pass, sans notification | Acceptable MVP (push notifications Phase 2) |

# Cas limites — Multi-tenant

| Cas | Comportement attendu | Décision |
|---|---|---|
| Staff tente d'accéder à un customer d'un autre merchant | Blocage strict + log | `merchant_id` filtré depuis JWT, jamais depuis body |
| Token JWT expiré pendant une session active | Refresh automatique ou déconnexion propre | Refresh token 30 jours, access token 15 min |
| Owner désactive un staff pendant une session active | Session expire à la prochaine requête | Pas de révocation temps-réel MVP (acceptable) |

# Cas limites — Données

| Cas | Comportement attendu | Décision |
|---|---|---|
| Deux customers avec le même numéro de téléphone | Erreur à la création du second | Contrainte UNIQUE sur `customers.phone` |
| Client demande suppression de son compte (RGPD) | Soft-delete + anonymisation | Voir `09_Legal/rgpd.md` — procédure manuelle MVP |
| Merchant résilie son abonnement | Données en lecture seule 90 jours, puis archivage | Voir `09_Legal/data-retention.md` |

# Décisions figées

- Cooldown 10 min par défaut, daily limit 3 par défaut.
- Idempotence obligatoire sur le endpoint `/loyalty/credit`.
- Lock Redis sur l'encaissement de récompense.

# Questions ouvertes

- Faut-il permettre au gérant de contester un crédit après > 24 h (audit) ?
- Que se passe-t-il si le programme de fidélité est modifié alors que des clients ont un solde en cours ?

# Dépendances

- `03_Produit/business-rules.md`, `04_Technique/data-model.md`, `04_Technique/api-design.md`
