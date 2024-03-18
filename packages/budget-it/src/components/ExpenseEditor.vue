<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppButton,
    AppConfirmPopup,
    AppInputText,
    useConfirm,
    useToast,
  } from '@inkbeard/ui-vue';
  import type {
    BaseExpenseInfo,
    ExpenseInfo,
    ExpenseList,
  } from '../types';

  const emits = defineEmits<{
    /**
     * Emit the edited name and description of the expense item.
     */
    editExpense: [BaseExpenseInfo];
    /**
     * Emit the deleted expense ID.
     */
    deleteExpense: [expenseId: number];
    /**
     * Emit that the editing of the expense was canceled.
     */
    cancelEditing: [];
  }>();
  const props = defineProps<{
    /**
     * The expense ID.
     */
    expenseId: number;
  }>();
  const confirm = useConfirm();
  const toast = useToast();
  const expenseList = inject<ExpenseList>('expenseList', {});
  const expense = defineModel<ExpenseInfo>('expense', { required: true });
  const expenseName = ref(expense.value.name);
  const expenseDescription = ref(expense.value.description);
  const editableExpense = ref({
    name: expenseName,
    description: expenseDescription,
  });
  const isEditing = ref(false);
  /**
   * The save button is disabled if the name is empty, the name is the same as the original name, or the name is the same as another expense.
   */
  const saveIsDisabled = computed(() => (
    !editableExpense.value.name
    || editableExpense.value.name.toLowerCase() === expense.value.name.toLowerCase()
    || Object.values(expenseList).some(({ name }) => (
      name.toLowerCase() === editableExpense.value.name.toLowerCase()
    ))
  ));
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
    emits('cancelEditing');
    isEditing.value = false;
    expenseName.value = expense.value.name;
    expenseDescription.value = expense.value.description;
  }
  /**
   * Close the dialog, removed the expense and emit the deleted expense id.
   */
  function deleteExpense() {
    isEditing.value = false;
    emits('deleteExpense', props.expenseId);
    delete expenseList[props.expenseId];

    toast.add({
      severity: 'success',
      summary: 'Expense deleted',
      detail: `"${expenseName.value}" has been deleted.`,
      life: 5000,
    });
  }
  /**
   * Confirm the deletion of the expense.
   */
  function confirmDelete(event: { currentTarget: HTMLElement;
  }) {
    confirm.require({
      target: event.currentTarget,
      group: 'confirmDelete',
      message: 'This will permanently delete this expense.',
      icon: 'fa-solid fa-triangle-exclamation text-danger',
      acceptClass: 'p-button-raised p-button-sm p-button-danger',
      acceptIcon: 'fa-solid fa-check',
      acceptLabel: 'Delete',
      rejectClass: 'p-button-secondary p-button-raised p-button-sm',
      rejectIcon: 'fa-solid fa-xmark',
      rejectLabel: 'Cancel',
      accept: () => {
        deleteExpense();
      },
    });
  }
</script>

<template>
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
        raised
        severity="secondary"
        text
        @click="cancelEditing"
      />
      <AppButton
        class="submit"
        data-test="submit add expense"
        :disabled="saveIsDisabled"
        icon="fa-solid fa-check"
        label="Update"
        raised
        severity="primary"
        @click="saveExpense"
      />
    </div>
    <div class="delete-expense">
      <AppButton
        data-test="delete expense"
        icon="fa-solid fa-trash-can"
        label="Delete expense"
        severity="danger"
        text
        @click="confirmDelete"
      />
    </div>
    <AppConfirmPopup group="confirmDelete" />
  </form>
</template>

<style scoped>
.delete-expense {
  width: 100%;
  margin-top: 1.5rem;
  padding-top: 1rem;
  text-align: center;
  border-top: 1px solid var(--ink-border-color);
}
</style>
