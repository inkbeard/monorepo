# budget it
A vue-3 component library for budgeting applications.

## Dependency installation
Install the package in your workspace (either an app or package) with the following command:

```bash
pnpm add @inkbeard/budget-it --filter name-of-workspace
```

## Install peer dependencies
The `@inkbeard/ui-vue` is a dependency for this package so it will need to be install as a dependency in your the package.json in your workspace as well.

```bash
pnpm add @inkbeard/ui-vue --filter name-of-workspace
```

## Plugins installation
The `@inkbeard/ui-vue` plugin needs to be installed in your app or package as well. Refer to the [ui-vue README](https://github.com/inkbeard/monorepo/tree/main/packages/ui-vue) for more information on how to install the plugin.

```javascript
import { createApp } from 'vue';
import InkbeardUiVue from '@inkbeard/ui-vue';
import InkbeardBudgetIt from '@inkbeard/budget-it';

const app = createApp({})

app.use(InkbeardUiVue);
app.use(InkbeardBudgetIt);
```

## Usage
For a an example of how to import and use the components in your app or package, refer to the [build-a-budget example](https://github.com/inkbeard/monorepo/blob/main/apps/inkbeard/src/views/TheBudgetItExample.vue)

## Testing
There are multiple ways to run the units tests for this package. The following commands can be run from the root of the workspace:

### Single run
```bash
pnpm test:unit --filter @inkbeard/budget-it
```

### Watch mode
```bash
pnpm test:unit:watch --filter @inkbeard/budget-it
```

### With UI (including coverage report)
```bash
pnpm test:unit:watch --filter @inkbeard/budget-it -- --ui
```
