---
Title: Privacy Policy
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 09_Legal
Depends on: rgpd.md
Used by: —
---

# Objectif

Documenter la politique de confidentialité applicable aux utilisateurs de Primpay.

# Statut

⚠ Draft — à valider par un DPO avant publication commerciale.

# Données collectées

## Données des clients finaux (end-users)

| Donnée | Obligatoire | Base légale | Finalité |
|---|---|---|---|
| Numéro de téléphone | Oui | Intérêt légitime / Contrat | Identification unique, recherche staff |
| Prénom | Oui | Contrat | Identification dans l'interface |
| Email | Non | Consentement | Notifications optionnelles |
| Historique des passages | Oui | Contrat | Calcul du programme de fidélité |
| Solde de points/tampons | Oui | Contrat | Affichage pass Wallet |

## Données des merchants (staff)

| Donnée | Obligatoire | Base légale | Finalité |
|---|---|---|---|
| Nom / prénom | Oui | Contrat | Compte utilisateur |
| Email professionnel | Oui | Contrat | Authentification, facturation |
| Mot de passe (hashé) | Oui | Contrat | Authentification |
| Logs d'action | Oui | Intérêt légitime | Sécurité, audit |

# Partage des données

| Destinataire | Données partagées | Raison |
|---|---|---|
| Stripe | Email merchant, informations de facturation | Paiement abonnement |
| Apple (Wallet API) | Public_id client, solde (dans le pass) | Génération du pass |
| Google (Wallet API) | Public_id client, solde (dans le pass) | Génération du pass |
| Sentry | Traces d'erreurs (sans PII) | Monitoring |
| Hébergeur (EU) | Toutes les données | Infrastructure |

# Droits des personnes concernées

| Droit | Délai de réponse | Procédure |
|---|---|---|
| Accès | 30 jours | Email à contact@[domaine] |
| Rectification | 30 jours | Email + justificatif |
| Suppression | 30 jours | Email + vérification identité |
| Portabilité | 30 jours | Export CSV sur demande |
| Opposition | 30 jours | Email |

**MVP** : traitement manuel. **Phase 2** : interface self-service.

# Responsabilités

- Primpay = **sous-traitant** au sens RGPD (traite les données pour le compte du merchant).
- Merchant = **responsable de traitement** vis-à-vis de ses clients.
- Un DPA (Data Processing Agreement) est signé avec chaque merchant.

# Durées de conservation

→ Voir `data-retention.md` pour le détail.

# Décisions figées

- Hébergement EU uniquement.
- Aucune revente de données.
- Sentry configuré sans capture de PII.

# Questions ouvertes

- Faut-il une politique de confidentialité séparée pour les clients finaux vs les merchants ?
- Comment gérer les demandes de suppression pour les clients d'un merchant churné ?

# Dépendances

- `rgpd.md`, `data-retention.md`, `responsibilities.md`
