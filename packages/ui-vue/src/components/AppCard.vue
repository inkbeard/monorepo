<script setup lang="ts">
  /**
   * A card style container used to display related content.
   */
  export interface Props {
    /**
     * The message displaying in the component.
     */
    msg?: string;
  }

  withDefaults(defineProps<Props>(), {
    msg: 'Hello AppCard!',
  });
</script>

<template>
  <div class="greetings">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
  .greetings {
    color: var(--ink-success-color);
  }
</style>
