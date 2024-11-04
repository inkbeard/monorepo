<script setup lang="ts">
  /**
   * A custom alert component used to display related information.
   */

  import { computed } from 'vue';
  import AppIcon from './AppIcon.vue';
  import AppButton from './AppButton.vue';

  defineEmits<{
    /**
     * Emit an event when the alert is closed.
     */
    close: [];
  }>();

  export type AppAlertProps = {
    /**
     * Align the text in the horizontally center.
     */
    center?: boolean,
    /**
     * Render the icon to close the alert.
     */
    closable?: boolean,
    /**
     * Render the data-test for close button.
     */
    dataTestClose?: string,
    /**
     * Render the alert copy.
     */
    description?: string,
    /**
     * Specify the type of alert.
     */
    severity?: 'danger'
      | 'info'
      | 'success'
      | 'warning'
    /**
     * Render the appropriate icon with the alert type.
     */
    showIcon?: boolean,
    /**
     * Render the alert title above the description.
     */
    title?: string,
  };

  const {
    center = false,
    closable = false,
    dataTestClose = 'close alert',
    description = '',
    severity = 'info',
    showIcon = false,
    title = '',
  } = defineProps<AppAlertProps>();
  /**
   * Determine the icon based on the alert severity.
   */
  const icon = computed(() => {
    switch (severity) {
    case 'success':
      return 'fa-duotone fa-check-circle';
    case 'danger':
      return 'fa-duotone fa-circle-exclamation';
    case 'warning':
      return 'fa-duotone fa-triangle-exclamation';
    default:
      return 'fa-duotone fa-circle-info';
    }
  });
</script>

<template>
  <div
    aria-live="polite"
    :class="[
      `app-alert is-${severity}`,
      {
        'is-center': center,
        'is-closable': closable,
      },
    ]"
  >
    <div
      v-if="showIcon"
      class="app-alert-icon"
    >
      <AppIcon
        data-test="alert icon"
        :icon="icon"
        size="xl"
      />
    </div>
    <div class="app-alert-content">
      <p
        v-if="$slots.title || title"
        class="app-alert-title"
        data-test="alert title"
      >
        <!-- @slot Use to override the "title" prop. -->
        <slot name="title">
          {{ title }}
        </slot>
      </p>
      <p
        v-if="$slots.default || description"
        data-test="alert description"
      >
        <!-- @slot Use to override the "description" prop. -->
        <slot>
          {{ description }}
        </slot>
      </p>
    </div>
    <AppButton
      v-if="closable"
      class="close-alert"
      :data-test="dataTestClose"
      icon="fa-solid fa-xmark"
      :severity="severity"
      size="xl"
      text
      @click="$emit('close')"
    />
  </div>
</template>

<style scoped>
  .app-alert {
    position: relative;
    display: flex;
    align-items: center;
    gap: .75rem;
    margin: 0 auto;
    padding: .5rem 1rem;
    width: fit-content;
    max-width: 100%;
    border: 1px solid var(--ink-info-color);
    background: var(--ink-info-color-light);
    color: var(--ink-info-color);
    text-align: left;

    &.is-center {
      text-align: center;
    }
  }

  .app-alert-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .app-alert-title {
    font-weight: bold;
  }

  .close-alert {
    align-self: flex-start;
  }

  .is-danger {
    border-color: var(--ink-danger-color);
    color: var(--ink-danger-color);
    background: var(--ink-danger-color-light);
  }

  .is-success {
    border-color: var(--ink-success-color);
    color: var(--ink-success-color);
    background: var(--ink-success-color-light);
  }

  .is-warning {
    border-color: var(--ink-warning-color);
    color: var(--ink-warning-color);
    background: var(--ink-warning-color-light);
  }

  p {
    margin: 0 0 3px;
  }

  :slotted(.p-button-text ) {
    display: inline;
    padding: 0;
    text-decoration: underline;
    border: none;
  }
</style>
