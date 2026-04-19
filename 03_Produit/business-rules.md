---
Title: Business Rules
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: mvp-scope.md
Used by: 04_Technique/api-design.md
---

# Règles métier

## 1. Objectif du document
Décrire toutes les règles qui régissent le comportement du moteur de fidélité. Source de vérité pour l'implémentation backend.

## 2. Identité client

- Un `customer` a une identité globale (prénom + téléphone, optionnellement email).
- Un même téléphone = un même customer, tous commerces confondus.
- Si le même téléphone scanne un QR d'un autre commerce, on **réutilise** le customer et on crée un nouveau `loyalty_account` lié au nouveau merchant.

## 3. Relation customer ↔ merchant

- Un `loyalty_account` est créé lors du premier crédit (ou du premier ajout Wallet) sur un commerce donné.
- Un customer peut avoir N loyalty_accounts (un par commerce où il est passé).
- Chaque loyalty_account porte ses propres compteurs (points, tampons, rewards).

## 4. Programmes

### Au MVP
- Un merchant = un programme actif à la fois.
- Un programme est soit **points**, soit **tampons** (pas les deux).
- Une seule récompense active à la fois par programme.
- Le seuil est un entier positif (ex. 10 tampons).

### Post-MVP
- Plusieurs programmes en parallèle possibles.
- Plusieurs récompenses actives.

## 5. Crédits

### Sources autorisées (MVP)
- `qr_scan` : scan du pass Wallet client par staff.
- `manual_search_credit` : crédit via recherche client.
- `quick_add_recent_customer` : crédit via "derniers clients".
- `reward_redeem` : consommation d'une récompense.
- `admin_adjustment` : correction manuelle par un owner/manager (avec justification).

### Sources post-MVP
- `nfc_tap`, `pos_sync`.

### Règles de crédit
- Chaque crédit génère un `loyalty_event` en base (source de vérité).
- Un crédit est **immédiat** (pas de file d'attente).
- Un crédit peut être **annulé** uniquement via `admin_adjustment` de signe inverse (pas de delete, pas d'update).

## 6. Rewards

- Une reward est créée **automatiquement** dès que le seuil est atteint.
- Statut : `available → redeemed` ou `available → expired`.
- La consommation est **transactionnelle** avec lock pour interdire la double consommation.
- Une reward consommée ne peut plus être restaurée (si erreur, créer un `admin_adjustment` compensatoire).

## 7. Garde-fous anti-abus

### Cooldown
- Par défaut : 10 minutes entre deux crédits pour un même customer chez un même merchant.
- Paramétrable par merchant dans des bornes (5 min – 2 h).

### Limite journalière
- Par défaut : 3 crédits max par jour par customer.
- Paramétrable par merchant (1 – 10).

### Signature QR
- Le payload du QR contient `customer_id` + `issued_at` + signature HMAC.
- Le serveur rejette tout QR sans signature valide.
- Le serveur rejette tout QR dont la signature a été révoquée.

### Lock sur redeem
- Le redeem d'une reward passe par une transaction verrouillée.
- Impossible de consommer une reward déjà `redeemed`.

### Risk score léger
- Un comptage anormal (ex. 10 crédits en 1 h, 50 crédits en 1 jour) déclenche une alerte dans le dashboard merchant.
- Pas de blocage automatique au MVP (pour ne pas gêner l'usage).

## 8. Accès et permissions

### Rôles
- **Owner** : tous les droits sur son merchant (programme, staff, billing).
- **Manager** : droits produit + adjustment, pas de billing.
- **Staff** : crédit, recherche, redeem. Pas de config.

### Isolation multi-tenant
- Toute requête serveur filtre par `merchant_id` obtenu depuis le JWT.
- **Jamais** de `merchant_id` accepté depuis le payload client.
- Tests d'isolation obligatoires à chaque release.

## 9. Logs et audit

- Chaque `loyalty_event` est persistant (append-only, jamais supprimé).
- Chaque redeem est loggé avec `staff_user_id`, `location_id`, `merchant_id`, timestamp.
- Toute modification de programme est loggée (qui, quand, avant/après).
- Toute connexion staff est loggée.

## 10. Cas particuliers

### Usage familial (autorisé)
- Un foyer peut partager une carte Wallet.
- Les garde-fous (cooldown, limite journalière) limitent naturellement les abus.

### Perte du téléphone client
- Le client rescanne un QR public → réassocie son numéro → nouveau pass Wallet généré.
- Ses compteurs sont conservés (ils sont liés au customer, pas au pass).

### Changement de numéro
- À gérer en Phase 2 (au MVP, pas de flow explicite).

### Désabonnement commerçant
- Accès coupé à J+1 de la fin de période.
- Données conservées 90 jours puis purgées ou exportées sur demande.

## 11. Décisions figées
- Pas de crédit offline au MVP.
- Usage familial autorisé volontairement.
- Append-only sur les events (pas de suppression).

## 12. Questions ouvertes
- Faut-il notifier le client quand une reward expire ?
- Faut-il un plafond absolu sur les points / tampons accumulables ?

## 13. Next steps
- Traduire ces règles en tests automatisés côté backend.
- Documenter les réponses API aux cas d'erreur (QR invalide, cooldown, limite).
