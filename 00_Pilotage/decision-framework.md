---
Title: Decision Framework
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: —
Used by: decision-log.md, decision-sla.md
---

# Objectif

Décrire la méthode utilisée pour prendre et tracer les décisions structurantes.

# Contexte

Sans méthode explicite, les décisions se prennent par réflexe, se contredisent, ou restent implicites. Ce cadre s'applique à toute décision dont le coût de réversion dépasse une semaine de travail.

# Niveaux de décision

| Niveau | Définition | Délai max | Responsable |
|---|---|---|---|
| **D1 — Critique** | Décision irréversible ou coût de réversion > 2 semaines | 48 h | Owner du domaine |
| **D2 — Structurante** | Impact durable sur architecture, GTM, pricing, legal | 1 semaine | Owner + validation |
| **D3 — Opérationnelle** | Quotidien, réversible facilement | Pas de délai imposé | Exécutant |

# Critères d'une bonne décision

1. **Signal identifié** : quel fait ou tension a déclenché la décision ?
2. **Options évaluées** : au moins 2 options considérées (même brièvement).
3. **Critères explicites** : sur quoi on tranche (vitesse, coût, réversibilité, risque).
4. **Décision tracée** : ajoutée dans `decision-log.md` pour les D1 et D2.
5. **Action associée** : dans `decision-to-action-map.md`.

# Méthode rapide (D1/D2)

```
CONTEXTE : [1 phrase — pourquoi cette décision maintenant]
OPTIONS : [A] vs [B] vs [C]
CRITÈRES : [ce sur quoi on tranche]
DÉCISION : [option choisie]
CONSÉQUENCES : [ce qu'on accepte en faisant ce choix]
RÉVERSIBILITÉ : [facile / difficile / irréversible]
```

# Anti-patterns à éviter

- Décider sans tracer (la décision disparaît dans les messages).
- Changer une décision D1 sans ADR.
- Décider par défaut (ne pas choisir = choisir implicitement).
- Retarder une D1 > 48 h sans raison explicite.

# Décisions figées

- Toute décision technique structurante → ADR dans `04_Technique/adr/`.
- Toute décision produit/business D1 → `decision-log.md`.

# Questions ouvertes

- Faut-il un outil de vote asynchrone quand il y a plusieurs parties prenantes ?

# Dépendances

- `decision-log.md`, `decision-sla.md`, `04_Technique/adr/ADR-001-template.md`
