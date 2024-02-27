<script lang="ts" setup>
  import { computed, ref } from 'vue';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { AddCategory, SourceListing } from '@inkbeard/budget-it';
  import { AppButton } from '@inkbeard/ui-vue';

  const defaultSourceId = ref(1);
  const isAdding = ref(false);
  const sourceList = ref({
    1: 'Credit Card',
    3: 'Checking Account',
    4: 'Savings Account',
    5: 'Cash',
  } as Record<number, string>);
  const sourcesWithExpenses = ref({
    1: [1, 2, 3],
    3: [4, 5],
    4: [6, 7],
    5: [8, 9],
  } as Record<number, number[]>);
  /**
   * Get an alphabatize list of sources and their IDs.
   */
  const alphabaticSourceList = computed(() => Object.entries(sourceList.value)
    .map(([id, source]) => ({ source, id: +id }))
    .sort((a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase())));
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
  <AddCategory :category-list="[]" />
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
  <SourceListing
    v-if="isAdding"
    v-model:default-source-id="defaultSourceId"
    v-model:is-editing="isAdding"
    :source-list="sourceList"
    :sources-with-expenses="sourcesWithExpenses"
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
</style>
