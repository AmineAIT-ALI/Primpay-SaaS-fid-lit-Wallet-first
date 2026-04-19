---
Title: Scenarios
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 05_Business
Depends on: financial-assumptions.md, 02_Marche-Cible/market-size.md
Used by: 00_Pilotage/kill-criteria.md
---

# Objectif

Modéliser les 3 scénarios de développement sur 12 mois. Identifier les conditions de chaque trajectoire.

# Paramètres communs

- ARPU : 33 € / mois
- Marge brute : 93 %
- Churn mensuel hypothèse centrale : 3 %

# Scénario A — Pessimiste

**Hypothèse** : conversion difficile, churn élevé, zone peu dense.

| Mois | Nouvelles signatures | Churn (5 %) | Total actifs | MRR |
|---|---|---|---|---|
| M1 | 2 | 0 | 2 | 66 € |
| M3 | 5 | 0 | 9 | 297 € |
| M6 | 8 | 2 | 20 | 660 € |
| M12 | 5 | 3 | 30 | 990 € |

**Conditions** :
- Taux de conversion démo → signature < 10 %.
- Churn mensuel > 5 %.
- Zone peu dense ou mal choisie.

**Action déclenchée** : pivot de zone ou de segment si MRR < 300 € à M3.

# Scénario B — Central (base de travail)

**Hypothèse** : traction progressive, densification réussie.

| Mois | Nouvelles signatures | Churn (3 %) | Total actifs | MRR |
|---|---|---|---|---|
| M1 | 3 | 0 | 3 | 99 € |
| M3 | 10 | 0 | 15 | 495 € |
| M6 | 15 | 2 | 42 | 1 386 € |
| M12 | 20 | 3 | 80 | 2 640 € |

**Conditions** :
- Taux de conversion 20–25 %.
- Churn 3 % mensuel.
- Parrainage activé à M3.

**Breakeven cash** : atteint à M2 (4 merchants payants).

# Scénario C — Optimiste

**Hypothèse** : forte traction, effet réseau déclenché, bouche-à-oreille viral.

| Mois | Nouvelles signatures | Churn (1,5 %) | Total actifs | MRR |
|---|---|---|---|---|
| M1 | 5 | 0 | 5 | 165 € |
| M3 | 20 | 0 | 35 | 1 155 € |
| M6 | 30 | 2 | 100 | 3 300 € |
| M12 | 30 | 3 | 200 | 6 600 € |

**Conditions** :
- Taux de conversion > 35 %.
- Churn < 2 %.
- Parrainage actif, presse locale, effet réseau visible.

**Action déclenchée** : recrutement commercial terrain à M3, levée de fonds à M9.

# Décisions conditionnelles par scénario

| Signal | Action |
|---|---|
| MRR < 300 € à M3 | Revoir zone + segment + script |
| MRR > 1 000 € à M3 | Accélérer démarchage, recruter commercial |
| Churn > 8 % un mois | Enquête urgente auprès des churners |
| Conversion < 10 % sur 30 démos consécutives | Retravailler pitch + offre d'entrée |

# Décisions figées

- Le scénario central est la base de toutes les projections financières.
- Pas d'investissement > 500 € sans validation scénario B ou C en cours.

# Questions ouvertes

- À quel MRR déclencher une levée de fonds ?
- Quel est le scénario nécessaire pour recruter un employé (>= 5 000 € MRR ?) ?

# Dépendances

- `financial-assumptions.md`, `unit-economics.md`, `00_Pilotage/kill-criteria.md`
