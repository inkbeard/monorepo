<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import { useFeatureFlagStore } from '@/stores/featureFlags';
  import TheIconMemoryExample from './TheIconMemoryExample.vue';
</script>

<template>
  <ProjectHeader badge-value="In Progress">
    <template #title>
      Icon Memory Game
    </template>
    <p>
      Estimated release: 2024
    </p>
  </ProjectHeader>

  <template v-if="useFeatureFlagStore().flags.memory_game.enabled">
    <TheIconMemoryExample />
  </template>
</template>
