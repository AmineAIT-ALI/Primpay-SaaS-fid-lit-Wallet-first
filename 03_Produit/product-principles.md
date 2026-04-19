---
Title: Product Principles
Owner: Amine AIT ALI
Status: frozen
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: 01_Fondations/principles.md
Used by: mvp-scope.md, exclusions.md
---

# Objectif

Fixer les principes produit non négociables qui guident les arbitrages de scope et de design.

# Contexte

Les principes fondateurs (`01_Fondations/principles.md`) sont stratégiques. Ces principes produit sont opérationnels : ils guident les décisions de développement quotidiennes.

# Principes produit

## PP1 — La caisse en rush est le juge de paix

> Toute feature est évaluée dans les conditions les pires : 15 personnes en file, staff stressé, téléphone graisseux.

Implications :
- Zéro clic inutile dans le flow de crédit.
- Boutons larges, texte lisible, pas d'états ambigus.
- La recherche client doit fonctionner avec 2 lettres ou un numéro partiel.

## PP2 — Le merchant configure une fois, le staff n'a rien à comprendre

> L'interface staff doit être utilisable après 2 minutes d'explication orale.

Implications :
- 5 fonctions maximum sur l'écran principal staff : scan, recherche, derniers clients, +1, encaisser récompense.
- Pas de paramètre caché, pas de mode avancé visible sur l'écran caisse.
- Onboarding guidé pour l'owner, pas pour le staff.

## PP3 — L'état est toujours visible

> Le staff et le client doivent toujours savoir où en est le compte fidélité, sans avoir à chercher.

Implications :
- Le pass Wallet affiche toujours le solde en temps réel (mise à jour push après chaque crédit).
- L'interface merchant affiche le solde du client immédiatement après identification.
- Pas d'état "en cours de traitement" visible sans feedback.

## PP4 — Les erreurs ne peuvent pas ruiner une visite

> Une erreur doit être récupérable sans appel à un admin.

Implications :
- Crédit fait en double → annulation possible par le manager dans les 10 min.
- QR invalide → message clair + alternative (recherche manuelle).
- Réseau coupé → afficher un mode dégradé lisible, pas une page blanche.

## PP5 — Pas de feature sans owner dans le code

> Toute feature livrée doit avoir un test, un log, et un chemin de monitoring.

Implications :
- Chaque `loyalty_event` est loggé avec source et staff_user_id.
- Chaque endpoint critique a un test d'intégration.
- Chaque passe Wallet émise est tracée dans `wallet_passes`.

# Décisions figées

- Ces principes sont **frozen**. Modification = décision D1.

# Questions ouvertes

_Aucune._

# Dépendances

- `01_Fondations/principles.md`, `03_Produit/mvp-scope.md`, `03_Produit/features.md`
