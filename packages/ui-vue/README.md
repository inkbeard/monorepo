# `ui vue`
This is a package for Vue 3 that provides a set of UI components for use in Inkbeard apps and packages. A majority of the components are wrappers around the [PrimeVue](https://primefaces.org/primevue/) library, which provides a set of UI components for Vue 3. For a list of the components available, see the [inkbeard storybook](http://localhost:6006/).

## Dependency installation
Install the package in your workspace (either an app or package) with the following command:

```
pnpm add @inkbeard/ui-vue --filter name-of-workspace
```

## Plugin installation
To install the plugin, install the package according to [the vue plugin documentation](https://vuejs.org/guide/reusability/plugins.html#introduction).

The installation itself is a wrapper around the PrimeVue installation, with any additional configuration to make the components work with the Inkbeard design system.

```javascript
import { createApp } from 'vue';
import InkbeardUiVue from '@inkbeard/ui-vue';

const app = createApp({})

app.use(InkbeardUiVue, {
  /* optional options */
});
```

Since this a wrapper around PrimeVue, you can pass in any of the [PrimeVue options](https://primevue.org/configuration/). As an example, you can pass in the `unstyled` option to disable the default PrimeVue styles.

```javascript
import { createApp } from 'vue';
import InkbeardUiVue from '@inkbeard/ui-vue';

const app = createApp({})

app.use(InkbeardUiVue, {
  unstyled: true,
});
```

## Usage
To use the package in your app or package, import the components you need and use them in your templates.

```vue
<script lang="ts" setup>
  import { AppButton } from '@inkbeard/ui-vue';
</script>

<template>
  <AppButton label="Click me" />
</template>
```

## Testing
There are multiple ways to run the units tests for this package. The following commands can be run from the root of the workspace:

### Single run
```bash
pnpm test:unit --filter ui-vue
```

### Watch mode
```bash
pnpm test:unit:watch --filter ui-vue
```

### With UI (including coverage report)
```bash
pnpm test:unit:watch --filter ui-vue -- --ui
```