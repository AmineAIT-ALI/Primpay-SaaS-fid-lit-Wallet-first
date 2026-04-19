---
Title: RGPD
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 09_Legal
Depends on: —
Used by: data-retention.md, privacy.md
---

# RGPD — traitement des données

⚠ Ce document est un cadre de travail. La version finale doit être validée par un DPO ou un avocat avant commercialisation.

## 1. Objectif du document
Identifier les obligations RGPD et les moyens d'y répondre.

## 2. Rôles

### Primpay
- Responsable de traitement pour les **staff users** (ses utilisateurs B2B).
- Sous-traitant pour les **customers** (clients finaux des commerçants).

### Commerçant (client Primpay)
- Responsable de traitement pour ses **customers** (ses clients finaux).
- Doit informer ses clients et obtenir leur consentement.

⚠ Nécessite un **contrat de sous-traitance** (DPA) entre Primpay et chaque commerçant.

## 3. Données traitées

### Customers (clients finaux)
- Prénom.
- Téléphone.
- Email (optionnel).
- Historique des crédits et récompenses.
- Identifiants Wallet (Apple pass id, Google object id).

### Staff users (utilisateurs commerçant)
- Email.
- Mot de passe (hash).
- Nom / prénom.
- Rôle.

### Merchants
- Raison sociale, SIREN, adresse.
- Données de paiement (via Stripe, non stockées par nous).

## 4. Base légale des traitements

| Traitement | Base légale |
|---|---|
| Gestion du compte staff | Exécution du contrat |
| Fidélité clients finaux | Consentement + intérêt légitime du commerçant |
| Analytics agrégés | Intérêt légitime |
| Facturation | Obligation légale |
| Emails marketing (futur) | Consentement explicite |

## 5. Droits des personnes

### Droits à supporter au MVP
- **Accès** : export des données customer sur demande.
- **Rectification** : mise à jour prénom / téléphone.
- **Effacement** : suppression du compte customer (avec exception pour données facturation).
- **Portabilité** : export JSON / CSV.
- **Opposition** : désinscription en 1 clic.

### Délai de traitement
- 30 jours maximum après la demande.

### Interface
- Section "Mes données" dans l'interface client (Phase 2).
- Au MVP : email de demande traité manuellement.

## 6. Durées de conservation

| Donnée | Durée |
|---|---|
| Compte customer actif | Durée de la relation + 3 ans |
| Compte customer inactif (0 activité 3 ans) | Suppression automatique |
| Loyalty events | 5 ans (audit) |
| Données de facturation | 10 ans (obligation comptable) |
| Logs techniques | 12 mois |
| Logs de sécurité | 3 ans |
| Backup | 30 jours glissants |

## 7. Mesures techniques

### Sécurité
- TLS 1.2+ en transit.
- Hash bcrypt/argon2 des mots de passe.
- Chiffrement au repos (à évaluer pour phone).
- Isolation multi-tenant stricte.
- Logs d'accès aux données sensibles.

### Accès
- Accès production limité au fondateur.
- Pas de copie locale des données prod sans anonymisation.
- Logs de toute connexion admin.

## 8. Hébergement

### Exigence
- Données hébergées en Union européenne.
- Fournisseur non soumis au Cloud Act US pour le cœur de données (idéalement).

### Candidats
- OVH (France).
- Scaleway (France).
- Hetzner (Allemagne).

## 9. Transferts hors UE

- Stripe (paiement) : sous-traitant US, DPA signée, SCC appliqués.
- Apple Wallet / Google Wallet : transferts inhérents à la fourniture du service Wallet, documentés dans l'information utilisateur.
- Aucun autre transfert prévu au MVP.

## 10. Registre des traitements

À tenir en format tableau :
- Nom du traitement.
- Finalité.
- Base légale.
- Catégories de données.
- Destinataires.
- Durée de conservation.
- Mesures de sécurité.

## 11. Information des personnes

### Page publique `Confidentialité` (à créer)
- Qui traite les données.
- Quelles données.
- Pourquoi.
- Combien de temps.
- Quels droits.
- Comment les exercer.

### Mention au scan du QR public
- Courte phrase d'information + lien vers la page complète.
- Case de consentement explicite pour traitement marketing futur.

## 12. Sous-traitants (à cartographier)

| Sous-traitant | Service | DPA signée ? |
|---|---|---|
| Hébergeur (à choisir) | Hébergement | À signer |
| Stripe | Paiement | Disponible sur leur site |
| Apple | Wallet | Via leur programme développeur |
| Google | Wallet | Via leur programme développeur |
| Provider email transactionnel (Resend / Postmark) | Emails | À signer |

## 13. Violation de données (incident)

Procédure en cas de violation : voir `10_Operations-Support/procedure-incident.md`.

Notification CNIL : < 72 h après constat.

## 14. Décisions figées
- Hébergement UE.
- Pas de vente de données, jamais.
- DPA obligatoire avec chaque commerçant.

## 15. Questions ouvertes
- Chiffrement réversible du téléphone ou hash + clear chiffré ?
- DPO externe à désigner : qui, quand ?
- Anonymisation des données pour l'analytics agrégé ?

## 16. Next steps
- Consulter un DPO ou cabinet RGPD avant commercialisation.
- Rédiger la page Confidentialité.
- Rédiger le DPA type avec les commerçants.
- Remplir le registre des traitements.
