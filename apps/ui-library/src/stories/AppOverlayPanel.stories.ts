import type { Meta, StoryObj } from '@storybook/vue3';
import { AppOverlayPanel } from '@inkbeard/ui-vue';
const meta = {
  title: 'ui vue/AppOverlayPanel',
  component: AppOverlayPanel,
  parameters: {
    layout: 'centered',
  },
  args: {
    msg: 'Hello storybook!',
  },
} satisfies Meta<typeof AppOverlayPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
