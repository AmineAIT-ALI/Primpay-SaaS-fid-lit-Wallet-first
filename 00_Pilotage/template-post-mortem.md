---
name: Template Post-mortem
description: Modèle standard pour l'analyse d'incident
type: ops
status: 🟢 Validé
version: 1.0
owner: Vito
updated: 2026-04-18
---

# Post-mortem : [Titre de l'incident]

**Date de l'incident** : YYYY-MM-DD
**Auteurs** : [Noms des contributeurs]
**Statut** : Brouillon / Final

## 1. Résumé (TL;DR)
*Un paragraphe qui résume l'incident, son impact et la résolution. Lisible par un non-technique.*

| Métrique | Valeur |
|---|---|
| **Impact** | [Ex: Indisponibilité du service de crédit de points] |
| **Périmètre** | [Ex: 15 commerçants, 100% des clients] |
| **Début de l'impact** | [YYYY-MM-DD HH:MM UTC] |
| **Détection** | [YYYY-MM-DD HH:MM UTC] |
| **Résolution** | [YYYY-MM-DD HH:MM UTC] |
| **Durée totale** | [X minutes/heures] |

## 2. Cause racine (Root Cause)
*Description technique précise de la cause fondamentale. Aller au-delà des symptômes.*

## 3. Timeline détaillée
*Liste chronologique des événements clés (heures en UTC).*
- `HH:MM` : Détection de l'alerte [Nom de l'alerte].
- `HH:MM` : [Nom de la personne] démarre l'investigation.
- `HH:MM` : Communication initiale envoyée aux clients.
- `HH:MM` : Action de mitigation [Ex: Rollback du commit XXX].
- `HH:MM` : Service restauré.
- `HH:MM` : Incident déclaré résolu.

## 4. Ce qui a bien fonctionné
*Points positifs à conserver.*
- ...

## 5. Ce qui pourrait être amélioré
*Points faibles ou axes d'amélioration.*
- ...

## 6. Actions correctives
*Liste des actions concrètes pour éviter la récurrence et améliorer la réponse. Chaque action doit avoir un propriétaire et une deadline.*

| Action | Type | Propriétaire | Deadline |
|---|---|---|---|
| [Ex: Ajouter un test d'intégration pour le cas X] | Prévention | Vito | J+7 |
| [Ex: Mettre en place une alerte sur la métrique Y] | Détection | Vito | J+3 |
| [Ex: Documenter la procédure de rollback Z] | Réponse | Vito | J+5 |