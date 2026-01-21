# Guide de Refactorisation : MotoScoot Production

## Règle n°1 : Le test du "Coup d'œil"
Si vous devez scroller plus de 2 fois pour lire le `return` d'un composant, il est trop gros. Découpez-le.

## Règle n°2 : Isolation des Classes
Au lieu de :
```tsx
<div className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col gap-6">...</div>
```
Faites :
```tsx
const cardStyle = `
  bg-white rounded-3xl border border-gray-100 
  p-8 shadow-sm flex flex-col gap-6
`;

return <div className={cardStyle}>...</div>
```

## Règle n°3 : Les Primitives UI
Ne jamais réécrire `className="bg-primary-600..."` pour un bouton. 
Utilisez toujours `<Button variant="primary">`.

## Roadmap de Refactorisation immédiate :
1. **Atomes** : Finaliser `ui/Button.tsx`, `ui/Input.tsx`, `ui/Badge.tsx`.
2. **Molecules** : Extraire `ListingThumbnail.tsx` de `ListingCard.tsx`.
3. **Logic** : Déplacer la géo-localisation de `Garages.tsx` dans `useGeolocation.ts`.
4. **Views** : Nettoyer `App.tsx` en créant un composant `ViewRouter`.