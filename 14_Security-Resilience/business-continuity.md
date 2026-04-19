---
Title: Business Continuity
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 14_Security-Resilience
Depends on: backup-recovery.md, dependencies.md
Used by: —
---

# Objectif

Plan de continuité d'activité en cas de défaillance majeure ou d'événement exceptionnel.

# Scénarios couverts

## Scénario 1 — VPS inaccessible (panne hébergeur)

**Impact** : Service complètement inaccessible.

**RTO** : 4 heures.

**Actions** :
1. Vérifier statut hébergeur (page de statut Hetzner/OVH).
2. Si panne hébergeur : attendre la résolution (SLA hébergeur).
3. Si panne durable (> 2 h) : provisionner un VPS de secours chez un autre hébergeur.
4. Restaurer depuis backup (`backup-recovery.md` — Cas 2).
5. Mettre à jour DNS Cloudflare (propagation < 5 min avec TTL bas).
6. Communiquer aux merchants.

---

## Scénario 2 — Fondateur indisponible (accident, urgence personnelle)

**Impact** : Pas de support, pas de déploiement, pas de décision.

**Durée maximale acceptable sans intervention** : 48 h.

**Plan** :
1. Désigner un contact de secours (ami développeur, freelance de confiance) avec accès minimal.
2. Documenter les accès critiques dans le gestionnaire de mots de passe partagé.
3. GitHub repo = accès à tout le code source.
4. Les merchants continuent à utiliser le service sans intervention.

---

## Scénario 3 — Perte totale des données (backup corrompu)

**Impact** : Perte de l'historique de fidélité de tous les clients.

**Probabilité** : Très faible (backups quotidiens + mensuels).

**Actions** :
1. Contacter l'hébergeur pour tenter une récupération disque.
2. Si irrecupérable : notifier tous les merchants.
3. Proposer une remise commerciale.
4. Reconstruire à partir des informations des merchants (partiellement).

Ce scénario est atténué par les tests de restauration mensuels.

---

## Scénario 4 — Apple ou Google retire le support Wallet

**Impact** : Service principal inutilisable.

**Probabilité** : Très faible (Apple Wallet existe depuis 2012).

**Plan** :
1. Développer une solution de remplacement (QR code affiché dans l'app web, progressive web app avec affichage de carte).
2. Migrer progressivement les clients.

# Communication en cas de crise

Template email commerçants :
```
Objet : [Primpay] Information importante — [DATE]

Bonjour [prénom],

[Description claire de la situation en 2 phrases.]

Impact pour vous : [ce qui ne fonctionne pas / ce qui continue de fonctionner].

Ce que nous faisons : [actions en cours].

Mise à jour prévue : [heure].

L'équipe Primpay
```

# Décisions figées

- Contact de secours identifié avant le lancement commercial.
- Accès de secours documentés dans le gestionnaire de mots de passe.

# Questions ouvertes

- Qui est le contact de secours technique ?
- Faut-il une assurance pertes d'exploitation dès Phase 2 ?

# Dépendances

- `backup-recovery.md`, `dependencies.md`, `secrets-management.md`
