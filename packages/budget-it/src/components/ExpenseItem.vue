<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { ExpenseInfo } from '@/stores/expenses';
  import { useExpensesStore } from '@/stores/expenses';
  import { useSourcesStore } from '@/stores/sources';

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
    <select v-model="expenseSourceId">
      <option
        v-for="({ id, source }) in useSourcesStore().alphabaticSourceList"
        :key="id"
        :value="id"
      >
        {{ source }}
      </option>
    </select>
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
