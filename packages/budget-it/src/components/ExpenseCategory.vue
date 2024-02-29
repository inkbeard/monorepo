<script setup lang="ts">
  import { computed, ref } from 'vue';
  import { AppButton } from '@inkbeard/ui-vue';
  import type { CategoryInfo, ExpenseInfo, ExpenseList } from '../types';
  import ExpenseItem from './ExpenseItem.vue';

  const props = defineProps<{
    category: CategoryInfo,
    sourceList: Record<string, string>,
  }>();
  const emits = defineEmits<{
    /**
     * Emit the category id that was deleted.
     */
    (e: 'deleteCategory', categoryId: number): void
  }>();

  const categoryList = defineModel<CategoryInfo[]>('categoryList', { required: true });
  const expenseList = defineModel<ExpenseList>('expenseList', { required: true });

  /**
   * Delete a category from the current list of categories.
   */
  const deleteCategory = () => {
    const index = categoryList.value.findIndex(({ id }) => id === props.category.id) ?? -1;

    if (index === -1) {
      return;
    }

    categoryList.value.splice(index, 1);
    emits('deleteCategory', props.category.id);
  };
  /**
   * Get the information for all the expenses for this category.
   */
  const categoryExpenses = computed(() => (
    Object.entries(expenseList.value as ExpenseList).reduce((acc, [id, expense]) => {
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
  const isOpen = ref(false);
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
        <template v-if="categoryExpenses.length">
          <!-- eslint-disable vue/valid-v-model -->
          <ExpenseItem
            v-for="expense in categoryExpenses"
            :id="expense.id"
            :key="expense.id"
            v-model:expense="expenseList[expense.id]"
            data-test="category expense"
            :source-list="sourceList"
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
