---
Title: Support
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: service-levels.md
Used by: 12_Execution-System/sop/support.md
---

# Support client

## 1. Objectif du document
Structurer l'activité de support pour qu'elle reste soutenable au fur et à mesure que le nombre de clients grandit.

## 2. Canaux de support

### MVP
- Email : `support@primpay.io` (adresse à réserver selon naming).
- WhatsApp : numéro dédié (temporaire, pour pilotes et early adopters).

### Phase 2
- Formulaire web.
- FAQ auto-service.
- Chat in-app (en dernier recours : coûteux en temps).

## 3. Niveaux de priorité

### P1 — Critique
- Service indisponible pour ≥ 1 commerçant.
- Perte de données.
- Faille de sécurité.
- **Réponse cible : < 1 h ouvrée.**
- **Résolution cible : < 4 h ouvrées.**

### P2 — Majeur
- Fonctionnalité critique dégradée (ex. scan KO, crédit en échec).
- Erreur de facturation.
- **Réponse cible : < 4 h ouvrées.**
- **Résolution cible : < 24 h ouvrées.**

### P3 — Mineur
- Bug non bloquant.
- Question d'usage.
- Demande de fonctionnalité.
- **Réponse cible : < 24 h ouvrées.**
- **Résolution cible : variable.**

### P4 — Informatif
- FAQ, tutoriel, question générale.
- **Réponse cible : < 48 h ouvrées.**

## 4. Horaires

### MVP (solo)
- Couverture : lundi–vendredi, 9h–18h.
- Urgences P1 : astreinte best-effort 7j/7.

### Phase 2
- Élargir à 7j/7 si > 50 merchants.

## 5. Categories de demandes (templates de réponse)

### "Je n'arrive pas à me loguer"
1. Vérifier email.
2. Reset mot de passe.
3. Si pas d'email reçu : vérifier spams puis renvoyer manuellement.

### "Mon staff n'arrive pas à scanner"
1. Vérifier que la PWA est installée.
2. Vérifier les permissions caméra.
3. Vérifier la qualité du sticker.
4. Tester avec un autre téléphone.

### "Le pass Wallet ne s'installe pas côté client"
1. Identifier le device (iOS / Android).
2. iOS : confirmer navigateur Safari.
3. Android : confirmer Google Wallet installé.
4. Fallback : envoyer le lien par SMS.

### "Je veux modifier mon programme"
1. Admin programme → modifier.
2. Expliquer l'impact sur les accounts existants.

### "Je veux annuler mon abonnement"
1. Dashboard → Abonnement → Résilier.
2. Confirmer par email.
3. Proposer un export CSV des données.

## 6. Outils

### MVP
- Mailbox partagée (Front / Superhuman team / Missive / HEY).
- Sheet des tickets (basique mais suffisant).
- Accès direct au dashboard admin pour investigation.

### Phase 2
- Help Scout ou Zendesk (quand > 5 tickets / jour en moyenne).
- Intégration avec Sentry pour les erreurs utilisateur.

## 7. Base de connaissance

### Articles prioritaires à rédiger (MVP)
- Comment installer la PWA sur iOS / Android ?
- Comment ajouter un staff ?
- Comment modifier mon programme ?
- Comment générer mon QR public ?
- Comment un client ajoute-t-il sa carte ?
- Que faire si un client perd son téléphone ?
- Comment résilier mon abonnement ?
- Comment exporter mes données ?

## 8. Règles d'or support

1. **Répondre vite > répondre parfait** (sauf P1).
2. **Toujours signer avec un prénom**, jamais "L'équipe support" anonyme.
3. **Toujours proposer une solution**, jamais juste un "désolé".
4. **Documenter chaque ticket inhabituel** pour alimenter la FAQ.
5. **Escalader P1 immédiatement** (pas d'attente).

## 9. Mesure

### KPI
- Temps de 1re réponse (médiane).
- Temps de résolution (médiane).
- Tickets / merchant / mois.
- CSAT post-résolution (Phase 2).

### Cible
- Temps 1re réponse < 4 h ouvrées.
- Tickets < 15 min / merchant / mois en moyenne.

## 10. Escalade vers développement

- Tout bug P1 ou P2 → créer un ticket dans le backlog dev.
- Relance dev si ticket ≥ 24 h sans avancée.

## 11. Décisions figées
- 4 niveaux de priorité (P1–P4).
- Support solo jusqu'à ~30 merchants.
- Recrutement d'un support part-time au-delà.

## 12. Questions ouvertes
- WhatsApp Business API ou numéro perso au départ ?
- Créer un "espace client" dédié ou tout passer par email ?

## 13. Next steps
- Mettre en place la mailbox partagée.
- Rédiger les 8 articles de base.
- Définir le plan d'astreinte P1.
