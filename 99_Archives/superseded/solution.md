---
name: Solution
description: Description de la solution apportée au problème marché
type: project
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Solution

## 1. Objectif du document
Décrire **ce qu'est la solution** — pas la techno, pas la feature list, mais l'expérience.

## 2. La solution en une phrase

> Une carte de fidélité digitale universelle, stockée dans Apple Wallet ou Google Wallet, permettant au client de cumuler des avantages dans plusieurs restaurants, avec une gestion individualisée par établissement.

## 3. Principe central
- **1 client** = **1 carte universelle** dans son Wallet.
- **1 restaurant** = **1 programme fidélité configurable** côté serveur.
- **Validation** = scan QR, recherche rapide, ou bouton manuel.
- **Récompenses** = gérées automatiquement côté serveur.

## 4. Côté client
- Scanne un QR public du restaurant.
- Ajoute la carte à son Wallet en 1 geste.
- Aucune création de compte explicite, aucune app à installer.
- À chaque visite, il présente sa carte Wallet. Le staff le crédite. Il voit sa progression.

## 5. Côté restaurant
Une PWA ultra-légère, 5 fonctions seulement :
1. Scanner un QR client.
2. Rechercher un client par prénom / téléphone.
3. Afficher les derniers clients.
4. Créditer (+1 point / tampon).
5. Utiliser une récompense disponible.

Pensée pour fonctionner sur téléphone, tablette ou écran caisse.

## 6. Côté plateforme
Backend centralisé qui gère :
- onboarding clients et restaurants,
- programmes fidélité (points, tampons, seuils, récompenses),
- événements historisés (crédit, débit, redeem),
- analytics commerçant,
- abonnements SaaS.

## 7. Ce qui rend la solution possible
- **Apple Wallet et Google Wallet** : infrastructure déjà installée sur tous les smartphones.
- **QR fixe signé** : simple, compatible tout terminal, sécurisé côté serveur.
- **Multi-tenant strict** : un seul backend sert N restaurants sans fuite.

## 8. Ce que la solution **n'est pas**
- Une app mobile dédiée.
- Un logiciel de caisse.
- Un CRM marketing généraliste.
- Une solution NFC (pour l'instant).

## 9. Décisions figées
Voir ADR-001 à ADR-006 dans le journal des décisions.

## 10. Questions ouvertes
- Comment présenter la "carte universelle" pour qu'un client comprenne immédiatement qu'elle fonctionne chez plusieurs restaurants ?
- Faut-il afficher le nom du restaurant sur le pass Wallet, ou un nom neutre type "Primpay" ?

## 11. Next steps
- Maquette visuelle du pass Wallet (recto/verso).
- Maquette du parcours d'onboarding client (scan QR → Wallet ajouté).
