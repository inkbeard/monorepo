<script setup lang="ts">
  import { ref, nextTick } from 'vue';
  import { useSourcesStore } from '@/stores/sources';
  import SourceListing from '@/components/SourceListing.vue';

  const isAdding = ref(false);
  /**
   * Add a new source if it doesn't exist already.
   */
  const addSource = async (value: string) => {
    useSourcesStore().addSource(value);

    await nextTick();

    isAdding.value = false;
  };
</script>

<template>
  <h2>
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
  </h2>
  <ul>
    <SourceListing
      v-if="isAdding"
      @add-source="addSource"
      @cancel-add-source="isAdding = false"
    />
    <SourceListing
      v-for="({ id }) in useSourcesStore().alphabaticSourceList"
      :key="id"
      :source-id="id"
      @update-source="useSourcesStore().sourceList[id] = $event"
    />
  </ul>
</template>

<style scoped>
h2 {
  display: flex;
  justify-content: space-between;
}

ul {
  padding: 0;
}

button {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: .5;
  }
}
</style>
