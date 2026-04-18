---
name: Plan de test terrain
description: Protocole des tests pilotes auprès des 3 à 5 premiers commerces
type: product
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Plan de test terrain

## 1. Objectif du document
Structurer les tests terrain pour apprendre vite et valider / invalider les hypothèses clés du MVP.

## 2. Objectifs des tests

1. Valider que le MVP fonctionne en conditions réelles (rush, staff non formé, clients variés).
2. Mesurer le temps de crédit réel en caisse.
3. Identifier les frictions d'usage staff.
4. Collecter des verbatims commerçants.
5. Tester la promesse "prêt en 10 minutes".

## 3. Sélection des pilotes

### Nombre
- 3 commerces (minimum).
- 5 commerces (idéal).

### Diversité recommandée
- 1 pizzeria.
- 1 coffee shop.
- 1 boulangerie.
- 1 kebab / snack.
- 1 cas atypique (sandwicherie, tacos, etc.).

### Profil idéal pilote
- Gérant engagé, curieux, disponible.
- Flux quotidien ≥ 50 clients.
- Au moins 2 staff différents pour tester l'adoption.
- Accepte observation et questionnaire.

### Contrepartie offerte
- 2 mois gratuits.
- Pack signalétique offert.
- Onboarding et formation sur place.
- Support prioritaire.

En échange :
- 1 feedback hebdomadaire 15 min (visio ou physique).
- Accès à leur caisse pour observation 2 fois pendant la période.
- Autorisation d'utiliser leur témoignage (avec accord écrit).

## 4. Protocole de test (par pilote)

### Semaine 1 — Onboarding
- J0 : installation complète sur place (paramétrage + staff formé + signalétique posée).
- J1 : call de 10 min "tout va bien ?".
- J3 : visite surprise pendant un rush pour observation.
- J7 : bilan semaine 1 (30 min).

### Semaines 2–3 — Run
- Observation passive via dashboard.
- 1 call hebdo 15 min pour feedback.
- Correction rapide des bugs bloquants.

### Semaine 4 — Bilan
- Entretien structuré 30 min.
- Export des métriques.
- Décision : garder comme client payant ou non.

## 5. Ce qu'on mesure

### Métriques quantitatives
- Nombre de customers créés / jour.
- Nombre de crédits / jour.
- Répartition scan / recherche / derniers clients.
- Temps moyen de crédit.
- Rewards émises / consommées.
- Erreurs utilisateur (QR invalide, cooldown, etc.).

### Métriques qualitatives
- Staff a-t-il besoin d'aide ?
- Clients comprennent-ils l'ajout au Wallet ?
- Objections récurrentes des clients.
- Objections récurrentes des staffs.

## 6. Questions entretien J+7

1. Qu'est-ce qui a bien marché ?
2. Qu'est-ce qui vous agace dans l'outil ?
3. Vos clients ajoutent-ils facilement leur carte ?
4. Le staff utilise-t-il correctement ? Qui ? Pas qui ?
5. Avez-vous eu des questions / plaintes de clients ?
6. Combien de temps par jour passez-vous sur l'outil ?

## 7. Questions entretien J+30

1. Continueriez-vous après la gratuité ?
2. Seriez-vous prêt à payer 29 € / mois ?
3. Recommanderiez-vous à un confrère ? Qui ?
4. Qu'est-ce qui manque le plus ?
5. Quelle fonctionnalité utilisez-vous tous les jours ?
6. Quelle fonctionnalité n'utilisez-vous jamais ?

## 8. Critères de succès du plan de test

- ≥ 2 pilotes sur 3 restent en payant à J+60.
- Temps moyen de crédit mesuré < 3 s (tolérance MVP).
- Au moins 1 témoignage vidéo exploitable.
- 3 bugs bloquants max identifiés et résolus.

## 9. Risques du plan de test

- Pilote qui n'utilise jamais → perte de données.
- Pilote qui demande des fonctionnalités hors MVP → tentation de scope creep.
- Pilote qui reste ami et paie par sympathie → biais de rétention.

### Mitigation
- Sélection rigoureuse en amont.
- Documentation stricte des demandes en `fonctionnalites-hors-mvp.md`.
- Entretien honnête à J+30 : "vous paieriez 29 € sans promotion ?".

## 10. Décisions figées
- 3 pilotes minimum avant toute commercialisation payante externe.
- 2 mois de gratuité maximum.
- Entretien structuré à J+7 et J+30 obligatoire.

## 11. Questions ouvertes
- Filmer discrètement les rushs en caisse (avec accord) pour revue UX ?
- Pilote à distance (sans présence physique) possible ou nécessaire présence ?

## 12. Next steps
- Identifier 5 candidats pilotes dès la décision de zone géographique.
- Préparer le "kit pilote" (contrat, guide, matos).
- Démarrer le premier pilote dès MVP livré.
