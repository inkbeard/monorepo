<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppAlert,
    AppButton,
    AppDialog,
    AppToast,
  } from '@inkbeard/ui-vue';
  import type {
    BaseExpenseInfo,
    CategoryInfo,
    ExpenseList,
  } from '../types';
  import CategoryEditor from './CategoryEditor.vue';
  import ExpenseItem from './ExpenseItem.vue';
  import AddExpense from './AddExpense.vue';

  const isEditing = ref(false);
  const expenseList = inject<ExpenseList>('expenseList', {});
  const category = defineModel<CategoryInfo>('category', { required: true });
  /**
   * Whether the category is open to view its expenses.
   */
  const isOpen = defineModel<boolean>('isOpen');
  /**
   * Get the id and amount for all the expenses for this category.
   */
  const categoryExpenses = computed(() => (
    Object.entries(expenseList).reduce((acc, [id, expense]) => {
      if (expense.categoryId === category.value.id) {
        acc.push({
          id: Number(id),
          isHidden: expense.isHidden,
          amount: expense.amount,
          name: expense.name,
        });
      }
      return acc;
    }, [] as ({
      id: number,
      isHidden: boolean,
      amount: number,
      name: string
    })[])
  ));
  /**
   * Get the total amount of all the expenses for this category.
   */
  const totalExpenses = computed(() => (
    categoryExpenses.value.reduce((acc, { amount, isHidden }) => {
      if (!isHidden) {
        return acc + amount;
      }

      return acc;
    }, 0)
  ));
  /**
   * Show confirmation when the user has successfully edited an expense name or description.
   */
  function onEditExpense(
    id: number,
    { name, description }: BaseExpenseInfo,
  ) {
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
        <div
          class="category-color"
          :style="{ backgroundColor: category.backgroundColor }"
        />
        <ul class="category-meta">
          <li
            class="category-name"
            data-test="category name"
          >
            {{ category.name }}
            <AppButton
              icon="fa-solid fa-pencil"
              text
              @click="isEditing = true"
            />
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
            v-for="({ id }) in categoryExpenses"
            :key="id"
            v-model:expense="expenseList[id]"
            class="category-expense"
            data-test="category expense"
            :expense-id="id"
            @edit-expense="onEditExpense(id, $event as BaseExpenseInfo)"
          />
        </template>
        <AppAlert
          v-else
          class="empty-category"
          show-icon
        >
          No expenses in for "{{ category.name }}".
        </AppAlert>
      </div>
    </div>
  </div>
  <AppToast />
  <AppDialog
    v-model:visible="isEditing"
    header="Edit category"
    modal
    :style="{ width: '25rem' }"
  >
    <CategoryEditor
      v-model:category="category"
      :category-expenses="categoryExpenses"
      :category-id="category.id"
      :total-expenses="totalExpenses"
      @cancel-editing="isEditing = false"
      @delete-category="isEditing = false"
      @edit-category="isEditing = false"
    />
  </AppDialog>
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

.category-color {
  position: absolute;
  left: 0;
  width: 1rem;
  height: 100%;
}

.category-content {
  border-top: 1px solid var(--ink-border-color-dark);
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  padding: 1rem 1rem 1rem 2rem;
  border-bottom: 1px solid var(--ink-border-color-dark);
}

.category-meta {
  list-style: none;
  padding: 0;
  margin: 0;
}

.category-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  font-weight: bold;
}

.empty-category {
  margin: 1rem auto;
}

.toggle {
  margin-left: auto;
}
</style>
