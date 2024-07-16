<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import TheBudgetItExample from './TheBudgetItExample.vue';
</script>

<template>
  <div class="budget-it-header">
    <ProjectHeader badge-status="success" badge-value="POC complete">
      Budget it
      <!-- eslint-disable vue/max-len -->
      <template #description>
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
      </template>
      <!-- eslint-enable vue/max-len -->
    </ProjectHeader>
  </div>

  <hr>

  <TheBudgetItExample />
</template>

<style scoped>
  .budget-it-header {
    position: relative;
    margin: 2rem 0;
    padding: 1rem;
    border: 1px solid var(--ink-border-color);
    border-radius: .5rem;
    box-shadow: .25rem .25rem .25rem rgb(0 0 0 / 10%);

    .dark & {
      box-shadow: .25rem .25rem .25rem rgb(255 255 255 / 20%);
    }
  }

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

  :deep(header) {
    margin-top: 0;
  }
</style>
