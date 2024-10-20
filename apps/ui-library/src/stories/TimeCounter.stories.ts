import type { Meta, StoryObj } from '@storybook/vue3';
import { TimeCounter } from '@inkbeard/icon-memory';

const meta = {
  title: 'Icon Memory/TimeCounter',
  component: TimeCounter,
  args: {
    gameHasStarted: false,
  },
} satisfies Meta<typeof TimeCounter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
