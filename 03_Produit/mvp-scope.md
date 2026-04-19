---
Title: MVP Scope
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 03_Produit
Depends on: product-principles.md
Used by: 04_Technique/
---

# MVP figé

## 1. Objectif du document
Figer **le périmètre exact** du MVP. Si ce n'est pas listé ici, c'est hors scope. Toute demande d'ajout doit passer par une entrée dans `journal-decisions.md`.

## 2. Objectif du MVP

Permettre à un commerce food de proximité de :
- Onboarder un nouveau client en moins de 30 secondes.
- Créditer un passage en moins de 2 secondes.
- Déclencher et consommer automatiquement une récompense.
- Voir un dashboard minimal de ses clients et de leur activité.

**KPI principal du MVP** : temps réel d'utilisation en caisse.

## 3. Fonctionnalités MVP (ce qu'on construit)

### 3.1 Onboarding client
- QR public affiché dans le commerce.
- Scan → page d'ajout Wallet avec prénom + téléphone.
- Génération du pass Apple Wallet / Google Wallet.
- Création du compte customer et du loyalty account lié au merchant.

### 3.2 Wallet
- QR fixe signé intégré au pass.
- Affichage minimal : nom du commerce (ou réseau), prénom client, progression.
- Mise à jour possible du pass côté serveur.

### 3.3 Crédit fidélité (3 chemins)
- **Scan QR** : staff scanne le pass Wallet client.
- **Recherche** : staff tape prénom ou téléphone, résultat instantané.
- **Bouton rapide "derniers clients"** : liste des clients crédités récemment, clic = +1.
- Feedback immédiat à l'écran : nouveau solde, progression, reward disponible.

### 3.4 Programme de fidélité
- Type **points** OU **tampons** (exclusif, un par commerce).
- Seuil de récompense (ex. 10 tampons).
- Règles simples (1 crédit = 1 tampon, ou 1 € = 1 point).
- Une seule récompense active à la fois par programme.

### 3.5 Rewards
- Création automatique dès seuil atteint.
- Statut `available → redeemed`.
- Consommation par action staff explicite.
- Lock transactionnel (pas de double consommation).

### 3.6 Dashboard minimal
- Nombre de clients inscrits.
- Nombre de passages sur 7 / 30 jours.
- Rewards émises / consommées.
- Liste des clients actifs.

### 3.7 Admin merchant
- Config du programme (type, seuil, libellé de récompense).
- Liste staff (ajout / retrait / rôle).
- Onboarding guidé au premier login.

### 3.8 Auth
- Login / logout staff (email + mot de passe).
- JWT access + refresh.
- 3 rôles : owner, manager, staff.

### 3.9 Sécurité socle
- Multi-tenant strict (`merchant_id` partout).
- Cooldown par client / merchant.
- Limite journalière paramétrable.
- Journal complet des events.

## 4. Ce qui est **HORS MVP** (reporté)

Voir `fonctionnalites-hors-mvp.md` pour le détail. Résumé :
- Notifications push Wallet.
- NFC.
- Intégration POS.
- Analytics avancées (segmentation, rétention, cohortes).
- Campagnes marketing.
- Parrainage.
- Programme cross-enseigne.
- Mode offline.
- Multi-langue (FR uniquement au MVP).
- White-label.
- API publique pour partenaires.

## 5. Critères d'acceptation

Le MVP est considéré livré quand :
- [ ] Un commerçant peut s'inscrire, configurer son programme et l'utiliser en moins de 10 minutes.
- [ ] Un client peut ajouter sa carte au Wallet en moins de 30 secondes à partir d'un QR public.
- [ ] Le staff peut créditer un client en moins de 2 secondes (mesuré).
- [ ] Une récompense se déclenche automatiquement au bon seuil.
- [ ] Le dashboard affiche les 4 indicateurs listés en 3.6.
- [ ] 3 à 5 commerces l'utilisent en production sur 2 semaines consécutives sans blocage critique.

## 6. Décisions figées
- Cercle 1 uniquement : food de proximité à haute fréquence (voir ADR-007).
- Pas de NFC, pas de POS, pas de push au MVP (voir ADR-006).
- Un seul type de programme par commerce (points OU tampons).
- Une seule récompense active par programme au MVP.

## 7. Questions ouvertes
- Doit-on permettre l'annulation d'un crédit erroné dès le MVP ou via admin adjustment seulement ?
- Faut-il afficher une vidéo "comment ça marche" lors de l'onboarding commerçant ?
- Le client a-t-il accès à un historique détaillé ou seulement à un solde ?

## 8. Next steps
- Valider ce document avec toutes les parties prenantes.
- Dériver le `schema-base-de-donnees.md` définitif.
- Dériver les `endpoints-api.md` définitifs.
- Plan d'exécution : 3 semaines → tests terrain.
