<script setup lang="ts">
  /**
   * @desc A custom icon component that uses Font Awesome icons, separating the icon name and the size, along with a type for color.
   */

  export interface AppIconProps {
    /**
     * The icon type (fa-solid, fa-thin, etc) and icon name (fa-t-rex, fa-bulldozer, etc) to render.
     */
    icon: string;
    /**
     * The appended icon from the the fontawesome [icon size property](https://fontawesome.com/v6/docs/web/style/size) without the `fa-` prefix.
     */
    size:
      // relative sizes
      '2xs'
      | 'xs'
      | 'sm'
      | 'lg'
      | 'xl'
      | '2xl'
      // literal sizes
      | '1x'
      | '2x'
      | '3x'
      | '4x'
      | '5x'
      | '6x'
      | '7x'
      | '8x'
      | '9x'
      | '10x'
    /**
     * The color theme used to render the icon color.
     */
    type: '' | 'danger' | 'info' | 'success' | 'warning';
  }

  const {
    size = 'lg',
    type = '',
  } = defineProps<AppIconProps>();
</script>

<template>
  <i
    class="app-icon"
    :class="[
      icon,
      `fa-${size}`,
      {
        [`is-${type}`]: type,
      },
    ]"
  />
</template>

<style scoped>
  .is-danger {
    color: var(--ink-danger-color);
  }

  .is-info {
    color: var(--ink-info-color);
  }

  .is-success {
    color: var(--ink-success-color);
  }

  .is-warning {
    color: var(--ink-warning-color);
  }
</style>
