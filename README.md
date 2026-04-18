---
name: Primpay — Table des matières projet
description: Point d'entrée unique pour naviguer dans la documentation projet
version: 1.0
updated: 2026-04-17
owner: Vito
---

# Primpay — Documentation projet

Solution SaaS de fidélité digitale universelle pour restaurants, wallet-first, QR-first.

## Comment utiliser ce dépôt

Chaque dossier correspond à un chantier du projet. Chaque document suit la même trame :
`Objectif → Contexte → Décisions figées → Questions ouvertes → Next steps`.

Un document ne rédige **qu'une seule chose** : pas de mélange stratégie / produit / tech dans le même fichier.

## Navigation

### [00_Pilotage-projet](./00_Pilotage-projet/)
Méta-documents du projet : gouvernance, décisions, risques, glossaire.

- [README](./00_Pilotage-projet/README.md) — guide d'usage du dépôt
- [Glossaire](./00_Pilotage-projet/glossaire.md) — vocabulaire partagé
- [Journal des décisions (ADR)](./00_Pilotage-projet/journal-decisions.md)
- [Registre des risques](./00_Pilotage-projet/registre-risques.md)
- [Dépendances & blocages](./00_Pilotage-projet/dependances-blocages.md)
- [Rituels & gouvernance](./00_Pilotage-projet/rituels-gouvernance.md)

### [01_Fondations](./01_Fondations/)
Ce qu'on construit et pourquoi. Socle stratégique.

- [Vision](./01_Fondations/vision.md)
- [Problème marché](./01_Fondations/probleme-marche.md)
- [Solution](./01_Fondations/solution.md)
- [Proposition de valeur](./01_Fondations/proposition-valeur.md)
- [Positionnement](./01_Fondations/positionnement.md)

### [02_Marche-Cible](./02_Marche-Cible/)
À qui on vend, pourquoi ils achètent.

- [ICP principal](./02_Marche-Cible/icp-principal.md)
- [Segments secondaires](./02_Marche-Cible/segments-secondaires.md)
- [Cas d'usage prioritaires](./02_Marche-Cible/cas-usage-prioritaires.md)
- [Objections terrain](./02_Marche-Cible/objections-terrain.md)

### [03_Produit](./03_Produit/)
Ce qu'on construit concrètement.

- [MVP figé](./03_Produit/mvp-fige.md) ⭐ prioritaire
- [Fonctionnalités hors MVP](./03_Produit/fonctionnalites-hors-mvp.md)
- [User flows](./03_Produit/user-flows.md)
- [Règles métier](./03_Produit/regles-metier.md)
- [UX restaurateur](./03_Produit/ux-restaurateur.md)

### [04_Technique](./04_Technique/)
Comment on le construit.

- [Architecture technique](./04_Technique/architecture-technique.md)
- [Schéma base de données](./04_Technique/schema-base-de-donnees.md)
- [Endpoints API](./04_Technique/endpoints-api.md)
- [Sécurité & multi-tenant](./04_Technique/securite-multi-tenant.md)
- [Roadmap technique](./04_Technique/roadmap-technique.md)

### [05_Offre-Business-Model](./05_Offre-Business-Model/)
Comment on gagne de l'argent.

- [Offre SaaS](./05_Offre-Business-Model/offre-saas.md) ⭐ prioritaire
- [Plans tarifaires](./05_Offre-Business-Model/plans-tarifaires.md)
- [Setup fee](./05_Offre-Business-Model/setup-fee.md)
- [Upsells](./05_Offre-Business-Model/upsells.md)
- [Hypothèses unit economics](./05_Offre-Business-Model/hypotheses-unit-economics.md)

### [06_Acquisition-Vente](./06_Acquisition-Vente/)
Comment on vend.

- [Go-to-market local](./06_Acquisition-Vente/go-to-market-local.md)
- [Script de démo terrain](./06_Acquisition-Vente/script-demo-terrain.md)
- [Argumentaire commercial](./06_Acquisition-Vente/argumentaire-commercial.md)
- [Offre d'essai](./06_Acquisition-Vente/offre-essai.md)
- [Parcours de signature](./06_Acquisition-Vente/parcours-signature.md)

### [07_Branding](./07_Branding/)
Identité et voix.

- [Naming shortlist](./07_Branding/naming-shortlist.md)
- [Plateforme de marque](./07_Branding/plateforme-marque.md)
- [Messages clés](./07_Branding/messages-cles.md)
- [Ton de communication](./07_Branding/ton-communication.md)

### [08_Pilotage-KPI](./08_Pilotage-KPI/)
Comment on mesure.

- [KPI produit](./08_Pilotage-KPI/kpi-produit.md)
- [KPI business](./08_Pilotage-KPI/kpi-business.md)
- [Plan de test terrain](./08_Pilotage-KPI/plan-test-terrain.md)
- [Roadmap 30/60/90 jours](./08_Pilotage-KPI/roadmap-30-60-90.md) ⭐ prioritaire

### [09_Legal-Conformite](./09_Legal-Conformite/)
Ce qui est bloquant pour vendre.

- [RGPD — traitement données](./09_Legal-Conformite/rgpd-traitement-donnees.md)
- [CGU / CGV SaaS](./09_Legal-Conformite/cgu-cgv-saas.md)
- [Contrat commerçant](./09_Legal-Conformite/contrat-commercant.md)
- [Conformité Apple & Google Wallet](./09_Legal-Conformite/conformite-apple-google-wallet.md)

### [10_Operations-Support](./10_Operations-Support/)
Comment on livre et on opère.

- [Runbook onboarding restaurant](./10_Operations-Support/runbook-onboarding-restaurant.md)
- [Support client](./10_Operations-Support/support-client.md)
- [SLA & disponibilité](./10_Operations-Support/sla-disponibilite.md)
- [Procédure incident](./10_Operations-Support/procedure-incident.md)

## Priorités immédiates (extrait plan.md)

1. Figer le MVP → [03_Produit/mvp-fige.md](./03_Produit/mvp-fige.md)
2. Choisir la cible d'entrée → [02_Marche-Cible/icp-principal.md](./02_Marche-Cible/icp-principal.md)
3. Transformer le business model en offre vendable → [05_Offre-Business-Model/offre-saas.md](./05_Offre-Business-Model/offre-saas.md)
4. Roadmap d'exécution → [08_Pilotage-KPI/roadmap-30-60-90.md](./08_Pilotage-KPI/roadmap-30-60-90.md)
5. Supports de vente terrain → [06_Acquisition-Vente/](./06_Acquisition-Vente/)

## Statuts

- 🟢 Validé
- 🟡 En cours de rédaction
- 🟠 Brouillon
- 🔴 À démarrer
- ⭐ Priorité immédiate
