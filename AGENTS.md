# Repository Guidelines

## Project Structure & Module Organization
The working app is in `src/` (Nuxt 3 + Storyblok). Keep all implementation changes there.

- `src/pages/`: route-level views (`[...slug].vue` handles Storyblok slugs).
- `src/storyblok/`: Storyblok block/page components. Map Storyblok component names 1:1 to Vue filenames.
- `src/components/` and `src/layouts/`: shared UI shell pieces.
- `src/assets/scss/`: global SCSS tokens and partials (`_variables.scss`, `_colors.scss`, `components/`, `pages/`).
- `src/public/`: static assets (favicon, logos, local fonts).

## Build, Test, and Development Commands
Run commands from `src/`.

- `yarn install`: install dependencies (Yarn is pinned in `packageManager`).
- `yarn dev`: run local dev server at `http://localhost:3000`.
- `yarn build`: production build.
- `yarn preview`: preview the built app locally.
- `yarn generate`: static site generation.

## Coding Style & Naming Conventions
- Use Vue 3 SFCs with `<script setup lang="ts">`.
- Follow BEM class naming in templates and SCSS (`block__element--modifier`).
- Keep styles component-scoped via `@use "~/assets/scss/components/<name>"` when applicable.
- Prefer design tokens/CSS variables over hard-coded spacing/colors.
- Match existing formatting: 2-space indentation in TS/Vue config files, and existing SCSS style in component partials.

## Testing Guidelines
No test framework is configured yet (`test`, `lint`, and `typecheck` scripts are currently absent).

For new features:
- add focused manual verification steps in PRs (route tested, Storyblok content rendered, responsive checks),
- include reproducible steps such as: `yarn dev` -> open changed slug/page -> verify expected block behavior.

## Commit & Pull Request Guidelines
Recent commits are short, single-line summaries (examples: `Use yarn`, `Site header and rich text`). Continue concise subjects, but prefer imperative and specific wording.

- Commit format: `<area>: <action>` (example: `storyblok: add footer contact links`).
- Keep commits scoped to one concern.
- PRs should include: purpose, key files changed, manual test steps, and screenshots for UI changes.
- Link the relevant issue/task when available.

## Security & Configuration Tips
- `STORYBLOK_TOKEN` is required via environment variables; do not hardcode secrets.
- Avoid logging tokens or sensitive runtime config values.
