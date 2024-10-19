<script lang="ts" setup>
  import Button from 'primevue/button';

  export type AppButtonProps = {
    /**
     * Whether the button should be full width and center the text/icon.
     */
    isFullWidth?: boolean;
    /**
     * Whether the button should be disabled. (this is a PrimeVue prop but needed here for better unit testing.)
     */
    disabled?: boolean | number;
  };

  withDefaults(defineProps<AppButtonProps>(), {
    disabled: false,
    isFullWidth: false,
  });
  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Button
    v-bind="{
      ...$attrs,
      disabled: Boolean(disabled),
    }"
    :pt="{
      root: {
        class: `app-button ${isFullWidth ? 'is-full-width' : ''}`,
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

  > .app-button:not(:first-child) {
    margin-left: 0.5rem;
  }
}

.app-button.is-full-width {
  width: 100%;
  justify-content: center;

  .p-button-label {
    flex: inherit;
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
