---
Title: Principles
Owner: Amine AIT ALI
Status: frozen
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 01_Fondations
Depends on: vision.md
Used by: tous les documents
---

# Objectif

Fixer les principes non négociables qui gouvernent toutes les décisions du projet.

# Contexte

Les principes sont des règles qui s'appliquent même quand c'est inconfortable. Ils servent à arbitrer quand deux options semblent équivalentes.

# Principes fondateurs

## P1 — Le produit c'est la caisse, pas l'app

> Tout ce qui n'améliore pas le temps de crédit en caisse est secondaire.

Application :
- Chaque feature est évaluée par : "est-ce que ça rend le crédit en caisse plus rapide ou plus fiable ?"
- Un beau dashboard merchant est moins important qu'un bouton "derniers clients" qui fonctionne à 100 %.

## P2 — Zéro friction côté client

> Le client ne doit jamais avoir à télécharger quoi que ce soit.

Application :
- Wallet natif uniquement (Apple Wallet + Google Wallet).
- Pas de compte client à créer, pas de mot de passe, pas d'email obligatoire.
- L'ajout de la carte doit fonctionner en < 30 secondes sur n'importe quel réseau.

## P3 — Densité avant étendue

> Mieux vaut dominer un quartier que présenter dans 10 villes.

Application :
- Phase 1 : une zone géographique unique.
- Pas d'expansion géographique avant 15 merchants actifs dans la zone 1.
- L'effet réseau (client utilise sa carte chez plusieurs commerces proches) est le moat.

## P4 — Pas d'ajout de scope sans évidence terrain

> Aucune feature ne rentre dans le MVP sans qu'un merchant actif l'ait demandée explicitement ≥ 2 fois.

Application :
- NFC reporté.
- POS integrations reportés.
- Push notifications reportées.
- La liste des exclusions (`03_Produit/exclusions.md`) fait loi.

## P5 — La donnée ne ment pas, les intuitions si

> Toute décision post-MVP est prise sur données mesurées, pas sur intuitions.

Application :
- North star mesuré côté serveur (temps réel de crédit), pas auto-déclaratif.
- Churn et NPS mesurés avant ajustement de pricing.
- Les objections terrain sont tracées (`06_GoToMarket/objections.md`) avant modification du script.

## P6 — Simple > clever

> Une solution simple qui fonctionne bat une solution élégante qui flanche en rush.

Application :
- QR fixe (pas rotatif) : simple, offline-compatible, sans risque d'invalidation.
- Monolith NestJS avant microservices.
- Dashboard minimal (4 KPI) avant analytics avancé.

# Décisions figées

- Ces principes sont **frozen**. Toute modification nécessite une décision D1 tracée.

# Questions ouvertes

_Aucune._

# Dépendances

- `vision.md`, `03_Produit/product-principles.md`
