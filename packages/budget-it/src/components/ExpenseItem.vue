<script setup lang="ts">
  import { inject, ref } from 'vue';
  import {
    AppButton,
    AppDialog,
    AppInputNumber,
    AppDropdown,
    Tooltip,
    AppInputText,
  } from '@inkbeard/ui-vue';
  import type { BaseExpenseInfo, ExpenseInfo, LabelsAndIds } from '../types';

  const emits = defineEmits<{
    /**
     * Emit the edited name and description of the expense item.
     */
    editExpense: [BaseExpenseInfo]
  }>();

  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseAmount = ref(expense.value.amount);
  const expenseName = ref(expense.value.name);
  const expenseDescription = ref(expense.value.description);
  const editableExpense = ref({
    name: expenseName,
    description: expenseDescription,
  });
  const isEditing = ref(false);
  const vTooltip = Tooltip;

  /**
   * Save the expense with the new information and cancel editing.
   */
  function saveExpense() {
    expense.value.name = expenseName.value;
    expense.value.description = expenseDescription.value;
    isEditing.value = false;

    emits('editExpense', {
      name: editableExpense.value.name,
      description: editableExpense.value.description || '',
    });
  }
  /**
   * Cancel the editing of the expense and reset the form.
   */
  function cancelEditing() {
    isEditing.value = false;
    expenseName.value = expense.value.name;
    expenseDescription.value = expense.value.description;
  }
</script>

<template>
  <div class="expense-item">
    <div class="information-container">
      <h4
        v-tooltip.top="expense.description"
        class="expense-item-name font-size-p"
        :class="{ 'has-description': expense.description }"
      >
        {{ expense.name }}
      </h4>
      <AppButton
        icon="fa-solid fa-pencil"
        text
        @click="isEditing = true"
      />
    </div>
    <form class="expense-item-form" @submit.prevent>
      <AppInputNumber
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
    <AppDialog
      v-model:visible="isEditing"
      :header="`Edit ${expense.name}`"
      modal
      :style="{ width: '20rem' }"
    >
      <form class="app-form-vertical" @submit.prevent="saveExpense">
        <AppInputText
          v-model="editableExpense.name"
          :input-id="`edit-name-${expense.categoryId}-${expense.name}`"
          label="Name"
          label-description="Add a new expense to this category."
        />
        <AppInputText
          v-model="editableExpense.description"
          :input-id="`edit-description-${expense.categoryId}-${expense.name}`"
          label="Description"
          label-description="Add any notes for this expense you would like to remember later."
        />
        <div class="btn-group align-end">
          <AppButton
            data-test="cancel add expense"
            icon="fa-solid fa-xmark"
            label="Cancel"
            severity="secondary"
            text
            @click="cancelEditing"
          />
          <AppButton
            class="submit"
            data-test="submit add expense"
            :disabled="!editableExpense.name"
            icon="fa-solid fa-check"
            label="Create"
            severity="primary"
            @click="saveExpense"
          />
        </div>
      </form>
    </AppDialog>
  </div>
</template>

<style scoped>
.expense-item {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--ink-border-color);
}

.information-container {
  display: flex;
  align-items: center;
  gap: .5rem;
  padding: .5rem 1rem 0;
}

.expense-item-name {
  margin: 0;
}

.has-description {
  cursor: help;
  text-decoration: underline;
}

.expense-item-form {
  display: flex;
  flex: 1;
  gap: 1rem;
  padding: .0 1rem 1rem;

  > * {
    flex: 1;
  }
}
</style>
