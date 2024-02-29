import { SourcesEditor } from '@inkbeard/budget-it';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Budget It/SourcesEditor',
  component: SourcesEditor,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export const SampleSourcesEditor = {
  args: {
    defaultSourceId: 1,
    expenseList: {
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
    },
    sourceList: {
      1: 'Credit Card',
      3: 'Checking Account',
      4: 'Savings Account',
      5: 'Cash',
    },
  },
};