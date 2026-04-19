---
Title: Data Intelligence — README
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 13_Data-Intelligence
Depends on: —
Used by: 08_Performance-System/
---

# Objectif

Instrumenter le système, collecter les signaux, détecter les dérives, alimenter les décisions.

# Structure

```
13_Data-Intelligence/
├── README.md           — Ce fichier
├── tracking-plan.md    — Quels événements tracker, avec quelles propriétés
├── events.md           — Catalogue exhaustif des événements
├── analytics.md        — Analyses récurrentes et lectures des données
├── feedback-loop.md    — Comment les données remontent aux décisions
├── ab-testing.md       — Tests A/B et expérimentations
├── attribution.md      — Attribution des conversions aux canaux
├── data-pipeline.md    — Pipeline de collecte et transformation
├── data-quality.md     — Règles de qualité des données
├── drift-detection.md  — Détection précoce des dérives
└── realtime-layer.md   — Niveau de réactivité requis par flux
```

# Maturité par phase

| Phase | Niveau data |
|---|---|
| MVP (Phase 1) | Logs serveur + requêtes SQL manuelles + Sentry |
| Phase 1.5 | Dashboard interne simple + tracking events clés |
| Phase 2 | PostHog ou Mixpanel + pipeline analytics + alertes automatiques |

# Principes data

- Pas de tracking client final sans base légale (RGPD).
- Sentry : jamais de PII dans les breadcrumbs.
- Les données analytics sont agrégées, pas individualisées dans les dashboards.
- La source de vérité reste toujours la BDD PostgreSQL.

# Dépendances

- `08_Performance-System/`, `09_Legal/rgpd.md`
