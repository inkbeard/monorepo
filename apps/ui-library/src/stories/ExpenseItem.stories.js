import { provide } from 'vue';
import { ExpenseItem } from '@inkbeard/budget-it';

const expense = {
  amount: 2,
  categoryId: 1,
  name: 'Netflix',
  order: 0,
  sourceId: 1,
};

export const SampleExpenseItem = {};

export default {
  title: 'Budget It/ExpenseItem',
  tags: ['autodocs'],
  args: { expense },
  parameters: {
    layout: 'fullscreen',
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
    template: `<ExpenseItem :expense='${JSON.stringify(expense)}' />`,
  }),
};