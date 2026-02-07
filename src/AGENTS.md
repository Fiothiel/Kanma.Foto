<INSTRUCTIONS>
Project: Nuxt 3 + Storyblok

Architecture
- Build isolated "features" (page types + blocks) that contain their own components, composables, and types.
- Keep global design system primitives in SCSS partials and CSS variables only; no feature-specific tokens in globals.
- Map Storyblok components 1:1 to Vue components; names and filenames should match the Storyblok component name.

Styling
- Enforce strict BEM naming in templates and styles.
- Use CSS variables for tokens (spacing, radii, transitions, theme colors) based on the existing variable setup in:
  - assets/scss/_variables.scss
  - assets/scss/_colors.scss
- Extend tokens via variables first; avoid hard-coded values in component styles.

Structure (suggested)
- features/<feature-name>/
  - components/
  - composables/
  - types/
- assets/scss/components/ for global primitives only.
</INSTRUCTIONS>
