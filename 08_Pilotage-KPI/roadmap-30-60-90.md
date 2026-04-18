---
name: Roadmap 30 / 60 / 90 jours
description: Plan d'exécution à court terme, semaine par semaine
type: project
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
priority: ⭐ Immédiate
---

# Roadmap 30 / 60 / 90 jours

## 1. Objectif du document
Planifier les 3 premiers mois, semaine par semaine. Source de vérité pour le pilotage court terme.

## 2. Jour 0 (aujourd'hui, 2026-04-17)

- Documentation structurée livrée.
- Architecture et décisions figées (ADR-001 à ADR-008).
- À trancher cette semaine : sous-segment pilote, nom produit, hébergeur.

## 3. Jours 1–30 — Fondations et MVP technique

### Semaine 1 (J1–J7)
- [ ] Trancher nom produit (dépôt INPI initié).
- [ ] Trancher sous-segment pilote (pizzeria / coffee / etc.).
- [ ] Trancher zone géographique.
- [ ] Créer comptes Apple Developer + Google Wallet API.
- [ ] Acheter domaine + setup DNS.
- [ ] Monorepo initialisé, CI en place.
- [ ] Migrations DB 0001 (schéma MVP).
- [ ] Identifier 5 candidats pilotes.

### Semaine 2 (J8–J14)
- [ ] Backend : auth + multi-tenant + middlewares.
- [ ] Backend : module customers + merchants.
- [ ] Backend : module loyalty (events, accounts).
- [ ] Endpoint `/loyalty/credit` fonctionnel.
- [ ] Tests isolation multi-tenant.
- [ ] Landing page v1 en ligne.

### Semaine 3 (J15–J21)
- [ ] Module wallet (Apple + Google).
- [ ] Endpoint public `POST /customers` (flow QR public).
- [ ] Page d'ajout Wallet responsive.
- [ ] PWA commerçant — écran principal.
- [ ] PWA — fiche client.

### Semaine 4 (J22–J30)
- [ ] PWA — admin programme.
- [ ] PWA — dashboard basique.
- [ ] Stripe : checkout + webhooks.
- [ ] Onboarding guidé.
- [ ] Emails transactionnels (bienvenue, J+3, J+7, J+12).
- [ ] Déploiement staging.
- [ ] QA cross-device (iOS, Android, iPad).

**Livrable J+30** : MVP déployé en staging, testable en interne.

## 4. Jours 31–60 — Pilotes et ajustements

### Semaine 5 (J31–J37)
- [ ] Déploiement prod.
- [ ] Pilote 1 — onboarding sur place.
- [ ] Pack signalétique livré au pilote 1.
- [ ] Script démo finalisé (après play avec pilote 1).

### Semaine 6 (J38–J44)
- [ ] Pilote 2 — onboarding.
- [ ] Pilote 3 — onboarding.
- [ ] Observations caisses pilotes 1 et 2.
- [ ] Corrections rapides selon feedback.

### Semaine 7 (J45–J51)
- [ ] Entretien J+14 pilotes 1 et 2.
- [ ] Démarrage démarchage terrain zone ciblée.
- [ ] 15 démos menées.
- [ ] Ajustement discours / objections.

### Semaine 8 (J52–J60)
- [ ] Bilan pilotes (entretien J+30 pour pilote 1).
- [ ] 5 signatures payantes (objectif).
- [ ] Ajustement produit selon remontées.
- [ ] Premier post Instagram avec témoignage pilote.

**Livrable J+60** : 3 pilotes en run, 2–5 signatures payantes, retours consolidés.

## 5. Jours 61–90 — Run et optimisation

### Semaine 9 (J61–J67)
- [ ] Démarchage soutenu : 5 démos / jour.
- [ ] Optimisation du funnel signature (suivi A/B des emails).
- [ ] Premier "parrainage" activé.

### Semaine 10 (J68–J74)
- [ ] 10 signatures payantes cumulées.
- [ ] Analyse des objections récurrentes → mise à jour `objections-terrain.md`.
- [ ] Dashboard KPI interne stable.

### Semaine 11 (J75–J81)
- [ ] Premier NPS commerçants.
- [ ] Ajustement offre selon retours (prix, setup, features manquantes).
- [ ] Décision sur la prochaine fonctionnalité (hors MVP → Phase 2).

### Semaine 12 (J82–J90)
- [ ] Consolidation : 15 signatures cumulées.
- [ ] Bilan trimestriel : roadmap suivante, recrutement éventuel, investissement marketing.
- [ ] Mise à jour de toute la documentation selon les apprentissages.

**Livrable J+90** : 15 signatures, KPI produit validés, doc à jour, décisions Phase 2 prises.

## 6. Priorités non négociables

1. **Tests terrain avant commercialisation large**. Jamais passer Semaine 5 sans 3 pilotes actifs.
2. **Pas d'ajout de fonctionnalité hors MVP** avant J+90.
3. **Documentation mise à jour en continu** (risques, ADR, KPI).

## 7. Décisions à trancher en Semaine 1 (bloquantes)

- [ ] Nom produit.
- [ ] Sous-segment pilote (pizzeria / coffee / boulangerie / kebab).
- [ ] Ville + quartier cible.
- [ ] Hébergeur.
- [ ] ORM (Prisma vs TypeORM).

## 8. KPI de la roadmap

| Jalon | KPI |
|---|---|
| J+30 | MVP deployé staging, 3 pilotes identifiés |
| J+60 | 3 pilotes actifs, 5 signatures payantes, 2 témoignages |
| J+90 | 15 signatures cumulées, NPS > 40, churn < 5 % |

## 9. Risques spécifiques à cette roadmap

- **Retard Wallet** : Apple et Google peuvent prendre 1–2 semaines de validation. → démarrer les comptes dès J1.
- **Pilote qui n'active pas** : backup list de 5 candidats pour remplacer rapidement.
- **Démarchage inefficace** : si < 3 signatures au J+45, revoir le script et la zone.

## 10. Questions ouvertes
- Faut-il une personne dédiée au terrain dès J+30 ou rester solo ?
- Investissement marketing (Instagram Ads, Google Ads local) avant J+90 : utile ou prématuré ?

## 11. Next steps
- Figer les 5 décisions de Semaine 1 cette semaine.
- Démarrer Sprint 0 immédiatement.
- Revue hebdo vendredi pour ajuster.
