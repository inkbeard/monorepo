<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import TheBudgetItExample from './TheBudgetItExample.vue';
</script>

<template>
  <ProjectHeader badge-status="success" badge-value="POC complete">
    <template #title>
      Budget it
    <!-- eslint-disable vue/max-len -->
    </template>
    <p>
      This is a simple example of the vue3 spending/budgeting "<a
        class="header-link"
        href="https://github.com/inkbeard/monorepo/tree/main/packages/budget-it"
        rel="noopener noreferrer"
        target="_blank"
      >budget it</a>" components.
      Categories, expenses, sources, and default source ID are provided and can be edited, but not stored in this example.
      Full POC took roughly 80-100 hours to complete. This included initial design, building the components and their tests, building the example, and writing out <a
        class="header-link"
        href="https://inkbeard-ui-library.vercel.app/?path=/docs/budget-it-docs-readme--docs"
        rel="noopener noreferrer"
        target="_blank"
      >documention</a>.
    </p>
    <!-- eslint-enable vue/max-len -->
  </ProjectHeader>
  <hr>
  <TheBudgetItExample />
</template>

<style scoped>
  .header-link {
    color: var(--ink-info-color);
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  hr {
    margin-bottom: 2rem;
  }
</style>
