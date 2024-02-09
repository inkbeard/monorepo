<script setup lang="ts">
  import { ref } from 'vue';
  import type { ExpenseInfo } from '@/stores/expenses';
  import { useExpensesStore } from '@/stores/expenses';

  const props = defineProps<{
    expense: ExpenseInfo;
  }>();

  const expenseAmount = ref(props.expense.amount);
</script>

<template>
  <form>
    <label :for="`${expense.categoryId}-${expense.name}`">
      {{ expense.name }}
    </label>
    <input
      :id="`${expense.categoryId}-${expense.name}`"
      v-model="expenseAmount"
      type="number"
      @blur="useExpensesStore().expenseList[props.expense.id].amount = expenseAmount"
    >
  </form>
</template>

<style scoped>
form {
  display: flex;
  gap: 1rem;
}

input {
  flex: 1;
}
</style>
