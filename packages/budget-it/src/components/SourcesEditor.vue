<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import SourceListing from './SourceListing.vue';
  import type { ExpenseList, SourceList } from '../types';

  const props = defineProps<{
    expenseList: ExpenseList;
  }>();
  const defaultSourceId = defineModel<number | null>('defaultSourceId');
  const sourceList = defineModel<SourceList>('sourceList', { required: true });
  /**
   * Get an alphabatize list of sources and their IDs.
   */
  const alphabaticSourceList = computed(() => Object.entries(sourceList.value)
    .map(([id, source]) => ({ source, id: +id }))
    .sort((a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase())));
  /**
   * Get the expenses associated with the sources.
   */
  const sourcesWithExpenses = computed(() => Object.entries(props.expenseList)
    .reduce((acc: any, [id, { sourceId }]) => {
      if (acc[sourceId]) {
        acc[sourceId].push(id);
      } else {
        acc[sourceId] = [id];
      }

      return acc;
    }, {}));
  const isAdding = ref(false);
  /**
   * Add a new source to the current list of sources with the ID + 1 of the highest ID so far.
   */
  const addSource = (
    {
      sourceName,
      isDefault,
    }: {
      sourceName: string,
      isDefault: boolean
    },
  ) => {
    const newSourceId = Math.max(...Object.keys(sourceList.value).map(Number)) + 1;

    sourceList.value[newSourceId] = sourceName;

    if (isDefault) {
      defaultSourceId.value = newSourceId;
    }

    return newSourceId;
  };
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
      @add-source="addSource"
    />
    <SourceListing
      v-for="({ id }) in alphabaticSourceList"
      :key="`source-list-${id}`"
      v-model:default-source-id="defaultSourceId"
      v-model:source-list="sourceList"
      :expenses-from-sources="sourcesWithExpenses[id]?.length"
      :source-id="id"
      :sources-with-expenses="sourcesWithExpenses"
      @delete-source="delete sourceList[id]"
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
