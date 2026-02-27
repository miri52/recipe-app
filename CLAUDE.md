# Recipe App — CLAUDE.md

## Project Overview

A React recipe browsing app with client-side routing. Users can browse recipe cards and view individual recipe detail pages. Built with Vite.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18 |
| Routing | React Router DOM 6 |
| Styling | Bootstrap 5 + component-scoped CSS |
| Build Tool | Vite 6 + @vitejs/plugin-react |
| Icons | Font Awesome 5.x |
| Font | Google Fonts — Montserrat (300, 400) |

## How to Run

```bash
npm install      # Install dependencies (first time only)
npm run dev      # Dev server at http://localhost:5173
npm run build    # Production build → /dist
npm run preview  # Serve production build locally
```

## Project Structure

```
recipe-app/
├── index.html              # Vite entry point (root-level)
├── vite.config.js          # Vite + React plugin config
├── public/
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.jsx           # React 18 createRoot entry
│   ├── App.jsx             # Router setup; routes: / and /recipes/:recipeId
│   ├── Search.jsx          # Search form (UI only, no functionality yet)
│   ├── Recipes.jsx         # Recipe grid — maps recipeData → RecipeCard
│   ├── RecipeCard.jsx      # Card with image, name, hashtag, like button
│   ├── RecipeDetails.jsx   # Detail page; reads :recipeId via useParams
│   ├── RecipeInstructions.jsx # Layout for ingredients/instructions (placeholder)
│   ├── recipeData.js       # Hardcoded array of 4 recipe objects
│   ├── images/             # 4 recipe JPGs imported in recipeData.js
│   └── *.css               # Component-scoped CSS files
└── package.json
```

## Key Architecture Decisions

- **Single-page app** — BrowserRouter with two routes: `/` (all recipes) and `/recipes/:recipeId` (detail).
- **React Router v6** — uses `<Routes>`/`<Route element={...}>` syntax; `exact` prop removed (v6 default).
- **React 18** — uses `createRoot` API.
- **Data** — Hardcoded in `src/recipeData.js`. Each recipe: `{ id, name, src (image), hashtag }`.
- **No backend** — All data is local; comments in RecipeDetails.jsx note future API integration.
- **Like counter** — Local `useState` in RecipeCard (resets on page reload).
- **JSX files use `.jsx` extension** — Vite 6 / Rollup require this; do not use `.js` for files containing JSX.

## What's Not Yet Implemented

- Search functionality (form is rendered but unwired)
- Real ingredients & instructions (RecipeInstructions.jsx is a layout placeholder)
- Recipe detail cooking info is hardcoded (prep time, portions, difficulty)
- No API integration

## Color Palette

| Variable | Value |
|----------|-------|
| Primary | `#4a717e` (teal) |
| Accent | `#e7712b` (orange) |
| Muted | `#909090` |
| Background | `#f6f6f6` |
