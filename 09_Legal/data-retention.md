---
Title: Data Retention
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 09_Legal
Depends on: rgpd.md
Used by: 04_Technique/data-model.md
---

# Objectif

Définir les durées de rétention par catégorie de données. Répondre aux obligations RGPD et légales.

# Durées de rétention

## Données clients finaux (end-users)

| Catégorie | Durée de conservation | Déclencheur | Action à l'expiration |
|---|---|---|---|
| Données d'identité (nom, téléphone) | 3 ans après dernière activité | Dernier `loyalty_event` | Anonymisation |
| Historique `loyalty_events` | 5 ans | Date de l'événement | Archivage anonymisé |
| Pass Wallet actif | Durée du compte + 90 jours | Clôture compte | Révocation pass |
| Email (si fourni) | Durée du compte | Clôture compte | Suppression |

## Données merchants

| Catégorie | Durée de conservation | Déclencheur | Action à l'expiration |
|---|---|---|---|
| Données du compte (nom, email) | 3 ans après résiliation | Résiliation abonnement | Archivage sécurisé |
| Données de facturation | 10 ans | Date de facture | Conservation légale (comptabilité) |
| Logs d'authentification | 1 an | Date du log | Suppression |
| Données d'usage (analytics agrégés) | 3 ans | Date | Conservation anonymisée |

## Données post-résiliation d'abonnement

| Phase | Durée | Accès merchant |
|---|---|---|
| Période active | Durée de l'abonnement | Complet |
| Post-résiliation — lecture seule | 90 jours | Lecture seule |
| Post-résiliation — archivage | 90 jours → 3 ans | Aucun (données internes) |
| Suppression définitive | Après 3 ans | N/A |

## Backups

| Type | Rétention | Lieu |
|---|---|---|
| Backup PostgreSQL quotidien | 30 jours | Object storage EU |
| Backup PostgreSQL mensuel | 1 an | Object storage EU |
| Logs serveur | 90 jours | VPS local |

# Procédures de suppression

## Suppression sur demande RGPD (end-user)

1. Réception demande par email.
2. Vérification identité (numéro de téléphone + prénom).
3. Soft-delete : `customers.deleted_at` = now().
4. Anonymisation : `phone` → null, `first_name` → "Anonyme".
5. `wallet_passes.status` → `revoked`.
6. Conservation des `loyalty_events` anonymisés (obligation légale 5 ans).
7. Réponse au demandeur sous 30 jours.

## Suppression automatique à expiration

À implémenter en Phase 2 : job cron mensuel qui purge les données expirées selon cette politique.

# Décisions figées

- `loyalty_events` conservés 5 ans (preuve des transactions).
- Données de facturation : 10 ans (obligation comptable).
- Hébergement EU uniquement.

# Questions ouvertes

- Faut-il distinguer la rétention selon le pays du merchant (hors France) ?
- Comment gérer la demande de suppression si le merchant est lui-même churné ?

# Dépendances

- `rgpd.md`, `04_Technique/data-model.md`, `10_Operations/access-management.md`
