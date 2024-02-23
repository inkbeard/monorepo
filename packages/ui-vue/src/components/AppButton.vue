<script lang="ts" setup>
  import Button from 'primevue/button';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps<{
    isSmall?: boolean;
  }>();
</script>

<template>
  <Button
    v-bind="$attrs"
    :pt="{
      root: {
        class: `app-button ${isSmall ? 'p-button-sm' : ''}`,
      },
    }"
  />
</template>
