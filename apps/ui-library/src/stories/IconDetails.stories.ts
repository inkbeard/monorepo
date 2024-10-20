import type { Meta, StoryObj } from '@storybook/vue3';
import { IconDetails } from '@inkbeard/icon-memory';
import { icons } from '@inkbeard/icon-memory/mockData.ts';

const meta = {
  title: 'Icon Memory/IconDetails',
  component: IconDetails,
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
  },
  args: { iconDetails: icons[2] },
} satisfies Meta<typeof IconDetails>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
