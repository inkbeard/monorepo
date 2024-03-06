<script lang="ts" setup>
  import { computed, provide } from 'vue';
  import type {
    CategoryInfo,
    ExpenseInfo,
    ExpenseList,
    LabelsAndIds,
    SourceList,
  } from '../types';

  const expenseList = defineModel<ExpenseList>('expenseList', { required: true });
  /**
     * Add a new source to the current list of sources with the ID + 1 of the highest ID so far.
     */
  const addExpense = async (expenseInfo: ExpenseInfo) => {
    const newExpenseId = Math.max(...Object.keys(expenseList.value as ExpenseList).map(Number)) + 1;

    expenseList.value![newExpenseId] = expenseInfo;

    return newExpenseId;
  };

  provide('expenseList', expenseList.value);
  provide('addExpense', addExpense);
  /**
   * The default source ID to use when adding a new expense.
   */
  const sourceList = defineModel<SourceList>('sourceList', { required: true });
  /**
   * The default source ID to use when adding a new expense.
   */
  const defaultSourceId = defineModel<number>('defaultSourceId', { required: true });
  /**
   * Get an alphabatize list of sources and their IDs.
   */
  const alphabaticSourceList = computed(() => Object.entries(sourceList.value as SourceList)
    .map(([id, label]) => ({ label, id: +id }))
    .sort((a, b) => a.label.toLowerCase().localeCompare(b.label.toLowerCase())) as LabelsAndIds);
  /**
   * Get the expenses associated with the sources.
   */
  const sourcesWithExpenses = computed(() => Object.entries(expenseList.value)
    .reduce((acc: any, [id, { sourceId }]) => {
      if (acc[sourceId]) {
        acc[sourceId].push(id);
      } else {
        acc[sourceId] = [id];
      }

      return acc;
    }, {}));
  /**
     * Add a new source to the current list of sources with the ID + 1 of the highest ID so far.
     */
  const addSource = (
    { sourceName, isDefault }: { sourceName: string, isDefault?: boolean },
  ): number => {
    const newSourceId = Math.max(...Object.keys(sourceList.value as SourceList).map(Number)) + 1;

    sourceList.value![newSourceId] = sourceName;

    if (isDefault) {
      defaultSourceId.value = newSourceId;
    }

    return newSourceId;
  };
  provide('addSource', addSource);
  provide('alphabaticSourceList', alphabaticSourceList);
  // provide('defaultSourceId', defaultSourceId.value); // why doesn't this work?!
  provide('defaultSourceId', defaultSourceId);
  provide('sourceList', sourceList.value);
  provide('sourcesWithExpenses', sourcesWithExpenses);

  /**
   * Get the current list of categories.
   */
  const categoryList = defineModel<CategoryInfo[]>('categoryList', { required: true });
  /**
   * Add a new category to the current list of categories.
   */
  const addCategory = (categoryName: string) => {
    categoryList.value.unshift({
      name: categoryName.trim(),
      id: categoryList.value.length + 1,
    });
  };

  provide('categoryList', categoryList.value);
  provide('addCategory', addCategory);
</script>

<template>
  <div class="budget-it">
    <slot />
  </div>
</template>
