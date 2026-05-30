# Continue - Svelte Version

This is the Svelte/Vite conversion of the original React/Webpack project.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Main conversion notes

- React components were converted to `.svelte` components.
- React Context/useReducer was replaced with a Svelte writable store in `src/stores/gameStore.js`.
- `react-type-animation` was replaced with a small Svelte typing animation in `ResponseTerminal.svelte`.
- Webpack/Babel config was replaced with Vite config.
- SCSS modules were simplified into Svelte scoped styles and a global `src/styles/main.scss` file.
