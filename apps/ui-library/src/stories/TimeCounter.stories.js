import { TimeCounter } from '@inkbeard/icon-memory';

export default {
  title: 'Icon Memory/TimeCounter',
  component: TimeCounter,
  tags: ['autodocs'],
  decorators: [() => ({ template: '<div style="padding: 3em;"><story/></div>' })],
  parameters: {
    layout: 'fullscreen',
  },
};

export const TimeCounterExample = {
  args: {
    gameHasStarted: false,
  },
};
