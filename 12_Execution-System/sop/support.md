---
Title: SOP — Support
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/sop
Depends on: 10_Operations/support.md
Used by: —
---

# Objectif

Procédure standardisée de traitement des demandes support merchants.

# Canal de support (MVP)

- Email : support@[domaine]
- WhatsApp : uniquement pour merchants pilotes (Phase 1)
- Pas de chat en ligne en MVP.

# SLA de réponse

| Priorité | Définition | Délai |
|---|---|---|
| P1 | Service inutilisable (erreur à chaque crédit, app down) | < 4 h ouvrées |
| P2 | Fonctionnalité dégradée, contournement possible | < 24 h ouvrées |
| P3 | Question, demande d'évolution, problème mineur | < 48 h ouvrées |

# Procédure de traitement

## 1. Réception et qualification

1. Lire le message.
2. Qualifier : P1 / P2 / P3.
3. Si P1 → appliquer `runbooks/incident.md` si problème technique.
4. Répondre en accusé de réception sous 1 h ouvrée.

## 2. Diagnostic

- **Problème d'accès** : vérifier le compte dans l'admin, statut de l'abonnement Stripe.
- **Problème de crédit** : vérifier les logs `loyalty_events` du merchant.
- **Problème de Wallet** : vérifier l'état du pass dans `wallet_passes`.
- **Question usage** : répondre avec capture d'écran + lien tutoriel.

## 3. Résolution

- Correction technique : créer un ticket GitHub, résolution selon SLA P.
- Correction manuelle (crédit oublié, récompense à recréer) : admin panel.
- Question : répondre + documenter dans FAQ interne si répétée.

## 4. Clôture

- Confirmer la résolution au merchant.
- Si problème récurrent → ouvrir un ticket dans `00_Pilotage/risk-register.md`.

# Cas fréquents

| Problème | Cause probable | Action |
|---|---|---|
| "Mon client ne reçoit pas la mise à jour du pass" | API Wallet lente | Attendre 5 min, si > 15 min → investiguer |
| "J'arrive pas à me connecter" | Mot de passe oublié | Envoyer email de reset |
| "Mon staff a fait un double crédit" | Pas de cooldown respecté | Vérifier logs, créer event correctif si < 24 h |
| "Mon client n'a pas eu sa récompense" | Seuil pas encore atteint | Expliquer le mécanisme |

# Dépendances

- `10_Operations/support.md`, `10_Operations/service-levels.md`
