---
Title: Decision to Action Map
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: decision-log.md, ownership-map.md
Used by: 12_Execution-System/
---

# Objectif

Lier chaque décision importante à une action concrète, un owner et une date.

# Contexte

Une décision sans action associée n'existe pas. Ce document transforme les décisions en engagements opérationnels.

# Décisions → Actions actives

| Décision | Action | Owner | Deadline | Statut |
|---|---|---|---|---|
| Choisir ORM | Créer ADR-002, initialiser Prisma dans le repo | Amine | Semaine 1 | ⏳ |
| Choisir hébergeur | Créer compte + VPS, documenter dans `04_Technique/infra.md` | Amine | Semaine 1 | ⏳ |
| Choisir nom produit | Déposer INPI, acheter domaine, créer comptes sociaux | Amine | Semaine 1 | ⏳ |
| Choisir sous-segment pilote | Lister 20 prospects qualifiés dans la zone | Amine | Semaine 1 | ⏳ |
| Choisir zone géographique | Créer liste prospects Google Maps | Amine | Semaine 1 | ⏳ |
| Créer compte Apple Developer | Ouvrir compte, demander Wallet API | Amine | J+2 | ⏳ |
| Créer compte Google Wallet API | Ouvrir compte, configurer projet | Amine | J+2 | ⏳ |

# Décisions → Actions complétées

| Décision | Action | Complétée le |
|---|---|---|
| Architecture NestJS monolith | ADR-004 rédigé | 2026-04-17 |
| Multi-tenant strict via merchant_id | ADR-005 rédigé | 2026-04-17 |
| Wallet-first, pas d'app | ADR-001 rédigé | 2026-04-17 |
| QR fixe signé serveur | ADR-002 rédigé | 2026-04-17 |
| NFC et POS reportés post-MVP | ADR-006 rédigé | 2026-04-17 |

# Règles

- Chaque décision D1/D2 doit avoir au moins 1 ligne dans ce tableau.
- Une action sans owner = action fantôme (interdite).
- Ce tableau est revu chaque vendredi lors de la revue hebdo.

# Questions ouvertes

_Aucune._

# Dépendances

- `decision-log.md`, `ownership-map.md`, `00_Pilotage/roadmap.md`
