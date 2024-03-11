[![Mergify Status][mergify-status]][mergify]

[mergify]: https://mergify.com
[mergify-status]: https://img.shields.io/endpoint.svg?url=https://api.mergify.com/v1/badges/inkbeard/monorepo

[![Netlify Status](https://api.netlify.com/api/v1/badges/a4d75aa7-03c4-4638-9eb6-a34ba8d85174/deploy-status)](https://app.netlify.com/sites/dainty-arithmetic-94f385/deploys)

# inkbeard
A Turborepo mono-repository for inkbeard projects.

## What's inside?

This includes the following packages/apps:

### Apps
- `docs`: a [Next.js](https://nextjs.org/) app
- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app

### Packages
- `@inkbeard/ui`: a stub React component library shared by both `web` and `docs` applications

### Congigurations
- `@inkbeard/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@inkbeard/typescript-config`: `tsconfig.json`s used throughout the monorepo


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
