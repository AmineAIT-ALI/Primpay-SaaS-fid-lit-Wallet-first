---
Title: Runbook — Pricing Change
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/runbooks
Depends on: 05_Business/pricing.md
Used by: —
---

# Objectif

Procédure pour modifier les tarifs sans impact brutal sur les clients actifs.

# Règles

- Tout changement de prix nécessite une décision D1 dans `00_Pilotage/decision-log.md`.
- Les clients existants sont protégés pendant 30 jours minimum après l'annonce.
- Jamais de hausse de prix sans communication préalable.

# Procédure de changement de prix

## 1. Décision D1

- Documenter dans `decision-log.md` : raison, nouveau prix, date d'effet.
- Mettre à jour `05_Business/pricing.md`.

## 2. Mise à jour Stripe

```
Dashboard Stripe → Products
→ Modifier le price du plan concerné
→ Créer un nouveau price (ne pas modifier l'ancien — breaking change pour les abonnements existants)
→ Migrer les abonnements existants vers le nouveau price (Stripe UI ou API)
```

## 3. Communication aux merchants

Email de préavis 30 jours avant entrée en vigueur :
```
Objet : [Primpay] Évolution de nos tarifs — [DATE]
Notre offre [Solo/Multi] évoluera de [X] € à [Y] € à partir du [DATE].
Votre abonnement actuel est maintenu au prix actuel jusqu'au [DATE-30j].
```

## 4. Mise à jour de la landing page

- Page de pricing.
- Mettre à jour `05_Business/pricing.md` avec la nouvelle grille.

## 5. Vérification post-changement

- Vérifier les nouveaux abonnements dans Stripe dashboard.
- Vérifier que les webhooks Stripe traitent correctement le nouveau price.

# Dépendances

- `05_Business/pricing.md`, `00_Pilotage/decision-log.md`
