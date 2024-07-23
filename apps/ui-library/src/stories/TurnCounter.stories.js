import { TurnCounter } from '@inkbeard/icon-memory';

export default {
  title: 'Icon Memory/TurnCounter',
  component: TurnCounter,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="padding: 3em;"><story/></div>' })],
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    turnCount: {
      control: {
        type: 'number',
      },
    },
    matchedCount: {
      control: {
        type: 'number',
      },
    },
    missedCount: {
      control: {
        type: 'number',
      },
    },
  },
};

export const TurnCounterExample = {
  args: {
    turnCount: 5,
    matchedCount: 1,
    missedCount: 3,
  },
};
