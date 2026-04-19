---
Title: Maintenance
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: service-levels.md
Used by: —
---

# Objectif

Décrire les fenêtres de maintenance, les procédures et les communications associées.

# Types de maintenance

## Maintenance planifiée

**Définition** : opération nécessitant une interruption ou dégradation partielle du service, planifiée à l'avance.

**Fenêtre recommandée** : mardi ou jeudi, 2h–5h UTC (créneau de faible trafic pour la restauration).

**Préavis** : 48 h minimum aux merchants actifs (email).

**Durée maximale** : 30 minutes.

## Maintenance d'urgence

**Définition** : correctif critique nécessitant une intervention immédiate (faille de sécurité, bug bloquant P1).

**Préavis** : immédiat (email + page status).

**Durée maximale** : 2 h.

# Procédure de maintenance

```
1. Décider la fenêtre de maintenance
2. Créer un entry dans 00_Pilotage/decision-log.md
3. Envoyer email aux merchants actifs (48 h avant si planifiée)
4. Mettre à jour la page de statut (si elle existe)
5. Exécuter la maintenance
6. Vérifier healthcheck
7. Envoyer email de fin de maintenance
8. Mettre à jour les logs
```

# Template email de maintenance

```
Objet : [Primpay] Maintenance planifiée — [DATE] entre 2h et 5h

Bonjour [prénom],

Une maintenance est planifiée le [DATE] entre [HEURE] et [HEURE].

Pendant ce créneau, l'accès à votre interface Primpay sera temporairement indisponible.
Les données de fidélité de vos clients ne seront pas affectées.

Nous vous informerons dès la fin de la maintenance.

L'équipe Primpay
```

# Calendrier de maintenance récurrente

| Opération | Fréquence | Durée estimée | Impact |
|---|---|---|---|
| Mise à jour OS + packages | Mensuelle | 15 min | Redémarrage |
| Renouvellement certificat SSL | Automatique (certbot) | 0 | Aucun |
| Rotation des clés JWT | Semestrielle | 5 min | Déconnexion des sessions |
| Nettoyage logs anciens | Mensuelle | 5 min | Aucun |
| Vérification backups | Hebdomadaire | 10 min | Aucun |

# Décisions figées

- Fenêtre de maintenance : 2h–5h UTC uniquement.
- Préavis 48 h pour toute maintenance planifiée.

# Questions ouvertes

- Faut-il une page de statut publique dès le MVP (ex. status.[domaine]) ?

# Dépendances

- `service-levels.md`, `10_Operations/deployment.md`
