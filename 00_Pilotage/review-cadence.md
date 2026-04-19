---
Title: Review Cadence
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: operating-rhythm.md
Used by: —
---

# Objectif

Fixer la fréquence de revue de chaque document et de chaque couche du système.

# Contexte

Un système documentaire sans revue devient obsolète en quelques semaines. Ce calendrier empêche la dérive silencieuse.

# Cadences par document

## Quotidien
- `00_Pilotage/blockers.md` — ajouter/résoudre les blocages du jour.
- `08_Performance-System/system-health.md` — vérifier erreurs et disponibilité.

## Hebdomadaire (vendredi)
- `00_Pilotage/decision-log.md` — tracer les décisions de la semaine.
- `00_Pilotage/decision-to-action-map.md` — statut des actions ouvertes.
- `08_Performance-System/north-star.md` — KPI business (signatures, MRR).
- `08_Performance-System/metrics.md` — KPI produit (crédits, latence, erreurs).
- `06_GoToMarket/experiments.md` — retours terrain de la semaine.
- `06_GoToMarket/objections.md` — nouvelles objections collectées.

## Mensuel (1er vendredi)
- `00_Pilotage/risk-register.md` — nouveaux risques, mise à jour probabilités.
- `05_Business/unit-economics.md` — MRR réel vs hypothèses.
- `02_Marche-Cible/adoption-barriers.md` — retours terrain accumulés.
- `08_Performance-System/thresholds.md` — seuils à ajuster ?

## Trimestriel
- `00_Pilotage/roadmap.md` — mise à jour des jalons.
- `01_Fondations/` (tous les fichiers) — la vision tient-elle ?
- `05_Business/scenarios.md` — scénarios encore valides ?
- `00_Pilotage/kill-criteria.md` — les critères d'arrêt sont-ils atteints ?
- `04_Technique/technical-debt.md` — dette technique à solder ?

## Événementiel (à chaque incident)
- `14_Security-Resilience/incident-response.md`
- `00_Pilotage/decision-log.md` (ADR post-incident si décision structurante)

# Décisions figées

- Aucun document critique ne doit dépasser 30 jours sans review.
- La revue hebdo vendredi = moment de mise à jour systématique.

# Questions ouvertes

_Aucune._

# Dépendances

- `operating-rhythm.md`, `governance.md`
