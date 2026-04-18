---
name: Runbook onboarding commerçant
description: Procédure pas à pas pour onboarder un commerçant en moins de 10 min
type: ops
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Runbook — Onboarding commerçant

## 1. Objectif du document
Séquence opérationnelle pour onboarder un commerçant sur place ou à distance, sans rien oublier.

## 2. Pré-requis

### Côté Vito (ou opérateur)
- Téléphone avec PWA installée + compte démo.
- Tablette ou laptop.
- Carte bancaire du commerçant (sauf essai gratuit).
- Pack signalétique (si livraison immédiate).
- Accès internet fiable.

### Côté commerçant
- Email actif.
- 15 minutes disponibles.
- Pouvoir payer (si signature immédiate).
- Un téléphone ou une tablette pour tester.

## 3. Étapes (10 minutes cible)

### Étape 1 — Création du compte (1 min)
- Aller sur [URL d'inscription].
- Saisir email + mot de passe + nom du commerce + adresse.
- Choix du plan (Solo par défaut).
- Essai 14 jours OU saisie CB (selon contexte).

### Étape 2 — Paramétrage du programme (2 min)
- Type : points OU tampons.
- Seuil (ex. 10 tampons).
- Libellé récompense (ex. "1 pizza offerte").
- Cooldown (défaut 10 min).
- Limite journalière (défaut 3).

### Étape 3 — Ajout du staff (1 min)
- Saisir 1 à 3 emails staff.
- Rôle : staff par défaut.
- Envoyer invitations.

### Étape 4 — Installation PWA sur téléphone staff (2 min)
- Ouvrir le lien PWA sur le téléphone staff.
- Ajouter à l'écran d'accueil (iOS : Safari → Partager → Sur écran d'accueil ; Android : Chrome → 3 points → Ajouter à l'écran d'accueil).
- Se loguer avec le compte owner ou staff.

### Étape 5 — Génération et impression du QR public (1 min)
- Télécharger le PDF du QR public depuis le dashboard.
- Imprimer OU afficher sur téléphone pour démo.

### Étape 6 — Test en direct (2 min)
- Simuler un client : scanner le QR public avec un autre téléphone.
- Ajouter la carte au Wallet (en live).
- Passer côté PWA staff → scanner la carte → +1.
- Montrer la confirmation.

### Étape 7 — Remise du pack signalétique (1 min)
- Poser le sticker QR sur le comptoir.
- Installer le chevalet.
- Donner le mini-guide staff.
- Expliquer à l'équipe présente.

## 4. Checklist post-onboarding

Dans les 24 h qui suivent :
- [ ] Email de confirmation envoyé (automatique).
- [ ] Invitation staff active (vérifiée).
- [ ] QR public fonctionne (testé).
- [ ] Premier staff logué avec succès.

À J+3 :
- [ ] Call de contrôle 10 min avec le owner.
- [ ] Vérification dashboard : au moins 1 customer créé.

À J+7 :
- [ ] Bilan semaine 1.
- [ ] Ajustement paramètres si besoin.

## 5. Problèmes courants et résolutions

### "Le staff n'arrive pas à se loguer"
- Vérifier l'email saisi.
- Relancer l'invitation depuis le dashboard owner.
- Si mot de passe perdu : reset via lien.

### "Le QR public ne scanne pas"
- Vérifier la taille du sticker (minimum 4 cm x 4 cm).
- Éviter les reflets (carton mat plutôt que brillant).
- Tester avec plusieurs téléphones.

### "Le pass Wallet ne s'ajoute pas"
- iOS : rediriger vers Safari (pas Chrome ni app tierce).
- Android : vérifier que Google Wallet est installé (ajout depuis Play Store si besoin).
- Fallback : envoyer le lien par SMS.

### "Le commerçant veut modifier son programme"
- Admin programme → modifier seuil / type.
- ⚠ Impact sur les loyalty_accounts existants : à expliquer (pas de remise à zéro automatique).

## 6. Règles d'or

1. **Jamais partir sans avoir fait un test en direct** (customer créé + crédit effectué).
2. **Toujours laisser le pack signalétique posé**, pas dans un sac.
3. **Toujours prendre le téléphone direct du owner** pour le call J+3.

## 7. Décisions figées
- Onboarding présent obligatoire pour les pilotes.
- Onboarding à distance possible pour les signatures post-démo online.
- Pack signalétique obligatoire quel que soit le canal.

## 8. Questions ouvertes
- Faut-il une checklist digitale dans le dashboard à cocher par le commerçant ?
- Onboarding vidéo pré-enregistré pour les commerces à distance ?

## 9. Next steps
- Valider ce runbook sur les 3 premiers pilotes.
- Ajuster les timings (10 min est-il réaliste ?).
- Enregistrer une vidéo de référence.
