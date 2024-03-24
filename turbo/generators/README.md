# Custom generators
Refer to TurboRepo's [full documentation](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation) of writing custom generators.

## Generators
At the moment, inkbeard's generators are configured from the root so running the `pnpm gen:name-of-generator` command will run the individual generator. Running the `pnpm turbo generate` command will list all the generators available.

### Common generators

#### vue-component
`pnpm gen:vue-component` adds a new vue 3 typescript component to either the `ui-vue` or `budget-it` packages. `ui-vue` requires particular naming conventions for the component to be added.
