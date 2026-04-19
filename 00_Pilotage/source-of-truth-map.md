---
Title: Source of Truth Map
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: system-map.md
Used by: tous les documents
---

# Objectif

Lister explicitement, pour chaque document actif, s'il est source de vérité ou document secondaire.

# Contexte

Complémentaire à `system-map.md`. Permet à chaque contributeur de savoir immédiatement si le document qu'il lit est la référence ou une synthèse dérivée.

# Table complète

| Fichier | Source de vérité | Document secondaire / dérivé de |
|---|---|---|
| `00_Pilotage/roadmap.md` | ✅ | — |
| `00_Pilotage/decision-log.md` | ✅ | — |
| `00_Pilotage/risk-register.md` | ✅ | — |
| `00_Pilotage/blockers.md` | ✅ | — |
| `00_Pilotage/ownership-map.md` | ✅ | — |
| `01_Fondations/vision.md` | ✅ | — |
| `01_Fondations/problem.md` | ✅ | — |
| `01_Fondations/opportunity.md` | ✅ | `problem.md` |
| `01_Fondations/differentiation.md` | ✅ | — |
| `01_Fondations/principles.md` | ✅ | `vision.md` |
| `01_Fondations/constraints.md` | ✅ | — |
| `01_Fondations/timing.md` | ✅ | — |
| `02_Marche-Cible/personas.md` | ✅ | — |
| `02_Marche-Cible/segments.md` | ✅ | — |
| `02_Marche-Cible/pains-gains.md` | ✅ | `personas.md` |
| `02_Marche-Cible/jobs-to-be-done.md` | ✅ | — |
| `02_Marche-Cible/competitors.md` | ✅ | — |
| `02_Marche-Cible/market-size.md` | ✅ | — |
| `02_Marche-Cible/adoption-barriers.md` | ✅ | — |
| `03_Produit/mvp-scope.md` | ✅ | — |
| `03_Produit/value-proposition.md` | ✅ | `02_Marche-Cible/pains-gains.md` |
| `03_Produit/features.md` | ✅ | `mvp-scope.md` |
| `03_Produit/business-rules.md` | ✅ | — |
| `03_Produit/user-journey.md` | ✅ | — |
| `03_Produit/exclusions.md` | ✅ | `mvp-scope.md` |
| `04_Technique/architecture.md` | ✅ | — |
| `04_Technique/stack.md` | ✅ | `architecture.md` |
| `04_Technique/data-model.md` | ✅ | — |
| `04_Technique/api-design.md` | ✅ | — |
| `04_Technique/adr/` | ✅ | `architecture.md` |
| `05_Business/pricing.md` | ✅ | — |
| `05_Business/revenue-model.md` | ✅ | — |
| `05_Business/unit-economics.md` | ✅ | `pricing.md` |
| `05_Business/scenarios.md` | ✅ | `unit-economics.md` |
| `06_GoToMarket/acquisition-strategy.md` | ✅ | — |
| `06_GoToMarket/channels.md` | ✅ | `acquisition-strategy.md` |
| `06_GoToMarket/sales-motion.md` | ✅ | — |
| `06_GoToMarket/funnel.md` | ✅ | `channels.md` |
| `06_GoToMarket/objections.md` | ✅ | `sales-motion.md` |
| `08_Performance-System/north-star.md` | ✅ | `01_Fondations/vision.md` |
| `08_Performance-System/metrics.md` | ✅ | — |
| `08_Performance-System/thresholds.md` | ✅ | `metrics.md` |
| `08_Performance-System/triggers.md` | ✅ | `thresholds.md` |
| `09_Legal/rgpd.md` | ✅ | — |
| `09_Legal/data-retention.md` | ✅ | `rgpd.md` |
| `12_Execution-System/playbooks/sales.md` | ✅ | `06_GoToMarket/sales-motion.md` |
| `12_Execution-System/sop/onboarding.md` | ✅ | — |
| `14_Security-Resilience/threat-model.md` | ✅ | — |
| `14_Security-Resilience/incident-response.md` | ✅ | — |
| `13_Data-Intelligence/tracking-plan.md` | ✅ | — |
| `13_Data-Intelligence/events.md` | ✅ | `tracking-plan.md` |

# Décisions figées

- Tout document non listé ici est secondaire par défaut.
- Ajouter chaque nouveau document à cette table lors de sa création.

# Questions ouvertes

_Aucune._

# Dépendances

- `system-map.md`
