<script lang="ts" setup>
  import { ref } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';

  const clickCount = ref(0);
</script>

<template>
  <main>
    <AppButton @click="clickCount++">
      Count down! {{ clickCount }}
    </AppButton>
  </main>
</template>
