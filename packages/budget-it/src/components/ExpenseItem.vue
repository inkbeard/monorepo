<script setup lang="ts">
  import { inject, ref } from 'vue';
  import {
    AppButton,
    AppInputNumber,
    AppDropdown,
    Tooltip,
  } from '@inkbeard/ui-vue';
  import type { ExpenseInfo, LabelsAndIds } from '../types';

  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const vTooltip = Tooltip;

</script>

<template>
  <div class="expense-item">
    <h4
      v-tooltip="expense.description"
      class="expense-item-name font-size-p"
      :class="{ 'has-description': expense.description }"
    >
      {{ expense.name }}
      <AppButton icon="fa-solid fa-pencil" text />
    </h4>
    <form class="expense-item-" @submit.prevent>
      <AppInputNumber
        :id="`${expense.categoryId}-${expense.name}`"
        v-model="expenseAmount"
        currency="USD"
        :input-id="`${expense.categoryId}-${expense.name}`"
        label="Amount"
        mode="currency"
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
  </div>
</template>

<style scoped>
.expense-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--ink-border-color);
}

.expense-item-name {
  margin: 0;
  padding: .5rem 1rem 0;
}

.has-description {
  cursor: help;
  text-decoration: underline;
}

form {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: 1rem;
  border-right: 1px solid var(--ink-border-color);

  > * {
    flex: 1;
  }
}
</style>
