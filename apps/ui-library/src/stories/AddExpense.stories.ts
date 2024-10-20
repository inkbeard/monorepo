import type { Meta, StoryObj } from '@storybook/vue3';
import { AddExpense } from '@inkbeard/budget-it';
import { provide } from 'vue';

const meta = {
  component: AddExpense,
  title: 'Budget It/AddExpense',
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryId: 1,
    isFullWidth: true,
    isAddingExpense: false,
  },
  render: (args) => ({
    components: { AddExpense },
    setup() {
      provide('defaultSourceId', 1);
      provide('alphabaticSourceList', [
        { id: 1, label: 'Credit Card' },
        { id: 3, label: 'Checking Account' },
        { id: 4, label: 'Savings Account' },
        { id: 5, label: 'Cash' },
      ]);

      return { args };
    },
    template: '<AddExpense :category-id="args.categoryId" :is-adding-expense="args.isAddingExpense" :is-full-width="args.isFullWidth" />',
  }),
} satisfies Meta<typeof AddExpense>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example = {};
