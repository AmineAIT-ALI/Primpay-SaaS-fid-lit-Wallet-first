---
Title: Execution System — README
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System
Depends on: 00_Pilotage/
Used by: —
---

# Objectif

Transformer les décisions en exécution répétable. Ce dossier contient tout ce qui permet d'agir sans réinventer à chaque fois.

# Structure

```
12_Execution-System/
├── README.md (ce fichier)
├── execution-metrics.md     — Mesurer la performance de l'exécution
│
├── playbooks/               — Stratégies opératoires guidées (comment gagner)
│   ├── sales.md             — Démarchage terrain, script, conversion
│   ├── growth.md            — Activation de la croissance
│   ├── launch.md            — Séquence de lancement commercial
│   └── recovery.md          — Récupération après incident ou blocage
│
├── runbooks/                — Procédures techniques répétables (comment faire)
│   ├── deploy.md            — Déploiement production
│   ├── incident.md          — Gestion d'incident P1
│   ├── rollback.md          — Rollback d'un déploiement
│   ├── scaling.md           — Mise à l'échelle infra
│   └── pricing.md           — Changement de tarification
│
├── sop/                     — Procédures métier standardisées
│   ├── onboarding.md        — Onboarding d'un nouveau merchant
│   ├── support.md           — Traitement des demandes support
│   └── customer-success.md  — Suivi client : activation, rétention, NPS
│
└── automations/             — Scripts, jobs, triggers automatisés
    ├── scripts.md           — Inventaire des scripts
    ├── jobs.md              — Jobs planifiés (cron)
    └── triggers.md          — Triggers événementiels
```

# Quand utiliser quoi

| Situation | Document à consulter |
|---|---|
| Je dois aller vendre demain matin | `playbooks/sales.md` |
| Un merchant vient de signer | `sop/onboarding.md` |
| L'API est en panne | `runbooks/incident.md` |
| Je dois déployer en prod | `runbooks/deploy.md` |
| Le déploiement a cassé quelque chose | `runbooks/rollback.md` |
| Je veux mesurer l'efficacité de l'exécution | `execution-metrics.md` |

# Principes

- Chaque procédure est testée en vrai avant d'être considérée comme fiable.
- Si une procédure est exécutée > 3 fois, elle doit être documentée ici.
- Aucune procédure critique sans owner identifié.

# Dépendances

- `00_Pilotage/decision-to-action-map.md`, `08_Performance-System/triggers.md`
