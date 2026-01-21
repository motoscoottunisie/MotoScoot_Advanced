# Motoscoot.tn  Design System

## Brand Personality Summary

**Visual Identity:** Modern, trustworthy, and professional marketplace aesthetic
**Emotional Tone:** Confident, reliable, and approachable
**Style Keywords:** Clean, contemporary, action-oriented, transactional
**Target Audience:** Motorcycle enthusiasts, buyers and sellers seeking secure transactions

---

## ✍️ 2. Typography

### Font Families
```css
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
```

### Principes Avancés
- **Fluid Typography** : Utilisation de `clamp()` pour supprimer les sauts de breakpoints.
- **Optical Sizing** : Tracking négatif automatique sur les grandes tailles.
- **Tabular Nums** : Utilisation de chiffres à largeur fixe pour les prix (`tabular-nums`) afin d'éviter les sauts visuels lors des animations de chiffres.

### Échelle Typographique (V2 Fluid)

| Niveau | Taille (Clamp) | Tracking | Poids | Usage |
|-------|------|-------------|--------|-------|
| **Title XL** | 32px → 60px | `-0.04em` | 800 | Hero Headlines |
| **Title L** | 28px → 46px | `-0.04em` | 800 | Titres de page |
| **Title M** | 20px → 24px | `-0.02em` | 800 | Titres Cards / Dialogs |
| **Metadata** | 11px (Fixe) | `0.1em` | 800 | Labels techniques |
| **Price** | Dynamique | `-0.04em` | 900 | Valeurs monétaires |

---

## 📦 Quick Reference Typography
- **Accessibilité** : Contraste minimal 4.5:1 (Gray 500 sur blanc).
- **Maintenance** : Interdiction d'utiliser des `text-[px]` bruts hors de `Typography.tsx`.
- **Hiérarchie** : Utiliser le poids 900 exclusivement pour les prix et les CTAs critiques.

---
**Design System Version:** 1.3 (Fluid Typo Standard)
**Last Updated:** 2025-10-06