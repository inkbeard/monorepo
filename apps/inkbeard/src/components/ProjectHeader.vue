<script setup lang="ts">
  import AppBadge from '@/components/AppBadge.vue';
  import { AppCard } from '@inkbeard/ui-vue';
  import type { AppBadgeStatus } from '@/components/AppBadge.vue';

  export type ProjectHeaderProps = {
    /**
     * The status of the badge.
     */
    badgeStatus?: AppBadgeStatus,
    /**
     * The value of the badge.
     */
    badgeValue: string,
  };
  const { badgeStatus = 'info' } = defineProps<ProjectHeaderProps>();
</script>

<template>
  <header>
    <AppCard>
      <template #title>
        <h2>
          <slot name="title" />
          <AppBadge
            :status="badgeStatus"
            :value="badgeValue"
          />
        </h2>
      </template>
      <slot />
    </AppCard>
  </header>
</template>

<style scoped>
  header {
    margin: 2rem 0;
  }

  h2 {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0;
  }
</style>
