<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import { useFeatureFlagStore } from '@/stores/featureFlags';
  import TheBudgetItExample from './TheBudgetItExample.vue';
</script>

<template>
  <ProjectHeader badge-value="In progress">
    Budget it
  </ProjectHeader>

  <p>Estimated release: Q1</p>

  <TheBudgetItExample v-if="useFeatureFlagStore().flags.budget_it.enabled" />
</template>
