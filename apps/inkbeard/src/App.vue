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
    width: 100%;
    max-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
  }
</style>
