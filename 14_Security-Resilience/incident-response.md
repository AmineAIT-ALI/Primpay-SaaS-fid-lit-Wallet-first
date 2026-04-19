---
Title: Incident Response
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 12_Execution-System/runbooks/incident.md
Used by: —
---

# Objectif

Protocole de réponse à incident de sécurité : détection, containment, analyse, communication.

# Types d'incidents sécurité

| Type | Exemples | Niveau |
|---|---|---|
| Violation multi-tenant | Merchant A accède aux données de Merchant B | P1 — Critique |
| Vol de données PII | Accès non autorisé à `customers` | P1 — Critique |
| Compromission credentials | JWT secret, clé API volée | P1 — Critique |
| Fraude fidélité à grande échelle | > 100 crédits anormaux sur 1 h | P2 — Majeur |
| Tentative d'intrusion détectée | Scan de ports, tentatives SQL injection | P3 — Mineur |

# Protocole P1 — Incident critique

## 1. Contenir (0–30 min)

- Désactiver immédiatement les credentials compromis (JWT secret → rotation, clé API → révocation).
- Si violation multi-tenant : couper l'accès du merchant concerné temporairement.
- Si intrusion en cours : bloquer l'IP sur Cloudflare.
- Ne pas détruire les preuves (logs, snapshots).

## 2. Analyser (30 min – 4 h)

- Identifier le vecteur d'attaque.
- Mesurer l'étendue des données exposées.
- Vérifier les logs `loyalty_events` pour des anomalies.
- Vérifier les logs d'accès Nginx.

## 3. Notifier (selon étendue)

### Si données personnelles exposées (RGPD)

**Obligation** : notifier la CNIL dans les **72 heures**.

Email CNIL : notifications@cnil.fr (ou via le formulaire en ligne).

Contenu :
- Nature de la violation
- Catégories et nombre approximatif de personnes concernées
- Mesures prises

### Notifier les merchants concernés

Dans les 72 h si leurs données ou celles de leurs clients sont impactées.

## 4. Résoudre

- Corriger la vulnérabilité exploitée.
- Déployer le correctif (procédure d'urgence sans CI complet si P1).
- Rotation de tous les secrets potentiellement compromis.

## 5. Post-mortem (7 jours)

→ `00_Pilotage/template-post-mortem.md`

Contenu :
- Timeline de l'incident
- Root cause
- Impact réel
- Corrections apportées
- Mesures préventives

# Décisions figées

- Notification CNIL obligatoire si données personnelles exposées.
- Post-mortem obligatoire après tout incident P1.
- Ne jamais détruire les logs avant analyse complète.

# Dépendances

- `12_Execution-System/runbooks/incident.md`, `09_Legal/rgpd.md`
