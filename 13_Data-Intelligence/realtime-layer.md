---
Title: Realtime Layer
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: data-pipeline.md
Used by: —
---

# Objectif

Définir le niveau de réactivité requis pour chaque flux. Éviter le temps réel inutile.

# Principe

> Le temps réel n'est activé que pour les flux qui le justifient économiquement ou fonctionnellement. Chaque niveau de réactivité a un coût en complexité et en infrastructure.

# Niveaux de réactivité

| Niveau | Définition | Latence | Coût |
|---|---|---|---|
| **Batch** | Traitement par lots périodiques | Minutes à heures | Minimal |
| **Near-real-time** | Traitement rapide mais différé | < 30 secondes | Modéré |
| **Real-time** | Traitement immédiat | < 1 seconde | Élevé |

# Classification par flux

| Flux | Niveau requis | Justification |
|---|---|---|
| Mise à jour du pass Wallet après crédit | **Near-real-time** (< 5 s) | UX : le client voit son solde mis à jour |
| Affichage du solde dans la PWA staff | **Near-real-time** (< 1 s) | UX critique en caisse |
| Dashboard merchant (stats) | **Batch** (polling 30 s) | Non critique pour l'opération |
| Alertes seuils (latence, erreurs) | **Real-time** | Impact immédiat service |
| Analytics agrégés | **Batch** (quotidien) | Décisions non urgentes |
| Backup PostgreSQL | **Batch** (quotidien) | Non temps-réel par définition |
| Détection churn (inactivité) | **Batch** (quotidien) | Non urgent |
| Webhook Stripe | **Near-real-time** | Impact billing immédiat |

# Implémentation par flux

## Mise à jour pass Wallet (near-real-time)

MVP : appel synchrone à l'API Apple/Google après chaque `loyalty_event`.
Phase 1.5 : queue async BullMQ si API lente (timeout 3 s → queue).

## Dashboard merchant (polling)

MVP : polling côté PWA toutes les 30 secondes (requête SQL légère).
Phase 2 : WebSocket ou Server-Sent Events si > 500 merchants actifs.

## Alertes monitoring (real-time)

UptimeRobot + Sentry : push natif vers email/SMS sans action de notre part.

# Décisions figées

- Pas de WebSocket en MVP.
- Pas de stream de données (Kafka, Kinesis) avant Phase 3.
- Le temps réel pour le pass Wallet est obtenu via appel synchrone (simple et suffisant).

# Questions ouvertes

- À quel volume de marchants le polling 30 s devient-il un problème de charge ?

# Dépendances

- `data-pipeline.md`, `04_Technique/architecture.md`
