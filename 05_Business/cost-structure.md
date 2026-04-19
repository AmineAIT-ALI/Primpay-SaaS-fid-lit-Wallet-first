---
Title: Cost Structure
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 05_Business
Depends on: —
Used by: unit-economics.md, scenarios.md
---

# Objectif

Détailler la structure de coûts réels du projet : fixes, variables, par phase.

# Coûts fixes mensuels (Phase 1 — 0 à 50 merchants)

| Poste | Coût mensuel | Notes |
|---|---|---|
| VPS hébergement | ~15–25 € | Hetzner ou équivalent |
| Domaine + DNS | ~1 € | Renouvellement annuel ~12 € |
| Apple Developer Program | ~8 € | 99 $ / an = ~8 €/mois |
| Stripe (abonnement) | 0 € | Frais sur transaction uniquement |
| Sentry | 0 € | Plan gratuit jusqu'à 5k events/mois |
| UptimeRobot | 0 € | Plan gratuit |
| Email transactionnel (Resend/Brevo) | 0–10 € | Free tier suffisant MVP |
| Outils dev (GitHub, Figma) | ~10 € | GitHub free, Figma starter |
| **Total coûts fixes** | **~50–60 €/mois** | |

# Coûts variables (par merchant actif)

| Poste | Coût par merchant / mois | Notes |
|---|---|---|
| Hébergement marginal | ~0,50–1 € | VPS déjà dimensionné |
| Stripe fees | ~0,69 € | Sur 29 € : 1,5 % + 0,25 € = 0,69 € |
| Email transactionnel | ~0,20 € | ~10 emails / merchant / mois |
| Passes Wallet (API calls) | ~0,10 € | Gratuit Apple / Google, coût marginal |
| **Total variable / merchant** | **~2–2,50 €/mois** | |

# Coûts setup (par signature)

| Poste | Coût | Notes |
|---|---|---|
| Pack signalétique (stickers QR, affichette) | ~25 € | Impression externe |
| Déplacement onboarding | ~10–15 € | Transport + parking |
| Temps onboarding (valorisé) | ~30 € | 45 min fondateur à 40 €/h |
| **Total setup** | **~70–75 €** | Partiellement couvert par setup fee (99 €) |

# Coûts terrain (acquisition)

| Poste | Coût réel | Notes |
|---|---|---|
| Déplacements démarchage | ~50 €/semaine | Voiture / transports, zone dense |
| Supports terrain (brochures) | ~30 € one-shot | 50 brochures A5 |
| Temps démarchage (valorisé) | ~200 €/semaine | 4 h/jour × 5 jours × 10 €/h (conservateur) |

# Projection coûts fixes à scale

| Seuil merchants | Coûts fixes estimés | Action déclenchée |
|---|---|---|
| 0–50 | ~60 €/mois | VPS actuel suffisant |
| 50–200 | ~150–200 €/mois | Upgrade VPS, outils monitoring payants |
| 200–500 | ~400–500 €/mois | Load balancer, BDD répliquée, ops dédié |
| 500+ | ~1 000 €/mois+ | Recrutement DevOps ou cloud managé |

# Décisions figées

- Pas de coût infra > 100 €/mois avant 50 merchants.
- Setup fee (99 €) couvre le coût setup réel et génère une marge.

# Questions ouvertes

- Intégrer le coût de support dans le coût variable (actuellement sous-estimé) ?
- À quel moment l'embauche d'un commercial terrain est-elle rentable (ROI) ?

# Dépendances

- `unit-economics.md`, `05_Business/scenarios.md`
