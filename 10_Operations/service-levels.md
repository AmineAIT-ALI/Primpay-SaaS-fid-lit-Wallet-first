---
Title: Service Levels
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 10_Operations
Depends on: —
Used by: 14_Security-Resilience/resilience-rules.md
---

# SLA & disponibilité

## 1. Objectif du document
Formaliser les engagements de disponibilité et les modalités de mesure.

## 2. Engagements de disponibilité

### SLA cible (MVP)
- Disponibilité : **99 %** sur le mois calendaire.
- Cela équivaut à ~7 h d'indisponibilité maximale par mois.

### SLA cible (Phase 2)
- Disponibilité : **99,5 %** (~3,6 h / mois).

### SLA cible (Phase 3)
- Disponibilité : **99,9 %** (~45 min / mois).

## 3. Périmètre du SLA

### Inclus
- API de crédit (`/loyalty/credit`).
- API de redeem (`/loyalty/redeem`).
- Authentification.
- PWA commerçant.
- Page publique d'ajout Wallet.

### Exclus
- Indisponibilités planifiées (maintenance hors heures de rush, notifiées 48 h avant).
- Indisponibilités causées par Apple / Google / Stripe / Cloudflare / hébergeur au-delà du raisonnable.
- Problèmes réseau côté commerçant.
- Cas de force majeure.

## 4. Horaires critiques

Le service doit être prioritairement disponible aux **horaires de rush** :
- Matinée : 8h–10h (petit-déjeuner, boulangerie, café).
- Midi : 12h–14h (déjeuner).
- Soir : 19h–22h (dîner, pizzeria, snacks).

Les maintenances programmées doivent éviter ces créneaux.

## 5. Mesure

### Outil
- Better Stack (uptime) ou UptimeRobot.
- Sondes depuis 3 points géographiques minimum.

### Calcul
- Disponibilité = (temps total – temps d'indisponibilité) / temps total.
- Temps d'indisponibilité = durée pendant laquelle l'API critique répond en erreur ou en timeout.

### Seuil de déclenchement incident
- Erreurs 5xx > 1 % sur 5 min → incident automatique.
- Latence p95 > 2 s sur 5 min → incident.
- Sonde externe KO 3 fois consécutives → incident.

## 6. Communication en cas d'incident

### Canal
- Page de statut publique (statuspage.io-like ou custom basique).
- Email aux merchants actifs en cas d'incident > 15 min.
- WhatsApp pour les pilotes.

### Contenu
- Heure de début.
- Périmètre impacté.
- Actions en cours.
- ETA de résolution (actualisée toutes les 30 min).
- Heure de résolution.
- Post-mortem sous 72 h.

## 7. Compensation

### MVP (informel)
- Excuse + geste commercial au cas par cas (mois offert si incident > 8 h).

### Phase 2+ (formel)
- Crédit SaaS automatique selon durée de l'incident :
  - Incident > 4 h : 5 % du mois offert.
  - Incident > 8 h : 10 % du mois offert.
  - Incident > 24 h : 25 % du mois offert.
  - Non cumulable.

## 8. Maintenance

### Fenêtres recommandées
- Mardi ou mercredi, 15h–17h (hors rush).
- Jamais le week-end (risque + équipe réduite).

### Notification
- Email 48 h avant.
- Bandeau dashboard merchant 24 h avant.

## 9. Post-mortem

Après chaque incident > 30 min :
- Timeline des événements.
- Cause racine.
- Actions correctives.
- Actions de prévention.
- Publication (transparente) pour les merchants concernés.

## 10. Backups et restoration

### Fréquence
- Full backup PostgreSQL quotidien.
- Rétention 30 jours.
- Stockage off-site (différent hébergeur).

### Drill de restauration
- 1re fois : Sprint 6 (avant go-live).
- Récurrent : tous les 6 mois.

## 11. Décisions figées
- SLA 99 % au MVP.
- Pas de maintenance aux heures de rush.
- Compensation formelle à partir de la Phase 2.

## 12. Questions ouvertes
- Héberger la page de statut chez un tiers (Instatus, BetterStack) ou self-hosted ?
- Compensation automatique ou manuelle ?

## 13. Next steps
- Mettre en place la monitoring uptime.
- Créer la page de statut basique.
- Drill backup avant go-live.
