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
     * Used to determine if the badge background and border colors are the same.
     */
    isSolid: {
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
      { 'is-solid': isSolid },
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
    border: 1px solid;
    border-radius: 5px;
  }

  /* Size */
  .is-small {
    padding: 2px 5px;
    font-size: 10px;
    font-weight: 600;
    line-height: 12px;
    letter-spacing: inherit;

    &.is-pill:not(.is-counter) {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  .is-medium {
    padding: 3px 5px;

    &.is-pill:not(.is-counter) {
      padding-right: 8px;
      padding-left: 8px;
    }
  }

  .is-large {
    padding: 3px 16px;
  }

  /* Statuses */
  .is-danger {
    color: var(--tf-danger);
    background: var(--tf-danger-light);
    border-color: var(--tf-danger);

    &.is-counter,
    &.is-solid {
      background: var(--tf-danger);
    }
  }

  .is-info {
    color: var(--tf-gray-dark);
    border-color: var(--tf-gray-dark);

    &.is-counter,
    &.is-solid {
      background: var(--tf-gray-dark);
    }
  }

  .is-success {
    color: var(--tf-success);
    background: var(--tf-success-light);
    border-color: var(--tf-success);

    &.is-counter,
    &.is-solid {
      background: var(--tf-success);
    }
  }

  .is-warning {
    color: var(--tf-warning);
    background: var(--tf-warning-light);
    border-color: var(--tf-warning);

    &.is-counter
    &.is-solid {
      background: var(--tf-warning);
    }
  }

  .is-counter {
    box-sizing: border-box;
    height: 20px;
    min-width: 20px;
    padding: 2px 5px;
    border: 1px solid var(--tf-base-light);
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: inherit;
    line-height: 14px;
    color: var(--tf-base-light);
  }

  .is-pill {
    border-radius: 100px;
  }

  .is-solid {
    color: var(--tf-base-light);
  }
</style>
