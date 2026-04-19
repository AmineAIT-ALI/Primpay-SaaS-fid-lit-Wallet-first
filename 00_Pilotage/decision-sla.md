---
Title: Decision SLA
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: decision-framework.md
Used by: —
---

# Objectif

Fixer les délais maximum acceptables pour chaque classe de décision. Éviter la paralysie.

# Contexte

Le projet Primpay est dans une phase où la vitesse décisionnelle est un avantage concurrentiel direct. Une décision tardive coûte plus cher qu'une décision imparfaite.

# SLA par niveau

| Niveau | Type | Délai max | Escalade si dépassé |
|---|---|---|---|
| **D1 — Critique** | Bloque le projet ou coûte > 2 semaines à réverser | **48 h** | Documenter le blocage dans `blockers.md` |
| **D2 — Structurante** | Impact durable mais réversible | **1 semaine** | Arbitrage forcé à la revue hebdo |
| **D3 — Opérationnelle** | Réversible facilement | **24 h** | L'exécutant tranche seul |

# Décisions D1 bloquantes actuelles (Semaine 1)

| Décision | Délai | Statut |
|---|---|---|
| Nom du produit | 48 h | ⏳ En attente |
| Sous-segment pilote (pizzeria / coffee / boulangerie) | 48 h | ⏳ En attente |
| Ville + quartier cible | 48 h | ⏳ En attente |
| Hébergeur (OVH / Hetzner / Scaleway) | 48 h | ⏳ En attente |
| ORM (Prisma vs TypeORM) | 48 h | ⏳ En attente |

# Règle de l'arbitrage forcé

Si une décision D1 n'est pas prise dans les 48 h, l'option par défaut suivante s'applique :

| Décision | Défaut si pas tranché à 48 h |
|---|---|
| ORM | Prisma (plus de documentation, meilleur DX) |
| Hébergeur | Hetzner (meilleur rapport qualité/prix EU) |
| Sous-segment | Pizzeria indépendante |

# Décisions figées

- Une décision D1 non prise = un bloqueur dans `blockers.md`.
- L'arbitrage forcé s'applique automatiquement à 48 h.

# Questions ouvertes

_Aucune._

# Dépendances

- `decision-framework.md`, `blockers.md`
