---
name: Guide d'usage du dépôt projet
description: Règles de rédaction, conventions de nommage, workflow documentaire
type: project
status: 🟢 Validé
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Guide d'usage du dépôt projet Primpay

## Principe directeur

> Un document = un sujet. Pas de mélange stratégie / produit / tech / vente dans le même fichier.

## Trame standard d'un document

Chaque document suit cette structure :

```
---
frontmatter
---

# Titre

## 1. Objectif du document
À quoi sert ce doc, qui le lit, quand.

## 2. Contexte
Ce qu'il faut savoir pour comprendre les décisions.

## 3. Décisions figées
Ce qui est acté et ne se rediscute pas sans ADR.

## 4. Questions ouvertes
Ce qui reste à trancher, avec propriétaire et deadline.

## 5. Next steps
Actions concrètes, avec propriétaire et deadline.
```

## Frontmatter obligatoire

```yaml
---
name: Nom court du document
description: Une phrase qui résume l'intention
type: project | product | technical | business | legal | ops
status: 🟢 | 🟡 | 🟠 | 🔴
version: 1.0
owner: prénom
updated: YYYY-MM-DD
---
```

## Workflow de modification

1. **Brouillon** (🟠) : on écrit librement, sans craindre l'erreur.
2. **En cours** (🟡) : le document est partagé, on itère.
3. **Validé** (🟢) : décision figée. Toute modification majeure → entrée dans `journal-decisions.md` (ADR).
4. **À démarrer** (🔴) : coquille vide.

## Conventions de nommage

- Dossiers : `NN_Nom-Dossier` (préfixe numérique pour l'ordre)
- Fichiers : `kebab-case.md`, sans accent
- Tout en français (langue projet)

## Ce qu'on ne met PAS dans un document

- Des décisions qui appartiennent à un autre dossier (si ça parle tech dans un doc business, c'est à déplacer)
- Du contenu qui sera obsolète dans 2 semaines (utiliser des notes éphémères, pas le dépôt)
- Des secrets (clés API, mots de passe) — jamais
