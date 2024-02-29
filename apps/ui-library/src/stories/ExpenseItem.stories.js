import { ExpenseItem } from '@inkbeard/budget-it';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Budget It/ExpenseItem',
  component: ExpenseItem,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};
export const SampleExpenseItem = {
  args: {
    expense: {
      amount: 2,
      categoryId: 1,
      name: 'Netflix',
      order: 0,
      sourceId: 1,
    },
    sourceList: {
      1: 'Credit Card',
      3: 'Checking Account',
      4: 'Savings Account',
      5: 'Cash',
    },
  },
};