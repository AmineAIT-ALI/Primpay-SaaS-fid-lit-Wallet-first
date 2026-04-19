---
Title: Integrations
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: architecture.md
Used by: 09_Legal/compliance-checklist.md
---

# Objectif

Lister et documenter toutes les intégrations externes, leur statut, leurs contraintes.

# Intégrations critiques MVP

## Apple Wallet API

| Attribut | Valeur |
|---|---|
| Statut | ⏳ À configurer Semaine 1 |
| Compte requis | Apple Developer Program (99 $/an) |
| Délai validation | 1–5 jours ouvrés |
| Auth | Certificat .p12 + passphrase |
| Type de pass | Generic Pass |
| Mise à jour passes | Push via APNs (Apple Push Notification service) |
| Doc | developer.apple.com/wallet |

**Points de vigilance :**
- Le certificat expire annuellement → rappel à poser.
- Les passes doivent respecter les guidelines visuelles Apple.
- Test sur device physique iOS obligatoire (simulateur insuffisant).

## Google Wallet API

| Attribut | Valeur |
|---|---|
| Statut | ⏳ À configurer Semaine 1 |
| Compte requis | Google Cloud Console + activation API |
| Délai setup | 1–3 jours |
| Auth | Service account JSON |
| Type de pass | Loyalty Object |
| Mise à jour passes | API REST (pas de push natif MVP) |
| Doc | developers.google.com/wallet |

**Points de vigilance :**
- Service account JSON ne doit jamais être commité dans le dépôt.
- Les passes Google Wallet ont un format différent des passes Apple → module wallet avec 2 renderers.

## Stripe

| Attribut | Valeur |
|---|---|
| Statut | ⏳ À configurer Semaine 2 |
| Compte requis | Stripe account + KYC |
| Auth | Secret key (server) + Publishable key (front) + Webhook secret |
| Usage | Abonnements récurrents (plans Solo + Multi) |
| Webhooks | `invoice.payment_succeeded`, `customer.subscription.deleted`, `customer.subscription.updated` |
| Doc | stripe.com/docs/billing |

**Points de vigilance :**
- KYC Stripe peut prendre 24–48 h.
- Les webhooks doivent être vérifiés avec la signature Stripe (pas de confiance aveugle).
- Mode test obligatoire avant mise en prod.

# Intégrations monitoring

## Sentry

| Attribut | Valeur |
|---|---|
| Statut | ⏳ À configurer avant staging |
| Usage | Capture des erreurs backend (NestJS) et frontend (Next.js) |
| Auth | DSN |
| Plan | Free (jusqu'à 5 000 events/mois) |

## Better Stack / UptimeRobot

| Attribut | Valeur |
|---|---|
| Usage | Uptime monitoring sur endpoints critiques |
| Endpoints à monitorer | `/health`, `/api`, page Wallet publique |
| Alerte | Email + SMS |

# Intégrations Phase 2 (hors MVP)

| Intégration | Trigger d'activation | Notes |
|---|---|---|
| Push notifications APNs | Phase 2 | Nécessite enregistrement push certificates |
| FCM (Firebase Cloud Messaging) | Phase 2 | Pour Android push |
| Lightspeed POS | Phase 3 | Sur demande merchant |
| SumUp POS | Phase 3 | Sur demande merchant |
| Brevo / Resend (emails marketing) | Phase 2 | MVP : emails transactionnels uniquement |

# Décisions figées

- Apple Wallet et Google Wallet = obligatoires MVP.
- Stripe = obligatoire avant lancement commercial.
- Sentry = obligatoire avant staging.

# Questions ouvertes

- Brevo vs Resend pour emails transactionnels ?
- Faut-il un webhook entrant Stripe en staging ou uniquement en prod ?

# Dépendances

- `architecture.md`, `stack.md`, `09_Legal/compliance-checklist.md`
