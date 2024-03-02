<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { AppInputNumber, AppDropdown } from '@inkbeard/ui-vue';
  import type { ExpenseInfo, LabelsAndIds } from '../types';

  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);

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
      v-model="expense.sourceId"
      input-id="expense-source"
      label="Source"
      option-label="label"
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
