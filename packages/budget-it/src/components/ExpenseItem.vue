<script setup lang="ts">
  import { ref } from 'vue';
  import type { ExpenseInfo } from '@/stores/expenses';
  import { useExpensesStore } from '@/stores/expenses';

  const props = defineProps<{
    expense: ExpenseInfo;
  }>();
  const expenseAmount = ref(props.expense.amount);
  const updateExpenseAmount = () => {
    const { expenseList } = useExpensesStore();
    const { id } = props.expense;

    if (id) {
      expenseList[id].amount = expenseAmount.value;
    }
  };

</script>

<template>
  <form>
    <label :for="`${expense.categoryId}-${expense.name}`">
      {{ expense.name }}
      <i
        v-if="expense.description"
        class="fa-duotone fa-circle-question"
        :title="expense.description"
      />
    </label>
    <input
      :id="`${expense.categoryId}-${expense.name}`"
      v-model="expenseAmount"
      type="number"
      @blur="updateExpenseAmount"
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
