---
Title: Unit Economics
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 05_Business
Depends on: pricing.md, cost-structure.md
Used by: scenarios.md
---

# Hypothèses unit economics

## 1. Objectif du document
Poser les hypothèses financières qui sous-tendent le business model. Toutes sont à valider via la réalité terrain.

## 2. Hypothèses de revenus

### ARPU (Average Revenue Per User)
- Plan dominant attendu : Solo à 29 € / mois.
- Taux de conversion vers Multi : 15 % en Phase 1.
- **ARPU cible** : ~33 € / mois à 6 mois.

### Setup fee
- Payante dans 40 % des cas.
- Contribution moyenne : 0,4 × 99 € = ~40 € one-shot par signature.

### Upsells Phase 2
- Taux d'attachement attendu : 10 % en Phase 2.
- Contribution : +~2 € / mois d'ARPU additionnel.

## 3. Hypothèses de coûts

### CAC (Coût d'Acquisition Client)
- Canal principal : démarchage terrain (temps fondateur).
- Coût terrain estimé : 5 démos nécessaires pour 1 signature, 1 h par démo, déplacement inclus.
- Si temps fondateur valorisé à 50 €/h : CAC temps = ~250 €.
- CAC marketing : <50 € au démarrage (bouche-à-oreille + Instagram).
- **CAC total estimé** : 250–300 € par signature.

### Coûts variables par client
- Hébergement : ~1 € / mois / merchant.
- Emails + SMS : ~0,5 € / mois.
- Stripe fees : 1,5 % + 0,25 € par transaction (sur 29 €, ~0,69 €).
- **Coût variable total** : ~2,2 € / mois par merchant.

### Coûts setup (par signature)
- Pack signalétique : ~25 €.
- Onboarding humain : ~15 € (temps).
- **Coût setup** : ~40 €.

## 4. Marges

### Marge brute récurrente
- Revenue : 29 € / mois.
- Coûts variables : 2,2 €.
- **Marge brute** : ~93 %.

### Payback CAC
- CAC : 275 €.
- Marge brute mensuelle : ~27 €.
- **Payback estimé** : ~10 mois.

### LTV (Lifetime Value)
- Durée de vie cible : 24 mois (si rétention > 80 %/an).
- LTV brute : 24 × 27 = **~650 €**.
- **Ratio LTV / CAC cible** : ~2,4x (à faire monter à 3x via parrainage + rétention).

## 5. Hypothèses de rétention

- Churn mensuel cible : 3 % (≈ rétention annuelle 70 %).
- Churn acceptable en Phase 1 : jusqu'à 5 % / mois (apprentissage).
- Churn cible en Phase 2 : 2 % / mois.

## 6. Scénarios de croissance

### Scénario conservateur (12 mois)
- 30 signatures en année 1 (≈ 3 / mois après démarrage).
- MRR 12 mois : 30 × 33 × 0,85 (churn) = **~840 €**.
- Revenu annuel : ~10 K€.

### Scénario central (12 mois)
- 80 signatures en année 1.
- MRR 12 mois : 80 × 33 × 0,85 = **~2 240 €**.
- Revenu annuel : ~27 K€.

### Scénario optimiste (12 mois)
- 150 signatures en année 1.
- MRR 12 mois : 150 × 33 × 0,85 = **~4 200 €**.
- Revenu annuel : ~50 K€.

## 7. Seuil de rentabilité (breakeven)

### Coûts fixes estimés mensuels
- Hébergement + outils : ~80 €.
- Temps fondateur (non-valorisé en cash au démarrage) : N/A.
- **Coûts fixes cash** : ~100 €.

### Breakeven cash
- 100 € / 27 € (marge par merchant) ≈ **4 merchants payants**.

⚠ Breakeven cash ≠ breakeven temps. Si on inclut le coût d'opportunité fondateur, breakeven réel se situe autour de **60–80 merchants**.

## 8. Leviers d'amélioration des unit economics

- **Parrainage** : réduit le CAC effectif.
- **Upsells** : augmente l'ARPU sans augmenter le CAC.
- **Rétention** : améliore le LTV.
- **Plan annuel prépayé** : améliore le cash flow et réduit le churn.

## 9. Questions ouvertes
- À quel moment valoriser le temps fondateur dans le CAC ?
- Quel investissement marketing déclencher après les 30 premières signatures ?
- Intégrer le coût de support au coût variable (actuellement sous-estimé) ?

## 10. Next steps
- Mettre à jour après 3 mois de run avec les vraies métriques.
- Construire un modèle financier simple (Google Sheet) partageable.
