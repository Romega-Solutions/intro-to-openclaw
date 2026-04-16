# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Important: Next.js version warning

This project uses **Next.js 16** with **React 19** — these versions may have breaking changes from training data. Before writing new Next.js patterns, read `node_modules/next/dist/docs/` and heed deprecation notices (per `AGENTS.md`).

## Architecture

This is a **static, single-file presentation site** — no database, no API routes, no server actions.

**Stack:** Next.js 16 App Router · TypeScript · Tailwind CSS v4

**Key files:**
- `src/app/page.tsx` — entire presentation lives here: slide data array + all React components
- `src/app/globals.css` — all custom animations and CSS variables; Tailwind v4 uses `@import "tailwindcss"` (no `tailwind.config.js`)
- `src/app/layout.tsx` — sets metadata, Geist fonts, dark background
- `src/components/navbar.tsx`, `footer.tsx`, `section.tsx` — reusable shell components (not currently used in the main slide deck)

**Presentation model:**
The `slides` array in `page.tsx` drives all content. Each slide has a `visual` discriminator (`VisualKind`) that maps to a visual component rendered by `VisualPanel`. To add or edit a slide, modify the `slides` array — no other code needs to change unless you're adding a new `VisualKind`.

**Visual components in `VisualPanel`:**
- `title` — animated logo mark + pills
- `problem` — quote cards + story bar
- `definition` / `value` — grid cards + pills
- `flow` — `FlowLane` with animated dot traversal
- `usecase-email` / `test-email` — two `TerminalCard`s + flow lane
- `usecase-insight` / `test-insight` — two `TerminalCard`s + story bar
- `integration` — `IntegrationOrbit` (CSS-positioned orbit nodes)

**CSS animations** are defined in `globals.css` as named keyframes and applied via custom utility classes (`.animate-float`, `.animate-rise-fade`, `.orbit-node`, `.flow-dot`, etc.). All animations respect `prefers-reduced-motion`.

**Design tokens** are set as CSS variables in `:root` (e.g. `--accent: #ff6058`) and exposed to Tailwind via `@theme inline` in `globals.css`. Use `var(--accent)` in inline styles or the Tailwind token names (`text-accent`, `border-accent`) in class strings.

**Snap scrolling** — the slide container uses `snap-y snap-mandatory`; each `SlideCard` uses `snap-start` and `min-h-screen` so slides fill the viewport like a deck.
