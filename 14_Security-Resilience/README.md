---
Title: Security & Resilience — README
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: —
Used by: 04_Technique/, 10_Operations/
---

# Objectif

Protéger le système, encaisser les incidents, apprendre sous contrainte.

# Structure

```
14_Security-Resilience/
├── README.md            — Ce fichier
├── threat-model.md      — Modèle de menace
├── attack-surface.md    — Surface d'attaque exposée
├── dependencies.md      — Dépendances critiques et leur niveau de risque
├── incident-response.md — Protocole de réponse à incident sécurité
├── backup-recovery.md   — Stratégie de sauvegarde et reprise
├── secrets-management.md — Gestion des secrets
├── resilience-rules.md  — Règles de résilience système
├── business-continuity.md — Plan de continuité d'activité
└── antifragility.md     — Tests de stress et apprentissage sous contrainte
```

# Posture sécurité MVP

Primpay traite des données personnelles (RGPD) et des données de fidélité. La posture sécurité doit être solide dès le MVP.

**Priorités** :
1. Isolation multi-tenant stricte (risque le plus élevé).
2. Protection des PII (téléphones, emails).
3. Intégrité des données de fidélité (pas de fraude possible).
4. Disponibilité pour les rushes en caisse.

# Principes de sécurité

- **Principle of least privilege** : chaque composant n'a accès qu'à ce dont il a besoin.
- **Defense in depth** : plusieurs couches (Cloudflare + Nginx + app + BDD).
- **Fail secure** : en cas d'erreur, refuser l'accès plutôt qu'autoriser.
- **No trust from body** : merchant_id toujours depuis JWT, jamais depuis le body de la requête.

# Dépendances

- `04_Technique/architecture.md`, `09_Legal/rgpd.md`, `10_Operations/`
