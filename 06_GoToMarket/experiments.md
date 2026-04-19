---
Title: Experiments
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 06_GoToMarket
Depends on: —
Used by: 13_Data-Intelligence/ab-testing.md
---

# Objectif

Suivre les expérimentations GTM en cours et leurs résultats.

# Format d'une expérimentation

```
ID : EXP-NNN
Hypothèse : [Si on fait X, alors Y se produira]
Méthode : [Comment on teste]
Durée : [Combien de temps]
Critère de succès : [Seuil de validation]
Résultat : [À remplir]
Décision : [Continuer / Arrêter / Pivoter]
```

# Expérimentations actives

## EXP-001 — Script démo 3 minutes

**Hypothèse** : Une démo de 3 minutes sur le téléphone du gérant convertit mieux qu'une présentation PowerPoint.

**Méthode** : 20 premières démos avec script oral uniquement (pas de support visuel). Mesurer conversion.

**Durée** : 3 semaines (50 démos).

**Critère de succès** : Conversion > 20 % (démo → signature ou essai).

**Résultat** : _En attente._

---

## EXP-002 — Offre pilote "2 mois gratuits"

**Hypothèse** : Offrir 2 mois gratuits aux 3 premiers pilotes augmente la qualité des feedbacks terrain.

**Méthode** : Proposer à tous les premiers prospects une période pilote de 2 mois sans frais, en échange de disponibilité pour feedbacks hebdo.

**Durée** : M1.

**Critère de succès** : 3 pilotes actifs à J+30, avec au moins 2 retours structurés chacun.

**Résultat** : _En attente._

---

## EXP-003 — Setup fee offerte si signature dans les 48 h

**Hypothèse** : Offrir le setup (99 € habituel) si signature dans 48 h accélère la décision.

**Méthode** : Proposer systématiquement en fin de démo.

**Durée** : 30 démos.

**Critère de succès** : Délai moyen démo → signature < 24 h (vs baseline > 48 h).

**Résultat** : _En attente._

# Expérimentations planifiées

| ID | Hypothèse | Déclencheur |
|---|---|---|
| EXP-004 | L'email cold avec photo du commerce double le taux de réponse | Après EXP-001 validée |
| EXP-005 | Le parrainage augmente les signatures de 20 % à M2 | À M2 si 5+ actifs |
| EXP-006 | Vidéo 60 s Instagram génère plus de leads que post photo | À M2 |

# Décisions figées

- Aucune hypothèse ne devient règle sans données sur ≥ 20 démos / ≥ 30 jours.
- Les résultats sont mis à jour hebdomadairement.

# Questions ouvertes

- Comment mesurer l'impact du parrainage isolément (hors démarchage actif) ?

# Dépendances

- `channels.md`, `objections.md`, `13_Data-Intelligence/ab-testing.md`
