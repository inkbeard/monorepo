<script setup lang="ts">
  import { computed, inject, ref } from 'vue';
  import {
    AppFormGroup,
    AppButton,
    AppDropdown,
    AppInputNumber,
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
    sourceId: defaultSourceId,
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
        <form v-if="isAddingExpense">
          <AppFormGroup
            input-id="new-name"
            label="New expense"
            label-description="Add a new expense to this category."
          >
            <input id="new-name" v-model="newExpense.name" type="text" />
          </AppFormGroup>
          <AppFormGroup
            input-id="new-description"
            label="New description"
            label-description="Add a new expense to this category."
          >
            <input id="new-description" v-model="newExpense.description" type="text" />
          </AppFormGroup>
          <AppInputNumber
            :id="`${newExpense.categoryId}-${newExpense.name}`"
            v-model="newExpense.amount"
            :input-id="`${newExpense.categoryId}-${newExpense.name}`"
            :label="newExpense.name"
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
        </form>
        <AppButton
          v-else
          class="add-expense"
          data-test="add expense"
          icon="fa-duotone fa-plus"
          label="Add expense"
          severity="primary"
          @click="isAddingExpense = true"
        />

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
.add-expense {
  width: calc(100% - 2rem);
  margin: 1rem;
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
