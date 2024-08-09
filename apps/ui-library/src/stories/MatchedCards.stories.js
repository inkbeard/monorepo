import { MatchedCards } from '@inkbeard/icon-memory';
import { cards } from '@inkbeard/icon-memory/mockData.ts'

export default {
  title: 'Icon Memory/MatchedCards',
  component: MatchedCards,
  tags: ['autodocs'],
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
  }
};

export const MatchedCardsExample = {
  args: { cards },
};
