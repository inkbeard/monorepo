<script lang="ts" setup>
  /**
   * A component extended from primevue's `Toast` component. Refer to the [documentation](https://primevue.org/toast) for a full list of features.
   */

  import Toast from 'primevue/toast';

  defineOptions({
    inheritAttrs: false,
  });
</script>

<template>
  <Toast
    v-bind="$attrs"
    :pt="{
      root: {
        class: 'app-toast',
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
  </Toast>
</template>

<style>
.app-toast {
  background-color: var(--ink-danger-color);
}
</style>
