---
Title: Constraints
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 01_Fondations
Depends on: —
Used by: 04_Technique/, 05_Business/
---

# Objectif

Lister les contraintes réelles et non négociables du projet. Distinguer contraintes dures (impossibles à contourner) et contraintes molles (difficiles mais contournables).

# Contraintes dures

## Budget
- Budget initial : auto-financement solo-founder.
- Coûts d'infrastructure : < 150 € / mois jusqu'à 50 merchants.
- Pas de levée de fonds avant validation de la traction (15+ merchants payants).
- Pas de recrutement avant 30+ merchants payants.

## Équipe
- Solo-founder phase MVP.
- Capacité de développement : 1 développeur (Amine).
- Contrainte : pas de parallelisation de chantiers lourds.
- Implication : le MVP doit être le plus petit possible pour être livrable en 4 semaines.

## Légal / RGPD
- Hébergement obligatoirement EU (conforme RGPD).
- Consultation DPO externe obligatoire avant lancement commercial.
- Pas de revente de données client possible (interdit, et contraire à la proposition de valeur).
- Contrat DPA signé avec chaque merchant avant go-live.

## API tierces
- Apple Wallet : délai de validation compte Developer 1–5 jours.
- Google Wallet API : délai de setup 1–3 jours.
- Stripe : KYC requis avant activation des paiements réels.

## Temps
- Deadline MVP : 4 semaines de développement.
- Deadline 1er pilote : semaine 5.
- Deadline 15 signatures : J+90.

# Contraintes molles

## Stack technique
- TypeScript full-stack fortement recommandé (cohérence, seul développeur).
- Pas de microservices en MVP (surcoût de complexité).
- ORM à trancher entre Prisma et TypeORM.

## Hébergeur
- OVH / Hetzner / Scaleway : tous trois acceptables. À trancher en Semaine 1.

## Internationalisation
- MVP en français uniquement.
- API conçue pour être i18n-ready (textes externalisés, pas hardcodés).

# Ce que les contraintes impliquent sur le produit

- Pas de feature qui nécessite > 3 jours de dev sans décision D1.
- Pas d'intégration POS (complexité trop élevée pour solo-founder).
- Pas d'app mobile native (coût de maintenance trop élevé).
- Dashboard minimal : 4 KPI seulement en MVP.

# Décisions figées

- Hébergement EU uniquement.
- MVP livrable en 4 semaines max.
- Pas de recrutement avant 30 signatures.

# Questions ouvertes

- À quel moment chercher un co-fondateur technique vs rester solo ?
- Quel est le budget marketing absolu maximal avant J+90 ?

# Dépendances

- `01_Fondations/principles.md`, `03_Produit/mvp-scope.md`, `05_Business/cost-structure.md`
