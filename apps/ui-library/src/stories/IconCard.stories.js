import { IconCard } from '@inkbeard/icon-memory';

export default {
  title: 'IconMemory/IconCard',
  component: IconCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    cardId: {
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
    }
  }
};

export const IconCardExample = {
  args: {
    icon: 'fa-duotone fa-solid fa-house',
    cardId: 1,
    isCalculating: false,
    isMatched: false,
    gameHasStarted: false,
  },
};
