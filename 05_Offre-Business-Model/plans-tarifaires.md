---
name: Plans tarifaires
description: Détail des plans et de leurs limites
type: business
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Plans tarifaires

## 1. Objectif du document
Détailler chaque plan et ses limites. Référence pour l'implémentation billing et pour la page de pricing.

## 2. Solo — 29 € / mois HT

### Inclus
- 1 établissement (`merchant_location`).
- Clients illimités.
- 1 programme de fidélité actif.
- 1 récompense active par programme.
- Staff illimité.
- Dashboard analytics basique.
- Backups quotidiens.
- Support email (réponse < 48 h ouvrées).

### Limites
- 1 seul établissement — pour multi-sites, passer au plan Multi.
- Pas de campagnes push.
- Pas d'analytics avancées (segmentation, cohortes).

## 3. Multi-sites — 79 € / mois HT

### Inclus (en plus du Solo)
- Jusqu'à 5 établissements.
- Programmes séparés par établissement.
- Dashboard consolidé.
- Support prioritaire (réponse < 24 h ouvrées).
- Transferts de points entre établissements (post-MVP).

### Limites
- 5 établissements max (au-delà : offre Entreprise sur devis).

## 4. Entreprise — sur devis

### Cible
- Chaînes régionales / nationales (> 5 établissements).
- Franchises avec SI spécifique.
- Groupements de commerçants.

### Inclus potentiels
- Multi-sites illimité.
- White-label (voir `upsells.md`).
- Intégration POS custom.
- SLA renforcé.
- Account manager dédié.

### Hors scope au MVP
Ne pas vendre ce plan tant que le produit n'a pas 3 mois de run en prod.

## 5. Essai gratuit

- Durée : 14 jours.
- Sans carte bancaire requise.
- Limité à 100 clients pour éviter les abus.
- Passage automatique en Solo à la fin si CB ajoutée.
- Sinon : lecture seule pendant 30 jours puis archivage.

## 6. Modalités

### Facturation
- Mensuelle, prélèvement le jour de la première souscription.
- Pas de prorata à la création (1er mois plein dès J0 après trial).

### Paiement
- CB via Stripe.
- SEPA via Stripe (optionnel).

### Résiliation
- 1 clic dans le dashboard merchant.
- Effective en fin de période en cours.
- Données conservées 90 jours après résiliation.

### Changement de plan
- Upgrade immédiat (prorata calculé par Stripe).
- Downgrade effectif en fin de période.

## 7. Offres promotionnelles de lancement

### Pilote (3 premiers commerçants)
- 100 % gratuit pendant 2 mois.
- En échange : feedback hebdo, disponibilité pour observation terrain.
- Conversion en Solo au prix normal au mois 3.

### Parrainage
- Chaque commerçant parrainé activé = 1 mois offert pour le parrain.
- Plafonné à 3 mois cumulables.

### Lifetime deal (à valider)
- Réservé aux 10 premiers clients "payants".
- 299 € pour 1 an (soit 24,9 €/mois).
- À N'UTILISER QUE SI nécessaire pour débloquer les premières signatures.

## 8. TVA

- Taux France : 20 %.
- Affichage par défaut : HT (B2B).
- Factures : HT + TVA + TTC détaillés.

## 9. Décisions figées
- 3 plans : Solo, Multi, Entreprise.
- Essai 14 jours sans CB.
- Pas d'engagement de durée.

## 10. Questions ouvertes
- Remise annuelle (-15 % ?) pour améliorer la rétention.
- Faut-il un plan "Freemium limité" (max 50 clients) pour lead gen ?
- Plafond clients sur Solo (illimité ou cap à X milliers) ?

## 11. Next steps
- Implémenter les 2 plans dans Stripe.
- Page de pricing publique.
- Générer les liens de checkout.
