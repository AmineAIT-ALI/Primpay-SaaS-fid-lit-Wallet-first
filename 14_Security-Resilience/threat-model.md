---
Title: Threat Model
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: attack-surface.md
Used by: —
---

# Objectif

Modéliser les menaces : acteurs, vecteurs, impacts, probabilités.

# Acteurs de menace

| Acteur | Motivation | Capacité |
|---|---|---|
| Client final malveillant | Fraude fidélité (faux crédits) | Faible (pas d'accès API direct) |
| Staff malveillant | Créditer des amis abusivement | Moyenne (accès à la PWA staff) |
| Merchant concurrent / malveillant | Accès données autres merchants | Moyenne (compte merchant créé) |
| Attaquant externe | Vol de données, DDoS | Variable |
| Insider (Amine compromis) | Accès total | Élevée |

# Menaces par catégorie

## M1 — Violation isolation multi-tenant

**Description** : Un merchant accède aux données d'un autre merchant.

**Vecteur** : manipulation du JWT ou du body de requête pour injecter un autre `merchant_id`.

**Impact** : Critique — violation RGPD, perte de confiance totale.

**Probabilité** : Faible si les contrôles sont en place.

**Contrôles** :
- `merchant_id` extrait du JWT uniquement (jamais du body).
- Tests automatiques d'isolation multi-tenant obligatoires avant chaque release.
- Audit de code : tout endpoint doit filtrer par `merchant_id`.

---

## M2 — Fraude fidélité (crédits abusifs)

**Description** : Staff ou client génère des crédits fictifs pour atteindre les récompenses frauduleusement.

**Vecteur** :
- Staff : spam du bouton "+1 crédit" sur le même client.
- Client : multiplier les comptes avec différents numéros de téléphone.

**Impact** : Majeur pour le merchant (récompenses offertes pour rien), mineur pour Primpay.

**Probabilité** : Moyenne.

**Contrôles** :
- Cooldown 10 min par customer/merchant.
- Daily limit 3 crédits/jour.
- Logs `loyalty_events` avec `staff_user_id` pour audit.
- Alertes sur volumes anormaux (`risk-score-light`).

---

## M3 — Vol de données clients (PII)

**Description** : Accès non autorisé à la table `customers` (numéros de téléphone).

**Vecteur** : Injection SQL, compromission des credentials BDD, accès physique VPS.

**Impact** : Critique — RGPD, amende, perte de confiance.

**Probabilité** : Faible avec les contrôles en place.

**Contrôles** :
- PostgreSQL non exposé directement sur Internet.
- Accès BDD uniquement via l'application.
- Prisma ORM + parameterized queries (pas de SQL dynamique).
- Considérer chiffrement de la colonne `phone`.

---

## M4 — DDoS sur les endpoints publics

**Description** : Saturation de l'endpoint public QR (accessible sans auth).

**Vecteur** : Botnet, scraper, stress test malveillant.

**Impact** : Dégradation service pour tous les merchants.

**Probabilité** : Faible (cible peu attractive financièrement).

**Contrôles** :
- Cloudflare WAF + rate limiting au niveau DNS.
- Rate limiting Nginx.
- Rate limiting applicatif sur l'endpoint QR.

---

## M5 — Compromission du token JWT

**Description** : Un attaquant obtient un JWT valide et usurpe l'identité d'un staff.

**Vecteur** : Vol du device, XSS (si applicable), man-in-the-middle.

**Impact** : Majeur (accès à toutes les fonctions du merchant concerné).

**Probabilité** : Faible.

**Contrôles** :
- Access token : durée de vie 15 min.
- HTTPS uniquement (pas de MitM possible).
- Refresh token stocké en httpOnly cookie ou localStorage sécurisé.

# Décisions figées

- Multi-tenant isolation = priorité absolue, testée automatiquement.
- Pas d'accès BDD direct en production.

# Dépendances

- `attack-surface.md`, `04_Technique/adr/ADR-005-multi-tenant-security.md`
