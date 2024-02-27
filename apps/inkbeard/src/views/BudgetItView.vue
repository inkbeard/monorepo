<script setup lang="ts">
  import ProjectHeader from '@/components/ProjectHeader.vue';
  import { useFeatureFlagStore } from '@/stores/featureFlags';
  import { AddCategory } from '@inkbeard/budget-it';
</script>

<template>
  <ProjectHeader badge-value="In progress">
    Budget it
  </ProjectHeader>

  <p>Estimated release: Q1</p>

  <template v-if="useFeatureFlagStore().flags.budgetIt.enabled">
    <AddCategory :category-list="[]" />
  </template>
</template>
