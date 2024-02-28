<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { AppInputNumber, AppDropdown } from '@inkbeard/ui-vue';
  import type { ExpenseInfo } from '@/types';

  const props = defineProps<{
    sourceList: Record<string, string>;
  }>();
  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  /**
   * Get an alphabatize list of sources and their IDs.
   */
  const alphabaticSourceList = computed(() => Object.entries(props.sourceList)
    .map(([id, source]) => ({ source, id: +id }))
    .sort((a, b) => a.source.toLowerCase().localeCompare(b.source.toLowerCase())));

</script>

<template>
  <form @submit.prevent>
    <AppInputNumber
      :id="`${expense.categoryId}-${expense.name}`"
      v-model="expenseAmount"
      :input-id="`${expense.categoryId}-${expense.name}`"
      :label="expense.name"
      :label-description="expense.description"
      @blur="expense.amount = expenseAmount"
    />
    <AppDropdown
      :key="expense.sourceId"
      v-model="expense.sourceId"
      input-id="expense-source"
      label="Source"
      option-label="source"
      option-value="id"
      :options="alphabaticSourceList"
    />
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid var(--ink-border-color);
  justify-content: space-evenly;

  > * {
    flex: 1;
  }
}
</style>
