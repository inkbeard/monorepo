<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { ExpenseInfo } from '@/stores/expenses';
  import { useExpensesStore } from '@/stores/expenses';
  import { useSourcesStore } from '@/stores/sources';
  import { AppIcon } from '@inkbeard/ui-vue';

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
    <label :for="`${expense.categoryId}-${expense.name}`">
      {{ expense.name }}
      <AppIcon
        v-if="expense.description"
        v-tooltip="expense.description"
        icon="fa-duotone fa-circle-question"
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
  padding: 1rem;
  border-bottom: 1px solid var(--ink-border-color);
}

input {
  flex: 1;
}
</style>
