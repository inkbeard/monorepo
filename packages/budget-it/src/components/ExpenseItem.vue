<script setup lang="ts">
  import { inject, ref } from 'vue';
  import { AppButton, AppInputNumber, AppDropdown } from '@inkbeard/ui-vue';
  import type { ExpenseInfo, LabelsAndIds } from '../types';

  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);

</script>

<template>
  <div class="expense-item">
    <form class="expense-item-info" @submit.prevent>
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
        option-label="label"
        option-value="id"
        :options="alphabaticSourceList"
      />
    </form>
    <div class="btn-group">
      <AppButton icon="fa-solid fa-pencil" text />
    </div>
  </div>
</template>

<style scoped>
.expense-item {
  display: flex;
  border-bottom: 1px solid var(--ink-border-color);
  background: var(--ink-white);
}

.expense-item-info {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  border-right: 1px solid var(--ink-border-color);
  box-shadow: inset 6px 5px 13px -8px rgb(0 0 0 / 75%);

  > * {
    flex: 1;
  }
}

.btn-group {
  box-shadow: inset 6px 5px 13px -8px rgb(0 0 0 / 75%);
}
</style>
