# 🚀 MotoScoot Pro : Standards de Développement

## 1. Structure des Fichiers
Chaque feature complexe (ex: Deposit, Search) doit suivre cette structure :
- `FeatureName.tsx` : Orchestrateur (State & Render).
- `FeatureName.styles.ts` : Constantes de styles Tailwind (Pattern "S").
- `components/` : Sous-composants spécifiques à la feature.
- `hooks/` : Logique métier (useFeatureLogic).

## 2. Le Pattern "S" (Stylized Objects)
```tsx
const S = {
  Wrapper: "min-h-screen bg-gray-50 p-6",
  Card: "bg-white rounded-3xl border border-gray-100 shadow-sm",
  Title: "text-2xl font-black text-gray-900"
};
// Utilisation : <div className={S.Wrapper}><h1 className={S.Title}>...</h1></div>
```

## 3. Primitives UI
INTERDICTION d'utiliser des classes brutes pour les éléments de base.
- Utiliser `<Button variant="primary" />` au lieu de `<button className="bg-orange-600..." />`.
- Utiliser `<Input label="..." />` au lieu de `<input className="..." />`.

## 4. Routing
Le routage est géré par configuration dans `App.tsx` pour éviter les switch-cases monolithiques.