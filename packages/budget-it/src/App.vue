<script setup lang="ts">
  import AddCategory from '@/components/AddCategory.vue';
  import ExpenseCategory from '@/components/ExpenseCategory.vue';
  import SourcesEditor from '@/components/SourcesEditor.vue';
  import { useCategoriesStore } from '@/stores/categories';
  import { useExpensesStore } from '@/stores/expenses';
  import { useSourcesStore } from '@/stores/sources';

  const { categoryList } = useCategoriesStore();
</script>

<template>
  <main>
    <section>
      <div>
        <AddCategory
          :category-list="categoryList"
          @add-category="useCategoriesStore().addCategory"
        />
        <ExpenseCategory
          v-for="category in categoryList"
          :key="category.id"
          :category="category"
          :category-list="categoryList"
          :expense-list="useExpensesStore().expenseList"
          :source-list="useSourcesStore().sourceList"
        />
      </div>
      <aside>
        <SourcesEditor
          :default-source-id="useSourcesStore().defaultSourceId"
          :expense-list="useExpensesStore().expenseList"
          :source-list="useSourcesStore().sourceList"
        />
      </aside>
    </section>
  </main>
</template>

<style scoped>
section {
  display: flex;
  gap: 1rem;

  > div {
    flex: 1;
  }
}

aside {
  flex: .25;
  padding: 1rem;
}
</style>
