---
name: Parcours de signature
description: Étapes entre intérêt manifesté et commerçant actif en prod
type: business
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Parcours de signature

## 1. Objectif du document
Décrire le chemin complet entre la démo et un commerçant qui utilise Primpay en production.

## 2. Vue d'ensemble

```
Démo → OK → Inscription → CB → Onboarding → Signalétique → Activation → Premier client → Usage régulier
       ↓ 3 min      ↓ 5 min       ↓ 10 min     ↓ J+3          ↓ J+7         ↓ J+14
```

## 3. Étape 1 — Intention manifestée (fin de démo)

### Ce qui se passe
- Commerçant dit "oui" ou "je veux essayer".

### Ce qu'on fait
- Sortir la tablette.
- Démarrer l'inscription en direct.
- Ou envoyer un lien SMS / WhatsApp immédiatement si pressé.

### Durée cible
2 minutes max entre "oui" et début d'inscription.

## 4. Étape 2 — Inscription (essai 14 j)

### Ce qui se passe
- Email + mot de passe.
- Nom du commerce + adresse.
- Choix du type de programme (points / tampons).
- Seuil + libellé récompense.
- Aucune CB à ce stade.

### Livrable
Compte actif, accès à la PWA, QR public généré.

### Durée cible
5 minutes.

## 5. Étape 3 — Onboarding guidé

### Ce qui se passe
- Checklist dans le dashboard :
  - [ ] Ajouter le staff (emails).
  - [ ] Télécharger le QR public (PDF imprimable).
  - [ ] Installer la PWA sur un téléphone.
  - [ ] Faire un crédit test avec soi-même.
- Tutoriel vidéo 90 secondes.

### Livrable
Commerçant capable d'utiliser l'outil.

### Durée cible
10 minutes.

## 6. Étape 4 — Ajout CB (si démo terrain)

### Ce qui se passe
- Pendant la démo, après validation de l'onboarding.
- Lien Stripe Checkout direct.
- Setup offerte (si démo terrain).

### Durée cible
3 minutes.

## 7. Étape 5 — Livraison signalétique

### Ce qui se passe
- Commande du pack stickers + chevalet + guide.
- Envoi sous 3 jours ouvrés.
- Email de confirmation avec tracking.

### Livrable
Pack arrivé chez le commerçant.

## 8. Étape 6 — Activation réelle

### Ce qui se passe
- Stickers posés au comptoir.
- Premier vrai client scanne le QR public.
- Premier vrai crédit en caisse.

### Indicateur
Le système détecte : premier customer créé + premier loyalty_event côté staff.

### Durée cible
J+3 à J+7 après signature.

## 9. Étape 7 — Usage régulier

### Ce qui se passe
- > 10 clients inscrits.
- > 30 crédits / semaine.
- Staff fluide dans l'usage.

### Indicateur
Usage stable sur 2 semaines consécutives.

### Durée cible
J+14 à J+30 après signature.

## 10. Frictions à surveiller

| Friction | Symptôme | Mitigation |
|---|---|---|
| CB non ajoutée à J+10 | Email J+12 ignoré | Appel personnel |
| QR pas posé au comptoir | 0 nouveaux customers à J+7 | Appel "avez-vous reçu le pack ?" |
| Staff n'utilise pas | 0 crédits malgré customers | Mini-formation visio gratuite |
| Usage qui décroche à J+30 | Crédits en chute | Appel rétention |

## 11. Automatisation

### À mettre en place dès le MVP
- Email bienvenue J+0.
- Email relance J+3 si 0 client créé.
- Email J+7 bilan.
- Email J+12 fin d'essai.
- Alerte interne si 0 customer créé à J+7.
- Alerte interne si 0 crédit à J+14 après un customer créé.

### Phase 2
- Segmentation automatique : pilotes / actifs / à risque.
- Séquence d'onboarding adaptée selon segment.

## 12. Décisions figées
- Parcours signature → usage régulier en max 30 jours.
- Pack signalétique obligatoire à la signature (même si setup offerte).

## 13. Questions ouvertes
- Offrir un "onboarding premium" payant (149 €) pour les commerces non tech ?
- Faut-il un call obligatoire dans les 7 jours pour sécuriser l'activation ?

## 14. Next steps
- Implémenter les 5 emails de parcours.
- Mesurer les taux de passage d'étape sur les 20 premières signatures.
- Identifier l'étape qui fuit le plus, traiter en priorité.
