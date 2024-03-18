<script lang="ts" setup>
  import { ref } from 'vue';
  import {
    AddCategory,
    BudgetIt,
    ExpenseCategory,
    SourcesEditor,
  } from '@inkbeard/budget-it';

  const defaultSourceId = ref(1);
  const sourceList = ref({
    1: 'Credit Card',
    3: 'Checking Account',
    4: 'Savings Account',
    5: 'Cash',
  } as Record<number, string>);
  const categoryList = ref([
    {
      backgroundColor: '#b30000',
      id: 1,
      name: 'Entertainment',
    },
    {
      backgroundColor: '#7c1158',
      id: 2,
      name: 'Food',
    },
    {
      backgroundColor: '#4421af',
      id: 3,
      name: 'Housing',
    },
    {
      backgroundColor: '#1a53ff',
      id: 4,
      name: 'Transportation',
    },
    {
      backgroundColor: '#0d88e6',
      id: 5,
      name: 'Utilities',
    },
    {
      backgroundColor: '#00b7c7',
      id: 6,
      name: 'Clothing',
    },
    {
      backgroundColor: '#5ad45a',
      id: 7,
      name: 'Medical',
    },
  ]);
  const expenseList = ref({
    1: {
      amount: 2,
      categoryId: 1,
      name: 'Netflix',
      order: 0,
      sourceId: 1,
    },
    2: {
      amount: 2,
      categoryId: 2,
      name: 'HBFC',
      order: 0,
      sourceId: 5,
    },
    3: {
      amount: 1000,
      categoryId: 3,
      description: 'Started with Guaranteed Rate and then refinanced with Better.com.',
      name: 'Mortgage',
      order: 0,
      sourceId: 3,
    },
    4: {
      amount: 30,
      categoryId: 4,
      name: 'Gas',
      order: 0,
      sourceId: 1,
    },
    5: {
      amount: 50,
      categoryId: 5,
      name: 'Target',
      order: 0,
      sourceId: 1,
    },
    7: {
      amount: 2260,
      categoryId: 7,
      description: 'Monthly premium for family of 4.',
      name: 'BCBS',
      order: 0,
      sourceId: 3,
    },
    8: {
      amount: 2,
      categoryId: 1,
      name: 'Hulu',
      order: 1,
      sourceId: 1,
    },
    9: {
      amount: 300,
      categoryId: 2,
      name: 'Jewel',
      order: 1,
      sourceId: 4,
    },
    10: {
      amount: 99,
      categoryId: 4,
      name: 'Metra',
      order: 1,
      sourceId: 1,
    },
  });

</script>

<template>
  <main>
    <BudgetIt
      v-model:category-list="categoryList"
      v-model:default-source-id="defaultSourceId"
      v-model:source-list="sourceList"
      :expense-list="expenseList"
    >
      <section>
        <div>
          <AddCategory />
          <ExpenseCategory
            v-for="category in categoryList"
            :key="category.id"
            :category="category"
          />
        </div>
        <aside>
          <SourcesEditor />
        </aside>
      </section>
    </BudgetIt>
  </main>
</template>

<style scoped>
h5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
}

ul {
  margin: 0;
  padding: 0;
}

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
