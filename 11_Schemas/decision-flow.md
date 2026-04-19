---
Title: Decision Flow
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 11_Schemas
Depends on: 00_Pilotage/decision-framework.md
Used by: —
---

# Objectif

Visualiser le flux de décision du système de pilotage.

# Boucle maîtresse

```
┌──────────────────────────────────────────────────────────────────┐
│                    BOUCLE MAÎTRESSE PRIMPAY                     │
└──────────────────────────────────────────────────────────────────┘

  13_Data-Intelligence         08_Performance-System
  ┌─────────────────┐          ┌───────────────────┐
  │  DATA / SIGNAL  │ ───────► │    DÉTECTION      │
  │  events.md      │          │  thresholds.md    │
  │  tracking-plan  │          │  drift-detection  │
  └─────────────────┘          └───────────────────┘
                                         │
                                         ▼
  00_Pilotage                   08_Performance-System
  ┌─────────────────┐          ┌───────────────────┐
  │    DÉCISION     │ ◄─────── │    PERFORMANCE    │
  │  decision-log   │          │  system-health    │
  │  decision-fw    │          │  decision-metrics │
  └─────────────────┘          └───────────────────┘
           │
           ▼
  12_Execution-System
  ┌─────────────────┐
  │   EXÉCUTION     │
  │  playbooks/     │
  │  runbooks/      │
  │  sop/           │
  └─────────────────┘
           │
           ▼
  10_Operations / 03_Produit / 06_GoToMarket
  ┌─────────────────┐
  │  VÉRIFICATION   │
  │  metrics.md     │
  │  system-health  │
  └─────────────────┘
           │
           ▼
  14_Security-Resilience + 13_Data-Intelligence
  ┌─────────────────┐
  │  APPRENTISSAGE  │
  │  incident-resp  │
  │  feedback-loop  │
  │  antifragility  │
  └─────────────────┘
           │
           └─────────────────────────────────► 13_Data-Intelligence
```

# Flux de décision — D1 (critique)

```
Signal identifié (terrain, metric, incident)
         │
         ▼
  Est-ce une décision D1 ?
  (coût réversion > 2 semaines)
         │
    Oui  │  Non → Décision D3 : exécuter directement
         ▼
  Délai max 48 h (voir decision-sla.md)
         │
         ▼
  Documenter dans decision-log.md :
  - Contexte
  - Options considérées
  - Décision
  - Conséquences acceptées
         │
         ▼
  Ajouter dans decision-to-action-map.md :
  - Action concrète
  - Owner
  - Deadline
         │
         ▼
  Exécuter → Vérifier → Mettre à jour system-health.md
```

# Flux de décision — Technique (ADR)

```
Décision d'architecture identifiée
         │
         ▼
  Utiliser template ADR-001
  Remplir : Contexte / Décision / Conséquences / Alternatives
         │
         ▼
  Sauvegarder dans 04_Technique/adr/ADR-NNN-[sujet].md
         │
         ▼
  Mettre à jour 00_Pilotage/decision-log.md (référence)
```

# Dépendances

- `00_Pilotage/decision-framework.md`, `00_Pilotage/decision-log.md`
