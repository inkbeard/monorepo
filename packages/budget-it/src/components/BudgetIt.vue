<script lang="ts" setup>
  import { provide } from 'vue';
  import type { CategoryInfo, ExpenseList, SourceList } from '../types';

  const props = defineProps<{
    sourceList: SourceList;
    expenseList: ExpenseList;
  }>();
  const defaultSourceId = defineModel<number | null>('defaultSourceId');
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

  provide('defaultSourceId', defaultSourceId.value);
  provide('sourceList', props.sourceList);
  provide('categoryList', categoryList.value);
  provide('expenseList', props.expenseList);
  provide('addCategory', addCategory);
</script>

<template>
  <div class="budget-it">
    <slot />
  </div>
</template>
