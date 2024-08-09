import { IconDetails } from '@inkbeard/icon-memory';
import { icons } from '@inkbeard/icon-memory/mockData.ts'

export default {
  title: 'Icon Memory/IconDetails',
  component: IconDetails,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    iconDetails: {
      table: {
        type: { summary: 'object' },
        readonly: true,
      },
    },
  }
};

export const IconDetailsExample = {
  args: { iconDetails: icons[2] },
};
