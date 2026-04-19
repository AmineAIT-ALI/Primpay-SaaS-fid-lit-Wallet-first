---
Title: System Map
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: —
Used by: tous les documents
---

# Objectif

Définir où doit vivre chaque type d'information dans le système. Empêcher la duplication et les contradictions.

# Contexte

Le dépôt contient 15 dossiers actifs + archives. Sans carte explicite, l'information se duplique et se contredit. Ce document est la loi : si l'information existe quelque part, elle ne doit exister qu'ici.

# Carte par domaine

| Type d'information | Source de vérité | Interdit ailleurs |
|---|---|---|
| Vision long terme | `01_Fondations/vision.md` | Partout ailleurs (citation autorisée avec lien) |
| Problème marché | `01_Fondations/problem.md` | — |
| ICP / Personas | `02_Marche-Cible/personas.md` | — |
| Périmètre MVP | `03_Produit/mvp-scope.md` | — |
| Règles métier | `03_Produit/business-rules.md` | — |
| Architecture technique | `04_Technique/architecture.md` | — |
| Schéma BDD | `04_Technique/data-model.md` | — |
| Décisions d'archi | `04_Technique/adr/` | — |
| Tarification | `05_Business/pricing.md` | — |
| Unit economics | `05_Business/unit-economics.md` | — |
| Stratégie acquisition | `06_GoToMarket/acquisition-strategy.md` | — |
| Script de démo | `12_Execution-System/playbooks/sales.md` | — |
| Métriques produit | `08_Performance-System/metrics.md` | — |
| North star / KPI biz | `08_Performance-System/north-star.md` | — |
| Seuils d'alerte | `08_Performance-System/thresholds.md` | — |
| Roadmap d'exécution | `00_Pilotage/roadmap.md` | — |
| Registre des risques | `00_Pilotage/risk-register.md` | — |
| Décisions prises | `00_Pilotage/decision-log.md` | — |
| Conformité RGPD | `09_Legal/rgpd.md` | — |
| Rétention données | `09_Legal/data-retention.md` | — |
| Procédure onboarding | `12_Execution-System/sop/onboarding.md` | — |
| Réponse incident | `14_Security-Resilience/incident-response.md` | — |
| Tracking plan | `13_Data-Intelligence/tracking-plan.md` | — |

# Décisions figées

- 1 domaine = 1 source de vérité. Toujours.
- Un résumé dans un autre document doit mentionner explicitement la source.
- Aucune liste de pricing ne doit exister hors de `05_Business/pricing.md`.

# Questions ouvertes

- Faut-il un outil (script, CI check) pour détecter les duplications silencieuses ?

# Dépendances

- `source-of-truth-map.md` (liste opérationnelle par fichier)
