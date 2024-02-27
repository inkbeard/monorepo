<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import { useSourcesStore } from '@/stores/sources';
  import SourceListing from '@/components/SourceListing.vue';

  const {
    addSource,
    deleteSource,
    sourceList,
    sourcesWithExpenses,
  } = useSourcesStore();
  /**
   * Get and set the store's default source id.
   */
  const defaultSourceId = computed({
    get: () => useSourcesStore().defaultSourceId,
    set: (sourceId) => {
      useSourcesStore().defaultSourceId = sourceId;
    },
  });
  const isAdding = ref(false);
</script>

<template>
  <h5>
    Sources
    <AppButton
      aria-label="Add source"
      data-test="add source"
      :disabled="isAdding"
      icon="fa-solid fa-plus fa-lg"
      text
      @click="isAdding = true"
    />
  </h5>
  <ul>
    <SourceListing
      v-if="isAdding"
      v-model:default-source-id="defaultSourceId"
      v-model:is-editing="isAdding"
      :source-list="sourceList"
      :sources-with-expenses="sourcesWithExpenses"
      @add-source="addSource"
    />
    <SourceListing
      v-for="({ id }) in useSourcesStore().alphabaticSourceList"
      :key="`source-list-${id}-${defaultSourceId}`"
      v-model:default-source-id="defaultSourceId"
      v-model:source-list="sourceList"
      :expenses-from-sources="sourcesWithExpenses[id]?.length"
      :source-id="id"
      :sources-with-expenses="sourcesWithExpenses"
      @delete-source="deleteSource"
    />
  </ul>
</template>

<style scoped>
h5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

ul {
  margin: 0;
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
