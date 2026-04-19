---
Title: Financial Assumptions
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 05_Business
Depends on: unit-economics.md
Used by: scenarios.md
---

# Objectif

Lister toutes les hypothèses financières clés avec leur niveau de confiance.

# Contexte

Ces hypothèses sont des paris raisonnés. Elles doivent être testées et mises à jour après chaque mois réel.

# Hypothèses de revenus

| Hypothèse | Valeur | Confiance | Source |
|---|---|---|---|
| Plan dominant : Solo | 80 % des signés | Moyenne | Cible ICP = petits commerces |
| Plan Multi-sites : 20 % des signés | 20 % | Faible | Hypothèse — à mesurer |
| ARPU moyen | 33 € / mois | Moyenne | Mix 80/20 Solo/Multi |
| Setup fee payée dans 40 % des cas | 40 % | Faible | Hypothèse terrain |
| Durée de vie client (LTV) | 24 mois | Faible | Hypothèse — aucune donnée encore |
| Taux de conversion essai → payant | 40 % | Faible | Hypothèse optimiste à valider J+30 |

# Hypothèses de coûts

| Hypothèse | Valeur | Confiance | Source |
|---|---|---|---|
| CAC terrain (hors temps fondateur) | ~50–100 € | Moyenne | Déplacements + supports |
| CAC total (temps fondateur inclus) | ~275 € | Faible | Valorisation temps à 40 €/h |
| Coût variable par merchant / mois | ~2,20 € | Haute | Calculé sur Stripe fees + infra |
| Coûts fixes mensuels Phase 1 | ~60 € | Haute | Calculé sur VPS + outils |
| Coût setup par signature | ~70–75 € | Haute | Calculé |

# Hypothèses de rétention

| Hypothèse | Valeur | Confiance | Notes |
|---|---|---|---|
| Churn mensuel Phase 1 | 3–5 % | Faible | Pas de référence terrain |
| Churn mensuel Phase 2 | 2 % | Très faible | Hypothèse optimiste |
| Rétention annuelle | 70–75 % | Faible | Dépend de la qualité produit |

# Hypothèses de croissance

| Hypothèse | Valeur | Confiance | Notes |
|---|---|---|---|
| Taux de conversion démo → signature | 25 % | Faible | 3 démos pour 1 signature |
| Volume démos / jour | 5 | Moyenne | Cible terrain |
| Parrainage : 1 merchant parrainé / 5 actifs | 20 % | Très faible | Hypothèse Phase 2 |
| Croissance organique post-densité | +10 % / mois | Très faible | Hypothèse réseau |

# Signaux de validation

| Hypothèse | Signal de validation | Jalon |
|---|---|---|
| ARPU ~33 € | MRR / nombre de merchants = 33 € | J+60 |
| Churn < 5 % | Nombre de résiliations / total actifs | J+60 |
| Conversion essai → payant 40 % | Stripe : trials convertis | J+45 |
| CAC terrain < 300 € | Coûts directs / signatures | J+90 |

# Décisions figées

- Ces hypothèses sont des paris. Aucune décision irréversible ne doit reposer uniquement dessus.
- Mise à jour obligatoire tous les mois avec données réelles.

# Questions ouvertes

- Comment mesurer rigoureusement le churn (annulation Stripe vs inactivité produit) ?
- Faut-il valoriser le temps fondateur dans le CAC dès J+30 ?

# Dépendances

- `unit-economics.md`, `scenarios.md`, `08_Performance-System/north-star.md`
