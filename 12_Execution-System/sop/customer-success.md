---
Title: SOP — Customer Success
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/sop
Depends on: sop/onboarding.md
Used by: —
---

# Objectif

Procédure de suivi client : onboarding, activation, retention, NPS.

# Cycle de vie merchant

```
Signature → Onboarding → Activation → Rétention → Expansion → (ou Churn)
```

# Étapes et actions

## J+0 — Signature

- [ ] Email de bienvenue automatique (Stripe → webhook → email).
- [ ] Appel de bienvenue dans les 24 h (MVP : WhatsApp / téléphone).
- [ ] Planifier l'onboarding sur place.

## J+1 à J+3 — Onboarding sur place

→ Voir `sop/onboarding.md` pour le détail complet.

Objectif : premier crédit réel en caisse dans les 3 jours.

## J+7 — Check-in d'activation

- Appel ou message : "Tout se passe bien ? Votre staff utilise la PWA ?"
- Vérifier dans la BDD : `loyalty_events` > 0 depuis l'onboarding.
- Si 0 événements → appel d'urgence pour débloquer.

## J+14 — Entretien satisfaction

- 10 minutes en présentiel ou vidéo.
- Questions : "Qu'est-ce qui marche bien ? Qu'est-ce qui coince ?"
- Documenter les retours dans `06_GoToMarket/experiments.md`.

## J+30 — Premier NPS

- Email avec 1 seule question : "Recommanderiez-vous Primpay à un autre commerçant ?" (0–10).
- Suivis des réponses :
  - 9–10 (Promoteur) → demander un témoignage + activation parrainage.
  - 7–8 (Passif) → call pour comprendre ce qui manque.
  - 0–6 (Détracteur) → call d'urgence pour éviter le churn.

## M2, M3 — Revues mensuelles (merchants pilotes)

- Partage des stats : crédits total, clients actifs, récompenses émises.
- Identification des demandes d'évolution.
- Mise à jour `06_GoToMarket/experiments.md` avec les retours.

## Signal de churn (inactivité > 14 jours)

- Si aucun `loyalty_event` en 14 jours → alerte dans `08_Performance-System/system-health.md`.
- Contacter le merchant dans les 48 h.
- Identifier la raison : vacation, fermeture, abandon, problème produit.

# Décisions figées

- Check-in J+7 est obligatoire pour tous les merchants.
- NPS mesuré à J+30 puis tous les trimestres.

# Dépendances

- `sop/onboarding.md`, `10_Operations/support.md`, `08_Performance-System/north-star.md`
