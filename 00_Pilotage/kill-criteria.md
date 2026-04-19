---
Title: Kill Criteria
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: risk-register.md, 08_Performance-System/metrics.md
Used by: —
---

# Objectif

Définir les conditions explicites d'arrêt, de pivot majeur ou de dépriorisation du projet Primpay.

# Contexte

Un projet sans kill criteria continue par inertie même quand les signaux indiquent l'échec. Ce document impose la lucidité.

# Critères d'arrêt complet

Le projet est arrêté si **toutes** les conditions suivantes sont réunies à J+90 :

| Critère | Seuil d'arrêt |
|---|---|
| Signatures payantes à J+90 | < 3 merchants payants |
| Taux conversion essai → payant | < 15 % |
| NPS commerçants pilotes | < 10 |
| Feedback qualitatif | Pas de problème reconnu chez les prospects |

→ Arrêt = archivage du projet, déréférencement, communication aux pilotes.

# Critères de pivot majeur

Un pivot de positionnement est déclenché si à J+60 :

| Critère | Seuil de pivot |
|---|---|
| Temps de crédit réel mesuré en caisse | > 10 secondes systématiquement |
| Taux d'ajout Wallet par les clients finaux | < 5 % après 1 mois de run pilote |
| Refus systématique sur un segment | > 80 % de refus sur la cible cercle 1 |

→ Pivot = changement de segment cible, réévaluation de la proposition de valeur.

# Critères de dépriorisation d'une feature

Une feature en développement est suspendue si :
- Elle ne fait pas partie du MVP scope (`03_Produit/mvp-scope.md`).
- Elle n'a pas de lien direct avec le temps de crédit < 2 s.
- Elle n'est pas demandée explicitement par ≥ 2 merchants actifs.

# Jalons de décision obligatoires

| Jalon | Date | Décision possible |
|---|---|---|
| J+30 | ~Mi-mai 2026 | Continuer / ajuster scope MVP |
| J+60 | ~Mi-juin 2026 | Continuer / pivoter segment |
| J+90 | ~Mi-juillet 2026 | Continuer / arrêter / lever des fonds |

# Décisions figées

- Ces critères ne peuvent être modifiés que sur décision D1 tracée dans `decision-log.md`.
- Ils sont revus trimestriellement.

# Questions ouvertes

_Aucune._

# Dépendances

- `risk-register.md`, `08_Performance-System/metrics.md`, `00_Pilotage/roadmap.md`
