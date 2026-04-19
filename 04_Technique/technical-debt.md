---
Title: Technical Debt
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 04_Technique
Depends on: —
Used by: —
---

# Objectif

Suivre la dette technique connue. Distinguer les compromis intentionnels des erreurs à corriger.

# Contexte

En MVP, certains compromis sont délibérés pour aller vite. Ce document les rend explicites pour ne pas les oublier.

# Dettes intentionnelles (compromis MVP)

| Dette | Domaine | Impact | Plan de résolution |
|---|---|---|---|
| Pas de queue de jobs (emails, passes Wallet) | Backend | Timeout si API Apple/Google lente | Ajouter BullMQ en Phase 1.5 |
| Dashboard analytics = requêtes SQL directes | Backend | Non scalable à 500+ merchants | Migrer vers agrégations pré-calculées en Phase 2 |
| Pas de rate limiting global (seulement par endpoint critique) | Sécurité | Abus potentiel sur endpoints publics | Implémenter middleware global Phase 2 |
| Soft-delete RGPD = procédure manuelle | Legal/RGPD | Pas d'automatisation côté client | UI self-service Phase 2 |
| Pas de tests E2E | Qualité | Régressions UX non détectées | Playwright en Phase 2 |
| Pas d'i18n implémentée (textes hardcodés FR) | Frontend | Bloque expansion internationale | À adresser avant internationalisation |

# Dettes à surveiller

| Problème potentiel | Domaine | Surveillance |
|---|---|---|
| Requêtes N+1 dans les dashboards | BDD | Profiler PostgreSQL si latence > 200 ms |
| Sessions Redis non expirées accumulées | Redis | Monitorer mémoire Redis hebdo |
| Prisma migrations non réversibles | BDD | Revoir chaque migration avant application prod |

# Règles

- Aucune dette ne peut bloquer la sécurité ou l'isolation multi-tenant.
- Toute dette intentionnelle doit avoir un plan de résolution dans une phase définie.
- Ce document est revu trimestriellement.

# Décisions figées

- L'isolation multi-tenant n'est pas de la dette : c'est non négociable dès le MVP.

# Questions ouvertes

- Faut-il passer à une architecture event-driven (BullMQ) dès le MVP pour les passes Wallet ?

# Dépendances

- `04_Technique/architecture.md`
