<script lang="ts" setup>
  import Button from 'primevue/Button';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Button
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-button p-button-small',
      },
    }"
  />
</template>
