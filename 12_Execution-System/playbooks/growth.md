---
Title: Playbook — Growth
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/playbooks
Depends on: 06_GoToMarket/
Used by: —
---

# Objectif

Stratégie opératoire pour activer et accélérer la croissance au-delà des 15 premières signatures.

# Déclencheur d'activation

Ce playbook est activé quand : **15 merchants payants actifs** sont atteints (fin Phase 1).

# Leviers de croissance Phase 2

## Levier 1 — Parrainage structuré

- Chaque merchant actif reçoit un email avec son lien de parrainage personnalisé.
- Mécanisme : 1 mois offert par parrainage converti.
- Objectif : 20 % des nouvelles signatures via parrainage.

**Actions** :
1. Développer le système de referral link dans l'interface merchant.
2. Email d'activation parrainage à tous les merchants actifs.
3. Suivi hebdo dans `execution-metrics.md`.

## Levier 2 — Content / SEO local

- Articles ciblant "fidélité restaurant [ville]", "programme fidélité pizzeria".
- Témoignages commerçants publiés sur le site.
- Objectif : 10 % des trials via search à M6.

## Levier 3 — Instagram commerçants locaux

- Stories "merchant spotlight" avec stats d'usage.
- UGC (posts clients Wallet).
- Objectif : 500 abonnés dans la zone cible avant M6.

## Levier 4 — Partenariats CCI / syndicats

- Présentation dans 1 association de commerçants par trimestre.
- Objectif : 3 signatures directes par présentation.

# Conditions de passage de Phase 1 → Phase 2

| Condition | Valeur |
|---|---|
| Merchants actifs | ≥ 15 |
| Churn mensuel | < 5 % sur 2 mois consécutifs |
| NPS pilotes | > 30 |
| Time-to-first-credit | < 3 jours systématiquement |

# Dépendances

- `06_GoToMarket/channels.md`, `06_GoToMarket/experiments.md`
