---
Title: Primpay — Project Operating System
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: racine
Depends on: —
Used by: tous les documents
---

# Primpay — Project Operating System

Solution SaaS de fidélité digitale universelle pour commerces alimentaires indépendants.
**Wallet-first. QR-first. Zéro app. Crédit en < 2 secondes.**

---

## Mission de ce dépôt

Ce dépôt n'est pas un simple dossier de documentation.
Il est le système nerveux du projet : penser, décider, exécuter, mesurer, détecter, apprendre.

Boucle maîtresse :
```
SIGNAL → DÉTECTION → DÉCISION → EXÉCUTION → VÉRIFICATION → APPRENTISSAGE
```

---

## Structure

| Dossier | Rôle |
|---|---|
| [00_Pilotage/](./00_Pilotage/) | Gouvernance, décisions, risques, cadence, roadmap |
| [01_Fondations/](./01_Fondations/) | Vision, problème, opportunité, principes, contraintes |
| [02_Marche-Cible/](./02_Marche-Cible/) | Personas, segments, jobs-to-be-done, concurrents |
| [03_Produit/](./03_Produit/) | MVP, features, règles métier, parcours, exclusions |
| [04_Technique/](./04_Technique/) | Architecture, stack, infra, API, data model, ADRs |
| [05_Business/](./05_Business/) | Pricing, revenus, unit economics, coûts, scénarios |
| [06_GoToMarket/](./06_GoToMarket/) | Acquisition, canaux, funnel, sales motion, onboarding |
| [07_Branding/](./07_Branding/) | Positionnement, messages, ton, narration, identité |
| [08_Performance-System/](./08_Performance-System/) | North star, métriques, dashboards, seuils, alertes |
| [09_Legal/](./09_Legal/) | RGPD, CGU/CGV, conformité, rétention, responsabilités |
| [10_Operations/](./10_Operations/) | Support, incidents, déploiement, environnements, SLA |
| [11_Schemas/](./11_Schemas/) | Diagrammes système, flux données, infra, user flows |
| [12_Execution-System/](./12_Execution-System/) | Playbooks, runbooks, SOP, automations |
| [13_Data-Intelligence/](./13_Data-Intelligence/) | Tracking, analytics, feedback loop, dérive, temps réel |
| [14_Security-Resilience/](./14_Security-Resilience/) | Threat model, incidents, backup, secrets, antifragilité |
| [99_Archives/](./99_Archives/) | Superseded, deprecated, abandoned-ideas |

---

## Ordre de lecture

**Pour comprendre le projet :**
01_Fondations → 02_Marche-Cible → 03_Produit → 05_Business

**Pour piloter :**
00_Pilotage → 08_Performance-System → 12_Execution-System

**Pour construire :**
04_Technique → 10_Operations → 14_Security-Resilience

**Pour vendre :**
06_GoToMarket → 07_Branding → 12_Execution-System/playbooks/

---

## Liens système

| Système | Lien |
|---|---|
| Repo code | _À renseigner_ |
| CI/CD | _À renseigner_ |
| Monitoring | _À renseigner_ |
| Logs | _À renseigner_ |
| Analytics | _À renseigner_ |
| Support | _À renseigner_ |
| Design | _À renseigner_ |

---

## Règles du système

- 1 document = 1 responsabilité principale
- 1 décision importante = 1 trace explicite dans `00_Pilotage/decision-log.md`
- Pas de vérité dupliquée — les résumés renvoient vers la source
- Chaque document a un owner, un statut, une cadence de revue
- Ce qui n'est plus vrai n'est pas supprimé — il est archivé dans `99_Archives/`
- Toute métrique critique doit avoir un seuil (`08_Performance-System/thresholds.md`)
- Tout seuil doit avoir un trigger (`08_Performance-System/triggers.md`)
- Tout trigger doit avoir une action (`00_Pilotage/decision-to-action-map.md`)

---

## Statuts documentaires

| Statut | Signification |
|---|---|
| `draft` | En cours de rédaction — ne pas utiliser comme référence |
| `active` | Document de référence opérationnel |
| `frozen` | Figé — ne change que sur décision explicite |
| `deprecated` | Remplacé — voir `99_Archives/` |
