---
Title: Metrics
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: north-star.md
Used by: dashboards.md, thresholds.md
---

# KPI produit

## 1. Objectif du document
Définir les indicateurs de santé produit. Ce qu'on mesure, à quelle fréquence, et ce qui est "bon".

## 2. KPI nord (north-star metric)

### Temps moyen réel en caisse (crédit)
- Cible : < 2 secondes.
- Seuil rouge : > 4 secondes.
- Mesure : côté serveur, timestamp entre ouverture écran crédit et `loyalty_event` créé.

**Pourquoi c'est LE KPI produit** : si on rate ça, le staff abandonne et tout s'écroule.

## 3. KPI d'adoption

### Taux d'ajout Wallet
- Définition : (nb customers créés) / (nb scans QR public).
- Cible : > 30 %.
- Seuil rouge : < 10 %.

### Taux d'activation staff
- Définition : % de staff_users qui ont fait au moins 5 crédits.
- Cible : > 80 % à J+14.
- Seuil rouge : < 50 %.

### Time-to-first-credit commerçant
- Définition : temps entre signature et premier `loyalty_event` en production.
- Cible : < 3 jours.
- Seuil rouge : > 7 jours.

## 4. KPI d'usage

### Crédits par customer actif
- Cible MVP : > 2 / mois par customer.

### Récompenses débloquées
- Définition : rewards créées (statut `available`).
- Cible : 10 % des customers déclenchent une reward à J+60.

### Récompenses consommées
- Définition : rewards `redeemed` / rewards `available`.
- Cible : > 60 % consommées dans les 30 j suivant création.

### Derniers clients — taux d'usage
- Définition : % de crédits passant par "derniers clients" (vs scan / recherche).
- Cible : 40–60 % (indicateur que le mode rush fonctionne).

## 5. KPI de qualité

### Taux d'erreurs 5xx
- Cible : < 0,1 %.

### Latence p95 `/loyalty/credit`
- Cible : < 300 ms.

### Disponibilité API
- Cible : > 99 %.

### Taux de QR invalides
- Cible : < 1 %.

## 6. KPI de rétention produit

### Customers actifs J30 / J60 / J90
- Définition : % de customers ayant au moins 1 crédit dans la période.
- Cibles : J30 ≥ 50 %, J60 ≥ 35 %, J90 ≥ 25 %.

### Merchants actifs (crédits hebdo)
- Définition : merchants avec ≥ 5 crédits / semaine.
- Cible : > 80 % des merchants payants.

## 7. Fréquence de suivi

| Cadence | KPI |
|---|---|
| Temps réel (dashboard) | Latence, erreurs, disponibilité |
| Quotidien | Crédits du jour, nouveaux customers |
| Hebdo | Time-to-first-credit, adoption staff |
| Mensuel | Rétention J30/60/90, consommation rewards |

## 8. Alerting

- Latence p95 > 500 ms pendant 5 min → alerte.
- Erreurs 5xx > 1 % sur 10 min → alerte.
- Disponibilité < 99 % sur 24 h → alerte + incident.

## 9. Collecte

### MVP
- Dashboard interne simple (une page par merchant).
- Export SQL manuel.
- Monitoring via Sentry + Better Stack.

### Phase 2
- Outil analytics produit (PostHog ou Mixpanel).
- Events trackés côté front.

## 10. Décisions figées
- North-star = temps réel de crédit en caisse.
- Mesure côté serveur (pas auto-déclaratif).

## 11. Questions ouvertes
- Faut-il mesurer aussi le "temps écran" côté PWA (temps entre ouverture et crédit) ?
- Comment pondérer un staff qui utilise toujours "derniers clients" (vitesse) vs scan (conformité) ?

## 12. Next steps
- Instrumenter le temps réel de crédit côté serveur.
- Dashboard merchant simple avec les 4 KPI principaux.
- Revue hebdo.
