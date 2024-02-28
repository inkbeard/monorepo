<script lang="ts" setup>
  import { computed, ref } from 'vue';
  // eslint-disable-next-line import/no-extraneous-dependencies
  import { AddCategory, ExpenseCategory, SourceListing } from '@inkbeard/budget-it';
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
  const categoryList = ref([
    {
      name: 'Entertainment',
      id: 1,
    },
    {
      name: 'Food',
      id: 2,
    },
    {
      name: 'Housing',
      id: 3,
    },
    {
      name: 'Transportation',
      id: 4,
    },
    {
      name: 'Utilities',
      id: 5,
    },
    {
      name: 'Clothing',
      id: 6,
    },
    {
      name: 'Medical',
      id: 7,
    },
  ]);
  const expenseList = ref({
    1: {
      amount: 2,
      categoryId: 1,
      name: 'Netflix',
      order: 0,
      sourceId: 1,
    },
    2: {
      amount: 2,
      categoryId: 2,
      name: 'HBFC',
      order: 0,
      sourceId: 5,
    },
    3: {
      amount: 1000,
      categoryId: 3,
      description: 'Started with Guaranteed Rate and then refinanced with Better.com.',
      name: 'Mortgage',
      order: 0,
      sourceId: 3,
    },
    4: {
      amount: 30,
      categoryId: 4,
      name: 'Gas',
      order: 0,
      sourceId: 1,
    },
    5: {
      amount: 50,
      categoryId: 5,
      name: 'Target',
      order: 0,
      sourceId: 1,
    },
    7: {
      amount: 2260,
      categoryId: 7,
      description: 'Monthly premium for family of 4.',
      name: 'BCBS',
      order: 0,
      sourceId: 3,
    },
    8: {
      amount: 2,
      categoryId: 1,
      name: 'Hulu',
      order: 1,
      sourceId: 1,
    },
    9: {
      amount: 300,
      categoryId: 2,
      name: 'Jewel',
      order: 1,
      sourceId: 4,
    },
    10: {
      amount: 99,
      categoryId: 4,
      name: 'Metra',
      order: 1,
      sourceId: 1,
    },
  });
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
  /**
   * Add a new category to the current list of categories.
   */
  const addCategory = (name: string) => {
    categoryList.value.unshift({
      name: name.trim(),
      id: categoryList.value.length + 1,
    });
  };

</script>

<template>
  <main>
    <section>
      <div>
        <AddCategory
          :category-list="categoryList"
          @add-category="addCategory"
        />
        <ExpenseCategory
          v-for="category in categoryList"
          :key="category.id"
          :category="category"
          :category-list="categoryList"
          :expense-list="expenseList"
          :source-list="sourceList"
        />
      </div>
      <aside>
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
      </aside>
    </section>
  </main>
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

section {
  display: flex;
  gap: 1rem;

  > div {
    flex: 1;
  }
}

aside {
  flex: .25;
  padding: 1rem;
}
</style>
