# Raptive Design System

## Project
- **Directory**: `~/community-ds`
- **Port**: 3700
- **Repo**: `migsraptive/community-ds`
- **GitHub Pages**: `https://migsraptive.github.io/community-ds/`

## Stack
- React 18 (JSX, not TypeScript)
- Vite 5 with base path `/community-ds/`
- Tailwind CSS v3
- Lucide React for icons
- No shadcn/ui — custom components

## Structure
```
src/
├── assets/          SVG logo + illustration PNGs
├── components/      Atomic UI components (Avatar, Badge, Button, etc.)
├── patterns/        Composite patterns (SingleFieldIntake, StepLayout, etc.)
├── pages/
│   ├── ComponentLibrary/      Internal design review surface
│   └── CreatorApplication/    User-facing 6-step creator flow
├── tokens/          Design tokens (colors, typography, spacing, effects)
├── App.jsx          State-based routing between surfaces
├── globals.css      Fonts, CSS vars, Tailwind directives
└── main.jsx         Entry point
```

## Tokens
- All tokens in `src/tokens/` — colors, typography, spacing, effects
- Exported via `src/tokens/index.js` and consumed by `tailwind.config.js`
- DM Sans (sans/display), JetBrains Mono (mono)
- Raptive palette, semantic color layer, gamification tokens

## Conventions
- Components live in `src/components/ComponentName/ComponentName.jsx`
- Patterns live in `src/patterns/PatternName/PatternName.jsx`
- All patterns accept `showAside` prop to toggle design guidance panel
- Tokens are the source of truth — never hardcode colors, spacing, or type values
- Reuse existing components before creating new ones

## Verification
```bash
npm run build
```

## Dev Server
```bash
npm run dev
# http://127.0.0.1:3700/community-ds/
```
