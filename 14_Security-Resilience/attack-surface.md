---
Title: Attack Surface
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 04_Technique/architecture.md
Used by: threat-model.md
---

# Objectif

Cartographier la surface d'attaque exposée du système.

# Endpoints publics (sans authentification)

| Endpoint | Méthode | Accès | Risque |
|---|---|---|---|
| `GET /wallet/add/:token` | GET | Public | Medium — token forgeable ? (signé côté serveur) |
| `POST /customers` (via token QR) | POST | Public | Medium — rate limiting requis |
| `GET /health` | GET | Public | Faible |
| `POST /webhooks/stripe` | POST | Public (signé Stripe) | Faible avec validation signature |

**Contrôles** :
- Validation de la signature du token QR côté serveur.
- Rate limiting sur `POST /customers` (10 req/min/IP via Cloudflare + Nginx).
- Validation signature Stripe sur webhook.

# Endpoints authentifiés (JWT)

| Endpoint | Authentification | Niveau de risque |
|---|---|---|
| `POST /loyalty/credit` | JWT staff | Élevé — cœur du système |
| `POST /rewards/:id/redeem` | JWT staff | Élevé — lock transactionnel requis |
| `GET /merchants/:id/customers` | JWT owner/manager | Medium — données PII |
| `POST /auth/login` | Credentials | Medium — brute force protection |
| `POST /auth/refresh` | Refresh token | Medium |

**Contrôles** :
- `merchant_id` toujours depuis JWT, jamais depuis le body.
- Rate limiting sur `/auth/login` (5 tentatives/5 min/IP).
- Lock transactionnel Redis sur `/rewards/:id/redeem`.

# Infrastructure exposée

| Composant | Exposition | Protection |
|---|---|---|
| Nginx | Port 443 public | Cloudflare, SSL, rate limiting |
| Next.js | Via Nginx | Pas d'exposition directe |
| NestJS | Via Nginx | Pas d'exposition directe |
| PostgreSQL | Port 5432 interne | Firewall VPS, non exposé |
| Redis | Port 6379 interne | Firewall VPS, non exposé |
| SSH VPS | Port 22 (ou custom) | Clé SSH uniquement, fail2ban |

# Données sensibles exposables

| Donnée | Où | Protection |
|---|---|---|
| Numéros de téléphone | `customers.phone` | HTTPS + accès authentifié uniquement |
| Emails staff | `staff_users.email` | HTTPS + accès authentifié |
| Secrets (JWT, Stripe, Apple) | `.env` prod | Jamais dans les logs, jamais en Git |
| Backup BDD | Object storage | Accès restreint, chiffrement en transit |

# Décisions figées

- PostgreSQL et Redis ne sont jamais exposés sur Internet.
- SSH : password auth désactivé, clé uniquement.
- HTTPS partout — pas de fallback HTTP.

# Dépendances

- `04_Technique/architecture.md`, `threat-model.md`
