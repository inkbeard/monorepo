<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import TheIconMemoryExample from './TheIconMemoryExample.vue';
</script>

<template>
  <ProjectHeader badge-value="In Progress">
    <template #title>
      Icon Memory Game
    </template>
    <!-- eslint-disable vue/max-len -->
    <p>
      This is a simple example of a memory game built using the <a
        class="header-link"
        href="https://github.com/inkbeard/monorepo/tree/main/packages/icon-memory"
        rel="noopener noreferrer"
        target="_blank"
      >"icon memory" components.</a>
      Current POC took roughly 30-40 hours to complete, which included initial design, building the components and their tests, building the example, and writing out documentation.
    </p>
    <!-- eslint-enable vue/max-len -->
  </ProjectHeader>

  <TheIconMemoryExample />
</template>
