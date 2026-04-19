---
Title: Feedback Loop
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: analytics.md
Used by: 00_Pilotage/
---

# Objectif

Décrire comment les données et les retours terrain remontent et alimentent les décisions produit et GTM.

# Boucle terrain → produit

```
Observation terrain (rush, démo, support)
         │
         ▼
Retour documenté dans :
  - 06_GoToMarket/objections.md (si objection commerciale)
  - 06_GoToMarket/experiments.md (si expérimentation)
  - 00_Pilotage/risk-register.md (si risque)
  - 03_Produit/edge-cases.md (si cas limite produit)
         │
         ▼
Revue hebdo vendredi
  → Décision D2/D3 si action requise
  → Documenter dans decision-log.md
         │
         ▼
Sprint de correction ou d'amélioration
```

# Boucle données → décisions

```
Requêtes analytics hebdomadaires (analytics.md)
         │
         ▼
Comparaison aux seuils (thresholds.md)
         │
         ▼
Si seuil rouge → trigger activé (triggers.md)
         │
         ▼
Décision dans decision-log.md
         │
         ▼
Action dans decision-to-action-map.md
```

# Boucle NPS → produit

```
NPS J+30 collecté (email)
         │
         ├─► Promoteurs (9–10) → demander témoignage + parrainage
         ├─► Passifs (7–8) → call pour identifier friction
         └─► Détracteurs (0–6) → call urgent → si problème commun → sprint correctif
```

# Fréquence de la boucle

| Boucle | Fréquence | Output |
|---|---|---|
| Terrain → produit | En continu + revue hebdo | Mise à jour objections.md, edge-cases.md |
| Données → décisions | Hebdo (analytics) + temps réel (alertes) | Décisions log, triggers |
| NPS → produit | J+30, J+60, trimestriel | Priorisation backlog |
| Cohortes → pricing | Mensuel | Mise à jour financial-assumptions.md |

# Décisions figées

- La boucle terrain est aussi importante que la boucle données MVP.
- Les retours qualitatifs (entretiens, observations) > les métriques aggregées au stade actuel.

# Dépendances

- `analytics.md`, `drift-detection.md`, `00_Pilotage/operating-rhythm.md`
