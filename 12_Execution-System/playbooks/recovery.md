---
Title: Playbook — Recovery
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 12_Execution-System/playbooks
Depends on: 14_Security-Resilience/
Used by: —
---

# Objectif

Procédure de récupération après un incident majeur, une vague de churn, ou un blocage de croissance.

# Scenario 1 — Incident technique majeur (> 4 h de downtime)

1. Appliquer `runbooks/incident.md`.
2. Email de communication aux merchants actifs (dans les 2 h).
3. Post-mortem dans les 48 h → `00_Pilotage/template-post-mortem.md`.
4. Communication "nous avons résolu le problème" dès résolution.
5. Geste commercial si > 4 h : 1 semaine offerte.

# Scenario 2 — Vague de churn (> 5 % en 1 mois)

1. Contacter dans les 48 h chaque churner pour comprendre la raison.
2. Analyser s'il y a un pattern (segment, type de commerce, problème commun).
3. Décision D1 dans `00_Pilotage/decision-log.md` sous 72 h.
4. Si problème produit → sprint correctif prioritaire.
5. Si problème prix → test d'une offre de rétention (réduction, mois offert).
6. Si problème adoption staff → nouveau contenu de formation.

# Scenario 3 — Blocage de croissance (0 signature sur 3 semaines)

1. Analyser les 30 dernières démos : objections, profil des refus.
2. Tester un changement de script (EXP-NNN dans `06_GoToMarket/experiments.md`).
3. Si le script n'est pas en cause → changer de zone ou de sous-segment.
4. Si aucune amélioration → convocation de la revue `00_Pilotage/kill-criteria.md`.

# Scenario 4 — Compromission de sécurité

1. Appliquer `14_Security-Resilience/incident-response.md`.
2. Notifier les merchants concernés dans les 72 h (obligation RGPD).
3. Communication à l'autorité (CNIL) si données sensibles compromises.
4. Post-mortem de sécurité dans les 7 jours.

# Dépendances

- `14_Security-Resilience/incident-response.md`, `00_Pilotage/kill-criteria.md`
