---
Title: User Flow
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 11_Schemas
Depends on: 03_Produit/user-journey.md
Used by: —
---

# Objectif

Visualiser les parcours utilisateurs principaux sous forme de flows.

# Flow 1 — Onboarding merchant (owner)

```
Prospect reçoit lien d'essai (ou visite landing)
  └─► Page landing → CTA "Commencer l'essai gratuit"
        └─► Formulaire : nom commerce, email, mot de passe
              └─► Création compte → trial 14 jours
                    └─► Wizard de configuration (4 étapes) :
                          1. Nom du programme
                          2. Type : points ou tampons
                          3. Seuil de récompense
                          4. Libellé de la récompense
                    └─► Génération du QR code à afficher en caisse
                          └─► PDF téléchargeable (sticker + affichette)
                    └─► Accès à la PWA staff
```

**Durée cible** : < 10 minutes de la landing à la PWA opérationnelle.

---

# Flow 2 — Premier crédit staff (day 1 du merchant)

```
Gérant explique à son staff (2 minutes)
  └─► Staff ouvre URL de la PWA sur son téléphone
        └─► Connexion (email + mot de passe reçu par email)
              └─► Écran principal : 3 boutons (Scan / Rechercher / Derniers clients)
                    └─► Première fois : bouton "Scanner le QR d'un client"
                          └─► Client scanne le QR affiché en caisse → ajoute au Wallet
                                └─► Staff voit le client apparaître dans "Derniers clients"
                                      └─► Staff clique sur le client → "+1 crédit"
                                            └─► Confirmation : "Crédit ajouté ✓"
```

**Durée cible** : < 2 secondes entre identification client et confirmation crédit.

---

# Flow 3 — Parcours client final

```
Client voit le QR code en caisse
  └─► Client sort son téléphone, ouvre l'appareil photo
        └─► Scan du QR → ouverture page web (Safari / Chrome)
              └─► Page simple : "Ajouter votre carte de fidélité"
                    └─► Bouton "Ajouter à Apple Wallet" / "Ajouter à Google Wallet"
                          └─► Confirmation iOS/Android → pass ajouté
                                └─► Wallet affiche : "0 tampon — prochaine récompense à 10"
```

**Durée cible** : < 30 secondes du scan à la carte dans le Wallet.

---

# Flow 4 — Client régulier (Nème visite)

```
Client commande
  └─► Staff identifie le client (scan QR Wallet / recherche / derniers clients)
        └─► Staff appuie "+1 crédit" — < 2 secondes
              └─► Pass Wallet du client se met à jour automatiquement
                    └─► Client reçoit notification Wallet (si activée — Phase 2)
                          └─► "9/10 tampons — encore 1 pour votre récompense !"
```

---

# Flow 5 — Encaissement récompense

```
Client atteint le seuil
  └─► Récompense créée automatiquement
        └─► Pass Wallet mis à jour : "Récompense disponible : [libellé]"
              └─► Lors de la prochaine visite :
                    └─► Staff voit "1 récompense disponible" sur la fiche client
                          └─► Staff clique "Encaisser"
                                └─► Récompense consommée → solde remis à 0
                                      └─► Pass Wallet mis à jour
```

# Décisions figées

- L'onboarding merchant doit être complet en < 10 minutes.
- L'ajout Wallet client doit fonctionner en < 30 secondes.
- L'interface staff n'a que 3 actions visibles sur l'écran principal.

# Dépendances

- `03_Produit/user-journey.md`, `03_Produit/features.md`, `11_Schemas/data-flow.md`
