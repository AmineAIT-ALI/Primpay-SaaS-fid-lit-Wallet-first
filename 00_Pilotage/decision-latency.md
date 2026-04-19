---
Title: Decision Latency
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: decision-log.md
Used by: 08_Performance-System/system-health.md
---

# Objectif

Mesurer la vitesse du système décisionnel : temps entre signal, décision, action et vérification.

# Contexte

La latence décisionnelle est un indicateur de santé du projet. Si les signaux terrain mettent 2 semaines à devenir des actions, le projet dérive silencieusement.

# Métriques

| Métrique | Définition | Cible | Seuil rouge |
|---|---|---|---|
| Signal → Décision | Temps entre identification d'un signal et décision tracée | < 48 h (D1) | > 1 semaine |
| Décision → Action | Temps entre décision et première action concrète | < 24 h | > 3 jours |
| Action → Vérification | Temps entre action et mesure de l'effet | < 1 semaine | > 2 semaines |
| Signal → Rollback | Si action incorrecte : délai pour annuler | < 4 h (critique) | > 24 h |

# Log de latence

Compléter à chaque décision D1/D2 dans `decision-log.md` avec les timestamps :

```
Signal détecté le : [date]
Décision prise le : [date]
Action lancée le  : [date]
Vérification le   : [date]
Latence totale    : [nb jours]
```

# Signaux d'alerte sur la latence

- Plus de 3 décisions D1 en attente simultanément → réunion d'arbitrage forcée.
- Latence Signal→Action > 5 jours sur 2 semaines consécutives → revue du fonctionnement.

# Décisions figées

- La latence est mesurée et tracée — elle ne doit pas être implicite.

# Questions ouvertes

_Aucune pour MVP._

# Dépendances

- `decision-log.md`, `decision-sla.md`
