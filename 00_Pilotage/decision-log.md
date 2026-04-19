---
Title: Decision Log
Owner: Amine AIT ALI
Status: active
Last reviewed: 2026-04-19
Source of truth: yes
Scope: 00_Pilotage
Depends on: decision-framework.md
Used by: tous les owners
---

# Journal des décisions (Architecture Decision Records)

## 1. Objectif
Tracer **pourquoi** une décision a été prise, pas seulement **quelle** décision. Évite de rediscuter les mêmes sujets tous les mois.

## 2. Format d'une entrée

```
### ADR-NNN — Titre court
Date : YYYY-MM-DD
Statut : Proposé / Accepté / Remplacé par ADR-XXX / Déprécié
Contexte : situation qui demande une décision
Décision : ce qui est tranché
Conséquences : ce que ça implique, positif et négatif
Alternatives écartées : options considérées et pourquoi non retenues
```

---

## 3. Décisions actées (extrait plan.md)

### ADR-001 — Wallet-first, pas d'application dédiée
Date : 2026-04-17
Statut : Accepté
Contexte : Les solutions concurrentes imposent une app mobile dédiée par restaurant. Taux d'adoption très faible (< 5 %).
Décision : Le produit s'appuie exclusivement sur Apple Wallet et Google Wallet. Aucune app Primpay côté client.
Conséquences : (+) adoption quasi-instantanée, zéro friction. (−) dépendance aux APIs Apple/Google, moins de contrôle sur l'UX et le push.
Alternatives écartées : app native, app hybride, PWA client.

### ADR-002 — QR fixe signé plutôt que QR rotatif ou NFC
Date : 2026-04-17
Statut : Accepté
Contexte : Choix du mécanisme d'identification client en caisse.
Décision : QR code fixe, signé côté serveur, intégré au Wallet pass.
Conséquences : (+) simple, compatible tout smartphone, fonctionne hors-ligne pour l'affichage. (−) sécurité à base de signature + rate-limit plutôt que de rotation ; NFC reporté en option premium.
Alternatives écartées : QR rotatif (complexité Wallet), NFC only (exclut les Android sans NFC).

### ADR-003 — Mode rush sans scan obligatoire
Date : 2026-04-17
Statut : Accepté
Contexte : En coup de feu, le scan ralentit le service.
Décision : Trois chemins valables pour créditer un client : scan QR, recherche rapide, bouton "derniers clients".
Conséquences : (+) adoption staff réaliste. (−) complexité UX supplémentaire à construire dès le MVP.

### ADR-004 — NestJS monolith modulaire + PostgreSQL + Redis
Date : 2026-04-17
Statut : Accepté
Contexte : Choix de stack backend.
Décision : NestJS en monolithe modulaire, PostgreSQL pour la cohérence transactionnelle, Redis pour cache/locks/rate-limit.
Conséquences : (+) time-to-market rapide, pas de microservices prématurés. (−) à refactoriser en services quand la charge le justifiera.
Alternatives écartées : Node/Express (moins structurant), Django (écosystème JS plus cohérent avec Next.js), microservices (prématuré).

### ADR-005 — Multi-tenant strict par `merchant_id`
Date : 2026-04-17
Statut : Accepté
Contexte : Le produit doit servir N restaurants sans fuite de données cross-tenant.
Décision : `merchant_id` obligatoire sur toute entité métier, filtrage systématique côté serveur, jamais de confiance côté client.
Conséquences : (+) sécurité forte. (−) discipline de dev permanente, tests cross-tenant obligatoires.

### ADR-006 — NFC et POS reportés post-MVP
Date : 2026-04-17
Statut : Accepté
Contexte : Tentation d'intégrer NFC et POS dès le MVP.
Décision : Reportés en Phase 3 (Premium).
Conséquences : (+) MVP livrable en 3–4 semaines. (−) argument commercial "NFC" indisponible à court terme.

---

### ADR-007 — Cible d'attaque : food de proximité à haute fréquence
Date : 2026-04-17
Statut : Accepté
Contexte : Le plan.md parlait de "restaurants", terme trop restrictif et pas assez précis. Tentation d'élargir à "tous les commerçants qui ont besoin de fidélisation", ce qui rendrait le go-to-market impossible.
Décision : Cible d'attaque (cercle 1, 3–6 premiers mois) = commerces food de proximité à haute fréquence : pizzerias indé, snacks, kebabs, boulangeries, coffee shops, salons de thé. Expansion (cercle 2) prévue vers les autres commerces de proximité à récurrence (fleuriste, pressing, coiffeur, barbier, institut beauté, épicerie fine, caviste, prêt-à-porter indé).
Conséquences : (+) pitch et supports commerciaux focalisés, offre simple. (−) refus explicite des grands comptes au démarrage.
Alternatives écartées :
- "Tous les commerçants" : cible trop floue, pas de pitch possible.
- "Restaurants uniquement" (sens classique) : trop étroit, on exclurait les boulangeries et coffee shops qui sont pourtant la meilleure cible.
- Grands comptes internationaux (McDonald's, Pizza Hut, etc.) : cycle de vente trop long, infra fidélité déjà en place. Refusés explicitement en Phase 1.

### ADR-008 — Vocabulaire pivot : "commerce" plutôt que "restaurant"
Date : 2026-04-17
Statut : Accepté
Contexte : Le mot "restaurant" laisse penser aux restaurants traditionnels avec service à table, ce qui n'est pas notre cible primaire.
Décision : Dans toute la documentation produit et commerciale, utiliser "commerce food de proximité" ou simplement "commerce" / "commerçant". Réserver "restaurant" aux cas d'usage spécifiques.
Conséquences : Vocabulaire plus précis, évite les quiproquos avec les prospects et partenaires.

---

## 4. En attente de décision

- **ADR-??? — Nom du produit** : shortlist définie (TapLoyal, WalletLoyal, Stamply, Fidelio Wallet, Union Pass). Décision attendue avant le premier démarchage.
- **ADR-??? — Sous-segment prioritaire du cercle 1** : pizzeria / coffee shop / boulangerie ? Choisir **un seul** pour les 3 premiers restaurants pilotes.
- **ADR-??? — Hébergeur de prod** : VPS (OVH/Hetzner/Scaleway) vs cloud managé.
