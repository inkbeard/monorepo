<script lang="ts" setup>
  import Button from 'primevue/Button';

  defineOptions({
    inheritAttrs: false,
  });
  defineProps({
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => ['sm', 'md', 'lg'].includes(value),
    },
  });
</script>

<template>
  <Button
    v-bind="$attrs"
    :pt="{
      root: {
        class: `app-button p-button-${size}`,
      },
    }"
  />
</template>

<style>
.btn-group {
  display: flex;
  justify-content: center;

  &.align-end {
    justify-content: flex-end;
  }

  &.align-start {
    justify-content: flex-start;
  }
}
</style>
