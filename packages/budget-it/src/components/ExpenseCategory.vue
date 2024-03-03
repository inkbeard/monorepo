<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppButton,
    AppDropdown,
    AppInputNumber,
    AppInputText,
  } from '@inkbeard/ui-vue';
  import type {
    CategoryInfo,
    ExpenseInfo,
    ExpenseList,
    SourceList,
    LabelsAndIds,
    NullOrNumber,
  } from '../types';
  import ExpenseItem from './ExpenseItem.vue';

  const alphabaticSourceList = inject<LabelsAndIds>('alphabaticSourceList', []);
  const defaultSourceId = inject<NullOrNumber>('defaultSourceId', null);
  const sourceList = inject<SourceList>('sourceList');
  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const expenseList = inject<ExpenseList>('expenseList', {});
  const props = defineProps<{
    category: CategoryInfo,
  }>();
  const emits = defineEmits<{
    /**
     * Emit the category id that was deleted.
     */
    (e: 'deleteCategory', categoryId: number): void
  }>();
  const isOpen = ref(false);
  const newExpense = ref<ExpenseInfo>({
    categoryId: props.category.id,
    amount: 0,
    name: '',
    sourceId: defaultSourceId as number,
    order: 0,
  });
  const isAddingExpense = defineModel<boolean>('isAddingExpense');
  /**
   * Delete a category from the current list of categories.
   */
  const deleteCategory = () => {
    const index = categoryList.findIndex(({ id }) => id === props.category.id) ?? -1;

    if (index === -1) {
      return;
    }

    categoryList.splice(index, 1);
    emits('deleteCategory', props.category.id);
  };
  /**
   * Get the information for all the expenses for this category.
   */
  const categoryExpenses = computed(() => (
    Object.entries(expenseList).reduce((acc, [id, expense]) => {
      if (expense.categoryId === props.category.id) {
        acc.push({
          ...expense,
          id: Number(id),
        });
      }
      return acc;
    }, [] as ({ id: number } & ExpenseInfo)[])
  ));
  /**
   * Get the total amount of all the expenses for this category.
   */
  const totalExpenses = computed(() => (
    categoryExpenses.value.reduce((acc, expense) => acc + expense.amount, 0)
  ));
</script>

<template>
  <div class="category-container">
    <div
      class="category-section"
      :class="{ 'is-open': isOpen }"
    >
      <div class="category-title">
        <ul class="category-meta">
          <li
            class="category-name"
            data-test="category name"
          >
            {{ category.name }}
          </li>
          <li class="category-total">
            Total: ${{ totalExpenses }}
          </li>
        </ul>
        <AppButton
          class="toggle"
          data-test="toggle expenses"
          :icon="`fa-duotone fa-xl fa-arrows-${isOpen ? 'to' : 'from'}-dotted-line`"
          severity="secondary"
          text
          @click="isOpen = !isOpen"
        />
      </div>
      <div
        v-if="isOpen"
        class="category-content"
      >
        <div class="add-expense-container">
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
                :id="`${newExpense.categoryId}-${newExpense.name}`"
                v-model="newExpense.amount"
                :input-id="`${newExpense.categoryId}-${newExpense.name}`"
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
            is-full-width
            label="Add expense"
            severity="primary"
            @click="isAddingExpense = true"
          />
        </div>

        <template v-if="categoryExpenses.length">
          <ExpenseItem
            v-for="expense in categoryExpenses"
            :id="expense.id"
            :key="expense.id"
            v-model:expense="expenseList[expense.id]"
            data-test="category expense"
            :source-list="sourceList as SourceList"
          />
        </template>
      </div>
    </div>
    <AppButton
      class="delete-category"
      data-test="delete category"
      icon="fa-duotone fa-trash-can fa-lg"
      severity="danger"
      text
      @click="deleteCategory"
    />
  </div>
</template>

<style scoped>
.add-expense-container {
  padding: 1rem;
  background-color: var(--ink-white-mute);
  border-bottom: 1px solid var(--ink-border-color-dark);
}

/*
.add-expense {
  width: 100%;
} */

.expense-form-inputs {
  display: flex;
  align-self: center;
  gap: 1rem;
  padding-bottom: 1rem;

  > * {
    flex: 1;
  }
}

.category-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-section {
  flex: 1;
  border: 1px solid var(--ink-border-color-dark);
  border-radius: 4px;
  color: var(--vt-c-black-soft);
  background-color: var(--vt-c-white);
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-bottom: 1px solid var(--ink-border-color-dark);
}

.category-meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-name {
  margin: 0;
  font-weight: bold;
}

.delete-category {
  margin-top: 1.5rem;
}

</style>
