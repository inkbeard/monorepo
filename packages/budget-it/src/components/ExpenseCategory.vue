<script setup lang="ts">
  import { computed, inject } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import type {
    CategoryInfo,
    ExpenseInfo,
    ExpenseList,
  } from '../types';
  import ExpenseItem from './ExpenseItem.vue';
  import AddExpense from './AddExpense.vue';

  const categoryList = inject<CategoryInfo[]>('categoryList', []);
  const expenseList = inject<ExpenseList>('expenseList', {});
  const props = defineProps<{
    /**
     * The category to display.
     */
    category: CategoryInfo,
  }>();
  const emits = defineEmits<{
    /**
     * Emit the category id that was deleted.
     */
    (e: 'deleteCategory', categoryId: number): void
  }>();
  /**
   * Whether the category is open to view its expenses.
   */
  const isOpen = defineModel<boolean>('isOpen');
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
  /**
   * Show confirmation when the user has successfully edited an expense name or description.
   */
  function onEditExpense({ id, name, description }: {
    id: number,
    name: string,
    description: string
  }) {
    // eslint-disable-next-line no-console
    console.log('Edited expense:', { id, name, description });
  }
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
          <AddExpense
            :category-id="category.id"
            is-full-width
          />
        </div>
        <template v-if="categoryExpenses.length">
          <ExpenseItem
            v-for="(expense, index) in categoryExpenses"
            :id="expense.id"
            :key="expense.id"
            v-model:expense="categoryExpenses[index]"
            class="category-expense"
            data-test="category expense"
            @edit-expense="onEditExpense"
          />
        </template>
        <p v-else>
          No expenses in for "{{ category.name }}."
        </p>
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

.category-container {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-expense {
  padding-left: 2rem;
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
