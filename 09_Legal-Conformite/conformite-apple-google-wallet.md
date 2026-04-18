---
name: Conformité Apple & Google Wallet
description: Exigences des programmes Apple Wallet et Google Wallet
type: legal
status: 🟠 Brouillon
version: 1.0
owner: Vito
updated: 2026-04-17
---

# Conformité Apple & Google Wallet

## 1. Objectif du document
Identifier les exigences Apple et Google pour la distribution de passes Wallet, et les contraintes qui en découlent.

## 2. Apple Wallet

### Programme développeur
- Inscription Apple Developer Program (99 $/an).
- Compte au nom de l'entité juridique Primpay.
- Certificat Pass Type ID à générer et à sécuriser.

### Types de passes disponibles
- **Store card** : carte de fidélité (notre cas).

### Règles éditoriales
- Pas de contenu inapproprié.
- Logo cohérent avec la marque réelle.
- Utilité claire pour l'utilisateur.

### Contraintes techniques
- Format `.pkpass` signé.
- Mise à jour via Push Notification Service (APNs).
- Révocation possible (nous l'utilisons).

### Mentions dans le pass
- Nom de l'émetteur (nous ou le commerçant).
- Possibilité de navigation vers une app si elle existe (notre cas : lien web).

## 3. Google Wallet

### Programme développeur
- Inscription Google Pay & Wallet API (gratuit).
- Compte Google Cloud associé.
- OAuth 2.0 + service account pour la génération de passes.

### Types de passes disponibles
- **Loyalty class / object** : carte de fidélité (notre cas).

### Règles éditoriales
- Similaires à Apple : cohérence, utilité, respect des standards.
- Validation en 2 à 5 jours ouvrés avant mise en prod.

### Contraintes techniques
- Format JSON signé (JWT).
- Mise à jour via API.
- Lien `save to Google Wallet` généré côté serveur.

## 4. Points communs

- Exigence d'une politique de confidentialité publique.
- Mention du traitement des données dans l'ajout Wallet.
- Pas d'app mobile requise (conforme à notre stratégie).

## 5. Points de divergence à gérer

| Point | Apple | Google |
|---|---|---|
| Coût programme | 99 $/an | Gratuit |
| Validation initiale | Auto (via certificat) | Manuelle (2–5 j) |
| Push notifications | APNs | FCM |
| Détection de device | User-agent | User-agent |
| Design latitude | Plus strict | Plus flexible |

## 6. Politique utilisateur

- Page de confidentialité obligatoire.
- Mention dans l'onboarding : "En ajoutant cette carte, vous acceptez que [Commerçant] via Primpay traite votre prénom et numéro pour gérer votre fidélité."

## 7. Règles à respecter côté Primpay

### Ce qu'on peut faire
- Émettre un pass au nom du commerçant.
- Diffuser via lien public QR ou landing.
- Mettre à jour dynamiquement le solde.
- Envoyer des notifications Wallet (Phase 2) avec modération.

### Ce qu'on ne peut pas faire
- Rediriger vers une app store.
- Contenir des informations mensongères.
- Spammer via notifications.
- Revendre les données Wallet à des tiers.
- Utiliser les passes pour du paiement (hors scope de nos types de passes).

## 8. Workflow de génération

### Apple
1. Template JSON (`pass.json`).
2. Images (icône, logo, strip).
3. Signature avec certificat Pass Type ID.
4. Packaging `.pkpass`.
5. Serveur de mise à jour (web service) pour syncs automatiques.

### Google
1. Payload JSON JWT.
2. Images (hero, logo).
3. Signature avec service account.
4. URL "Save to Google Wallet".

## 9. Identification device

- Landing page publique détecte iOS vs Android.
- Affiche le bon bouton "Add to Apple Wallet" ou "Save to Google Wallet".
- Fallback pour desktop : QR + instructions.

## 10. Risques spécifiques

### RQ-A1 — Compte développeur Apple suspendu
- Impact : plus de nouveaux passes iOS.
- Mitigation : respecter strictement les guidelines, surveiller les emails Apple.

### RQ-A2 — Compte Google Wallet API suspendu
- Impact : plus de nouveaux passes Android.
- Mitigation : idem.

### RQ-A3 — Changement de politique Apple / Google
- Impact : adaptation nécessaire (pass format, consent).
- Mitigation : veille mensuelle des programmes.

## 11. Décisions figées
- Inscription aux deux programmes dès Sprint 0.
- Génération conforme aux guidelines Apple et Google sans exception.
- Pas de notifications marketing au MVP.

## 12. Questions ouvertes
- Utiliser un provider tiers (Passkit, Walletly) ou tout construire nous-mêmes ? Trade-off temps vs dépendance.
- Gérer les 2 providers en Phase 1 ou commencer avec un seul ?

## 13. Next steps
- Créer les 2 comptes développeurs dès J1.
- Premier pass Apple + Google generés en Sprint 3.
- Relecture des guidelines officielles tous les 3 mois.
