---
Title: System Diagrams
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 11_Schemas
Depends on: 04_Technique/architecture.md
Used by: —
---

# Schémas d'architecture

## 1. Objectif du dossier
Fournir des schémas visuels HTML ouvrables dans un navigateur, style Miro, pour comprendre le système complet sans lire 10 documents.

## 2. Schémas disponibles

### [architecture-globale.html](./architecture-globale.html)
Vue 360° du projet en 6 zones :
1. Parcours CLIENT FINAL (ce qu'il voit)
2. Parcours COMMERÇANT (ce qu'il voit)
3. INSTALLATION terrain (ce qu'on fait chez lui)
4. BACKEND — le cerveau (invisible)
5. INFRASTRUCTURE (où ça tourne)
6. OUTILS INTERNES (notre stack à nous)

## 3. Comment ouvrir

Double-clic sur le fichier `.html` → s'ouvre dans le navigateur par défaut. Aucune dépendance, aucun serveur à lancer.

## 4. Schémas à créer (post-MVP)

- `parcours-client-detail.html` — zoom sur le flow scan → Wallet → crédit.
- `schema-donnees-er.html` — diagramme entité-relation de la DB.
- `flow-reward.html` — cycle d'une récompense (création → consommation).
- `infra-prod-detaillee.html` — schéma réseau/hébergement précis.

## 5. Pourquoi HTML et pas Miro

- Sous contrôle (pas de dépendance à un outil tiers).
- Versionnable en git.
- Exportable en PDF pour pitch investisseurs.
- Modifiable par tout dev (pas de licence Miro nécessaire).

## 6. Next steps

- Relire le schéma avec le collègue.
- Identifier les zones encore floues.
- Ajouter les schémas manquants au fil des besoins.
