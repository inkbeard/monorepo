<script setup lang="ts">
  /**
   * @desc A custom icon component that uses Font Awesome icons, separating the icon name and the size, along with a type for color.
   */

  defineProps({
    /**
     * The icon type (fa-solid, fa-thin, etc) and icon name (fa-t-rex, fa-bulldozer, etc) to render.
     */
    icon: {
      type: String,
      required: true,
    },
    /**
     * The appended icon from the the fontawesome [icon size property](https://fontawesome.com/v6/docs/web/style/size) without the `fa-` prefix.
     */
    size: {
      type: String,
      default: 'lg',
      validator: (value: string) => (
        [
          // relative sizes
          '2xs',
          'xs',
          'sm',
          'lg',
          'xl',
          '2xl',
          // literal sizes
          '1x',
          '2x',
          '3x',
          '4x',
          '5x',
          '6x',
          '7x',
          '8x',
          '9x',
          '10x',
        ].includes(value)
      ),
    },
    /**
     * The color theme used to render the icon color.
     */
    type: {
      type: String,
      default: '',
      validator: (value: string) => (
        [
          '',
          'danger',
          'info',
          'success',
          'warning',
        ].includes(value)
      ),
    },
  });
</script>

<template>
  <i
    :class="[
      icon,
      'app-icon',
      `fa-${size}`,
      {
        [`is-${type}`]: type,
      },
    ]"
  />
</template>

<style scoped>
  .is-danger {
    color: var(--ink-danger);
  }

  .is-info {
    color: var(--ink-info);
  }

  .is-success {
    color: var(--ink-success);
  }

  .is-warning {
    color: var(--ink-warning);
  }
</style>
