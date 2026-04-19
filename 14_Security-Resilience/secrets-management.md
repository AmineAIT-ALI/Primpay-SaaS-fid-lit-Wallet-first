---
Title: Secrets Management
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 10_Operations/access-management.md
Used by: —
---

# Objectif

Documenter la gestion des secrets : stockage, rotation, accès, audit.

# Inventaire des secrets

| Secret | Usage | Stockage | Rotation |
|---|---|---|---|
| `JWT_SECRET` | Signature tokens JWT | .env prod + gestionnaire MP | Semestrielle |
| `DATABASE_URL` | Connexion PostgreSQL | .env prod + gestionnaire MP | Si compromission |
| `REDIS_URL` | Connexion Redis | .env prod + gestionnaire MP | Si compromission |
| `STRIPE_SECRET_KEY` | API Stripe | .env prod + gestionnaire MP | Si compromission |
| `STRIPE_WEBHOOK_SECRET` | Validation webhooks Stripe | .env prod + gestionnaire MP | Si compromission |
| `APPLE_CERT` | Apple Wallet API | .env prod (base64) + gestionnaire MP | Annuelle (expiration cert) |
| `APPLE_CERT_PASSWORD` | Déchiffrement cert Apple | .env prod + gestionnaire MP | Annuelle |
| `GOOGLE_SERVICE_ACCOUNT` | Google Wallet API | .env prod (JSON base64) + gestionnaire MP | Annuelle |
| `SENTRY_DSN` | Monitoring erreurs | .env prod + gestionnaire MP | Si compromission |
| `SSH_PRIVATE_KEY` | Accès VPS | Fichier local Amine | Annuelle |

# Règles de gestion

1. **Jamais dans le code** : aucun secret en dur dans le code source.
2. **Jamais dans les logs** : `logger.log()` ne doit jamais logger de secret.
3. **Jamais dans Git** : `.env.*` dans `.gitignore`.
4. **Un secret par service** : Stripe prod ≠ Stripe staging.
5. **Gestionnaire de mots de passe** : 1Password ou Bitwarden avec coffre dédié Primpay.

# Procédure de rotation JWT_SECRET

```
1. Générer un nouveau secret (openssl rand -base64 64)
2. Mettre à jour .env prod
3. Redéployer l'application
4. Avertir : toutes les sessions actives seront invalidées (durée access token = 15 min)
5. Documenter dans decision-log.md
```

# Procédure si secret compromis

```
1. Identifier quels systèmes utilisent ce secret.
2. Révoquer immédiatement le secret côté fournisseur (Stripe, Apple, Google).
3. Générer un nouveau secret.
4. Mettre à jour .env prod.
5. Redéployer.
6. Vérifier dans les logs qu'il n'y a pas d'utilisation anormale.
7. Notifier les merchants si impact service.
```

# Décisions figées

- Gestionnaire de mots de passe obligatoire pour tous les secrets prod.
- `.env.prod` n'est jamais commité dans Git.
- Rotation JWT_SECRET tous les 6 mois minimum.

# Dépendances

- `10_Operations/access-management.md`, `14_Security-Resilience/incident-response.md`
