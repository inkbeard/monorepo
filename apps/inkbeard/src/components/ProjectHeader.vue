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
  <header>
    <div>
      <h2><slot /></h2>
      <AppBadge
        :status="badgeStatus"
        :value="badgeValue"
      />
    </div>
    <p><slot name="description" /></p>
  </header>
</template>

<style scoped>
header {
  margin-top: 15px;
}

div {
  display: flex;
  align-items: center;
  gap: 15px;
}

h2 {
  margin: 0;
}
</style>
