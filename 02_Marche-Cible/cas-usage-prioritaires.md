---
name: Cas d'usage prioritaires
description: Les scénarios terrain que le produit doit servir dès le MVP
type: product
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Cas d'usage prioritaires

## 1. Objectif du document
Décrire **les 3 scénarios** que le produit doit servir parfaitement au MVP. Tout ce qui sort de ces cas est reporté.

## 2. Cas 1 — Usage normal (temps calme)

1. Le client arrive.
2. Il montre sa carte Wallet.
3. Le staff scanne le QR.
4. Le backend crédite le bon programme.
5. L'écran affiche immédiatement : point ajouté, total actuel, récompense disponible si applicable.

**Temps cible** : 2 à 4 secondes.

## 3. Cas 2 — Rush (coup de feu)

1. Le client dit son prénom / numéro de téléphone / nom de compte.
2. Le staff le retrouve en recherche instantanée (ou clique sur "derniers clients").
3. Il clique **+1**.
4. Le backend traite.

**Temps cible** : moins de 2 secondes.

## 4. Cas 3 — Récompense atteinte

1. Le client atteint un seuil (ex. 10 tampons).
2. L'interface affiche "récompense disponible".
3. Le staff clique "utiliser la récompense".
4. Le backend verrouille et consomme la reward.

**Temps cible** : 1 à 2 secondes.

## 5. Exemples concrets par segment (cercle 1)

### Pizzeria
- 1 pizza achetée = 1 tampon.
- 10 tampons = 1 pizza offerte.

### Coffee shop
- 1 café = 1 point.
- 10 points = 1 boisson offerte.

### Boulangerie
- 1 passage = 1 point.
- 20 points = viennoiserie offerte.

### Kebab / snack
- 1 menu = 1 tampon.
- 8 tampons = 1 menu offert.

## 6. Ce qui n'est PAS un cas d'usage MVP
- Multi-produits dans un même crédit (1 pizza + 1 boisson avec règles différentes).
- Promos limitées dans le temps (happy hour).
- Parrainage client-à-client.
- Programme cross-enseigne (réseau).
- Notifications push Wallet.
- Paiement via la carte Wallet.

## 7. Règles implicites

- Un client peut accumuler dans plusieurs commerces, chacun avec son programme.
- Un commerce ne voit que ses propres données (multi-tenant strict).
- Un crédit sans internet n'est pas géré au MVP (nécessite connexion staff).

## 8. Questions ouvertes
- Tolère-t-on un décalage offline → rattrapage quand le réseau revient ?
- Faut-il gérer un cas "annulation de crédit" (erreur staff) dès le MVP ?

## 9. Next steps
- Mesurer les temps cibles sur prototype dès la première version fonctionnelle.
- Observer 5 commerces en coup de feu pour valider que les 3 cas couvrent 90 % des situations.
