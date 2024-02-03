<script setup lang="ts">
  import AddCategory from '@/components/AddCategory.vue';
  import ExportCategory from '@/components/ExpenseCategory.vue';
  import { useCategoriesStore } from '@/stores/categories';
</script>

<template>
  <main>
    <AddCategory />
    <ExportCategory
      v-for="category in useCategoriesStore().categoryList"
      :key="category.id"
      :category="category"
    />
  </main>
</template>
