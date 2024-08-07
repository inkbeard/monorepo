import { MatchedCards } from '@inkbeard/icon-memory';

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
  args: {
    cards: [
      {
        icon: 'fa-duotone fa-solid fa-house',
        cardId: 1,
        pro: false,
        isActive: true,
        isMatched: true,
      },
      {
        icon: 'fa-duotone fa-solid fa-car',
        cardId: 2,
        pro: true,
        isActive: true,
        isMatched: true,
      },
      {
        icon: 'fa-duotone fa-solid fa-t-rex',
        cardId: 3,
        pro: true,
        isActive: true,
        isMatched: true,
      }
    ],
  },
};
