<script setup lang="ts">
  /**
   * A custom alert component used to display related information.
   */
  export interface Props {
    /**
     * The message displaying in the component.
     */
    msg?: string;
  }

  withDefaults(defineProps<Props>(), {
    msg: 'Hello AppAlert!',
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
