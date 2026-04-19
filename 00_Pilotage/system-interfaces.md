---
Title: System Interfaces
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: system-map.md
Used by: —
---

# Objectif

Décrire toutes les interfaces actives du système Primpay : humaines, documentaires, techniques et externes.

# Interfaces humaines

| Interface | Acteurs | Canal | Fréquence |
|---|---|---|---|
| Revue hebdo | Amine | Auto-revue + ce dépôt | Vendredi |
| Démo terrain | Amine ↔ prospect | En face-à-face | 5/jour cible |
| Onboarding merchant | Amine ↔ merchant | Sur place | À chaque signature |
| Support merchant | Merchant ↔ Amine | Email / WhatsApp | < 48 h SLA |
| Feedback pilotes | Pilote ↔ Amine | Entretien J+7, J+14, J+30 | Hebdo pilotes |

# Interfaces documentaires

| Document | Lu par | Mis à jour par | Fréquence |
|---|---|---|---|
| `README.md` | Tout nouvel arrivant | Amine | À chaque restructuration |
| `00_Pilotage/roadmap.md` | Amine | Amine | Hebdo |
| `00_Pilotage/decision-log.md` | Amine | Amine | À chaque décision D1/D2 |
| `08_Performance-System/system-health.md` | Amine | Amine | Quotidien |

# Interfaces techniques (MVP)

| Interface | Sens | Protocol | Auth |
|---|---|---|---|
| PWA merchant ↔ API NestJS | Bidirectionnel | REST / HTTPS | JWT Bearer |
| API ↔ PostgreSQL | Interne | TCP | Credentials env |
| API ↔ Redis | Interne | TCP | Password env |
| API ↔ Apple Wallet | Sortant | HTTPS | Apple cert + passphrase |
| API ↔ Google Wallet | Sortant | HTTPS | Google service account |
| API ↔ Stripe | Sortant + Webhooks | HTTPS | Stripe secret key + webhook secret |
| Client ↔ Page d'ajout Wallet | Entrant | HTTPS | Public (QR signé) |
| Cloudflare ↔ Nginx | Proxy | HTTPS | Cloudflare origin cert |

# Interfaces de monitoring

| Interface | Outil | Ce qu'on observe |
|---|---|---|
| Erreurs applicatives | Sentry | 5xx, exceptions |
| Uptime + latence | Better Stack / UptimeRobot | Disponibilité, temps de réponse |
| Logs infrastructure | Journald / Docker logs | Erreurs système |
| Métriques business | Dashboard interne (SQL) | Crédits, signups, MRR |

# Décisions figées

- Toutes les interfaces techniques passent par HTTPS.
- Aucun secret en clair dans le code ou les logs.

# Questions ouvertes

- Outil de monitoring définitif (Better Stack vs Grafana Cloud vs self-hosted) ?

# Dépendances

- `04_Technique/architecture.md`, `04_Technique/integrations.md`
