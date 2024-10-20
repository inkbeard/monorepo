import type { Meta, StoryObj } from '@storybook/vue3';
import { AppIcon } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppIcon',
  component: AppIcon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
      },
      options: [
        'fa-solid fa-plus',
        'fa-solid fa-download',
      ],
    },
    size: {
      control: {
        type: 'select',
      },
      options: [
        // relative sizes
        '2xs',
        'xs',
        'sm',
        'lg',
        'xl',
        '2xl',
        // literal sizes
        '1x',
        '2x',
        '3x',
        '4x',
        '5x',
        '6x',
        '7x',
        '8x',
        '9x',
        '10x',
      ],
    },
    type: {
      control: {
        type: 'select',
      },
      options: [
        '',
        'danger',
        'info',
        'success',
        'warning',
      ],
    },
  },
  parameters: {
    layout: 'centered',
  },
  args: {
    icon: 'fa-solid fa-plus',
    size: 'lg',
    type: '',
  },
} satisfies Meta<typeof AppIcon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};