import type { Meta, StoryObj } from '@storybook/vue3';
import { provide } from 'vue';
import { AddCategory } from '@inkbeard/budget-it';

const categoryList = [
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
]

const meta: Meta<typeof AddCategory> = {
  title: 'Budget It/AddCategory',
  component: AddCategory,
  parameters: {
    layout: 'padded',
  },
  args: {
    isAdding: false,
    categoryList,
  },
}

export default meta;

type Story = StoryObj<typeof meta>;

export const AddCategoryComponent: Story = {
  render: (args) => ({
    components: { AddCategory },
    setup() {
      provide('categoryList', categoryList);

      return { args };
    },
    template: '<AddCategory :is-adding="args.isAdding" />',
  }),
};