import type { Meta, StoryObj } from '@storybook/vue3';
import { AppColorPicker } from '@inkbeard/ui-vue';

const meta = {
  title: 'ui vue/AppColorPicker',
  component: AppColorPicker,
  parameters: {
    docs: {
      description: {
        component: 'A component extended from primevue\'s `ColorPicker` component\n\nRefer to the [documentation](https://primevue.org/colorpicker/) for a full list of features.',
      },
    },
    layout: 'centered',
  },
  args: {
    modelValue: '#cccccc',
  },
} satisfies Meta<typeof AppColorPicker>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
