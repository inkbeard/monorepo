<script setup lang="ts">
  import { ref } from 'vue';
  import AddCategory from '@/components/AddCategory.vue';
  import ExportCategory from '@/components/ExpenseCategory.vue';

  const categories = ref([
    'Entertainment',
    'Food',
    'Housing',
    'Transportation',
    'Utilities',
    'Clothing',
    'Medical',
  ]);

  function deleteCategory(value: string) {
    categories.value.splice(categories.value.indexOf(value), 1);
  }
</script>

<template>
  <main>
    <AddCategory @add-category="(value:string) => categories.unshift(value)" />
    <ExportCategory
      v-for="category in categories"
      :key="category"
      :category="category"
      @delete-category="deleteCategory"
    />
  </main>
</template>

