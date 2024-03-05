import { AddExpense } from '@inkbeard/budget-it';
import { provide } from 'vue';

export default {
  component: AddExpense,
  title: 'Budget It/AddExpense',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: {
    categoryId: 1,
    isFullWidth: true,
    isAddingExpense: false,
  },
};

export const AddExpenseComponent = {
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
};
