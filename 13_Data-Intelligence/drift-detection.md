---
Title: Drift Detection
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: 08_Performance-System/thresholds.md
Used by: 08_Performance-System/alerting.md
---

# Objectif

Détecter les dérives de métriques clés avant qu'elles deviennent critiques.

# Contexte

Une dérive n'est pas un incident. C'est une tendance négative qui devient un incident si elle n'est pas détectée tôt.

# Dérives à surveiller

## Dérive produit

| Signal de dérive | Détection | Fréquence |
|---|---|---|
| Augmentation progressive du temps de crédit | Comparer p95 semaine N vs semaine N-1 | Hebdo |
| Baisse du taux d'ajout Wallet | Comparer ratio sur 7 jours glissants | Hebdo |
| Baisse du taux d'activation staff | Merchants avec 0 crédit en 7 jours | Hebdo |
| Augmentation des erreurs QR invalides | Comparer ratio sur 7 jours | Quotidien |

## Dérive business

| Signal de dérive | Détection | Fréquence |
|---|---|---|
| Ralentissement du taux de signature | Courbe démos vs signatures sur 14 jours | Hebdo |
| Augmentation du délai démo → signature | Moyenne glissante 7 jours | Hebdo |
| Baisse du taux de conversion essai → payant | Cohortes Stripe | Mensuel |
| Augmentation silencieuse du churn | Merchants sans activité > 14 jours | Quotidien |

## Dérive infrastructure

| Signal de dérive | Détection | Fréquence |
|---|---|---|
| Croissance de la taille de la BDD | Monitoring du volume PostgreSQL | Hebdo |
| Augmentation de la mémoire Redis | `redis-cli INFO memory` | Quotidien |
| Augmentation de la latence p95 (tendance) | Comparer semaine N vs N-1 | Hebdo |

# Procédure de détection hebdomadaire

Chaque vendredi, lors de la revue :
1. Comparer les métriques de la semaine vs semaine précédente.
2. Si tendance négative sur 2 semaines consécutives → ouvrir une entrée dans `risk-register.md`.
3. Si tendance négative sur 3 semaines → décision D2 obligatoire.

# Règle de détection précoce

> Une dérive sur 2 semaines = signal. Une dérive sur 3 semaines = problème. Une dérive sur 4 semaines = urgence.

# Décisions figées

- La détection de dérive est manuelle en MVP (requêtes SQL hebdo).
- Phase 2 : alertes automatiques sur tendances (PostHog ou Grafana).

# Dépendances

- `08_Performance-System/thresholds.md`, `analytics.md`, `feedback-loop.md`
