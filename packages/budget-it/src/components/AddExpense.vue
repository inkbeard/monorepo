<script setup lang="ts">
  import { inject, ref } from 'vue';
  import {
    AppButton,
    AppDropdown,
    AppInputNumber,
    AppInputText,
    Tooltip,
  } from '@inkbeard/ui-vue';
  import type {
    ExpenseInfo,
    LabelsAndIds,
  } from '../types';

  export interface AddExpenseProps {
    /**
     * The ID of the category to add the expense to.
     */
    categoryId: number;
    /**
     * Whether the button should be full width and center the text/icon.
     */
    isFullWidth?: boolean;
  }
  const vTooltip = Tooltip;
  const props = withDefaults(defineProps<AddExpenseProps>(), {
    isFullWidth: false,
  });
  const addExpense = inject<Function>('addExpense', () => () => {});
  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const defaultSourceId = inject<number>('defaultSourceId', 0);
  const sourceId = ref<number>(defaultSourceId);
  const newExpense = ref<ExpenseInfo>({
    categoryId: props.categoryId,
    amount: 0,
    description: '',
    name: '',
    sourceId: sourceId.value,
    order: 0,
  });
  /**
   * Whether the user is currently adding a new expense.
   */
  const isAddingExpense = defineModel<boolean>('isAddingExpense');
  /**
   * Close the add expense form and reset the new expense object.
   */
  const closeAddExpense = () => {
    isAddingExpense.value = false;
    newExpense.value = {
      ...newExpense.value,
      amount: 0,
      description: '',
      name: '',
      sourceId: sourceId.value,
    };
  };
  /**
   * Submit the new expense to the parent component and close the form.
   */
  const submitNewExpense = async () => {
    await addExpense(newExpense.value);
    closeAddExpense();
  };
</script>

<template>
  <form
    v-if="isAddingExpense"
    class="add-expense-form"
    @submit.prevent="submitNewExpense"
  >
    <div class="expense-form-inputs">
      <AppInputText
        v-model="newExpense.name"
        input-id="new-name"
        label="Name"
        label-description="Add a new expense to this category."
      />
      <AppInputText
        v-model="newExpense.description"
        input-id="new-description"
        label="Description"
        label-description="Add any notes for this expense you would like to remember later."
      />
      <AppInputNumber
        :id="`${categoryId}-${newExpense.name}`"
        v-model="newExpense.amount"
        currency="USD"
        :input-id="`${categoryId}-${newExpense.name}`"
        label="Amount"
        mode="currency"
      />
      <AppDropdown
        v-model="newExpense.sourceId"
        input-id="expense-source"
        label="Source"
        option-label="label"
        option-value="id"
        :options="alphabaticSourceList"
      />
    </div>
    <div class="btn-group align-end">
      <AppButton
        data-test="cancel add expense"
        icon="fa-solid fa-xmark"
        label="Cancel"
        raised
        severity="secondary"
        text
        @click="closeAddExpense"
      />
      <AppButton
        class="submit"
        data-test="submit add expense"
        :disabled="!newExpense.name"
        icon="fa-solid fa-check"
        label="Submit"
        raised
        severity="primary"
        @click="submitNewExpense"
      />
    </div>
  </form>
  <div
    v-else
    v-tooltip.top="alphabaticSourceList.length ? '' : 'At least one source must be added to add an expense.'"
  >
    <AppButton
      class="add-expense"
      data-test="add expense"
      :disabled="!alphabaticSourceList.length"
      icon="fa-duotone fa-plus"
      :is-full-width="isFullWidth"
      label="Add expense"
      raised
      severity="primary"
      @click="isAddingExpense = true"
    />
  </div>
</template>

<style scoped>
.expense-form-inputs {
  display: flex;
  align-self: center;
  gap: 1rem;
  padding-bottom: 1rem;

  > * {
    flex: 1;
  }
}
</style>
