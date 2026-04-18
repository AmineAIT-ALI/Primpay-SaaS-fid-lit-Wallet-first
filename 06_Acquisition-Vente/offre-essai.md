---
name: Offre d'essai
description: Mécanique et conditions de l'essai gratuit
type: business
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Offre d'essai

## 1. Objectif du document
Détailler les conditions d'essai et leur usage commercial.

## 2. Proposition

> 14 jours gratuits. Sans carte bancaire. Sans engagement. Accès complet à l'offre Solo.

## 3. Mécanique

### À l'inscription
- Email + création de compte owner.
- Aucune CB demandée.
- Accès immédiat à la PWA.
- Onboarding guidé obligatoire (programme, QR, staff).

### Pendant les 14 jours
- Accès complet au plan Solo.
- Limite : 100 clients inscrits (sécurité anti-abus).
- Pas d'email spam (1 email à J+0, J+7, J+12, J+14).

### À J+14
- Si CB ajoutée : passage automatique en Solo payant.
- Si pas de CB :
  - J+14 à J+44 : lecture seule. Dashboard visible, création de nouveaux clients bloquée.
  - J+44 : archivage. Données conservées 90 jours.
  - J+44 + 90 jours : suppression des données (cf RGPD).

## 4. Communications pendant l'essai

### Email J+0 — Bienvenue
- Remerciement.
- Lien vers PWA + tutoriel.
- Checklist d'onboarding.

### Email J+3 — Avez-vous testé ?
- Relance si 0 client créé.
- Proposition d'appel 10 min gratuit.

### Email J+7 — À mi-parcours
- Bilan des usages.
- Astuces pour augmenter le taux d'ajout Wallet.

### Email J+12 — Bientôt la fin
- Rappel : 2 jours avant fin d'essai.
- Lien direct pour ajouter la CB.

### Email J+14 — Fin d'essai
- Si CB : confirmation du passage en Solo.
- Sinon : mise en lecture seule + invitation à reprendre.

## 5. Leviers commerciaux autour de l'essai

### Installation offerte si démo terrain
- La setup (99 €) est offerte pour toute démo terrain qui débouche sur une signature (CB ajoutée) sous 48 h.
- Crée de l'urgence, pas de baisse de prix.

### Support dédié pendant l'essai
- 1 appel 15 min gratuit à J+3 ou J+7 si demandé.
- But : lever les blocages d'usage, pas vendre.

## 6. Règle anti-abus

- Limite 100 clients pour éviter l'usage gratuit prolongé.
- Seulement 1 essai par merchant_id (par téléphone + email + adresse).
- Pas de réouverture d'essai après résiliation.

## 7. Conversion attendue

- Cible : 40 % des essais → CB ajoutée.
- Minimum acceptable : 25 %.
- Segmenter : démos terrain (60 % attendu) vs inscriptions en ligne froides (15 % attendu).

## 8. Cas particuliers

### Pilote (3 premiers commerces)
- Pas de fin d'essai à 14 jours.
- 2 mois gratuits.
- Conversion en Solo au prix normal au mois 3.

### Concurrent / journaliste / curieux
- Identifié à l'inscription si possible (email @domaine-concurrent).
- Accès réduit, pas de support, archivage à J+14 strict.

## 9. Décisions figées
- 14 jours sans CB.
- Limite 100 clients.
- Données conservées 90 jours après archivage.

## 10. Questions ouvertes
- Essai plus court (7 jours) pour accélérer la décision ?
- Essai plus long (30 jours) si setup payante activée ?
- Fournir une démo en sandbox avant inscription (pas d'essai, juste un aperçu) ?

## 11. Next steps
- Implémenter le flow J+0, J+7, J+14 côté email.
- Mesurer la conversion essai → payant sur les 20 premiers.
