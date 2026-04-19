---
Title: Playbook — Launch
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/playbooks
Depends on: 00_Pilotage/roadmap.md
Used by: —
---

# Objectif

Séquence d'actions pour le lancement commercial initial (J+0 à J+30).

# Prérequis avant lancement terrain

- [ ] MVP déployé en staging et testé.
- [ ] Apple Wallet credentials configurés.
- [ ] Google Wallet credentials configurés.
- [ ] Stripe configuré (plans Solo + Multi).
- [ ] 3 pilots identifiés et planifiés.
- [ ] Script de démo finalisé.
- [ ] Pack signalétique imprimé (stickers + affichette).
- [ ] Email de bienvenue configuré.
- [ ] Sentry opérationnel.
- [ ] Uptime monitoring opérationnel.

# Semaine 0 — Préparation (avant J+0)

1. Finaliser les 5 décisions D1 bloquantes (nom, zone, segment, hébergeur, ORM).
2. Créer tous les comptes externes (Apple Developer, Google, Stripe).
3. Acheter le domaine, configurer DNS + Cloudflare.
4. Initialiser le repo, CI/CD, migrations BDD.
5. Identifier 100 prospects dans la zone cible.
6. Préparer le kit démo : téléphone avec PWA, brochures, cartes de visite.

# Semaine 1–2 — Pilots (J+1 à J+14)

1. Onboarding Pilot 1 sur place (`sop/onboarding.md`).
2. Observer le premier rush en caisse avec le Pilot 1.
3. Mesurer le temps de crédit réel (KPI nord).
4. Corrections urgentes si temps > 3 s.
5. Onboarding Pilots 2 et 3.

# Semaine 3–4 — Lancement terrain (J+15 à J+30)

1. Démarrage démarchage actif : 5 démos / jour.
2. Appliquer `playbooks/sales.md` à chaque visite.
3. Logger chaque démo : résultat, objection principale.
4. Mise à jour `06_GoToMarket/objections.md` chaque soir.
5. Objectif : 5 signatures payantes à J+30.

# Décisions figées

- Pas de lancement terrain sans pilot actif depuis ≥ 7 jours.
- Pas de démarrage avant que le temps de crédit soit < 3 s mesuré.

# Dépendances

- `00_Pilotage/roadmap.md`, `sop/onboarding.md`, `playbooks/sales.md`
