import type { Meta, StoryObj } from '@storybook/vue3';
import { ResetBudgetIt } from '@inkbeard/budget-it';

const meta = {
  title: 'budget it/ResetBudgetIt',
  component: ResetBudgetIt,
} satisfies Meta<typeof ResetBudgetIt>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
