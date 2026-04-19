---
Title: Execution Metrics
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System
Depends on: —
Used by: 08_Performance-System/
---

# Objectif

Mesurer la performance de l'exécution : vélocité, taux de complétion, délais.

# Métriques d'exécution terrain

| Métrique | Cible | Mesure | Fréquence |
|---|---|---|---|
| Démos réalisées / jour | 5 | Manuel (log terrain) | Quotidien |
| Taux de conversion démo → essai | > 25 % | Démos / essais créés | Hebdo |
| Taux de conversion essai → payant | > 40 % | Stripe | Mensuel |
| Délai démo → signature | < 48 h | Log terrain | Hebdo |
| Délai signature → premier crédit | < 3 jours | `loyalty_events` | Mensuel |

# Métriques d'exécution produit

| Métrique | Cible | Mesure | Fréquence |
|---|---|---|---|
| Temps de déploiement staging | < 10 min | GitHub Actions | Par déploiement |
| Temps de déploiement prod | < 15 min | Manuel | Par déploiement |
| Temps de résolution P1 | < 4 h | Log incident | Par incident |
| Coverage tests (intégration) | > 80 % endpoints critiques | Jest | Par PR |
| Temps migration BDD | < 5 min | Prisma | Par migration |

# Métriques d'exécution documentaire

| Métrique | Cible | Mesure |
|---|---|---|
| Documents à jour (reviewed < 30j) | > 90 % actifs | Git `Last reviewed` |
| Décisions D1 tracées | 100 % | `decision-log.md` |
| Revues hebdo tenues | 100 % | `operating-rhythm.md` |

# Log d'exécution terrain (hebdo)

```
Semaine du [DATE]
Démos : [N]
Essais créés : [N]
Signatures : [N]
Objections nouvelles : [liste]
Points de blocage : [liste]
```

# Dépendances

- `08_Performance-System/metrics.md`, `00_Pilotage/decision-latency.md`
