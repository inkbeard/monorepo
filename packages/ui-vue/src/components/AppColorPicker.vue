<script lang="ts" setup>
  /**
   * A component extended from primevue's `ColorPicker` component. Refer to the [documentation](https://primevue.org/colorpicker) for a full list of features.
   */

  import ColorPicker from 'primevue/colorpicker';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <ColorPicker
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-color-picker',
      },
    }"
  />
</template>
