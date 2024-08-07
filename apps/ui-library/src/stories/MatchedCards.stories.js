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
        iconId: 1,
        pro: false,
      },
      {
        icon: 'fa-duotone fa-solid fa-car',
        iconId: 2,
        pro: true,
      },
      {
        icon: 'fa-duotone fa-solid fa-t-rex',
        iconId: 3,
        pro: true,
      }
    ].reduce((acc, card) => {
      acc.push({
        ...card,
        isActive: true,
        isMatched: true,
        name: card.icon.split(' ')[2].replace('fa-', ''),
      });

      return acc;
    }, []),
  },
};
