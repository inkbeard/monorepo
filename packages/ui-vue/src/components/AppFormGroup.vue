<script setup lang="ts">
  import Tooltip from 'primevue/tooltip';
  import AppIcon from './AppIcon.vue';

  defineProps<{
    /**
     * The label used for the `<label>` field.
     */
    label: string;
    /**
     * The id for the dropdown associated with the label and form.
     */
    inputId: string;
    /**
     * The copy used for the label popover.
     */
    labelDescription?: string;
  }>();

  const vTooltip = Tooltip;
</script>

<template>
  <div class="app-form-group">
    <label
      class="app-label"
      :for="inputId"
    >
      {{ label }}
      <AppIcon
        v-if="labelDescription"
        v-tooltip="labelDescription"
        icon="fa-duotone fa-circle-question"
      />
    </label>
    <slot />
  </div>
</template>

<style scoped>
.app-form-group {
  display: flex;
  flex-direction: column;
  gap: .5rem;

  .app-form-vertical & {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>
