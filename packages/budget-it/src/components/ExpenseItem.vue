<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { ExpenseInfo } from '@/stores/expenses';
  import { useExpensesStore } from '@/stores/expenses';
  import { useSourcesStore } from '@/stores/sources';
  import { AppInputNumber, AppDropdown } from '@inkbeard/ui-vue';

  const props = defineProps<{
    expense: ExpenseInfo;
  }>();
  const { expenseList } = useExpensesStore();
  const expenseAmount = ref(props.expense.amount);
  const expenseSourceId = computed({
    get: () => props.expense.sourceId,
    set: (value: number) => {
      const { id } = props.expense;

      if (id) {
        expenseList[id].sourceId = value;
      }
    },
  });
  const updateExpenseAmount = () => {
    const { id } = props.expense;

    if (id) {
      expenseList[id].amount = expenseAmount.value;
    }
  };

</script>

<template>
  <form @submit.prevent>
    <AppInputNumber
      :id="`${expense.categoryId}-${expense.name}`"
      v-model="expenseAmount"
      :input-id="`${expense.categoryId}-${expense.name}`"
      :label="expense.name"
      :label-description="expense.description"
      @blur="updateExpenseAmount"
    />
    <AppDropdown
      v-model="expenseSourceId"
      input-id="expense-source"
      label="Source"
      option-label="source"
      option-value="id"
      :options="useSourcesStore().alphabaticSourceList"
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
