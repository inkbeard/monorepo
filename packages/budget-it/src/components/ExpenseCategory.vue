<script setup lang="ts">
  import { computed, ref } from 'vue';
  import type { CategoryInfo } from '@/stores/categories';
  import { useCategoriesStore } from '@/stores/categories';
  import { useExpensesStore } from '@/stores/expenses';
  import ExpenseItem from './ExpenseItem.vue';

  const props = defineProps({
    category: {
      type: Object as () => CategoryInfo,
      required: true,
    },
  });
  const categoryExpenses = computed(() => (
    Object.values(useExpensesStore().expenseList).reduce((acc, expense) => {
      if (expense.categoryId === props.category.id) {
        acc.push(expense);
      }
      return acc;
    }, [])
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
        <span data-test="category name">{{ category.name }}</span>
        <button
          class="toggle"
          data-test="toggle expenses"
          type="button"
          @click="isOpen = !isOpen"
        >
          <i
            class="fa-duotone fa-xl"
            :class="`fa-arrows-${isOpen ? 'to' : 'from'}-dotted-line`"
          />
        </button>
      </div>
      <div
        v-if="isOpen"
        class="category-content"
      >
        <template v-if="categoryExpenses.length">
          <ExpenseItem
            v-for="expense in categoryExpenses"
            :key="expense.id"
            data-test="category expense"
            :expense="expense"
          />
        </template>
        <p v-else>
          No expenses in for "{{ category.name }}."
        </p>
      </div>
    </div>
    <button
      class="delete"
      data-test="delete category"
      type="button"
      @click="useCategoriesStore().deleteCategory(category.id)"
    >
      <i class="fa-duotone fa-trash-can fa-xl" />
    </button>
  </div>
</template>

<style scoped>
.category-container {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1rem;
}

.category-section {
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 4px;
  color: var(--vt-c-black-soft);
  background-color: var(--vt-c-white);
}

.category-title,
.category-content {
  padding: 1rem;
}

.category-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}

button {
  background: none;
  border: none;
  color: var(--ink-color-text);
  cursor: pointer;

  &.toggle {
    color: var(--vt-c-black-soft);
  }
}
</style>
