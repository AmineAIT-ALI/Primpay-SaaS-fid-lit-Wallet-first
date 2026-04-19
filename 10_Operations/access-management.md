---
Title: Access Management
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: —
Used by: 14_Security-Resilience/secrets-management.md
---

# Objectif

Gérer les accès : qui a accès à quoi, comment et avec quelle rotation.

# Matrice d'accès

## Infrastructure

| Système | Qui | Méthode | MFA | Rotation |
|---|---|---|---|---|
| VPS SSH | Amine | Clé SSH ed25519 | Non (clé privée) | Annuelle |
| Dashboard hébergeur | Amine | Email + password | ✅ Obligatoire | Tous les 6 mois |
| GitHub | Amine | Email + password | ✅ Obligatoire | — |
| GitHub Actions secrets | Amine | Via GitHub UI | — | À chaque rotation variable |
| Cloudflare | Amine | Email + password | ✅ Obligatoire | Tous les 6 mois |

## Services externes

| Service | Qui | Méthode | MFA | Notes |
|---|---|---|---|---|
| Stripe dashboard | Amine | Email + password | ✅ Obligatoire | Clés API en env uniquement |
| Apple Developer | Amine | Apple ID | ✅ Obligatoire | Cert à renouveler annuellement |
| Google Cloud Console | Amine | Google account | ✅ Obligatoire | Service account JSON en env |
| Sentry | Amine | Email + password | Recommandé | — |

## Application Primpay

| Rôle | Accès | Créé par |
|---|---|---|
| `owner` | Toutes les fonctions de son merchant | Amine à l'onboarding |
| `manager` | Fonctions caisse + historique + paramètres limités | Owner |
| `staff` | Fonctions caisse uniquement | Owner ou manager |

# Règles d'accès

1. **Principe de moindre privilège** : chaque utilisateur n'a accès qu'à ce dont il a besoin.
2. **MFA obligatoire** sur tous les services critiques d'infrastructure.
3. **Clés API** : jamais dans le code, uniquement dans les variables d'environnement.
4. **Accès VPS** : uniquement par clé SSH (password SSH désactivé).
5. **Accès BDD** : jamais direct en production (uniquement via l'application ou migration).

# Révocation d'accès

| Événement | Action dans les 24 h |
|---|---|
| Staff quitte le commerce | Owner désactive le compte depuis la PWA |
| Merchant résilie | Tous les staff_users désactivés automatiquement |
| Compromission suspectée | Réinitialisation mot de passe + invalidation sessions |

# Rotation des secrets

| Secret | Fréquence de rotation | Procédure |
|---|---|---|
| JWT_SECRET | Tous les 6 mois | Mise à jour .env + redéploiement (invalide toutes les sessions) |
| Clé SSH VPS | Annuelle | Génération nouvelle clé, mise à jour authorized_keys |
| Apple Wallet Certificate | Annuelle (expiration) | Renouvellement Apple Developer + mise à jour .env |
| Stripe keys | Si compromission | Via dashboard Stripe + mise à jour .env |

# Décisions figées

- MFA obligatoire sur tous les accès admin critiques.
- Mot de passe VPS SSH désactivé (uniquement clé SSH).
- Aucun accès direct PostgreSQL en production hors migrations.

# Questions ouvertes

- Faut-il un gestionnaire de secrets (Vault, AWS SSM) à partir de Phase 2 ?

# Dépendances

- `14_Security-Resilience/secrets-management.md`, `10_Operations/environments.md`
