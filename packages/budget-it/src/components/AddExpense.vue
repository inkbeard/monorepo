<script setup lang="ts">
  import { inject, ref } from 'vue';
  import {
    AppButton,
    AppDropdown,
    AppInputNumber,
    AppInputText,
  } from '@inkbeard/ui-vue';
  import type {
    ExpenseInfo,
    LabelsAndIds,
    NullOrNumber,
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

  const props = withDefaults(defineProps<AddExpenseProps>(), {
    isFullWidth: false,
  });

  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const defaultSourceId = inject<NullOrNumber>('defaultSourceId', null);
  const newExpense = ref<ExpenseInfo>({
    categoryId: props.categoryId,
    amount: 0,
    name: '',
    sourceId: defaultSourceId as number,
    order: 0,
  });
  /**
   * Whether the user is currently adding a new expense.
   */
  const isAddingExpense = defineModel<boolean>('isAddingExpense');
</script>

<template>
  <form
    v-if="isAddingExpense"
    class="add-expense-form"
  >
    <div class="expense-form-inputs">
      <AppInputText
        input-id="new-name"
        label="Name"
        label-description="Add a new expense to this category."
      />
      <AppInputText
        input-id="new-description"
        label="Description"
        label-description="Add any notes for this expense you would like to remember later."
      />
      <AppInputNumber
        :id="`${categoryId}-${newExpense.name}`"
        v-model="newExpense.amount"
        :input-id="`${categoryId}-${newExpense.name}`"
        label="Amount"
        :label-description="newExpense.description"
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
        severity="secondary"
        text
        @click="isAddingExpense = false"
      />
      <AppButton
        class="submit"
        data-test="submit add expense"
        icon="fa-solid fa-check"
        label="Submit"
        severity="primary"
        @click="isAddingExpense = false"
      />
    </div>
  </form>
  <AppButton
    v-else
    class="add-expense"
    data-test="add expense"
    icon="fa-duotone fa-plus"
    :is-full-width="isFullWidth"
    label="Add expense"
    severity="primary"
    @click="isAddingExpense = true"
  />
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
