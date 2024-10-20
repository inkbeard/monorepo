import type { Meta, StoryObj } from '@storybook/vue3';
import { AppAlert } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppAlert',
  component: AppAlert,
  argTypes: {
    severity: {
      control: {
        type: 'select',
      },
      options: ['info', 'success', 'warn', 'danger'],
    },
  },
  args: {
    title: 'Lorem Ipsum',
    description: 'lorem ipsum dolor sit amet!',
    severity: 'danger',
    closable: true,
    showIcon: true,
  },
} satisfies Meta<typeof AppAlert>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
