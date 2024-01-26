<script setup lang="ts">
  import ExportCategory from '@/components/ExpenseCategory.vue';

  const categories = [
    'Entertainment',
    'Food',
    'Housing',
    'Transportation',
    'Utilities',
    'Clothing',
    'Medical',
  ];
</script>

<template>
  <main>
    <ExportCategory
      v-for="category in categories"
      :key="category"
      :category="category"
    />
  </main>
</template>

<style scoped>
</style>
