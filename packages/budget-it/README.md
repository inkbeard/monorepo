# `budget-it`
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

## Plugin installation
  The `@inkbeard/ui-vue` plugin needs to be installed in your app or package as well. Refer to the [ui-vue README](../ui-vue/README.md) for more information on how to install the plugin.

## Usage
  To use the package in your app or package, import the components you need and use them in your templates.

  ```vue
  <script lang="ts" setup>
    import { SourcesEditor } from '@inkbeard/budget-it';
  </script>

  <template>
    <SourcesEditor
      :default-source-id="defaultSourceId"
      :expense-list="expenseList"
      :source-list="sourceList"
    />
  </template>
  ```