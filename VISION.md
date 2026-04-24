# Recipe App — Vision

## The problem
Deciding what to cook is exhausting. Couples end up in a loop: the same few meals, or endless scrolling through ad-bloated recipe sites, or half-lost recipes scattered across Notes, screenshots, and WhatsApp. Original recipes disappear when blogs shut down. Modifications you made last time are forgotten by next time.

## Who it's for
Couples and small households who already cook, have found recipes they love, and want:
- Their own curated cookbook of recipes they've *already approved*
- Fast, distraction-free access to those recipes
- A place that survives the original source being deleted
- A way to capture and remember their own modifications

**Primary users:** me and my husband. **If it ever grows:** other couples with the same decision-fatigue pain. Not generic "home cooks."

## What it is
A personal, curated digital cookbook optimized for two modes:

1. **Decision support** — "what should we cook this week / tonight?" (desk or couch, browsing and planning)
2. **Kitchen companion** — phone, wet hands, fast path from recipe to ingredients + steps

Every recipe in the app has already passed our bar. Quality over quantity.

## Design principles
- **Low cognitive load.** Clean, uncluttered, minimal visual noise. Short paths to what matters. No decorative fluff.
- **Instructions visible fast.** On the detail page, ingredients and steps are reachable without hunting past fluff.
- **Modifications are first-class.** The app remembers *how we make it*, not just the original.
- **Sacred data.** Once a recipe is in, it's ours. No reliance on external links staying alive.
- **Source traceable.** Keep the original URL for credit/context, but never depend on it.

## Anti-goals
- **Ads, SEO content, life stories before the recipe.** Clean, fast access is non-negotiable. This is the thing that broke existing recipe sites for us, and we do not reintroduce it.

## Out of initial scope (but aligned)
Things we genuinely care about but aren't building now. Calling them out so the MVP doesn't accidentally close doors.

- **Nutrition tracking** (calories, macros — per recipe, maybe per meal). We're a nutrition-focused household. *Design implication:* recipe schema should leave room for nutrition fields later.
- **Shopping-list extraction.** Today we keep a running shopping note. Natural progression: (a) mark missing ingredients on a recipe, (b) export to a shopping note, (c) integrate with a supermarket (e.g., Albert Heijn). *Design implication:* the current `ingredients: string[]` field is flat — a real shopping list needs quantity / unit / item as separate fields to deduplicate and aggregate across recipes.
- **Sharing with friends and family.** Share a recipe with a friend; import from a family member's cookbook for inspiration. *Design implication:* recipes will eventually need an owner (household account); authentication becomes a prerequisite for this direction.

## Scope & monetization stance
Primary scope is a working app for one household. If it becomes something others want, great — but architectural decisions should not optimize for that now. The one rule: **don't close doors.** Don't hardcode assumptions that would be painful to unwind if a second household ever used it.

## Learning goals (meta — not product requirements)
This project is also a vehicle for skill growth. Factor these in when picking what to work on:
- **Backend.** Owner has mostly frontend experience; backend learning is prioritized.
- **AI-assisted development.** Improving collaboration with Claude Code is an explicit goal.
- **AI features in the app** are welcome when they genuinely help. Obvious candidate: *paste a URL, extract the recipe into our format.*
