[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.com
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/inkbeard/monorepo

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4d75aa7-03c4-4638-9eb6-a34ba8d85174/deploy-status)](https://app.netlify.com/sites/dainty-arithmetic-94f385/deploys)

# inkbeard
A Turborepo monorepo for inkbeard projects.

## What's inside?
This includes the following packages/apps:

### Apps
- `ui-library`: a [storybook](https://storybook.js.org/) app for all the inkbeard components
- `inkbeard`: a vue3 app for [inkbeard.com](https://www.inkbeard.com)

### Packages
- `@inkbeard/ui-vue`: a vue3/typescript component library shared throughout the monorepo
- `@inkbeard/budget-it`: a vue3/typescript package that provides budgeting tools that relies on `@inkbeard/ui-vue`
- `@inkbeard/ui-theme`: a set of theme variables shared throughout the monorepo

### Congigurations
- `@inkbeard/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@inkbeard/typescript-config`: `tsconfig.json`s used throughout the monorepo
- `@inkbeard/stylelint-config`: `stylelint` configurations


## Getting started
In order to start things out, you need to have the following installed:

- [pnpm](https://pnpm.io/) and needs to be installed.
- [Turborepo](https://turbo.build/repo/docs/installing).
- [Node.js v18+](https://nodejs.org/en)

## Running applications
To run any of the applications, you can use the following command (after `pnpm i` if not already done):

```sh
# pnpm dev --filter name-of-workspace
pnpm dev --filter ui-library
```

Each application and package has its own `README.md` file with further instructions on how to build, test, run, etc.
