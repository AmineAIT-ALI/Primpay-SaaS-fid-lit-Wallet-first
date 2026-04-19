---
Title: Critical Dependencies
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: 04_Technique/integrations.md
Used by: business-continuity.md
---

# Objectif

Lister les dépendances critiques externes et leur niveau de risque pour la continuité du service.

# Dépendances critiques

| Dépendance | Usage | Risque si down | Probabilité | Plan de mitigation |
|---|---|---|---|---|
| **Apple Wallet API** | Génération passes iOS | Élevé (50 %+ clients iOS) | Faible | Queue async + retry, message d'erreur gracieux |
| **Google Wallet API** | Génération passes Android | Élevé (50 %+ clients Android) | Faible | Queue async + retry |
| **Stripe** | Billing abonnements | Moyen (pas d'impact immédiat sur le service) | Très faible | SLA 99,99 % Stripe |
| **Cloudflare** | CDN + DNS + WAF | Critique (site inaccessible) | Très faible | SLA 99,99 % Cloudflare |
| **VPS Hetzner/OVH** | Infrastructure principale | Critique | Faible | Snapshot mensuel, procédure de restore |
| **PostgreSQL** | Toutes les données | Critique | Très faible | Backups quotidiens + procédure restore |
| **Redis** | Locks + cooldown | Moyen (service dégradé, pas down) | Faible | Mode dégradé sans Redis (résilience applicative) |
| **Sentry** | Monitoring erreurs | Faible | — | Logs locaux comme fallback |

# Mode dégradé par dépendance

## Si Apple Wallet API down

- Le crédit est accordé normalement (loyalty_event créé).
- La mise à jour du pass est mise en queue (retry dans les 30 min).
- Le client verra son solde mis à jour à la prochaine tentative.
- Message staff : "Crédit enregistré. Mise à jour du pass en cours."

## Si Google Wallet API down

- Même comportement qu'Apple.

## Si Redis down

- Le cooldown n'est pas appliqué (risque de double crédit).
- Les locks de récompense ne fonctionnent pas (risque de double encaissement).
- **Action** : page d'alerte pour le staff "Attention : mode dégradé, vérifier manuellement les doublons".

## Si VPS down

- Service complètement inaccessible.
- Appliquer `12_Execution-System/runbooks/incident.md`.
- Communication merchants dans les 30 min.

# Décisions figées

- Les APIs Wallet doivent avoir un mode dégradé (pas de blocage du crédit).
- Redis down = service dégradé acceptable, pas arrêt complet.

# Dépendances

- `04_Technique/integrations.md`, `business-continuity.md`, `backup-recovery.md`
