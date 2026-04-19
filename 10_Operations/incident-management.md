---
Title: Incident Management
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: service-levels.md
Used by: 12_Execution-System/runbooks/incident.md
---

# Procédure incident

## 1. Objectif du document
Décrire la réponse structurée à un incident de production. À exécuter dans l'ordre, même sous pression.

## 2. Classification

### Incident majeur (P1)
- Service indisponible pour ≥ 30 % des merchants.
- Perte de données confirmée ou suspectée.
- Faille de sécurité exploitée.

### Incident important (P2)
- Fonctionnalité critique dégradée (scan, crédit, redeem).
- Erreurs 5xx > 1 % soutenu > 10 min.
- Impact visible pour ≥ 1 merchant.

### Incident mineur (P3)
- Dégradation perceptible sans blocage.
- Pas d'impact sur rush.

### Anomalie (P4)
- Bug isolé.
- Comportement inattendu sans blocage.

## 3. Workflow général

```
Détection → Triage → Communication initiale → Mitigation → Résolution → Communication finale → Post-mortem
```

## 4. Détection

### Sources
- Monitoring automatique (Better Stack, Sentry).
- Alerte erreur backend.
- Support client (email, WhatsApp).
- Observation directe.

### Délai cible
- Détection automatique d'un P1 : < 5 min après début.

## 5. Triage

### Dès la détection
1. Confirmer qu'il s'agit bien d'un incident (pas une alerte fausse positive).
2. Classifier P1 / P2 / P3 / P4.
3. Identifier le périmètre (quels merchants, quelles fonctionnalités).
4. Ouvrir un log d'incident (timestamp, actions).

### Qui décide ?
- Vito (solo au MVP).
- Phase 2 : rotation on-call.

## 6. Communication initiale

### Pour un P1
- Dans les **15 minutes** :
  - Page de statut : "Incident en cours, [périmètre], on investigue."
  - Email aux merchants actifs impactés.
  - WhatsApp aux pilotes.

### Pour un P2
- Dans les **30 minutes** :
  - Page de statut.
  - Email si impact merchant visible.

### Pour un P3/P4
- Documentation interne, communication optionnelle.

### Ton
- Factuel, pas d'excuse avant confirmation.
- Promesses réalistes (ETA avec marge).
- Mises à jour toutes les 30 min minimum sur P1.

## 7. Mitigation

### Actions prioritaires
1. Stopper la propagation (rollback, feature flag, mode dégradé).
2. Protéger les données (pause des écritures si nécessaire).
3. Communiquer en continu.

### Exemples
- Rollback du dernier déploiement.
- Mode maintenance activé.
- Redémarrage du backend.
- Scaling temporaire si pic.

## 8. Résolution

### Actions
1. Identifier la cause racine (pas juste le symptôme).
2. Appliquer un correctif.
3. Vérifier la résolution sur les sondes et quelques comptes réels.
4. Lever le mode dégradé.

### Test post-résolution
- 3 scénarios critiques re-testés : login, crédit, redeem.
- Tests d'isolation multi-tenant.

## 9. Communication finale

- Page de statut : "Résolu à [heure]. Cause : [brève description]."
- Email de clôture aux merchants impactés.
- Mention du post-mortem à suivre.

## 10. Post-mortem (obligatoire pour P1 et P2)

### Format
- **Résumé** : durée, impact, périmètre.
- **Timeline** : détection, actions, résolution.
- **Cause racine** : ce qui a vraiment planté.
- **Ce qui a bien marché** : détection rapide, communication, etc.
- **Ce qui a mal marché** : monitoring manquant, procédure floue, etc.
- **Actions correctives** : liste concrète avec propriétaire et deadline.

### Publication
- Post-mortem partagé aux merchants impactés sous 72 h pour P1.
- Archivé en interne pour tous les incidents.

## 11. Cas spécifiques

### Faille de sécurité / violation de données
- Isolation immédiate.
- Préservation des logs (avant tout ménage).
- **Notification CNIL sous 72 h si violation RGPD** (obligation légale).
- Notification aux merchants concernés.
- Expertise externe si nécessaire.
- Post-mortem détaillé + plan de remédiation.

### Indisponibilité Apple Wallet ou Google Wallet
- Hors de notre contrôle → communication transparente.
- Pas de SLA impacté si > 99 % de dispo Primpay.
- Informer les merchants que les nouveaux ajouts Wallet sont retardés.

### Incident Stripe (paiement)
- Hors de notre contrôle → communication.
- Ne pas bloquer l'accès au service tant que le client a été prélevé normalement.

## 12. Post-incident — amélioration continue

- Registre des incidents (tous, même P3/P4).
- Revue trimestrielle des tendances.
- Actions correctives trackées.

## 13. Décisions figées
- Page de statut publique dès J+1 de prod.
- Post-mortem obligatoire P1/P2.
- Notification CNIL sous 72 h pour toute violation RGPD.

## 14. Questions ouvertes
- Faut-il un runbook technique détaillé par type d'incident (DB down, Redis down, etc.) ?
- Outillage du post-mortem (template partagé vs forme libre) ?

## 15. Next steps
- Template post-mortem prêt avant go-live.
- Page de statut en place pour J+1 prod.
- 1 drill incident simulé avant commercialisation.
