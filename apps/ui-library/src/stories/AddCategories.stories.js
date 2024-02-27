import { AddCategory } from '@inkbeard/budget-it';

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'Budget It/AddCategory',
  component: AddCategory,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};
export const SampleCategoryList = {
  args: {
    categoryList: [
      {
        name: 'Entertainment',
        id: 1,
      },
      {
        name: 'Food',
        id: 2,
      },
      {
        name: 'Housing',
        id: 3,
      },
      {
        name: 'Transportation',
        id: 4,
      },
      {
        name: 'Utilities',
        id: 5,
      },
      {
        name: 'Clothing',
        id: 6,
      },
      {
        name: 'Medical',
        id: 7,
      },
    ],
  },
};