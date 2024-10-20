import type { Meta, StoryObj } from '@storybook/vue3';
import { MatchedCards } from '@inkbeard/icon-memory';
import { cards } from '@inkbeard/icon-memory/mockData.ts'

const meta = {
  title: 'Icon Memory/MatchedCards',
  component: MatchedCards,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    cards: {
      table: {
        type: { summary: 'array' },
        readonly: true,
      },
    },
  },
  args: { cards },
} satisfies Meta<typeof MatchedCards>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};