# inkbeard

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev --filter @inkbeard/website
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build --filter @inkbeard/website
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm test:unit --filter @inkbeard/website
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
pnpm test:e2e:dev --filter @inkbeard/website
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
pnpm build --filter @inkbeard/website
pnpm test:e2e --filter @inkbeard/website
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint --filter @inkbeard/website
```
