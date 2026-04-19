---
Title: ADR-005 — Multi-tenant Security
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique/adr
Depends on: architecture.md
Used by: 14_Security-Resilience/
---

# Sécurité & multi-tenant

## 1. Objectif du document
Définir les garanties de sécurité et les règles d'isolation multi-tenant. Référence pour la revue de code et les audits.

## 2. Authentification

### JWT
- Access token : courte durée (15 minutes).
- Refresh token : longue durée (30 jours), stocké en DB, révocable.
- Algorithme : RS256 (clé asymétrique, rotation possible).
- Claims minimaux : `sub` (staff_user_id), `merchant_id`, `role`, `iat`, `exp`.

### Rôles
- `owner` : tout sur le merchant.
- `manager` : produit + adjustment.
- `staff` : crédit, recherche, redeem.

### Stockage des mots de passe
- Hash bcrypt ou argon2.
- Jamais de mot de passe en clair dans les logs.

## 3. Isolation multi-tenant

### Règle de base
> **Aucune requête métier sans filtre `merchant_id` obtenu depuis le JWT.**

### Implémentation
- Middleware qui extrait `merchant_id` du JWT et l'injecte dans le contexte.
- Repositories qui appliquent systématiquement le filtre.
- `merchant_id` **jamais** accepté depuis un payload ou query string.

### Tests
- Tests d'isolation automatiques : pour chaque endpoint, vérifier qu'un token merchant A ne peut pas accéder à une donnée merchant B.
- Review de code ciblée sur tout nouveau repository.

## 4. Sécurité du QR

### Génération
- QR contient : `customer_id`, `issued_at`, `signature` (HMAC SHA-256 avec secret rotatif).
- QR fixe : ne change pas dans le temps tant que le pass n'est pas révoqué.

### Validation
- Signature vérifiée côté serveur **à chaque scan**.
- QR révoqué (wallet_passes.status = `revoked`) = refus.
- Rate-limit par customer_id et par staff_user_id.

### Révocation
- Possible par owner (cas : client suspect, pass compromis).
- Nouveau pass généré = nouveau QR, ancienne signature rejetée.

## 5. Garde-fous anti-abus

### Cooldown
- Implémenté via Redis (clé `cooldown:{merchant_id}:{customer_id}`).
- Default 10 min, paramétrable par merchant.
- Requête bloquée renvoie `cooldown_active` avec timestamp de fin.

### Limite journalière
- Implémentée via Redis (compteur qui expire à minuit UTC+1).
- Default 3, paramétrable par merchant.
- Requête bloquée renvoie `daily_limit_reached`.

### Lock redeem
- Transaction PostgreSQL avec `SELECT ... FOR UPDATE` sur la reward.
- Empêche la double consommation même en cas de double-clic.

### Risk score
- Job batch quotidien qui compte les crédits anormaux par customer.
- Alerte dashboard owner, pas de blocage automatique au MVP.

## 6. Logs

### Ce qu'on log
- Tout `loyalty_event` (append-only en DB).
- Toute authentification (succès + échec).
- Toute modification de programme / staff.
- Toute opération billing.

### Ce qu'on ne log JAMAIS
- Mots de passe.
- Tokens JWT complets.
- Signatures QR complètes.
- PII non nécessaires (ex. email complet → hashé ou tronqué dans logs applicatifs).

### Format
- Logs structurés JSON.
- Niveau : INFO / WARN / ERROR / SECURITY.
- Stockage : centralisé (Logflare, Better Stack, ou self-hosted).

## 7. Données sensibles

### Chiffrement au repos
- Mots de passe : hash (bcrypt/argon2).
- Téléphone client : à évaluer (chiffrement réversible ou hash + stockage séparé pour recherche).
- Tokens refresh : hashés en base.

### Chiffrement en transit
- HTTPS partout, TLS 1.2+ minimum.
- HSTS activé.

## 8. Gestion des secrets

- Aucun secret dans le code.
- `.env` hors versionning.
- Rotation possible (clés JWT, secret signature QR, clés Stripe).
- Accès production limité à une personne + rotation en cas de départ.

## 9. RGPD (cross-ref)

Voir `09_Legal-Conformite/rgpd-traitement-donnees.md` pour :
- Base légale du traitement.
- Droits des personnes (accès, rectification, effacement).
- Durées de conservation.
- Registre des traitements.

## 10. Incidents

Procédure : voir `10_Operations-Support/procedure-incident.md`.

## 11. Checklist revue de code sécurité

- [ ] Filtre `merchant_id` présent ?
- [ ] Pas de `merchant_id` lu depuis le payload ?
- [ ] Pas de données sensibles dans les logs ?
- [ ] Rate-limit sur les endpoints exposés ?
- [ ] Idempotence sur les endpoints écriture critiques ?
- [ ] Tests d'isolation tenant ajoutés ?

## 12. Questions ouvertes
- Chiffrement du téléphone : réversible ou hash ?
- SSO / SAML pour les grandes chaînes (Phase 3) ?
- 2FA pour les owners ?

## 13. Next steps
- Écrire les middlewares d'auth et de scoping merchant.
- Écrire la suite de tests d'isolation.
- Valider la politique de conservation avec un DPO.
