---
Title: Dashboards
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: metrics.md
Used by: —
---

# Objectif

Définir les dashboards nécessaires, leurs métriques et leurs audiences.

# Dashboard 1 — Merchant Dashboard (PWA)

**Audience** : gérant du commerce.

**Métriques affichées** (4 KPI MVP) :
| Métrique | Calcul | Période |
|---|---|---|
| Clients actifs | Customers avec ≥ 1 crédit | 7 jours / 30 jours |
| Passages du jour | Nombre de `loyalty_events` type `credit` | Aujourd'hui |
| Récompenses émises | Rewards créées | 30 jours |
| Récompenses consommées | Rewards `redeemed` | 30 jours |

**Accès** : URL de la PWA, authentification owner/manager.

---

# Dashboard 2 — Ops Interne (Amine)

**Audience** : Amine, usage quotidien.

**Métriques** :
- Nombre de merchants actifs / en trial.
- Nouveaux merchants signés ce mois.
- MRR total (calculé depuis Stripe API).
- Churn du mois.
- Erreurs Sentry des dernières 24 h.
- Uptime des dernières 24 h.

**Format** : Simple page HTML/SQL ou Google Sheet avec pull Stripe + BDD.

---

# Dashboard 3 — System Health (Ops)

**Audience** : Amine, usage en cas d'alerte.

**Métriques** :
- Latence p95 API (Better Stack).
- Taux d'erreurs 5xx (Sentry).
- Uptime (UptimeRobot).
- Utilisation CPU / RAM VPS.
- Connections actives PostgreSQL.
- Mémoire Redis utilisée.

**Format** : Better Stack + dashboard VPS provider.

---

# Dashboard 4 — Business Weekly (Revue hebdo)

**Audience** : Amine, usage vendredi.

| Métrique | Fréquence |
|---|---|
| Démos réalisées cette semaine | Hebdo |
| Signatures cette semaine | Hebdo |
| Trials actifs | Hebdo |
| Conversion trials en cours | Hebdo |
| MRR delta vs semaine précédente | Hebdo |

**Format** : Google Sheet mis à jour manuellement chaque vendredi.

# Décisions figées

- Dashboard merchant = MVP, 4 KPI uniquement.
- Dashboard interne = Google Sheet + Stripe API Phase 1.
- Outil analytics avancé (PostHog, Metabase) : Phase 2.

# Questions ouvertes

- Faut-il un dashboard temps réel pour les merchants (WebSocket) ou polling suffit (toutes les 30 s) ?
- Quand intégrer Metabase ou Grafana pour le dashboard interne ?

# Dépendances

- `metrics.md`, `north-star.md`, `13_Data-Intelligence/analytics.md`
