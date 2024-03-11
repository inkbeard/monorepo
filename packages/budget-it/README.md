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
The `@inkbeard/ui-vue` plugin needs to be installed in your app or package as well. Refer to the [ui-vue README](../ui-vue/README.md) for more information on how to install the plugin.

```javascript
import { createApp } from 'vue';
import InkbeardUiVue from '@inkbeard/ui-vue';
import InkbeardBudgetIt from '@inkbeard/budget-it';

const app = createApp({})

app.use(InkbeardUiVue);
app.use(InkbeardBudgetIt);
```

## Usage
To use the package in your app or package, import the components you need and use them in your templates.

```vue
<script lang="ts" setup>
  import { BudgetIt, SourcesEditor } from '@inkbeard/budget-it';
  import {
    categoryList,
    defaultSourceId,
    sourceList,
    expenseList,
  } from 'path-to-data-or-store';
</script>

<template>
  <BudgetIt
    v-model:category-list="categoryList"
    v-model:default-source-id="defaultSourceId"
    v-model:source-list="sourceList"
    :expense-list="expenseList"
  >
    <section>
      <div>
        <AddCategory />
        <ExpenseCategory
          v-for="category in categoryList"
          :key="category.id"
          :category="category"
        />
      </div>
      <aside>
        <SourcesEditor />
      </aside>
    </section>
  </BudgetIt>
</template>
```