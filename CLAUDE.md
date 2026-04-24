# Recipe App — CLAUDE.md

## Product Vision

See [VISION.md](VISION.md) for target users, the core problem (decision fatigue), design principles, anti-goals, and later-scope features. **All product decisions should flow from it.**

## Project Overview

A React + TypeScript recipe app backed by Supabase. Users can browse a grid of recipes, open a detail page, add new recipes (with image upload), and delete them. Data lives in Supabase (`recipes` table + `recipe-images` storage bucket).

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Language | TypeScript 5 (strict mode) |
| Routing | React Router DOM 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite`) + a few component-scoped CSS files |
| Build Tool | Vite 6 + `@vitejs/plugin-react` |
| Backend | Supabase (Postgres + Storage) |
| Linting / Formatting | ESLint 9 (flat config) + Prettier |

## How to Run

```bash
npm install        # Install dependencies (first time only)
npm run dev        # Dev server at http://localhost:5173
npm run build      # Production build → /dist
npm run preview    # Serve production build locally
npm run typecheck  # tsc --noEmit
npm run lint       # ESLint over src
npm run format     # Prettier write over src
```

Supabase credentials are read from env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`.

## Project Structure

```
recipe-app/
├── index.html              # Vite entry point (root-level, NOT in /public)
├── vite.config.mjs         # Vite + React + Tailwind plugin config (.mjs required for ESM)
├── tsconfig.json           # TS strict config; excludes test files
├── public/
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.tsx           # React 18 createRoot entry (only file that imports React)
│   ├── App.tsx             # Router v6 — routes: /, /recipes/new, /recipes/:recipeId
│   ├── Recipes.tsx         # Recipe grid — fetches from Supabase
│   ├── RecipeCard.tsx      # Card (image, name, hashtag, like button)
│   ├── RecipeDetails.tsx   # Detail page — fetches by :recipeId, supports delete
│   ├── RecipeInstructions.tsx # Renders instructions list
│   ├── AddRecipe.tsx       # Form to create a recipe + upload an image
│   ├── NavBar.tsx          # Shared header
│   ├── Search.tsx          # Search input (client-side filter)
│   ├── supabaseClient.ts   # Supabase client (reads env vars)
│   ├── types.ts            # Recipe / Difficulty types; DIFFICULTY_OPTIONS
│   ├── placeholder.ts      # PLACEHOLDER_IMAGE constant
│   ├── hooks/              # Custom hooks (e.g. useStringList)
│   ├── images/             # Static image assets
│   ├── index.css           # Tailwind import + @theme color tokens
│   └── vite-env.d.ts       # Vite client types
└── package.json
```

## Key Architecture Decisions

- **Single-page app** — BrowserRouter with three routes: `/` (list), `/recipes/new` (add form), `/recipes/:recipeId` (detail).
- **React Router v6** — uses `<Routes>`/`<Route element={...}>` syntax.
- **React 18** — uses `createRoot` API; `react-jsx` transform is on, so components do NOT import React (only `index.tsx` does, for `StrictMode`).
- **All source uses `.tsx`/`.ts`** — Vite 6 / Rollup require this for JSX and TS. Do not use `.js` / `.jsx`.
- **Tailwind v4** — theme tokens live in `src/index.css` under `@theme` and are referenced as Tailwind utilities (`bg-primary`, `text-muted`, etc.). Never hardcode color hex values in components.
- **Supabase as backend** — `recipes` table holds recipe rows; `recipe-images` storage bucket holds uploaded images. Table/bucket names are inlined at call sites (no constants file).
- **Like counter** — Local `useState` in `RecipeCard`; does not persist across reloads (see open issue #19).

## Testing / Quality

- `App.test.tsx` and `setupTests.ts` exist but there is **no test runner wired up**. They are excluded from `tsconfig.json`.
- `npm run typecheck` is the primary correctness check today.

## What's Not Yet Implemented

See open GitHub issues for the full picture. At a high level:
- Edit recipe (#17)
- Error handling for Supabase queries (#15)
- Persisted "was this worth repeating?" signal (reframing of #19)
- Original source URL field on recipes (new)
- Authentication (#23 — later scope, needed for sharing)

## Color Palette

Defined as CSS custom properties in `src/index.css` under `@theme`. Use Tailwind utility names (`bg-primary`, `text-accent`, etc.), not raw hex values.

| Token | Value | Purpose |
|-------|-------|---------|
| `--color-primary` | `#4a717e` | Primary teal (headings, nav) |
| `--color-accent` | `#e7712b` | Accent orange (CTAs) |
| `--color-accent-dark` | `#cf5f1e` | Hover state for accent |
| `--color-muted` | `#909090` | Secondary text |
| `--color-background` | `#f6f6f6` | Page background |
| `--color-border` | `#dfdfdf` | Borders / dividers |
| `--color-error` | `#c0392b` | Error states |
| `--color-text` | `#2d2d2d` | Default body text |
