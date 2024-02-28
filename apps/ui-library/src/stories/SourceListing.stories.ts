import { SourceListing } from '@inkbeard/budget-it';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Budget It/SourceListing',
  component: SourceListing,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export const SampleCategoryList = {
  args: {
    sourceId: 1,
    sourceList: {
      1: 'Credit Card',
      3: 'Checking Account',
      4: 'Savings Account',
      5: 'Cash',
    },
    expensesFromSources: 2,
    isEditing: false,
  },
  argTypes: {
    sourceId: {
      control: {
        type: 'number',
        max: 1,
        min: 1,
      },
    },
    expensesFromSources: {
      control: {
        type: 'number',
        min: 0,
      },
    },
  },
};