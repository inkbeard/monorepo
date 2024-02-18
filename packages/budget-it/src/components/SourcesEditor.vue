<script setup lang="ts">
  import { ref } from 'vue';
  import { useSourcesStore } from '@/stores/sources';
  import SourceListing from '@/components/SourceListing.vue';

  const isAdding = ref(false);
</script>

<template>
  <h5>
    Sources
    <button
      aria-label="Add source"
      data-test="add source"
      :disabled="isAdding"
      type="button"
      @click="isAdding = true"
    >
      <i class="fa-solid fa-plus fa-lg" />
    </button>
  </h5>
  <ul>
    <SourceListing
      v-if="isAdding"
      v-model:is-editing="isAdding"
    />
    <SourceListing
      v-for="({ id }) in useSourcesStore().alphabaticSourceList"
      :key="id"
      :source-id="id"
    />
  </ul>
</template>

<style scoped>
h5 {
  display: flex;
  justify-content: space-between;
}

ul {
  padding: 0;
}

button {
  background: none;
  border: none;
  color: var(--ink-color-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
