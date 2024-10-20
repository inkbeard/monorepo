import type { Meta, StoryObj } from '@storybook/vue3';
import { provide } from 'vue';
import { ExpenseItem } from '@inkbeard/budget-it';

const meta = {
  title: 'Budget It/ExpenseItem',
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    expense: {
      amount: 2,
      categoryId: 1,
      name: 'Netflix',
      order: 0,
      sourceId: 1,
    },
    expenseId: 1,
  },
  render: (args) => ({
    components: { ExpenseItem },
    setup() {
      provide('alphabaticSourceList', [
        { id: 1, label: 'Credit Card' },
        { id: 3, label: 'Checking Account' },
        { id: 4, label: 'Savings Account' },
        { id: 5, label: 'Cash' },
      ]);

      return { args };
    },
    template: '<ExpenseItem :expense="args.expense" />',
  }),
} satisfies Meta<typeof ExpenseItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
