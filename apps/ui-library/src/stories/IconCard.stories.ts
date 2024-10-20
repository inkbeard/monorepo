import type { Meta, StoryObj } from '@storybook/vue3';
import { IconCard } from '@inkbeard/icon-memory';

const meta = {
  title: 'Icon Memory/IconCard',
  component: IconCard,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconId: {
      table: {
        type: { summary: 'number' },
        readonly: true,
      },
    },
    icon: {
      table: {
        type: { summary: 'string' },
        readonly: true,
      },
    },
  },
  args: {
    icon: 'fa-duotone fa-solid fa-house',
    iconId: 1,
    isActive: false,
    isCalculating: false,
    isMatched: false,
  },
} satisfies Meta<typeof IconCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
