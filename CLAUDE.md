# Recipe App — CLAUDE.md

## Project Overview

A React recipe browsing app with client-side routing. Users can browse recipe cards and view individual recipe detail pages. Built with Create React App.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 16.13.1 |
| Routing | React Router DOM 5.2.0 |
| Styling | Bootstrap 4.5.0 + component-scoped CSS |
| Build Tool | Create React App (react-scripts 3.4.1) |
| Icons | Font Awesome 5.x |
| Font | Google Fonts — Montserrat (300, 400) |
| Testing | @testing-library/react, jest-dom, user-event |

## How to Run

```bash
npm install      # Install dependencies (first time only)
npm start        # Dev server at http://localhost:3000
npm test         # Run tests in watch mode
npm run build    # Production build → /build
```

## Project Structure

```
recipe-app/
├── public/
│   ├── index.html          # HTML entry point (loads fonts & FontAwesome)
│   └── manifest.json       # PWA manifest
├── src/
│   ├── index.js            # React entry point
│   ├── App.js              # Router setup; routes: / and /recipes/:recipeId
│   ├── Search.js           # Search form (UI only, no functionality yet)
│   ├── Recipes.js          # Recipe grid — maps recipeData → RecipeCard
│   ├── RecipeCard.js       # Card with image, name, hashtag, like button
│   ├── RecipeDetails.js    # Detail page; reads :recipeId via useParams
│   ├── RecipeInstructions.js # Layout for ingredients/instructions (placeholder)
│   ├── Data/
│   │   └── recipeData.js   # Hardcoded array of 4 recipe objects
│   ├── images/             # 4 recipe JPGs imported in recipeData.js
│   └── *.css               # Component-scoped CSS files
└── package.json
```

## Key Architecture Decisions

- **Single-page app** — BrowserRouter with two routes: `/` (all recipes) and `/recipes/:recipeId` (detail).
- **Data** — Hardcoded in `src/Data/recipeData.js`. Each recipe: `{ id, name, src (image), hashtag }`.
- **No backend** — All data is local; comments in RecipeDetails.js note future API integration.
- **Like counter** — Local `useState` in RecipeCard (resets on page reload).

## What's Not Yet Implemented

- Search functionality (form is rendered but unwired)
- Real ingredients & instructions (RecipeInstructions.js is a layout placeholder)
- Recipe detail cooking info is hardcoded (prep time, portions, difficulty)
- No API integration

## Color Palette

| Variable | Value |
|----------|-------|
| Primary | `#4a717e` (teal) |
| Accent | `#e7712b` (orange) |
| Muted | `#909090` |
| Background | `#f6f6f6` |
