import type { Meta, StoryObj } from '@storybook/vue3';
import { provide } from 'vue';
import { ExpenseCategory } from '@inkbeard/budget-it';

const provideSetup = () => {
  provide('defaultSourceId', 1);
  provide('categoryList', [
    {
      name: 'Entertainment',
      id: 1,
    },
    {
      name: 'Food',
      id: 2,
    },
  ]);
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
};
const meta = {
  component: ExpenseCategory,
  title: 'Budget It/ExpenseCategory',
  parameters: {
    layout: 'padded',
  },
  args: {
    isOpen: false,
  },
  render: (args) => ({
    components: { ExpenseCategory },
    setup() {
      provideSetup();

      return { args };
    },
    template: '<ExpenseCategory :category="args.category" :is-open="args.isOpen" />',
  }),
} satisfies Meta<typeof ExpenseCategory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithExpensesCollapsed: Story = {
  args: {
    category: {
      name: 'Entertainment',
      backgroundColor: '#b30000',
      id: 1,
    },
  },
};

export const NoExpenses: Story = {
  args: {
    category: {
      name: 'Food',
      backgroundColor: '#b30000',
      id: 2,
    },
    isOpen: true,
  },
};
