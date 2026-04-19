---
Title: System Health
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: metrics.md, thresholds.md
Used by: 00_Pilotage/
---

# Objectif

Vue synthétique de la santé du système à un instant T. Mise à jour quotidienne.

# Format de mise à jour

Ce document est mis à jour manuellement chaque jour (ou dès qu'un seuil est franchi).

---

# Dernière mise à jour : 2026-04-19

## Statut global : 🟡 Pré-lancement (MVP en développement)

| Composant | Statut | Notes |
|---|---|---|
| API NestJS | ⬜ Non déployé | Dev en cours |
| Base de données PostgreSQL | ⬜ Non déployé | Migrations à écrire |
| Redis | ⬜ Non déployé | — |
| Apple Wallet API | ⬜ Non configuré | Compte Developer à créer |
| Google Wallet API | ⬜ Non configuré | Compte à créer |
| Stripe | ⬜ Non configuré | KYC à faire |
| Monitoring (Sentry) | ⬜ Non configuré | À faire avant staging |
| Uptime monitoring | ⬜ Non configuré | À faire avant staging |

## Métriques produit (pré-lancement — N/A)

| Métrique | Valeur | Cible | Statut |
|---|---|---|---|
| Temps de crédit (p95) | N/A | < 2 s | ⬜ |
| Latence API (p95) | N/A | < 300 ms | ⬜ |
| Taux 5xx | N/A | < 0,1 % | ⬜ |
| Uptime | N/A | > 99 % | ⬜ |

## Métriques business

| Métrique | Valeur | Cible | Statut |
|---|---|---|---|
| Merchants actifs | 0 | 3 (J+30) | ⬜ |
| MRR | 0 € | 99 € (J+30) | ⬜ |
| Trials actifs | 0 | — | ⬜ |

## Décisions ouvertes (bloquantes)

- [ ] Nom du produit
- [ ] Hébergeur
- [ ] ORM
- [ ] Zone géographique
- [ ] Sous-segment pilote

---

# Template de mise à jour quotidienne

```
# Mise à jour : [DATE]

## Statut global : 🟢 / 🟡 / 🔴

## Incidents ouverts
- [Aucun] / [Description + lien ticket]

## Métriques hors seuil
- [Aucune] / [Métrique : valeur actuelle vs seuil]

## Actions en cours
- [Description]
```

# Dépendances

- `metrics.md`, `thresholds.md`, `alerting.md`
