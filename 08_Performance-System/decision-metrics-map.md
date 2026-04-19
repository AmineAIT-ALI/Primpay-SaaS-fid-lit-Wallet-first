---
Title: Decision–Metrics Map
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: metrics.md, north-star.md
Used by: 00_Pilotage/decision-to-action-map.md
---

# Objectif

Associer chaque métrique critique à la décision qu'elle doit déclencher quand elle sort des seuils.

# Carte métriques → décisions

| Métrique | Seuil rouge | Décision déclenchée | Document |
|---|---|---|---|
| Temps de crédit > 5 s | > 5 s en p95 | Arrêt feature, focus perf | `triggers.md` T1 |
| Latence API > 1 s | > 1 000 ms | Scaling ou optimisation BDD | `triggers.md` T2 |
| Taux 5xx > 1 % | > 1 % | Rollback ou hotfix | `triggers.md` T3 |
| Signatures = 0 ce mois | 0 | Pivot script / zone / pitch | `triggers.md` T8 |
| Churn > 5 % | > 5 % / mois | Enquête churners + ajustement produit | `triggers.md` T9 |
| Conversion < 25 % | < 25 % essai → payant | Test email réactivation + analyse | `triggers.md` T10 |
| MRR négatif | MRR mois N < MRR mois N-1 | Arbitrage stratégique D1 | `triggers.md` T12 |
| NPS < 20 | < 20 à J+60 | Enquête qualitative urgente | — |
| Taux d'ajout Wallet < 15 % | < 15 % | Revoir UX page d'ajout | — |
| Activation staff < 60 % | < 60 % à J+14 | Revoir onboarding + signalétique | — |

# Métriques sans décision définie (à compléter)

| Métrique | Observation | À décider |
|---|---|---|
| Crédits / customer actif / mois | Mesure de l'engagement | Seuil à définir après M2 |
| % crédits via "derniers clients" | Adoption mode rush | Cible 40–60 % |
| Taille moyenne du programme | — | À analyser |

# Décisions figées

- Chaque métrique critique doit avoir une décision associée. Pas de métrique orpheline.

# Questions ouvertes

- Faut-il créer des alertes automatiques dans l'outil de monitoring pour certaines de ces métriques business ?

# Dépendances

- `metrics.md`, `thresholds.md`, `triggers.md`, `00_Pilotage/decision-to-action-map.md`
