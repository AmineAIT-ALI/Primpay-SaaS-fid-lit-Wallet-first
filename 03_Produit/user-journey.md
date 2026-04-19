---
Title: User Journey
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: mvp-scope.md
Used by: 11_Schemas/user-flow.md
---

# User flows

## 1. Objectif du document
Décrire pas à pas les parcours critiques. Sert de brief pour les maquettes et le développement.

## 2. Flow 1 — Onboarding client (ajout de la carte Wallet)

1. Client voit un sticker QR "Ajoutez votre carte fidélité" sur le comptoir.
2. Il scanne avec son appareil photo.
3. Il atterrit sur une page responsive (pas d'app à installer).
4. Il saisit prénom + téléphone (le minimum nécessaire).
5. Il clique "Ajouter à Apple Wallet" (ou Google Wallet selon device).
6. Le pass est installé dans son Wallet.
7. Le compte `customer` et le `loyalty_account` sont créés côté serveur.
8. Page de confirmation : "Carte ajoutée. À votre prochain passage, présentez-la."

**Temps cible** : < 30 secondes.

## 3. Flow 2 — Crédit fidélité en caisse (usage normal)

### Variante A — Scan
1. Client présente son pass Wallet.
2. Staff ouvre la PWA sur son téléphone / tablette.
3. Staff clique "Scanner".
4. La caméra s'ouvre, lit le QR.
5. Backend valide (signature, rate-limit, cooldown).
6. Confirmation visuelle : "+1 tampon — 7/10 — 3 avant récompense".
7. Staff rend la main.

### Variante B — Recherche
1. Staff clique "Rechercher".
2. Tape prénom ou téléphone.
3. Résultats instantanés.
4. Staff sélectionne le bon client.
5. Clique "+1".
6. Confirmation.

### Variante C — Derniers clients
1. Staff voit la liste des 10 derniers clients crédités (par ordre chronologique).
2. Clique sur le bon.
3. Clique "+1".
4. Confirmation.

**Temps cible** : 2 secondes (variantes B et C), 4 secondes (variante A).

## 4. Flow 3 — Récompense atteinte et consommée

1. Le client atteint le seuil (ex. 10/10 tampons).
2. Au prochain scan ou recherche, l'interface affiche un badge "Récompense disponible".
3. Fiche client : bouton "Utiliser la récompense".
4. Staff clique.
5. Modal de confirmation : "Offrir 1 pizza ? Oui / Non".
6. Confirmation → lock serveur, status `redeemed`.
7. Compte reward à zéro, cycle recommence.

**Temps cible** : < 2 secondes entre clic et confirmation.

## 5. Flow 4 — Onboarding commerçant

1. Vito fait la démo en face-à-face, signe l'offre.
2. Commerçant reçoit un email avec lien d'activation.
3. Il crée son compte owner (email + mot de passe).
4. Checklist guidée :
   - Nom du commerce + adresse.
   - Type de programme (points / tampons).
   - Seuil de récompense + libellé.
   - Ajout du staff (emails).
   - Impression du QR public (PDF à télécharger).
5. Il active son programme.
6. Il reçoit le pack signalétique (sticker, chevalet) dans les 3 jours.

**Temps cible** : < 10 minutes pour les étapes en ligne.

## 6. Flow 5 — Staff utilise la PWA pour la première fois

1. Staff reçoit email d'invitation.
2. Il clique, définit son mot de passe.
3. Il ouvre la PWA sur son téléphone.
4. Il "installe" la PWA sur l'écran d'accueil (guide étape par étape).
5. Il arrive sur l'écran principal (5 boutons).
6. Tutoriel de 3 écrans en overlay (scanner, rechercher, crédit rapide).
7. Il est opérationnel.

**Temps cible** : < 2 minutes.

## 7. Edge cases à documenter

- Client sans réseau au moment de l'ajout Wallet → explicitation nécessaire.
- Staff sans connexion stable → message clair, pas de crash.
- QR invalide / expiré / falsifié → message "QR non reconnu".
- Double scan en quelques secondes → rejeté silencieusement (cooldown).
- Reward déjà consommée côté serveur → blocage UI.
- Client inexistant en recherche → proposition de l'ajouter.

## 8. Questions ouvertes
- Faut-il un SMS de confirmation côté client lors de l'ajout ?
- Le staff doit-il pouvoir saisir un client sans passer par l'ajout Wallet (cas "client sans smartphone") ?

## 9. Next steps
- Maquettes basse fidélité de chaque écran mentionné.
- Test du parcours client avec 3 personnes non-préparées.
