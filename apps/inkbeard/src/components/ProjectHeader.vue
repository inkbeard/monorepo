<script setup lang="ts">
  import AppBadge from '@/components/AppBadge.vue';

  defineProps({
    badgeStatus: {
      type: String,
      default: 'info',
    },
    badgeValue: {
      type: String,
      required: true,
    },
  });
</script>

<template>
  <div>
    <h2><slot /></h2>
    <AppBadge
      :status="badgeStatus"
      :value="badgeValue"
    />
  </div>
</template>

<style scoped>
div {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 15px;
}
</style>
