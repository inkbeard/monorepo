,<script setup lang="ts">
  defineProps({
    /**
     * Used to determine if the badge should show counter notifications styles.
     */
    isCounter: {
      type: Boolean,
      default: false,
    },
    /**
     * Used to determine if the badge should be pill shaped.
     */
    isPill: {
      type: Boolean,
      default: false,
    },
    /**
     * Used to determine the badge's padding and font.
     */
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => [
        'small',
        'medium',
        'large',
      ].includes(value),
    },
    /**
     * Used to determine the badge status.
     */
    status: {
      type: String,
      default: 'info',
      validator: (value: string) => [
        'danger',
        'info',
        'success',
        'warning',
      ].includes(value),
    },
    /**
     * Used to render badge content.
     */
    value: {
      type: [String, Number],
      required: true,
    },
  });
</script>

<template>
  <span
    class="app-badge"
    :class="[
      `is-${size} is-${status}`,
      { 'is-counter': isCounter },
      { 'is-pill': isPill },
    ]"
  >
    {{ value }}
  </span>
</template>

<style scoped>
  span {
    display: inline-block;
    font-size: 12px;
    font-weight: 700;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 1px;
    line-height: 16px;
    border-radius: 5px;
    color: var(--ink-white);
  }

  /* Size */
  .is-small {
    padding: 4px;
    line-height: 12px;
    letter-spacing: inherit;

    &.is-pill:not(.is-counter) {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  .is-medium {
    padding: 4px 7px;

    &.is-pill:not(.is-counter) {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  .is-large {
    padding: 8px 16px;
    font-size: 16px;
  }

  /* Statuses */
  .is-danger {
    background: var(--ink-danger);
  }

  .is-info {
    background: var(--ink-info);
  }

  .is-success {
    background: var(--ink-success);
  }

  .is-warning {
    color: var(--ink-black);
    background: var(--ink-warning);
  }

  .is-counter {
    box-sizing: border-box;
    height: 20px;
    min-width: 20px;
    padding: 2px 5px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: inherit;
    line-height: 14px;
  }

  .is-pill {
    border-radius: 100px;
  }
</style>
