<script setup lang="ts">
  import AddCategory from '@/components/AddCategory.vue';
  import ExportCategory from '@/components/ExpenseCategory.vue';
  import SourcesEditor from '@/components/SourcesEditor.vue';
  import { useCategoriesStore } from '@/stores/categories';
</script>

<template>
  <main>
    <section>
      <div>
        <AddCategory />
        <ExportCategory
          v-for="category in useCategoriesStore().categoryList"
          :key="category.id"
          :category="category"
        />
      </div>
      <aside>
        <SourcesEditor />
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
