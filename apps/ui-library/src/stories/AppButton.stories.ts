import type { Meta, StoryObj } from '@storybook/vue3';
import { AppButton } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppButton',
  component: AppButton,
  argTypes: {
    severity: {
      control: {
        type: 'select',
      },
      options: [
        '',
        'secondary',
        'info',
        'success',
        'warning',
        'danger',
        'contrast',
        'help',
      ],
    },
  },
  args: {
    label: 'Primary plus',
    icon: 'fa-solid fa-plus',
    isFullWidth: false,
    disabled: false,
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A component extended from primevue\'s `Button` component\n\nRefer to the [documentation](https://primevue.org/button/) for a full list of features.',
      },
    },
  },
} satisfies Meta<typeof AppButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
