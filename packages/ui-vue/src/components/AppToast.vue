<script lang="ts" setup>
  /**
   * A component extended from primevue's `Toast` component. Refer to the [documentation](https://primevue.org/toast) for a full list of features.
   */

  import Toast from 'primevue/toast';
  import AppIcon from './AppIcon.vue';

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
      icon: (options: any) => ({
        class: options.instance.message.severity,
        'data-test': 'app-toast-icon',
      }),
    }"
  >
    <template
      v-for="(_, name, index) in ($slots as {})"
      :key="index"
      #[name]="scope"
    >
      <slot :name="name" v-bind="{ scope }" />
    </template>
    <template #icon="{ class: className }">
      <AppIcon
        v-if="className.includes('success')"
        class="app-toast-icon"
        icon="fa-duotone fa-check-circle"
        type="success"
      />
      <AppIcon
        v-else-if="className.includes('error')"
        class="app-toast-icon"
        icon="fa-duotone fa-circle-exclamation"
        type="danger"
      />
      <AppIcon
        v-if="className.includes('warn')"
        class="app-toast-icon"
        icon="fa-duotone fa-triangle-exclamation"
        type="warning"
      />
      <AppIcon
        v-if="className.includes('info')"
        class="app-toast-icon"
        icon="fa-solid fa-circle-info"
        type="info"
      />
    </template>
    <template #closeicon>
      <i class="fa-solid fa-xmark fa-lg" />
    </template>
  </Toast>
</template>

<style>
.app-toast-icon {
  transform: translateY(.75rem);
}
</style>
