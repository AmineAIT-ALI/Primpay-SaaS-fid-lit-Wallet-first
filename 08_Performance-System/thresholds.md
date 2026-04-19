---
Title: Thresholds
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: metrics.md
Used by: triggers.md, alerting.md
---

# Objectif

Fixer les seuils d'alerte pour chaque métrique critique.

# Contexte

Un seuil sans valeur numérique n'existe pas. Ce document force la précision.

# Seuils — Métriques produit

| Métrique | Cible | Alerte jaune | Alerte rouge | Action |
|---|---|---|---|---|
| Temps de crédit en caisse (p95) | < 2 s | > 3 s | > 5 s | Voir `triggers.md` → T1 |
| Latence API `/loyalty/credit` (p95) | < 300 ms | > 500 ms | > 1 000 ms | Voir T2 |
| Taux d'erreurs 5xx | < 0,1 % | > 0,5 % | > 1 % | Voir T3 |
| Disponibilité API (uptime) | > 99 % | < 99 % | < 98 % | Voir T4 |
| Taux de QR invalides | < 1 % | > 2 % | > 5 % | Voir T5 |
| Taux d'ajout Wallet | > 30 % | 15–30 % | < 15 % | Voir T6 |
| Activation staff (crédits dans les 14 j) | > 80 % | 60–80 % | < 60 % | Voir T7 |

# Seuils — Métriques business

| Métrique | Cible | Alerte jaune | Alerte rouge | Action |
|---|---|---|---|---|
| Signatures / mois | ≥ 3 (M1–M3) | 1–2 | 0 | Voir T8 |
| Churn mensuel | < 3 % | 3–5 % | > 5 % | Voir T9 |
| Conversion essai → payant | > 40 % | 25–40 % | < 25 % | Voir T10 |
| NPS commerçants (J+60) | > 40 | 20–40 | < 20 | Voir T11 |
| MRR growth mensuel | > 0 | 0 | Négatif | Voir T12 |

# Seuils — Métriques opérationnelles

| Métrique | Cible | Alerte jaune | Alerte rouge | Action |
|---|---|---|---|---|
| Temps de résolution P1 (incident) | < 4 h ouvrées | 4–8 h | > 8 h | Escalade immédiate |
| Délai démo → signature | < 48 h | 48 h–1 semaine | > 1 semaine | Revoir suivi |
| Time-to-first-credit (merchant) | < 3 jours | 3–7 jours | > 7 jours | Contacter le merchant |
| Temps support / merchant / mois | < 15 min | 15–60 min | > 60 min | Identifier root cause |

# Décisions figées

- Tous les seuils rouges déclenchent automatiquement une entrée dans `00_Pilotage/decision-log.md`.
- Les seuils sont revus mensuellement.

# Questions ouvertes

- Faut-il des seuils différents en période de lancement (tolérance plus haute) vs régime de croisière ?

# Dépendances

- `metrics.md`, `triggers.md`, `alerting.md`
