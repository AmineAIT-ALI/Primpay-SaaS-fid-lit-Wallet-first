---
Title: Glossary
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: —
Used by: tous les documents
---

# Glossaire Primpay

## 1. Objectif
Aligner le vocabulaire entre toi, moi, et les futurs collaborateurs. Si un terme revient 3 fois dans un doc, il doit être ici.

## 2. Termes

| Terme | Définition |
|---|---|
| **Wallet** | Apple Wallet / Google Wallet. Portefeuille natif du smartphone qui stocke des cartes (paiement, transport, fidélité). |
| **Pass / Wallet pass** | Carte numérique stockée dans le Wallet du client. Contient un QR signé, un identifiant client, des infos visuelles. |
| **QR fixe signé** | QR code unique et permanent par client, contenant un payload signé côté serveur. Ne change pas dans le temps. |
| **PWA** | Progressive Web App. Application web qui s'installe comme une app sur téléphone/tablette, sans passer par les stores. |
| **Mode rush** | UX optimisée pour les moments de forte affluence : moins de 2 secondes entre l'arrivée du client et le crédit validé. |
| **Multi-tenant** | Un seul backend, plusieurs restaurants isolés. Chaque requête filtrée par `merchant_id`. |
| **Merchant** | Restaurant / commerçant. Entité qui possède un ou plusieurs `merchant_locations`. |
| **Customer** | Client final. Utilisateur du Wallet. L'identité est gérée globalement pour faciliter l'enrôlement chez plusieurs commerçants, mais les données personnelles et de fidélité sont strictement cloisonnées par `merchant`. |
| **Loyalty program** | Programme de fidélité d'un merchant : règles de points, tampons, seuils, récompenses. |
| **Loyalty account** | Compte fidélité d'un `customer` chez un `merchant`. Porte les soldes points/tampons. |
| **Loyalty event** | Événement historisé : crédit, débit, redeem, ajustement. Source de vérité de l'activité. |
| **Reward** | Récompense acquise par un client. Cycle de vie : `available → redeemed` ou `expired`. |
| **Redeem** | Consommation d'une reward par le staff. Opération transactionnelle verrouillée. |
| **Staff user** | Employé d'un merchant (owner, manager, serveur). Authentifié, rattaché à un merchant. |
| **ICP** | Ideal Customer Profile. Profil type du client cible. |
| **Setup fee** | Frais d'installation unique à la signature. |
| **MRR** | Monthly Recurring Revenue. Revenu mensuel récurrent. |
| **Churn** | Taux d'attrition commerçants. |
| **CAC** | Customer Acquisition Cost. Coût d'acquisition d'un commerçant. |
| **NFC** | Near Field Communication. Technologie de paiement/lecture sans contact. Reporté post-MVP. |
| **POS** | Point of Sale. Caisse enregistreuse. Intégration reportée post-MVP. |

## 3. À ajouter au fil de l'eau
Tout nouveau terme technique, métier ou marketing qui apparaît dans ≥ 2 documents.
