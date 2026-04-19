---
Title: Triggers
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 08_Performance-System
Depends on: thresholds.md
Used by: 00_Pilotage/decision-to-action-map.md
---

# Objectif

Définir les actions déclenchées automatiquement ou manuellement lorsqu'un seuil est franchi.

# Triggers produit

## T1 — Temps de crédit > 5 s (seuil rouge)

**Déclencheur** : p95 temps de crédit en caisse > 5 secondes sur une fenêtre de 30 minutes.

**Actions** :
1. Alerte Sentry + notification email immédiate.
2. Investiguer : latence API, charge Redis, logs NestJS.
3. Si origine identifiée : hotfix dans les 4 h.
4. Décision D1 si récurrent.

---

## T2 — Latence API > 1 000 ms (seuil rouge)

**Déclencheur** : latence p95 `/loyalty/credit` > 1 000 ms sur 10 min.

**Actions** :
1. Vérifier charge CPU / RAM VPS.
2. Vérifier index PostgreSQL (`loyalty_events`, `loyalty_accounts`).
3. Vérifier connexion Redis.
4. Si > 2 h : appliquer `12_Execution-System/runbooks/scaling.md`.

---

## T3 — Taux 5xx > 1 % (seuil rouge)

**Déclencheur** : erreurs 5xx > 1 % sur 10 minutes.

**Actions** :
1. Alerte Sentry.
2. Consulter logs Nginx + NestJS.
3. Si rollback nécessaire : `12_Execution-System/runbooks/rollback.md`.

---

## T4 — Disponibilité < 98 %

**Déclencheur** : UptimeRobot / Better Stack détecte downtime > 5 min.

**Actions** :
1. SMS + email immédiat.
2. Appliquer `12_Execution-System/runbooks/incident.md`.
3. Communication merchants actifs si > 30 min.

# Triggers business

## T8 — Signatures = 0 sur le mois (seuil rouge)

**Déclencheur** : fin du mois, 0 nouvelles signatures.

**Actions** :
1. Revue urgente du script de démo.
2. Analyse des objections terrain de la semaine.
3. Décision D2 : changer de zone, de segment, ou de pitch.

---

## T9 — Churn mensuel > 5 % (seuil rouge)

**Déclencheur** : plus de 5 % des merchants actifs résilient dans le mois.

**Actions** :
1. Contacter chaque churner dans les 48 h pour comprendre la raison.
2. Analyser si problème produit, support, prix, ou adoption staff.
3. Décision D1 : ajustement pricing ou fonctionnalité urgente.

---

## T10 — Conversion essai → payant < 25 % (seuil rouge)

**Déclencheur** : taux de conversion sur les 30 derniers jours < 25 %.

**Actions** :
1. Analyser les trials non convertis : raison d'abandon.
2. Tester un email de réactivation J-3 avant fin trial.
3. Vérifier si problème d'activation (time-to-first-credit > 3 jours).

---

## T12 — MRR négatif (churn > nouvelles signatures)

**Déclencheur** : MRR du mois < MRR du mois précédent.

**Actions** :
1. Alerte critique — réunion d'arbitrage dans les 48 h.
2. Analyser toutes les résiliations du mois.
3. Décision D1 dans `decision-log.md`.
4. Vérifier `00_Pilotage/kill-criteria.md` — est-on proche des critères d'arrêt ?

# Décisions figées

- Tout trigger T (rouge) = entrée dans `00_Pilotage/decision-log.md` le même jour.
- Les triggers sont revus mensuellement avec les seuils.

# Questions ouvertes

_Aucune pour MVP._

# Dépendances

- `thresholds.md`, `alerting.md`, `00_Pilotage/decision-to-action-map.md`
