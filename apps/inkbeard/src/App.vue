<script setup lang="ts">
  import GlobalNavigation from '@/components/GlobalNavigation.vue';
</script>

<template>
  <GlobalNavigation />
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
  main {
    min-height: 100vh;
  }
</style>
