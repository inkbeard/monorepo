import { provide } from 'vue';
import { ExpenseCategory } from '@inkbeard/budget-it';

const categoryList = [
  {
    name: 'Entertainment',
    id: 1,
  },
  {
    name: 'Food',
    id: 2,
  },
];

const provideSetup = (args) => {
  provide('defaultSourceId', 1);
  provide('categoryList', categoryList);
  provide('sourceList', {
    1: 'Credit Card',
    3: 'Checking Account',
    4: 'Savings Account',
    5: 'Cash',
  });
  provide('expenseList', {
    1: {
      amount: 2,
      categoryId: 1,
      name: 'Netflix',
      order: 0,
      sourceId: 1,
    },
    4: {
      amount: 30,
      categoryId: 4,
      name: 'Gas',
      order: 0,
      sourceId: 1,
    },
    8: {
      amount: 2,
      categoryId: 1,
      name: 'Hulu',
      order: 1,
      sourceId: 3,
    },
  });
  provide('alphabaticSourceList', [
    { id: 1, label: 'Credit Card' },
    { id: 3, label: 'Checking Account' },
    { id: 4, label: 'Savings Account' },
    { id: 5, label: 'Cash' },
  ]);
}

export default {
  component: ExpenseCategory,
  title: 'Budget It/ExpenseCategory',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    isOpen: false,
  },
};

export const WithExpensesCollapsed = {
  args: {
    category: {
      name: 'Entertainment',
      id: 1,
    },
  },
  render: (args) => ({
    components: { ExpenseCategory },
    setup() {
      provideSetup();

      return { args };
    },
    template: '<ExpenseCategory :category="args.category" :is-open="args.isOpen" />',
  }),
};


export const NoExpenses = {
  args: {
    category: {
      name: 'Food',
      id: 2,
    },
    isOpen: true,
  },
  render: (args) => ({
    components: { ExpenseCategory },
    setup() {
      provideSetup();

      return { args };
    },
    template: '<ExpenseCategory :category="args.category" :is-open="args.isOpen" />',
  }),
};