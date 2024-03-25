<script lang="ts" setup>
  /**
   * A component extended from primevue's `OverlayPanel` component. Refer to the [documentation](https://primevue.org/overlaypanel) for a full list of features.
   */

  import OverlayPanel from 'primevue/overlaypanel';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <OverlayPanel
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-overlay-panel',
      },
    }"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      :key="index"
      #[name]="scope"
    >
      <slot :name="name" v-bind="{ scope }" />
    </template>
  </OverlayPanel>
</template>

<style>
.app-overlay-panel {
  background-color: var(--ink-danger-color);
}
</style>
