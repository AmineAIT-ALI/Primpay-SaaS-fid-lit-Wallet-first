---
name: UX restaurateur
description: Principes et écrans de l'interface commerçant
type: product
status: 🟡 En cours
version: 1.0
owner: Vito
updated: 2026-04-17
---

# UX restaurateur

## 1. Objectif du document
Définir les principes et les écrans de la PWA commerçant. Tout écart à ces principes doit être justifié.

## 2. Principes directeurs

### Principe 1 — Moins de 5 actions visibles par écran
Pas de menu dense, pas de hamburger bourré d'options. L'écran principal a **5 éléments max**.

### Principe 2 — Temps avant l'action < 2 secondes
Quand le staff ouvre la PWA, le bouton le plus utilisé doit être atteint en 0 clic ou 1 tap.

### Principe 3 — Feedback immédiat
Chaque action se termine par un feedback visuel clair (couleur, chiffre, vibration légère sur mobile).

### Principe 4 — Pas de formation nécessaire
Un staff qui n'a jamais vu l'outil doit s'en servir correctement en moins de 2 minutes.

### Principe 5 — Mobile-first, tablette compatible, desktop acceptable
Le staff utilise majoritairement un téléphone ou une tablette caisse. Le desktop est secondaire.

## 3. Écran 1 — Caisse / rush (écran principal)

### Contenu
- Bouton **SCANNER** (grande taille, en haut).
- Champ **RECHERCHE** (sous le scan).
- Liste **DERNIERS CLIENTS** (10 derniers, chronologique inversé).
- Bouton **+1** rapide sur chaque ligne de la liste.
- Badge **reward dispo** (visible immédiatement sur la ligne du client concerné).

### Ce qui ne doit PAS y être
- Analytics.
- Config programme.
- Menu de navigation touffu.
- Notifications intrusives.

## 4. Écran 2 — Fiche client

### Contenu
- Prénom + identifiant court (ex. `AMIN-1423`).
- Progression visuelle (barre ou jauge tampons).
- Historique récent (5 derniers événements).
- Bouton **+1**.
- Bouton **Utiliser la récompense** (si disponible, bien visible en couleur).

### Règles
- Pas de champ éditable ici (le staff ne modifie pas le client depuis cet écran).
- Les infos sensibles (téléphone) sont tronquées par défaut.

## 5. Écran 3 — Admin programme

### Accès
- Owner et manager uniquement.
- Entrée via un menu "Réglages" distinct de l'écran caisse.

### Contenu
- Type de programme : points / tampons (toggle).
- Seuil de récompense.
- Libellé de la récompense (ex. "1 pizza offerte").
- Cooldown (minutes).
- Limite journalière.
- Bouton "Activer" / "Désactiver" le programme.

## 6. Écran 4 — Analytics

### Accès
- Owner et manager.

### Contenu (MVP)
- Clients inscrits (total et nouveaux 7/30 jours).
- Fréquence de visite moyenne.
- Rewards émises.
- Rewards consommées.
- Taux de retour (% de clients revenus dans les 30 jours).

### Ce qui n'y est PAS au MVP
- Cohortes, segmentation, funnel, LTV.

## 7. Écran 5 — Staff management

### Accès
- Owner.

### Contenu
- Liste des staff avec rôle.
- Ajout par email (envoi invitation).
- Suppression ou changement de rôle.

## 8. Navigation

- Écran principal = caisse.
- Icône "Menu" en coin pour accéder à : admin programme, analytics, staff, réglages, logout.
- Jamais plus de 2 niveaux de profondeur.

## 9. États visuels critiques

| État | Visuel |
|---|---|
| Crédit validé | Vert, animation rapide, chiffre mis à jour |
| Reward disponible | Couleur accent, badge en haut de fiche |
| Reward consommée | Gris, animation de checkmark |
| QR invalide | Rouge, message clair, pas de crash |
| Réseau perdu | Bandeau en haut, actions désactivées |
| Cooldown actif | Toast informatif, pas de blocage sur autre client |

## 10. Accessibilité minimale

- Contraste AA.
- Taille de police minimum 16 px.
- Zones tactiles 44×44 px minimum.
- Pas de reliance sur la couleur seule (icônes + texte).

## 11. Questions ouvertes
- Faut-il un mode sombre par défaut (utile en caisse sous lumière forte) ?
- L'écran caisse doit-il avoir un sound feedback ("bip" au crédit validé) ?

## 12. Next steps
- Wireframes basse fidélité des 5 écrans.
- Prototype cliquable testé avec 3 staff réels.
