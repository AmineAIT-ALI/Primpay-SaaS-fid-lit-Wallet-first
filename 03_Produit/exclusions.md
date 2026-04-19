---
Title: Exclusions
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: mvp-scope.md
Used by: —
---

# Fonctionnalités hors MVP

## 1. Objectif du document
Lister ce qui est reporté, avec la phase où la fonctionnalité est prévue. Évite les ajouts MVP sauvages.

## 2. Phase 2 — Croissance (3–6 mois après MVP)

- **Notifications push Wallet** : messages ciblés (ex. "Tu as une récompense disponible").
- **Segmentation client** : tags automatiques (nouveau / régulier / inactif).
- **Analytics avancées** : rétention par cohorte, fréquence, LTV.
- **Onboarding commerçant amélioré** : vidéo, checklist, templates.
- **Multi-sites mature** : transferts de programme, vision consolidée.
- **Plusieurs récompenses actives** simultanément.
- **Programmes plus riches** : paliers multiples, bonus créneaux creux.
- **Gestion des annulations** (rollback d'un crédit erroné par staff).
- **Export CSV** des clients et de l'historique.

## 3. Phase 3 — Premium (6–12 mois après MVP)

- **NFC** : lecture sans contact du pass Wallet.
- **Intégration POS** : synchronisation avec la caisse (Lightspeed, Sumup, Zelty, etc.).
- **Campagnes marketing** : envois programmés, ciblage par segment.
- **Moteur promo intelligent** : suggestions automatiques basées sur le comportement.
- **Réseau inter-commerces** : programme partagé entre plusieurs commerces (cross-enseigne).
- **Parrainage client-à-client**.
- **White-label** : revente à des groupements de commerçants.
- **Mode offline** (crédits rattrapés à la reconnexion).

## 4. Non planifié / à évaluer

- **API publique** pour partenaires (intégrateurs POS, agences).
- **Paiement via la carte Wallet** (hors scope, ce n'est pas notre métier).
- **Multi-langue** (EN, ES, IT) : selon demande.
- **App mobile dédiée** : volontairement pas prévu (cf ADR-001).

## 5. Règle anti-scope creep

Toute demande d'ajout d'un commerçant doit être :
1. Notée dans un backlog.
2. Évaluée en revue hebdo.
3. Soit intégrée dans ce document (avec phase), soit refusée.

**Aucun ajout ne rentre directement dans le MVP.**

## 6. Questions ouvertes
- Ordre de priorité dans la Phase 2 (push Wallet vs analytics avancées) : à trancher selon les retours terrain.
- NFC avant ou après POS en Phase 3 ?

## 7. Next steps
- Revoir ce document en fin de MVP avec les demandes remontées par les 5 commerces pilotes.
