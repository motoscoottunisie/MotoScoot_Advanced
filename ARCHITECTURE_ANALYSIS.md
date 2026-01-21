# Analyse Architecturale : MotoScoot.tn

## 🏗 Structure Globale
L'application est une **Single Page Application (SPA)** construite avec React 19 et Tailwind CSS, adoptant une approche de développement modulaire et orientée production.

## 🚀 Concepts Clés

### 1. Routage & Navigation
- **Fichier Central** : `config/routes.tsx` définit toutes les vues, leur protection (Auth) et leur layout.
- **URL Utils** : Système de parsing d'URL robuste supportant les Slugs SEO (`/annonce/yamaha-mt07-123`) avec un fallback automatique vers la navigation par Hash pour la compatibilité sandbox.
- **SEO Dynamique** : Composant `SEO.tsx` gérant les balises meta et les données structurées JSON-LD.

### 2. Gestion du Style (Pattern "S")
- Utilisation du **Pattern S** pour isoler les chaînes de classes Tailwind massives.
- **Atomes UI** : Bibliothèque de composants de base dans `components/ui/` pour garantir une cohérence visuelle 100% orange/neutral conforme au Design System.

### 3. Logique Métier & État
- **Custom Hooks** : Extraction des logiques complexes (`useListingFilters`, `useDepositForm`) pour garder les composants de vue légers.
- **Contextes** : Utilisation de React Context pour les Favoris et le moteur de Publicité (Ads Engine).

### 4. Stratégie de Publicité (Ads Engine)
- Système intégré de campagnes publicitaires avec tracking des clics/vues.
- Zones de diffusion pré-définies : `news_top`, `search_feed`, `garage_sidebar`, `listing_sidebar`.

## 🛠 Stack Technique
- **UI** : React, Lucide Icons, Tailwind CSS.
- **Logique** : Custom Hooks, Context API.
- **Sécurité** : Sanitization HTML avec DOMPurify, Navigation sécurisée, Crypto-randomisation pour l'Ads Engine.

## 📈 Évolutivité
L'architecture est prête pour une montée en charge (Scalability) :
- Les types sont centralisés.
- Les composants sont découpés selon les principes de l'Atomic Design.
- Le routage est piloté par configuration.
