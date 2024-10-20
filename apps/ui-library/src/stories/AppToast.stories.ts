import type { Meta, StoryObj } from '@storybook/vue3';
import {
  AppButton,
  AppToast,
  useToast,
} from '@inkbeard/ui-vue';

export const SampleToast = {
};

const meta = {
  title: 'ui vue/AppToast',
  args: {
    severity: 'success',
    summary: 'Info',
    detail: 'Message Content',
    life: 3000,
  },
  argTypes: {
    severity: {
      control: {
        type: 'select',
        options: [
          'contrast',
          'error',
          'info',
          'secondary',
          'success',
          'warn',
        ],
      },
    },
  },
  render: (args) => ({
    components: {
      AppButton,
      AppToast,
    },
    setup() {
      const toast = useToast();

      return {
        args,
        showToast: () => {
          toast.add({ ...args });
        },
      };
    },
    template: '<AppToast /><AppButton label="Show" @click="showToast" />',
  }),
} satisfies Meta<typeof AppToast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Example: Story = {};
