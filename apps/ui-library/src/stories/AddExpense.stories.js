import { AddExpense } from '@inkbeard/budget-it';
import { provide } from 'vue';

export const AddExpenseComponent = {
  categoryId: 1,
  isFullWidth: false,
};

export default {
  title: 'Budget It/AddExpense',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
  args: { ...AddExpenseComponent },
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

      console.log({ args })

      return { args };
    },
    template: '<AddExpense :category-id="1" :is-full-width="false" />',
  }),
};
