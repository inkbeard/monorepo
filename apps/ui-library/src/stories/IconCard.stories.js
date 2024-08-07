import { IconCard } from '@inkbeard/icon-memory';

export default {
  title: 'Icon Memory/IconCard',
  component: IconCard,
  tags: ['autodocs'],
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
    }
  }
};

export const IconCardExample = {
  args: {
    icon: 'fa-duotone fa-solid fa-house',
    iconId: 1,
    isActive: false,
    isCalculating: false,
    isMatched: false,
  },
};
