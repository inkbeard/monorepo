import { ref } from 'vue';

export function useBudgetIt() {
  const defaultSourceId = ref(1);
  const sourceList = ref({
    1: 'Credit Card',
    3: 'Checking Account',
    4: 'Savings Account',
    5: 'Cash',
  } as Record<number, string>);
  const categoryList = ref([
    {
      name: 'Entertainment',
      id: 1,
    },
    {
      name: 'Food',
      id: 2,
    },
    {
      name: 'Housing',
      id: 3,
    },
    {
      name: 'Transportation',
      id: 4,
    },
    {
      name: 'Utilities',
      id: 5,
    },
    {
      name: 'Clothing',
      id: 6,
    },
    {
      name: 'Medical',
      id: 7,
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
  /**
   * Add a new category to the current list of categories.
   */
  const addCategory = (name: string) => {
    categoryList.value.unshift({
      name: name.trim(),
      id: categoryList.value.length + 1,
    });
  };

  return {
    addCategory,
    categoryList,
    defaultSourceId,
    expenseList,
    sourceList,
  };
}
