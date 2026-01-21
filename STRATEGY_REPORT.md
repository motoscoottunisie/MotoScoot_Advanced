# Stratégie de Refactorisation MotoScoot.tn

## 1. Pourquoi refactoriser ?
L'application actuelle est robuste mais devient difficile à maintenir. Le "mélange" CSS/JSX ralentit la lecture du code et augmente le risque de régressions lors des mises à jour.

## 2. Actions immédiates entreprises
- **Standardisation du Layout** : `App.tsx` ne gère plus l'affichage du Header/Footer pour chaque page. C'est délégué à `PageLayout.tsx`.
- **Extraction des Atoms UI** : Création du dossier `/components/ui/` pour stocker les composants de base (`Button`, `Section`, `Input`).
- **Isolation de la Logique** : Début d'extraction des formulaires complexes vers des Custom Hooks (`useDepositForm`).

## 3. Prochaines étapes recommandées
1. **Refactoriser ListingCard** : Utiliser les sous-composants extraits (`ListingThumbnail`, `ListingInfo`) pour réduire la taille du fichier.
2. **Utiliser Section.tsx** : Remplacer les `<section>` natives par le composant `Section` pour une cohérence parfaite des paddings.
3. **Types Centralisés** : Migrer toutes les interfaces vers des fichiers `.types.ts` dédiés par feature.

*Ce rapport servira de guide de référence pour assurer la scalabilité du projet.*