---
Title: Antifragility
Owner: Amine AIT ALI
Status: draft
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: resilience-rules.md
Used by: —
---

# Objectif

Tester la résilience sous contrainte : chaos engineering, stress tests, injection de pannes, apprentissage sous pression.

# Contexte

Un système qui n'a jamais été stressé n'est pas résilient — il est juste non-testé. L'antifragilité, c'est apprendre de chaque incident et devenir plus robuste.

# Tests de résilience planifiés (Phase 1.5)

## Test 1 — Coupure Redis simulée

**Objectif** : Vérifier que le crédit fonctionne en mode dégradé sans Redis.

**Procédure** :
```bash
# En staging uniquement
docker compose stop redis
# Tester 5 crédits via la PWA
# Vérifier que les crédits sont enregistrés dans PostgreSQL
# Vérifier le message de mode dégradé affiché
docker compose start redis
```

**Critère de réussite** : Les 5 crédits sont enregistrés, l'interface affiche un avertissement.

---

## Test 2 — Latence API Wallet simulée

**Objectif** : Vérifier que le crédit n'est pas bloqué si l'API Wallet répond lentement.

**Procédure** : Utiliser `tc` (traffic control) pour ajouter 5 s de délai sur les requêtes sortantes vers Apple/Google, puis effectuer un crédit.

**Critère de réussite** : Crédit accordé en < 3 s (timeout Wallet = side effect), pass mis à jour en différé.

---

## Test 3 — Connexion BDD interrompue brièvement

**Objectif** : Vérifier la gestion des erreurs de connexion PostgreSQL.

**Critère de réussite** : Reconnexion automatique en < 30 s, pas de corruption de données.

---

## Test 4 — Restauration backup mensuelle

**Objectif** : Valider que la procédure de restauration fonctionne réellement.

**Procédure** : Restaurer le backup mensuel sur un VPS de test, vérifier l'intégrité des données.

**Fréquence** : Mensuelle.

# Post-incident learning

Après chaque incident, compléter `00_Pilotage/template-post-mortem.md` avec :

1. **Ce qui a cassé** (root cause, pas la symptôme).
2. **Ce qui a bien fonctionné** (détection rapide, procédure suivie).
3. **Ce qu'on améliore** (nouvelle règle de résilience, test à ajouter).
4. **La règle qu'on crée** : transformée en entrée dans `resilience-rules.md`.

# Principe fondateur

> Chaque incident est une opportunité de rendre le système plus robuste. L'objectif n'est pas d'éviter tous les incidents, mais de ne jamais avoir le même incident deux fois.

# Décisions figées

- Tests de résilience activés à partir de Phase 1.5 (pas avant le MVP).
- Test de restauration backup = obligatoire mensuellement dès le lancement.

# Questions ouvertes

- Faut-il un "game day" de chaos engineering trimestriel à partir de Phase 2 ?

# Dépendances

- `resilience-rules.md`, `backup-recovery.md`, `00_Pilotage/template-post-mortem.md`
