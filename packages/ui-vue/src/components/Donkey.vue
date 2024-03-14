<script setup lang="ts">
  /**
   * Dsf.
   */
  export interface Props {
    /**
     * The message displaying in the component.
     */
    msg?: string;
  }

  withDefaults(defineProps<Props>(), {
    msg: 'Hello Donkey!',
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
