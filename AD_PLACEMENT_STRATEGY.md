
# Stratégie de Placement Publicitaire - MotoScoot.tn

Pour un site de marketplace et de contenu comme **MotoScoot.tn**, l'intégration de la publicité doit trouver un équilibre délicat : générer des revenus (ou promouvoir des partenaires) sans dégrader l'expérience utilisateur (UX) ni la crédibilité de la plateforme.

Voici une analyse détaillée des emplacements stratégiques possibles, classés par page et par type d'impact.

---

## 1. Page d'Accueil (`App.tsx` / `Hero` / Sections)

La page d'accueil est la vitrine. Les publicités ici doivent être "Premium" et visuelles.

### A. Le "Mega Banner" Inter-sections (Desktop & Mobile)
*   **Emplacement :** Entre le composant `PopularModels` (les modèles recherchés) et `PopularGarages`.
*   **Format :** Largeur 100% (container) ou Standard Leaderboard (728x90px / 970x90px).
*   **Contenu idéal :** Publicité pour une marque de moto (ex: Yamaha), une assurance, ou un événement moto.
*   **UX :** Faible intrusion. Sert de séparateur visuel naturel entre deux sliders.

### B. Le "Sponsor" de la Recherche (Hero Section)
*   **Emplacement :** Juste sous la barre de recherche principale, sous forme de "Mots-clés tendance" ou logos.
*   **Format :** Petit texte ou logo discret "Sponsorisé par X".
*   **Contenu idéal :** Huiles moteur, Accessoiristes.
*   **UX :** Très visible, mais doit rester subtil pour ne pas encombrer le Hero.

---

## 2. Page de Résultats (`SearchResults.tsx`)

C'est la page où les utilisateurs passent le plus de temps. C'est l'endroit le plus stratégique (et le plus rentable).

### A. L'encart "In-Feed" (Natif) - ⭐ Recommandé
*   **Emplacement :** Inséré directement dans la grille des annonces (ex: après la 3ème ou 5ème annonce).
*   **Format :** Une carte qui a exactement la même taille et le même style qu'une annonce moto, mais avec un label "Publicité" ou "Partenaire".
*   **Contenu idéal :** Crédit moto, Assurance moto, Casques.
*   **UX :** C'est le format le moins "aveuglant" (Banner Blindness). L'utilisateur le voit forcément en scrollant.

### B. Le Pavé Latéral (Sidebar)
*   **Emplacement :** Dans la colonne de gauche (Filtres), tout en bas, ou fixé (sticky) lors du défilement.
*   **Format :** Pavé carré (300x250px) ou Skyscraper (160x600px).
*   **Contenu idéal :** Garages locaux, Promotions pièces détachées.
*   **UX :** Classique. Ne gêne pas la navigation, mais disparaît sur mobile (car la sidebar est cachée).

---

## 3. Pages Contenu (`News.tsx` & `Tips.tsx`)

Les lecteurs sont ici pour s'informer. La publicité doit être contextuelle.

### A. La Bannière "Top Content"
*   **Emplacement :** Entre le "Featured Article" (l'article à la une en haut) et la grille des autres articles. *Note : Un placeholder de ce type existe déjà dans `News.tsx`*.
*   **Format :** Bannière large allongée (Billboard).
*   **UX :** Excellente visibilité sans couper la lecture d'un article spécifique.

### B. L'encart "In-Grid" (Comme pour les annonces)
*   **Emplacement :** Remplacer une des cartes d'article dans la grille par une publicité.
*   **Format :** Carte rectangulaire verticale.
*   **UX :** Très fluide sur mobile et desktop.

---

## 4. Page Garages (`Garages.tsx`)

### A. La "Tête de Liste" Sponsorisée
*   **Emplacement :** Le tout premier garage de la liste, mis en avant avec une couleur de fond différente (ex: jaune pâle) et un badge "Annonceur".
*   **Contenu idéal :** Un garage qui paie pour être vu en premier dans sa ville.
*   **UX :** Pertinent pour l'utilisateur qui cherche un service rapidement.

---

## 5. Version Mobile (Général)

Sur mobile, l'espace est limité. Il faut éviter les pop-ups qui couvrent l'écran.

### A. Sticky Bottom Banner
*   **Emplacement :** Fixé tout en bas de l'écran par-dessus le contenu.
*   **Format :** 320x50px (Standard Mobile).
*   **Avantage :** Visibilité 100%.
*   **Inconvénient :** Peut être agaçant si le bouton de fermeture n'est pas clair, ou s'il cache le bouton d'action principal (ex: "Filtrer").

---

## Recommandations d'implémentation (MVP)

1.  **Option "Listing In-Feed" (`SearchResults.tsx`)** : Insérer une carte pub au milieu des résultats de recherche (ex: position 4).
2.  **Option "Home Banner" (`App.tsx`)** : Une bannière large entre "Modèles Populaires" et "Garages".
3.  **Option "Sidebar Ad" (`Garages.tsx` & `SearchResults.tsx`)** : Un encart carré sous les filtres en version Desktop.
