import type { Meta, StoryObj } from '@storybook/vue3';
import { TurnCounter } from '@inkbeard/icon-memory';

const meta = {
  title: 'Icon Memory/TurnCounter',
  component: TurnCounter,
  args: {
    turnCount: 5,
    matchedCount: 1,
    missedCount: 3,
  },
} satisfies Meta<typeof TurnCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
