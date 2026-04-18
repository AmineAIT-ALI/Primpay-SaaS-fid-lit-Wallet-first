---
name: Registre des risques
description: Risques identifiés, probabilité, impact, mitigation
type: project
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Registre des risques

## 1. Objectif
Lister les risques connus, les surveiller, et forcer une réponse avant qu'ils ne deviennent des incidents.

## 2. Échelle
- **Probabilité** : Faible / Moyenne / Élevée
- **Impact** : Mineur / Majeur / Critique
- **Priorité** = Prob × Impact (Élevée priorité = à traiter en premier)

## 3. Risques identifiés

### RQ-01 — UX trop lente en rush
- Catégorie : Produit
- Probabilité : Élevée
- Impact : Critique
- Symptôme : staff abandonne l'outil après 2 semaines
- Mitigation : tests terrain dès 3 restaurants, objectif < 2 s mesuré, bouton "derniers clients" ajouté
- Propriétaire : Vito

### RQ-02 — Délai d'intégration Apple Wallet / Google Wallet plus long que prévu
- Catégorie : Technique
- Probabilité : Moyenne
- Impact : Majeur
- Symptôme : MVP repoussé de 2–4 semaines
- Mitigation : démarrer les comptes développeur et la génération de passes dès la semaine 1
- Propriétaire : Vito

### RQ-03 — Acquisition terrain difficile
- Catégorie : Business
- Probabilité : Élevée
- Impact : Critique
- Symptôme : moins de 3 restaurants signés après 4 semaines de démarchage
- Mitigation : script de démo figé, offre d'essai gratuite, installation offerte
- Propriétaire : Vito

### RQ-04 — Discipline staff faible côté restaurant
- Catégorie : Business / Produit
- Probabilité : Moyenne
- Impact : Majeur
- Symptôme : le staff ne propose pas la carte au client → taux d'ajout Wallet < 10 %
- Mitigation : pack signalétique (sticker, chevalet), mini-guide terrain, rôle "ambassadeur" identifié
- Propriétaire : Vito

### RQ-05 — Accès cross-tenant (fuite de données)
- Catégorie : Technique / Légal
- Probabilité : Faible
- Impact : Critique
- Symptôme : un restaurant voit des clients d'un autre
- Mitigation : `merchant_id` obligatoire, tests d'isolation systématiques, revue code ciblée
- Propriétaire : Vito

### RQ-06 — Non-conformité RGPD
- Catégorie : Légal
- Probabilité : Moyenne
- Impact : Critique
- Symptôme : plainte CNIL, amende, interdiction de vente
- Mitigation : registre de traitement, mentions claires, DPO externe consulté avant lancement commercial
- Propriétaire : Vito

### RQ-07 — Dette produit si on ajoute NFC/POS trop vite
- Catégorie : Produit / Technique
- Probabilité : Moyenne
- Impact : Majeur
- Symptôme : perte de focus, MVP mal poli
- Mitigation : roadmap figée (cf ADR-006), refuser les demandes NFC des premiers clients sauf prix premium explicite
- Propriétaire : Vito

### RQ-08 — Support humain sous-estimé
- Catégorie : Opérations
- Probabilité : Élevée
- Impact : Majeur
- Symptôme : temps passé à dépanner > temps passé à vendre et à dev
- Mitigation : FAQ, vidéos courtes, WhatsApp support, SLA clair
- Propriétaire : Vito

## 4. Risques à surveiller (sans action immédiate)

- Évolution des Terms Apple/Google Wallet (veille mensuelle)
- Arrivée d'un concurrent direct bien financé
- Dépendance à un seul hébergeur (backup stratégique à prévoir en Phase 2)
