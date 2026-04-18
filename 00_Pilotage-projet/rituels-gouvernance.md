---
name: Rituels & gouvernance
description: Cadence de travail, points de revue, prise de décision
type: project
status: 🟠 Brouillon
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Rituels & gouvernance

## 1. Objectif
Décider une fois comment on travaille, pour ne plus y penser ensuite.

## 2. Rituels proposés (à confirmer)

### Quotidien (5 min)
- Revue des 3 priorités du jour
- Blocages éventuels → documenter dans `dependances-blocages.md`

### Hebdomadaire (30 min, vendredi)
- Revue des KPI produit et business
- Revue des risques (`registre-risques.md`)
- Décisions prises cette semaine → entrée dans `journal-decisions.md`
- Priorités semaine suivante

### Mensuel (60 min)
- Relecture `roadmap-30-60-90.md`
- Ajustement de la cible / offre si nécessaire
- Bilan tests terrain

## 3. Prise de décision

- **Décision produit** : tranchée en revue hebdo, consignée en ADR si structurante.
- **Décision technique** : tranchée par la personne qui code, consignée en ADR si elle engage la stack ou l'archi.
- **Décision business** : toujours consignée (offre, prix, positionnement).

## 4. Revue documentaire

- Tout document en statut 🟢 Validé est relu au moins une fois par mois pour vérifier qu'il est encore juste.
- Documents obsolètes → passés en 🔴 avec mention "à retravailler" et date butoir.
