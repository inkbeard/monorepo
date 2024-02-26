<script lang="ts" setup>
  import Button from 'primevue/button';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Button
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-button',
      },
    }"
  >
    <slot />
  </Button>
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

/* override primevue link colors for light/dark mode  */
.p-button.p-button-link {
  html.dark & {
    color: var(--ink-black);
  }

  @media (width >= 768px) {
    color: var(--ink-black);

    html.dark & {
      color: var(--ink-white);
    }
  }
}
</style>
