---
Title: Dependency Map
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: system-map.md
Used by: —
---

# Objectif

Cartographier les dépendances critiques entre chantiers et documents. Identifier les bloquants potentiels avant qu'ils arrivent.

# Contexte

Certaines décisions ou actions bloquent plusieurs chantiers en cascade. Ce document les rend visibles.

# Dépendances entre décisions

```
Choix du nom produit
  └─► Achat domaine
        └─► Setup DNS + Cloudflare
              └─► Landing page en ligne

Choix hébergeur (OVH / Hetzner / Scaleway)
  └─► Création VPS
        └─► Setup Docker Compose prod
              └─► Déploiement staging

Choix ORM (Prisma / TypeORM)
  └─► Migrations initiales BDD
        └─► Modules NestJS auth, customers, merchants
              └─► Module loyalty (events, accounts)
                    └─► Wallet pass generation
                          └─► MVP fonctionnel

Compte Apple Developer
  └─► Apple Wallet API credentials
        └─► Génération passe Apple
              └─► Test client iOS

Compte Google Wallet API
  └─► Google Pass credentials
        └─► Génération passe Google
              └─► Test client Android

Choix sous-segment pilote
  └─► Liste prospects qualifiés
        └─► 1ères démos terrain
              └─► 1er merchant pilote signé
```

# Dépendances documentaires critiques

| Document | Bloque | Débloqué par |
|---|---|---|
| `03_Produit/mvp-scope.md` | `04_Technique/architecture.md`, migrations | `01_Fondations/principles.md` |
| `04_Technique/data-model.md` | migrations, modules NestJS | `03_Produit/business-rules.md` |
| `05_Business/pricing.md` | page de pricing, Stripe config | `05_Business/revenue-model.md` |
| `09_Legal/rgpd.md` | lancement commercial | consultation DPO |

# Dépendances externes bloquantes

| Dépendance | Blocage potentiel | Action préventive |
|---|---|---|
| Apple Developer account | 1–5 jours de validation | Créer dès J+1 |
| Google Wallet API | 1–3 jours | Créer dès J+1 |
| DPO consultation | Bloque le lancement commercial | Contacter dès Semaine 2 |
| Stripe account | Bloque le billing | Créer dès Semaine 2 |
| Domaine DNS propagation | 24–48 h | Acheter dès nom choisi |

# Décisions figées

- Les dépendances externes (Apple, Google, Stripe) doivent être déclenchées dès Semaine 1.

# Questions ouvertes

_Aucune._

# Dépendances

- `blockers.md`, `00_Pilotage/roadmap.md`
